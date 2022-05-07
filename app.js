import Fastify from 'fastify'
import 'dotenv/config'

const fastify = Fastify({ logger: false })

fastify.register(require('fastify-cors'));

import router from './configs/fastify.config';
router(fastify);

fastify.listen(process.env.PORT,  (err, address) => {
    if (err) fastify.log.error(err);
    console.log(`server listening on ${address}`)
});
