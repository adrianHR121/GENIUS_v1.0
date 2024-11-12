import Ajv from "ajv";
import mongoose from "mongoose";
import addFormats from "ajv-formats";
import { newUserSchema } from "./user.js";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const professorRequestSchema = new mongoose.Schema({

    firstNames: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    professionalId: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

const ProfessorRequest = mongoose.model('ProfessorRequest', professorRequestSchema);
export default ProfessorRequest;

const { imageUrl, isGoogleAccount, active, ...propertesNeededFromUserSchema } = newUserSchema;
const newProfessorRequestSchema = {
    type: 'object',
    properties: {
        ...propertesNeededFromUserSchema,
        professionalId: { type: 'string', default: '' },
        status: { type: 'string', enum: ['pending', 'approved', 'rejected'], default: 'pending' }
    },
    required: [
        "firstNames",
        "lastNames",
        "email",
        "professionalId"
    ]
};

const validateProfessorRequestSchema = ajv.compile(newProfessorRequestSchema);
export { validateProfessorRequestSchema };

