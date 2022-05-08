import Joi from 'joi';

export const TaskAddSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(50).required(),
  interval: Joi.string().valid('DAILY', 'WEEKLY', 'MONTHLY').min(2).max(50)
    .required(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').min(2).max(50)
    .required(),
});

export const TaskGetSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

export const TaskPutQuerySchema = Joi.object({
  id: Joi.string().min(1).max(5).required(),
});

export const TaskPutSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(50).required(),
  interval: Joi.string().valid('DAILY', 'WEEKLY', 'MONTHLY').min(2).max(50)
    .required(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').min(2).max(50)
    .required(),
});

export const TaskDeleteSchema = Joi.object({
  id: Joi.string().min(1).max(5).required(),
});

export const TasksGetSchema = Joi.object({
  interval: Joi.string().valid('DAILY', 'WEEKLY', 'MONTHLY').min(2).max(50),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').min(2).max(50),
});
