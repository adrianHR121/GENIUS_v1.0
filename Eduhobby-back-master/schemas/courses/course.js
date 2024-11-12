import mongoose from 'mongoose';
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    imageUrl: String
});

const Course = mongoose.model('Course', courseSchema);
export default Course;

const newCourseSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        content: { type: 'array' },
        professor: { type: 'string' },
        creationDate: { type: 'string', default: new Date(Date.now()) },
        imageUrl: { type: 'string' },
        status: { type: 'string', enum: ['pending', 'approved', 'rejected'], default: 'pending' }
    },
    
    required: [
        "title",
        "description",
        "category",
        "professor",
        "status"
    ]
};

const validateCourseSchema = ajv.compile(newCourseSchema);
export { validateCourseSchema };
