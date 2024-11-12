import  Ajv  from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({useDefaults: true});
addFormats(ajv);

const subcriptionsSchema = {
    type: 'object',
    properties: {
        orderId: { type: 'string' },
        studentId: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' }
    },
    required: [
        "orderId",
        "studendId",
        "startDate",
        "endDate"
    ]
};

const validateSubsSchema = ajv.compile(subcriptionsSchema);

export { validateSubsSchema };
