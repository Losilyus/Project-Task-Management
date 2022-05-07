import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ send: 'Unauthorized.' });

  try {
    const prisma = new PrismaClient();
    const verifiedToken = jwt.verify(token, 'sahjgdvfasdfmasnbfvasdfkehgvfj324tfghwefayu43r2qflao32rfhavjgcb4y6u3qw7evqwhjgedv43u2w56tefvdsisfopasfklsdhfasgfhjskfgeu365');

    const user = await prisma.user.findUnique({
      where: {
        uuid: verifiedToken.uuid,
      },
    });

    delete user.password;
    req.user = user;

    return true;
  } catch (e) {
    return res.status(403).send({ send: 'Invalid token.' });
  }
};
