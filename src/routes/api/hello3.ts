import { FastifyPluginAsync, FastifyInstance  } from 'fastify'
import fastifyAuth from '@fastify/auth';
import { verifyToken } from './../../handlers/auth'; // 根據你的文件結構調整相對路徑

interface NameParams {
  name: string;
}
interface MyQueryString {
  key01: string
  key02: string
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
  // curl -X POST "http://127.0.0.1:3000/api/hello3/querystring?key01=aaa&key02=bbb"
  fastify.post<{ Querystring: MyQueryString }>('/hello3/querystring', (request, reply) => {
    const { key01, key02 } = request.query;
    return reply.status(200).send({ message: `Hello ${key01} & ${key02}` });
  })
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
