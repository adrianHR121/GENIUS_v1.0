import mongoose from "mongoose";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { newUserSchema } from "./user.js";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const studentSchema = new mongoose.Schema({
    firstNames: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
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
    email: {
        type: String,
        required: true,
        unique: true,
        default: null,
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

const Student = mongoose.model('Student', studentSchema);
export default Student;

const propertiesNeededFromUserSchema = newUserSchema;
const newStudentSchema = {
    type: 'object',
    properties: {
        ...propertiesNeededFromUserSchema,
        preferences: { type: 'array', default : [], },
        description: { type: 'string', default: ' '},
        token: {type: 'string' }
    },
    required: [
        "firstNames",
        "lastNames",
        "email",
        "password"
    ]
};

const validateStudentSchema = ajv.compile(newStudentSchema);

export { validateStudentSchema };
