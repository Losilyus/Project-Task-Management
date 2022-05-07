import { PrismaClient } from '@prisma/client';
import { TaskGetSchema } from '../../validators/task.validate';

export default async (req, res) => {
  try {
    const prisma = new PrismaClient();
    await TaskGetSchema.validateAsync(req.query);
    const taskData = await prisma.task.findMany({
      where: {
        name: req.query.name,
        ownerId: req.query.id,
      },
    });

    return res.send({
      status: 200,
      message: 'Success fetching task',
      data: taskData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
