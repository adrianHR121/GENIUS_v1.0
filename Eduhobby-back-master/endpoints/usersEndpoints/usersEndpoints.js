import { validateStudentSchema } from '../../schemas/Users/student.js';
import { validateProfessorRequestSchema } from '../../schemas/Users/professorRequest.js';
import { validateAdminSchema } from '../../schemas/Users/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUserVerifyToken, createAccessToken } from '../authMiddleware.js';
import 'dotenv/config';
import { makeRequestToDB } from '../../server.js';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // Añadir una clave para el refresh token
let blackList = [];

export default async (fastify) => {

    // Registro de Usuario
    fastify.post('/register', async (req, res) => {
        const {password, type, ...restUserFields} = req.body;
        if(!type) return res.status(400).send({ message: 'User type not defined' });
        if(type !== 'professor' && !password) res.status(400).send({ message: 'password missing' });

        try {
            const checkUserExistance =
                await makeRequestToDB.$collection(type === 'student' ? 'students' : type === 'professor' ? 'professorrequests' : 'admins' ).
                    findOne({filter: {email: restUserFields.email}});
            if (checkUserExistance.document) res.status(403).send({msg: 'User already in existance'});

            let hashedPassword;
            if(type !== 'professor') hashedPassword = await bcrypt.hash(password, 10);

            const User = (type === 'student' ?
                validateStudentSchema :
                type === 'professor' ?
                    validateProfessorRequestSchema :
                    type === 'admin' ?
                        validateAdminSchema :
                        null);

            const data = {...restUserFields };
            if(type !== 'professor') data.password = hashedPassword;
            const newUser = User(data);
            console.log(data);

            if(type !== 'admin') data.active = false;
            if(!newUser) return res.status(400).send({ message: User.errors });

            const collection = makeRequestToDB.$collection(type === 'student' ? 'students' : type === 'professor' ? 'professorrequests' : 'admins' );

            const insertUserResponse = await collection
                .insertOne({
                    document: {
                        ...data,
                        creationDate: { $date: new Date(data.creationDate).toISOString() },
                    },
                });
            if (!insertUserResponse) return res.status(400).send({ message: 'Error inserting user'});
            if(type === 'student') {
                const error = await addUserVerifyToken(collection, insertUserResponse.insertedId, type, restUserFields.email);
                if(error) return res.status(403).send({msg: 'Error updating user'});
            }
            
            return res.status(201).send({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
    });

    // Inicio de Sesión
    fastify.post('/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ msg: 'Missing properties' });
        }

        let collection, userDocId, type;
        try {
            let collectionName;

            let user;

            collectionName = 'students';
            const student = await makeRequestToDB.$collection(collectionName).findOne({filter: { email }});
            user = student;

            if(!student.document) {
                collectionName = 'admins';
                const admin = await makeRequestToDB.$collection(collectionName).findOne({filter: { email }});
                user = admin;

                if(!admin.document) {
                    collectionName = 'professors';
                    const professor = await makeRequestToDB.$collection(collectionName).findOne({filter: { email }});
                    user = professor;
                }
            }
            collection = makeRequestToDB.$collection(collectionName);
            const userDoc = user.document;
            if (!userDoc) {
                return res.status(404).send({ msg: 'User not found' });
            }

            type = collectionName.toLowerCase().substring(0, collectionName.length-1);
            userDocId = userDoc._id;
            console.log("here", userDocId, userDoc.active);
            if(!userDoc.active) {
                const decoded = jwt.verify(userDoc.token, process.env.JWT_SECRET_VERIFY_EMAIL);
                console.log(decoded, decoded.userId);
                if(decoded.userId) return res.status(403).send({msg: 'Unverified user, token alive'});
            }

            const isPasswordValid = await bcrypt.compare(password, userDoc.password);
            if (!isPasswordValid) {
                return res.status(401).send({ msg: 'Invalid credentials' });
            }

            const accessToken = createAccessToken({ userId: userDocId, type });
            const refreshToken = jwt.sign({ userId: userDoc._id, type }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
            const { _id, firstNames, lastNames, professionalId } = userDoc;

            if(userDoc.token){
                const removeTokenResponse = await collection
                    .updateOne({
                        filter: { _id: {$oid: userDoc._id}},
                        update: { $unset: { token: ""}},
                        upsert: false,
                    });
                if(!removeTokenResponse) return res.status(500).send({msg: 'Error updating user'});
            }

            return res.status(200).send({
                accessToken,
                refreshToken,
                type,
                userData: {
                    _id,
                    firstNames,
                    lastNames,
                    professionalId,
                    email: userDoc.email,
                    active: userDoc.active
                }
            });
        } catch (error) {
            console.error(error);
            if (error.name === 'TokenExpiredError'){
                const error = await addUserVerifyToken(collection, userDocId, type, email);
                if(error) return res.status(500).send({msg: 'Error creating verification'});

                return res.status(403).send( {msg: 'Token valid but expired, creating a new token token and email...'});
            }
            if(error.name === 'JsonWebTokenError') {
                return res.status(403).send( {msg: 'Invalid token'});
            }

            return res.status(500).send({ msg: 'Internal Server Error' });
        }
    });

    // Endpoint para refrescar el token
    fastify.post('/refresh-token', async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).send({ msg: 'Refresh token missing' });
        }

        if (blackList.some((rt) => rt === refreshToken)) return res.status(405).send({error: 'Token blacklisted'});

        try {
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
            const user = await makeRequestToDB.$collection(`${decoded.type}s`).findOne({filter: {_id: {$oid: decoded.userId}}});
            const userDoc = user.document;

            if (!userDoc) return res.status(403).send({ msg: 'User not found' });

            const accessToken = createAccessToken({ userId: userDoc._id, type: decoded.type });

            return res.status(200).send({ accessToken });
        } catch (error) {
            console.error(error);
            return res.status(403).send({ msg: 'Invalid refresh token' });
        }
    });

    // Endpoint para logout
    fastify.post('/logout', async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).send({ msg: 'Refresh token missing' });
        }

        try {
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
            const user = await makeRequestToDB.$collection(`${decoded.type}s`).findOne({filter: {_id: {$oid: decoded.userId}}});
            const userDoc = user.document;
            if (!userDoc) {
                return res.status(404).send({ msg: 'User not found' });
            }

            blackList = [...blackList, refreshToken];

            return res.status(200).send({ msg: 'Logout successful' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
    });

    fastify.post('/verify', async (req, res) => {
        const verifyToken = req.headers['authorization']?.split(' ')[1];

        if(!verifyToken) return res.status(403).send({msg: 'No token provided'});

        try {
            const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET_VERIFY_EMAIL);
            console.log(decoded);

            if(!decoded.type) return res.status(403).send({msg: 'Invalid token'});

            const user = await makeRequestToDB.$collection(`${decoded.type}s`)
                .findOne({ filter: {_id: {$oid: decoded.userId}} });
            console.log(user.document);

            if(!user.document) return res.status(403).send({msg: 'User not found'});
            
            const updatedUser = await makeRequestToDB.$collection(`${decoded.type}s`)
                .updateOne({
                    filter: {_id: {$oid: decoded.userId}},
                    update: { $set: { active: true } },
                    upsert: false
                });
            if(updatedUser.matchedCount === 0) return res.status(500).send({msg: 'Error verifying user'});
            
            return res.status(200).send({msg: 'User verified'});
        } catch (error) {
            if (error.name === 'TokenExpiredError'){
                return res.status(403).send( {msg: 'Token expired'});
            }
            if(error.name === 'JsonWebTokenError') {
                return res.status(403).send( {msg: 'Invalid token'});
            }
            console.error(error.name);
            console.log(error);
        }
    });
};