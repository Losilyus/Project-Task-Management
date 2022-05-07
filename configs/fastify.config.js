import { Auth, Test, Task } from '../api/routers/index';

const Routers = Auth.concat(Test, Task);

export default (fastify) => {
  Routers.forEach((route) => {
    fastify.route(route);
  });
};
