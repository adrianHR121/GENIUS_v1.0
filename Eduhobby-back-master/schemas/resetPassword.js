import mongoose from 'mongoose';

const resetPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const resetPassword = mongoose.model('resetPassword', resetPasswordSchema);
export default resetPassword;