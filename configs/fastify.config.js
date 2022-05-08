import { Auth, Task } from '../api/routers/index';

const Routers = Auth.concat(Task);

export default (fastify) => {
  Routers.forEach((route) => {
    fastify.route(route);
  });
};
