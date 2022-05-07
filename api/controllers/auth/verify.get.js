import { client } from "../../../configs/redis.config";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { UserVerifySchema } from "../../validators/auth.validate";


export default async (req, res) => {

    try {
        const uuid = uuidv4();
        await UserVerifySchema.validateAsync(req.body);

        const prisma = new PrismaClient();
        client.on('error', (err) => console.log('Redis Client Error', err));
        const query = req.body.code;

        const decode = jwt.verify(req.headers.authorization, 'sahjgdvfasdfmasnbfvasdfkehgvfj324tfghwefayu43r2qflao32rfhavjgcb4y6u3qw7evqwhjgedv43u2w56tefvdsisfopasfklsdhfasgfhjskfgeu365');

        await client.connect();
        const value = await client.get(`verify:${decode.uuid}`);
        await client.quit();

        if (!value) {
            return res.status(404).send({
                status: 404,
                message: "Verification code not found"
            });
        }

        if (value !== query) {
            return res.status(404).send({
                status: 404,
                message: "Verification code is not valid"
            });
        }

        const UnverifiedUser = await prisma.UnverifiedUser.findUnique({
            where: {
                uuid: decode.uuid
            }
        });

        const user = await prisma.user.create({
            data: {
                uuid: uuid, 
                name: UnverifiedUser.name,
                email: UnverifiedUser.email,
                password: UnverifiedUser.password,
            }
        });


        const deleteUnverifiedUser = await prisma.UnverifiedUser.deleteMany({
            where: {
                uuid: decode.uuid
            }
        });

        var AuthToken = jwt.sign({ 
            uuid: uuid,
        }, 'sahjgdvfasdfmasnbfvasdfkehgvfj324tfghwefayu43r2qflao32rfhavjgcb4y6u3qw7evqwhjgedv43u2w56tefvdsisfopasfklsdhfasgfhjskfgeu365');

       
        return res.status(200).send({
            status: 200,
            message: "Email verified successfully",
            token: AuthToken 
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            error
        });
    }
};