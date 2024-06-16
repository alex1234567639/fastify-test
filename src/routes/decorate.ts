import { FastifyPluginAsync } from 'fastify'

const decorate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    // 如果想在 Fastify 的各個生命週期之間共用物件或函式，定義 Decorator 是不錯的做法
    fastify.get('/decorate1', (request, reply) => {
        const message = fastify.utility();
        reply.send({ message });
    });

    fastify.get('/decorate2', (request, reply) => {
        reply.send({ user: request.user });
    });

    fastify.get('/decorate3', (request, reply) => {
        reply.success({ message: 'Operation was successful' });
    });
}

export default decorate;