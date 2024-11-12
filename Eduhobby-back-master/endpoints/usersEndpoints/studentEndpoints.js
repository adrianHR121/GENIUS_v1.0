import Student from '../../schemas/Users/student.js';
import { authMiddleware } from '../authMiddleware.js';


export default async (fastify) => {

    //Listar todos los estudiantes
    fastify.get('/student', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const students = await Student.find();
            return res.status(200).send(students);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    //consultar un estudiante especifico por ID
    fastify.get('/student/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) {
                return res.status(404).send('Student not found');
            }
            return res.status(200).send(student);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    //Actualizar informacion de un estudiante sespecifico por ID
    fastify.put('/student/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!student) {
                return res.status(404).send('Student not found');
            }
            return res.status(200).send(student);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    //Eliminar a un estudiantes especifico por ID
    fastify.delete('/students/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const student = await Student.findByIdAndDelete(req.params.id);
            if (!student) {
                return res.status(404).send('Student not found');
            }
            return res.status(200).send('Student deleted successfully');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};
