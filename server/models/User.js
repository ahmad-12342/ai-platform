import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    credits: {
        type: Number,
        default: 10 // Free starter credits
    },
    totalGenerations: {
        type: Number,
        default: 0
    },
    storageUsed: {
        type: Number, // In MB
        default: 0
    },
    timeSaved: {
        type: Number, // In Hours
        default: 0
    },
    plan: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free'
    },
    stripeId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
export default User;
