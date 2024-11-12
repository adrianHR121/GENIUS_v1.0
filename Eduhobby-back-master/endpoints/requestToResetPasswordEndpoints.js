/*import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import resetPassword from '../schemas/resetPassword.js'
import Student from '../schemas/student.js';
import Professor from '../schemas/professor.js';

export default async (fastify, options) => {
    fastify.post('/request-password-reset', async (req, res) => {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send('Email is required');
        }

        const user = await Student.findOne({ email }) ?? await Professor.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const token = crypto.randomBytes(32).toString('hex');
        const resetToken = new resetPassword({
            email,
            token,
            expiresAt: Date.now() + 3600000 // 1 hora
        });

        try {
            await resetToken.save();

            // Configuración de nodemailer
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE, // O cualquier servicio de correo que uses
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Request',
                text: `You requested a password reset. Please use the following token: ${token}`
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).send('Password reset token sent');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    fastify.post('/reset-password', async (req, res) => {
        const { email, token, newPassword } = req.body;
        if (!email || !token || !newPassword) {
            return res.status(400).send('Missing properties');
        }

        const resetToken = await resetPassword.findOne({ email, token });
        if (!resetToken) {
            return res.status(400).send('Invalid or expired token');
        }

        if (resetToken.expiresAt < Date.now()) {
            return res.status(400).send('Token expired');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        try {
            // Intentar actualizar la contraseña del estudiante
            let user = await Student.findOneAndUpdate({ email }, { password: hashedPassword });
            
            if (!user) {
                // Si no es estudiante, intentar actualizar la contraseña del profesor
                user = await Professor.findOneAndUpdate({ email }, { password: hashedPassword });
            }

            if (!user) {
                return res.status(404).send('User not found');
            }

            await resetToken.deleteOne({ email, token }); // Eliminar el token usado

            return res.status(200).send('Password reset successfully');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
};*/
