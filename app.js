import Fastify from 'fastify'
import 'dotenv/config'

const fastify = Fastify({ logger: false })

// import router from './configs/fastify.config';
// router(fastify);

fastify.listen(process.env.SERVER_PORT , (err, address) => {
  if (err) {
    fastify.log.error(err);
  }
  fastify.log.info(`server listening on ${address}`)
  console.log(`server listening on ${address}`)
});