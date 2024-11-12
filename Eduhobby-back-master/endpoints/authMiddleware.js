import jwt from 'jsonwebtoken';
import 'dotenv/config';
import nodemailer from 'nodemailer' ;

const JWT_SECRET = process.env.JWT_SECRET; // usar la misma clave que en el archivo auth.js
const JWT_SECRET_VERIFY_EMAIL = process.env.JWT_SECRET_VERIFY_EMAIL; // usar la misma clave que en el archivo auth.js

function verify(req){
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
     
    if (!token) {
        return { code: 401, Error:'Token missing' };
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        return { decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError'){
            return { code: 403, Error:'Token expired' };
        }
        console.log("is this error undefined?");
        console.error(error);
        return { code: 401, Error: 'Invalid token' };
    }
}

export const authMiddleware = (req, res, next) => {
    const { code, Error } = verify(req);
    if(code && Error) return res.status(code).send({ Error });
    next();
};

function createAccessToken(credentials) {
    const accessToken = jwt.sign({ userId: credentials.userId, role: credentials.type }, JWT_SECRET, { expiresIn: '2m' });
    return accessToken;
};

function createVerifyEmailToken(credentials) {
    console.log(credentials);
    const accessToken = jwt.sign(
        { userId: credentials._id, type: credentials.type },
        JWT_SECRET_VERIFY_EMAIL,
        { expiresIn: '2h' }
    );
    return accessToken;
};

export { createAccessToken, createVerifyEmailToken };

async function sendVerificationEmail(credentials) {
    if(credentials.type !== 'admin'){
        console.log(process.env.EMAIL_SERVICE, process.env.GENIUS_EMAIL, process.env.GENIUS_PASSWORD);
        const emailToken = createVerifyEmailToken({_id: credentials._id, type: credentials.type});

        try {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.GENIUS_EMAIL,
                    pass: process.env.GENIUS_APP_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.GENIUS_EMAIL,
                to: credentials.email,
                subject: 'Welcome to GENIUS!',
                html: '<h1>Hi we welcome you to your learning journey along us. So much stuff is waiting for you. But first '+
                'lets verify your email, here, click this link to verify your account: </h1>'+
                '<a href="'+'https://eduhobby-front.vercel.app/verify/'+emailToken+'">Verify your account</a>'
            };

            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error:', error.message);
                        reject(error.message);
                    } else {
                        console.log('Email sent:', info.response);
                        resolve(info.response);
                    }
                });
            });
            return emailToken;
        } catch (error) {
            console.log(error);
        }
    }
}

export async function addUserVerifyToken(collection, _id, type, email){
    const token = await sendVerificationEmail({_id, type, email });
    
    const updateUserTokenResponse = await collection
        .updateOne({
            filter: {_id: {$oid: _id}},
            update: { $set: {token: token }},
            upsert: false
        });

    let error = false;
    if (!updateUserTokenResponse) error = true;
    return error;
}
