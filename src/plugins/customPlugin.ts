import { FastifyPluginAsync } from 'fastify';

const customPlugin: FastifyPluginAsync = async (fastify) => {
  // 向 Fastify 實例添加自定義方法
  fastify.decorate('utility', function() {
    return 'This is a utility function';
  });

  // 向請求對象添加自定義屬性
  fastify.decorateRequest('user', null);

  // 在 preHandler 鉤子中設置自定義屬性
  fastify.addHook('preHandler', (request, reply, done) => {
    request.user = { id: 1, name: 'John Doe' };
    done();
  });

  // 向回應對象添加自定義方法
  fastify.decorateReply('success', function(payload) {
    this.code(200).send({ status: 'success', data: payload });
    return this;
  });
};

export default customPlugin;
