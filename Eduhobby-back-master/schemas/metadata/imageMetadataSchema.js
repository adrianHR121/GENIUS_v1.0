import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const newImageMetadataSchema = {
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

const validateImageMetatadaSchema = ajv.compile(newImageMetadataSchema);
export { validateImageMetatadaSchema };

