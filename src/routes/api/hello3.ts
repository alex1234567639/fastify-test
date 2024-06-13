import { FastifyPluginAsync, FastifyInstance  } from 'fastify'
import fastifyAuth from '@fastify/auth';
import { verifyToken } from './../../handlers/auth'; // 根據你的文件結構調整相對路徑

interface NameParams {
  name: string;
}

const workspaces: FastifyPluginAsync = async (fastify: FastifyInstance , opts): Promise<void> => {
  fastify.addHook('onReady', (done) => {
    console.log('onReady')
    done()
  })
  // curl -X POST http://127.0.0.1:3000/api/hello3/alex
  fastify.post<{ Params: NameParams }>('/hello3/:name', async (request, reply) => {
      const name = request.params.name;
      return reply.status(200).send({ message: `Hello ${name}` });
  });
  fastify.get('/public', async (request, reply) => {
      return { message: 'hello3 public' };
  });

  fastify
  .register(fastifyAuth)
  .after(() => {
    fastify.route({
      method: 'GET',
      url: '/protected',
      preHandler: fastify.auth([verifyToken]),
      handler: async (request, reply) => {
        return { message: 'hello3 protected' };
      }
    })
  })
}

export default workspaces
