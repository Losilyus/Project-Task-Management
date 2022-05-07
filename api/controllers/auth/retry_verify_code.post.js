import jwt from 'jsonwebtoken';
import { emailVerification } from '../../utils/mail_verification';
import { PrismaClient } from '@prisma/client';

export default async (req, res) => {
    try {
        
        const prisma = new PrismaClient();

        const decode = jwt.verify(req.headers.authorization, 'sahjgdvfasdfmasnbfvasdfkehgvfj324tfghwefayu43r2qflao32rfhavjgcb4y6u3qw7evqwhjgedv43u2w56tefvdsisfopasfklsdhfasgfhjskfgeu365');

        const user = await prisma.unverifiedUser.findUnique({
            where: {
                uuid: decode.uuid
            }
        });

        emailVerification(decode.uuid, user.email);

        return res.send({
            status: 200,
            message: "Transaction Successfully",
        });

           
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error
        });
    }
};