import { PrismaClient } from '@prisma/client';
import { TaskPutSchema, TaskPutQuerySchema } from '../../validators/task.validate';

export default async (req, res) => {
  try {
    const prisma = new PrismaClient();
    await TaskPutSchema.validate(req.body);
    await TaskPutQuerySchema.validate(req.query);

    await prisma.task.updateMany({
      where: {
        id: parseInt(req.query.id, 10),
        ownerId: req.user.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        interval: req.body.interval,
        priority: req.body.priority,
      },
    });

    return res.send({
      status: 200,
      message: 'Task updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
