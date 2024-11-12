import mongoose from "mongoose";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { newUserSchema } from "./user.js";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const professorSchema = new mongoose.Schema({

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
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: null,
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
    password: {
        type: String,
        required: true,
        default: null
    },
    isGoogleAccount: {
        type: Boolean,
        default: false,
        required: false
    },
    preferences: {   /// Este campo es para que el usuario pueda editar la seccion de "Mis preferencias"
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: ''
    }
});

const Professor = mongoose.model('Professor', professorSchema);
export default Professor;

const propertiesNeededFromUserSchema = newUserSchema;
const newProfessorSchema = {
    type: 'object',
    properties: {
        ...propertiesNeededFromUserSchema,
        professionalId: { type: 'string', default: null },
        preferences: { type: 'array', default : [], },
        description: { type: 'string', default: ' '},
        token: { type: 'string' }
    },
    required: [
        "firstNames",
        "lastNames",
        "email",
        "password"
    ]
};

const validateProfessorSchema = ajv.compile(newProfessorSchema);

export { validateProfessorSchema };
