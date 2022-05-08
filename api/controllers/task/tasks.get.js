import { PrismaClient } from '@prisma/client';
import { TasksGetSchema } from '../../validators/task.validate';

export default async (req, res) => {
  try {
    const prisma = new PrismaClient();
    await TasksGetSchema.validateAsync(req.query);
    const taskData = await prisma.task.findMany({
      where: {
        ownerId: req.user.id,
        interval: req.query.interval,
        priority: req.query.priority,
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
