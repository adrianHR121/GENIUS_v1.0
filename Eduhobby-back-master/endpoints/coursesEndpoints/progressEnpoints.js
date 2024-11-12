import Progress from '../../schemas/courses/progress.js';
import { authMiddleware } from '../authMiddleware.js';

export default async (fastify, options) => {

    // Registrar progreso     Esta parte es la proteccion de la ruta
    fastify.post('/progress', { preHandler: authMiddleware }, async (req, res) => {
        const { userId, courseId, progressPercentage, lastAccessDate } = req.body;

        if (!userId || !courseId || progressPercentage == null || !lastAccessDate) {
            return res.status(400).send('Missing properties');
        }

        try {
            const newProgress = new Progress({
                userId,
                courseId,
                progressPercentage,
                lastAccessDate
            });

            const response = await newProgress.save();
            return res.status(201).send(response);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Actualizar progreso
    fastify.put('/progress/:id', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const updatedProgress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedProgress) {
                return res.status(404).send('Progress record not found');
            }
            return res.status(200).send(updatedProgress);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Obtener progreso de un usuario en un curso
    fastify.get('/progress', { preHandler: authMiddleware }, async (req, res) => {
        const { userId, courseId } = req.query;

        if (!userId || !courseId) {
            return res.status(400).send('Missing properties');
        }

        try {
            const progress = await Progress.findOne({ userId, courseId });
            if (!progress) {
                return res.status(404).send('Progress record not found');
            }
            return res.status(200).send(progress);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Obtener todo el progreso de un usuario
    fastify.get('/progress/user/:userId', { preHandler: authMiddleware }, async (req, res) => {
        try {
            const progressRecords = await Progress.find({ userId: req.params.userId });
            if (progressRecords.length === 0) {
                return res.status(404).send('No progress records found for this user');
            }
            return res.status(200).send(progressRecords);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};
