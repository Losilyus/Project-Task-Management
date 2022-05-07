import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { LoginSchema } from '../../validators/auth.validate';

export default async (req, res, next) => {

    try {
        await LoginSchema.validateAsync(req.body);
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });


        if (!user) return res.status(403).send({
            status: 403,
            message: "User not found"
        });

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) return res.status(403).send({
            status: 403,
            message: "Password is not valid"
        });


        const token = jwt.sign({
            uuid: user.uuid,
            verification: user.verification
        }, 'sahjgdvfasdfmasnbfvasdfkehgvfj324tfghwefayu43r2qflao32rfhavjgcb4y6u3qw7evqwhjgedv43u2w56tefvdsisfopasfklsdhfasgfhjskfgeu365');

        return res.send({
            status: 200,
            message: "Login Successfully",
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            error
        });
    }
}
