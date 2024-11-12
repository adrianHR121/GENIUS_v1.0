import Professor from '../../schemas/Users/professor.js';
import { authMiddleware } from '../authMiddleware.js';


export default async (fastify) => {

    //Listar todos los profesores
    fastify.get('/professor', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const professors = await Professor.find();
            return res.status(200).send(professors);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    //Consultar un profesor especifico por ID
    fastify.get('/professor/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const professor = await Professor.findById(req.params.id);
            if (!professor) {
                return res.status(404).send('Professor not found');
            }
            return res.status(200).send(professor);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    //Actualizar información de un profesor especifico por ID
    fastify.put('/professor/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!professor) {
                return res.status(404).send('Professor not found');
            }
            return res.status(200).send(professor);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    //Eliminar un profesor especifico por ID
    fastify.delete('/professor/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const professor = await Professor.findByIdAndDelete(req.params.id);
            if (!professor) {
                return res.status(404).send('Professor not found');
            }
            return res.status(200).send('Professor deleted successfully');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};