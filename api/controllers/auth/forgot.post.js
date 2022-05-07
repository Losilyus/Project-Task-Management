import { client } from "../../../configs/redis.config";
import { PrismaClient } from "@prisma/client";

import { forgotPassword } from "../../utils/forgot_verifaction";

export default async (req, res) => {
    try { 
        
        const prisma = new PrismaClient();

        await client.connect();

        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (!user) return res.status(403).send({
            status: 403,
            message: "User not found"
        });
        
        await client.quit();

        forgotPassword(user.uuid, user.email);


        return res.send({
            status: 200,
            message: "email sent successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            error
        });
    }
}