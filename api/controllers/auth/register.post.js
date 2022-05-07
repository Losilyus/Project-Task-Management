/// ////////////////LIBRARY IMPORTING////////////////////
import { bcrypt } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { emailVerification } from '../../utils/mail_verification';
import { RegisterSchema } from '../../validators/auth.validate';

export default async (req, res) => {
  try {
    await RegisterSchema.validateAsync(req.body);
    const prisma = new PrismaClient();
    const q = req.body;
    const dataUuid = await uuidv4();
    const passHass = await bcrypt.hash(q.password, 10);

    /// /////////////ADD DATA TO DB/////////////////
    await prisma.UnverifiedUser.create({
      data: {
        uuid: dataUuid,
        name: q.name,
        email: q.email,
        password: passHass,
      },
    });

    const userRes = await prisma.UnverifiedUser.findUnique({
      where: {
        uuid: dataUuid,
      },
    });
    const AuthToken = await jwt.sign({
      uuid: userRes.uuid,
      verification: userRes.verification,
    }, 'sahjgdvfasdfmasnbfvasdfkehgvfj324tfghwefayu43r2qflao32rfhavjgcb4y6u3qw7evqwhjgedv43u2w56tefvdsisfopasfklsdhfasgfhjskfgeu365');

    await emailVerification(userRes.uuid, q.email);

    res.status(201).send({
      msg: 'User Create Successfuly',
      token: AuthToken,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 'P2002') {
      throw res.status(422).send({
        message: 'Email already exists',
      });
    }
    throw res.status(500).send({
      message: error.message,
    });
  }
};
