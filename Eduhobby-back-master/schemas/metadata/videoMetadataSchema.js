import mongoose from "mongoose";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const videoMetadataSchema = new mongoose.Schema({
    name: String,
    caption: String,
    fileType: String,
    videoUrl: String,
    isActive: Boolean,
});

const videoMetadata = mongoose.model('VideoMetadata', videoMetadataSchema);
export default videoMetadata;

const newVideoMetadataSchema = {
    type: 'object',
    properties: {
        name: { type: 'string'},
        caption: { type: 'string' },
        fileType: { type: 'string' },
        active: { type: 'boolean', default: true  },
        creationDate: { type: 'string', default: new Date(Date.now()) },
    },
    required: [
        "name",
        "caption",
        "fileType",
    ]
};

const validateVideoMetatadaSchema = ajv.compile(newVideoMetadataSchema);
export { validateVideoMetatadaSchema };
