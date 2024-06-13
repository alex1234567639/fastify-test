import { FastifyPluginAsync } from 'fastify';
// import fastifyPassport from '@fastify/passport';
// import fastifySecureSession from '@fastify/secure-session';
// import { Strategy as LocalStrategy } from 'passport-local';

const passportRoutes: FastifyPluginAsync = async (fastify, opts) => {
    // // 配置 secure-session 插件
    // fastify.register(fastifySecureSession, {
    //     secret: 'a very secret string', // 請使用一個更安全的密鑰
    //     cookie: {
    //         path: '/',
    //         secure: false // 在生產環境中應設置為 true
    //     }
    // });

    // // 初始化 fastify-passport
    // fastify.register(fastifyPassport.initialize());
    // fastify.register(fastifyPassport.secureSession());
    
}

export default passportRoutes
