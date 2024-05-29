import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import fastifyAuth from '@fastify/auth';
// import { verifyToken } from './../../handlers/auth'; // 根據你的文件結構調整相對路徑

interface NameParams {
  name: string;
}
const opts: RouteShorthandOptions = {
  schema: {
      params: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          },
          required: ['name']
        },
      response: {
          200: {
              type: 'object',
              properties: {
                  message: { type: 'string' }
              }
          }
      }
  }
};

export default async function (server: FastifyInstance) {
  // 註冊 fastify-auth 插件
  server.register(fastifyAuth);

  // curl -X POST http://127.0.0.1:3000/hello3/alex
  server.post<{ Params: NameParams }>('/hello3/:name', opts, async (request, reply) => {
      const name = request.params.name;
      return reply.status(200).send({ message: `Hello ${name}` });
  });
  server.get('/public', async (request, reply) => {
      return { message: 'hello3 public' };
  });
  // server.get('/protected', {
  //   preHandler: server.auth([verifyToken])
  // }, async (request, reply) => {
  //     return { message: 'hello3 protected' };
  // });
}