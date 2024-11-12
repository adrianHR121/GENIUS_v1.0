import ProfessorRequest from '../../schemas/Users/professorRequest.js';
import Professor from '../../schemas/Users/professor.js';
import bcrypt from 'bcryptjs';
import { makeRequestToDB } from '../../server.js';

export default async (fastify) => {
    // Solicitud de Registro de Profesor
    fastify.post('/request-professor', async (req, res) => {
        const { firstNames, lastNames, type, email, password, professionalId,  creationDate, imageUrl } = req.body;


        if (!firstNames || !lastNames || !type || !email || !password || !professionalId || !creationDate || !imageUrl) {
            return res.status(400).send('Missing properties');
        }

        try {
            const newRequest = new ProfessorRequest({
                firstNames: firstNames,
                lastNames: lastNames,
                type: type,
                email: email,
                password: password,
                professionalId: professionalId,
                creationDate: new Date(creationDate),
                imageUrl: imageUrl
            });
            
            const response = await newRequest.save();
            return res.status(201).send(response);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Aqui se obtienen todas las solicitudes de registro de profesor (Solo para administradores)
    fastify.get('/professor-requests', async (req, res) => {
        try {
            const requests = await ProfessorRequest.find({ status: 'pending' });
            return res.status(200).send(requests);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Aca se aprueban las solicitudes del registro de profesor
    fastify.post('/approve-professor/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const request = await ProfessorRequest.findById(id);
            if (!request) {
                return res.status(404).send('Request not found');
            }

            if (request.status !== 'pending') {
                return res.status(400).send('Request is not pending');
            }

            // Aca se crea el usuario de profesor y pasa a almacenarse en la colección principal "professors" de mongodb
            const newProfessor = new Professor({
                firstNames: request.firstNames,
                lastNames: request.lastNames,
                type: 'professor',
                email: request.email,
                password: await bcrypt.hash(request.email, 10),
                professionalId: request.professionalId,
                creationDate: request.creationDate
            });
            const doc = await newProfessor.save();
            request.status = 'approved';

            await request.save();

            const error = await addUserVerifyToken(makeRequestToDB.$collection('professor'), doc._id.toString(), 'professor', doc.email);
            if(error) return res.status(403).send({msg: 'Error updating user'});

            return res.status(200).send('Professor approved and registered successfully');
        } catch (error) {
            console.error(error);
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Aca para rechazar una solicitud de registro de profesor
    fastify.post('/reject-professor/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const request = await ProfessorRequest.findById(id);
            if (!request) {
                return res.status(404).send('Request not found');
            }

            if (request.status !== 'pending') {
                return res.status(400).send('Request is not pending');
            }

            request.status = 'rejected';
            await request.save();

            return res.status(200).send('Professor request rejected');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};