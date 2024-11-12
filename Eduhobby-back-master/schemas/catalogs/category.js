import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const newCategoriesSchema = {
    type: 'object',
    properties: {
        ID: { type: 'number'},
        name: { type: 'string'},
    },
    required: [
        "name",
        "ID"
    ]
};

const validateCategoriesSchema = ajv.compile(newCategoriesSchema);
export { validateCategoriesSchema };
