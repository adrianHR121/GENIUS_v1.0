import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */


// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(async (fastify, options) => {
    fastify.register(fastifyMongo, {
      url: 'mongodb://0.0.0.0:27017/test_db',
    });
  })