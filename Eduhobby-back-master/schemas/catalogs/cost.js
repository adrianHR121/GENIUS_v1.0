import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const newCostSchema = {
    type: 'object',
    properties: {
        planName:{ type: 'string' },
        durationMonths: { type: 'number' },
        currency: { type: 'string' },
        description: { type: 'string' },
        isRecurring: { type: 'boolean' },
        discount: { type: ['number', 'null'], default: null },
        active: { type: 'boolean', default: true }
    },
    required: [
        "planName",
        "durationMonths",
        "currency",
        "description",
        "isRecurring",
    ]
};

const validateCostSchema = ajv.compile(newCostSchema);
export { validateCostSchema };

