import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    progressPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    lastAccessDate: {
        type: Date,
        required: true
    }
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
