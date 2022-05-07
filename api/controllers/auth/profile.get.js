import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
    try { 
        let data = req.user
       
        return res.send({
            status: 200,
            send: data,
        });
        
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            error
        });
    }
}