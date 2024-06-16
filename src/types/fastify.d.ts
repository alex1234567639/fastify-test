import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user?: { id: number; name: string };
    }
    interface FastifyInstance {
        utility: () => string;
    }
    interface FastifyReply {
        success: (payload: any) => FastifyReply;
    }
}