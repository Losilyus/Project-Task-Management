import { Auth, Test } from '../api/routers/index';

const Routers = Auth.concat( Test );

export default (fastify) => {
    Routers.forEach((route) => {
        fastify.route(route);
    })
};