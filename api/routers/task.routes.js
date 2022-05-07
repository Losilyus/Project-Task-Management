import {
  TaskPost, TaskGet, TaskPut, TasksGet, TaskDelete,
} from '../controllers/task';
import { Auth } from '../middlewares';

export default [
  {
    method: 'GET',
    url: '/api/task',
    preHandler: Auth,
    handler: TaskGet,
  },
  {
    method: 'GET',
    url: '/api/tasks',
    preHandler: Auth,
    handler: TasksGet,
  },
  {
    method: 'POST',
    url: '/api/task',
    preHandler: Auth,
    handler: TaskPost,
  },
  {
    method: 'PUT',
    url: '/api/task',
    preHandler: Auth,
    handler: TaskPut,
  },
  {
    method: 'DELETE',
    url: '/api/task',
    preHandler: Auth,
    handler: TaskDelete,
  },
];
