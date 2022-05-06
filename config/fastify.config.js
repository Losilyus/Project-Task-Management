import { Auth } from '../api/routers/index';

const Routers = Auth.concat();

export default (fastify) => {
    Routers.forEach((route, index) => {
        fastify.route(route);
    })
};