import { FastifyInstance, RouteShorthandOptions } from 'fastify';

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
    // curl -X POST http://127.0.0.1:3000/hello3/alex
    server.post<{ Params: NameParams }>('/hello3/:name', opts, async (request, reply) => {
        const name = request.params.name;
        return reply.status(200).send({ message: `Hello ${name}` });
    });
    server.get('/hello3', async (request, reply) => {
        return { message: 'hello3 Get' };
    });
}