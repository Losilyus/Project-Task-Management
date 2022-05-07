import { PrismaClient } from '@prisma/client';
import { TaskAddSchema } from '../../validators/task.validate';

export default async (req, res) => {
  try {
    await TaskAddSchema.validateAsync(req.body);
    const prisma = new PrismaClient();

    await prisma.task.create({
      data: {
        owner: {
          connect: {
            id: req.user.id,
          },
        },
        name: req.body.name,
        description: req.body.description,
        interval: req.body.interval,
        priority: req.body.priority,
      },
    });

    return res.send({
      status: 200,
      message: 'Task created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
    });
  }
};
