import mongoose from "mongoose";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { newUserSchema } from "./user.js";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const adminSchema = new mongoose.Schema({

    firstNames: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        default: null,
        unique: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    password: {
        type: String,
        required: true,
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
    isGoogleAccount: {
        type: Boolean,
        default: false,
        required: false
    }
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;

const propertiesNeededFromUserSchema = newUserSchema;
const newAdminSchema = {
    type: 'object',
    properties: { ...propertiesNeededFromUserSchema },
    required: [
        "firstNames",
        "lastNames",
        "email",
        "password"
    ]
};

const validateAdminSchema = ajv.compile(newAdminSchema);
export { validateAdminSchema };
