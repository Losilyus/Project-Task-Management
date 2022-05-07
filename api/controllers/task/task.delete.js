import { PrismaClient } from '@prisma/client';
import { TaskDeleteSchema } from '../../validators/task.validate';

export default async (req, res) => {
  try {
    const prisma = new PrismaClient();
    await TaskDeleteSchema.validate(req.query);
    const reqId = parseInt(req.query.id, 10);

    await prisma.task.update({
      where: {
        id: reqId,
      },
      data: {
        owner: {
          disconnect: true,
        },
      },
    });

    await prisma.task.delete({
      where: {
        id: reqId,
      },
    });

    return res.send({
      status: 200,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
