import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video', 'cv', 'content'],
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    resultUrl: String, // For images/videos
    textContent: String, // For CV/Content
    metadata: {
        style: String,
        resolution: String,
        duration: String,
        template: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Generation = mongoose.model('Generation', generationSchema);
export default Generation;
