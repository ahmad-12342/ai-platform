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
