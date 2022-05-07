import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { client } from '../../../configs/redis.config';

import { UserResetPasswordSchema } from '../../validators/auth.validate';

client.on('error', (err) => console.log('Redis Client Error', err));

export default async (req, res) => {
  try {
    await UserResetPasswordSchema.validateAsync(req.body);
    const prisma = new PrismaClient();

    if (req.body.password !== req.body.retype_password) {
      return res.status(400).send({
        message: 'Password and Retype Password is not same',
      });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    await client.connect();
    const value = await client.get(`forgot:${req.query.token}`);

    if (!value) {
      return res.status(404).send({
        status: 404,
        message: 'Forgot password code not found.',
      });
    }

    await prisma.user.update({
      where: {
        uuid: value,
      },
      data: {
        password: hash,
      },
    });

    await client.del(`forgot:${req.query.token}`);

    await client.quit();

    return res.send({
      status: 200,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
