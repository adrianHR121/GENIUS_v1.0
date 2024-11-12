const newUserSchema = {
    firstNames: { type: 'string'},
    lastNames: { type: 'string' },
    active: { type: 'boolean', default: true },
    email: { type: 'string' /*unique*/}, //develop a way to ensure this is unique
    creationDate: { type: 'string', default: new Date(Date.now()) },
    imageUrl: { type: 'string' },
    password: { type: 'string' },
    isGoogleAccount: { type: 'boolean', default: false },
};

export { newUserSchema };
