import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import usersEndpoints from './endpoints/usersEndpoints/usersEndpoints.js';
import courseAndContEndpoints from './endpoints/coursesEndpoints/courseAndContEndpoints.js';
import videoEndpoints from './endpoints/azureEndpoints/videoEndpoints.js';
import progressEndpoints from './endpoints/coursesEndpoints/progressEnpoints.js';
import studentEndpoints from './endpoints/usersEndpoints/studentEndpoints.js';
import professorEndpoints from './endpoints/usersEndpoints/professorEndpoints.js';
import professorRequestsEndpoints from './endpoints/usersEndpoints/professorRequestsEndpoints.js';
import costsEndpoints from './endpoints/catalogEndpoints/costsEndpoints.js';
import categoriesEndpoints from './endpoints/catalogEndpoints/categoriesEndpoints.js';
import imageEndpoints from './endpoints/azureEndpoints/imageEndpoints.js';
import subcriptionEndpoints from './endpoints/subscriptionEndpoints.js';
import paypalEndpoints from './endpoints/paypalEndpoints.js';

/**                CONEXIONES                      */

import { blobService } from './config/azure.js';
export const containerClient = blobService;

import database from './config/mongo.js';
export const makeRequestToDB = database;

const fastify = Fastify({
    logger: true,
    bodyLimit: 1024 * 1024 * 1024,
});

/**                ***************PLUG-IN'S**************                   */
//CORS
//cada que se agrega una libreria para fastify se agrega aqui, es un plug-in
fastify.register(import('@fastify/multipart'));
await fastify.register(cors, {
    origin: true, // Specify the allowed origins ('*' for all, or a list of origins)
    methods: ['GET', 'PUT', 'POST', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Allow credentials (cookies, authentication) to be exposed to the browser
});

//cada que se crea un nuevo endpoint se tiene que declarar aqui, es un plug-in

fastify.register(usersEndpoints);
fastify.register(courseAndContEndpoints);
fastify.register(videoEndpoints);
fastify.register(studentEndpoints);
fastify.register(progressEndpoints);
fastify.register(professorEndpoints);
fastify.register(professorRequestsEndpoints);
fastify.register(costsEndpoints);
fastify.register(categoriesEndpoints);
fastify.register(imageEndpoints);
fastify.register(subcriptionEndpoints);
fastify.register(paypalEndpoints);

/**        *****************SERVIDOR*****************             */

fastify.get('/', (_, reply) => {
    reply.send({ hello: 'dammn world' });
});

if(process.env.ENVIRONMENT === 'local') {
    fastify.listen({ port: 3001 }, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        console.log(`Server is now listening on ${address}`);
    });
}

export default async (req, res) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
};