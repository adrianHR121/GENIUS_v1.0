import mongoose from 'mongoose';
import Ajv from 'ajv';
import addFormats from "ajv-formats";

const ajv = new Ajv({ useDefaults: true});
addFormats(ajv);

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Content = mongoose.model('Content', contentSchema);
export default Content;

const newContentSchema = {
    type:'object',
    properties: {
        title: { type: 'string' },
        video: { type:'string' },
        course: { type: 'string' },
        creationDate: { type: 'string', default: new Date(Date.now()) },
    },
    required: [
        "title",
        "course",
        "video"
    ]
};

const validateContentSchema = ajv.compile(newContentSchema);
export { validateContentSchema };
