import { FastifyPluginAsync } from 'fastify'

const lifecycle: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/life_cycle', async function (request, reply) {
    return { message: 'Hello Lifecycle' }
  })

  fastify.addHook('onRequest', (request, reply, done) => {
    console.log('onRequest hook')
    done()
  })

  fastify.addHook('preParsing', (request, reply, payload, done) => {
    console.log('preParsing hook')
    done(null, payload)
  })
  
  fastify.addHook('preValidation', (request, reply, done) => {
    console.log('preValidation hook')
    done()
  })
  
  fastify.addHook('preHandler', (request, reply, done) => {
    console.log('preHandler hook')
    done()
  })
  
  fastify.addHook('preSerialization', (request, reply, payload, done) => {
    console.log('preSerialization hook')
    done(null, payload)
  })
  
  fastify.addHook('onSend', (request, reply, payload, done) => {
    console.log('onSend hook')
    done(null, payload)
  })
  
  fastify.addHook('onResponse', (request, reply, done) => {
    console.log('onResponse hook')
    done()
  })
}

export default lifecycle
