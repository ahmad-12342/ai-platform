import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Synchronize Firebase User with MongoDB
router.post('/sync', async (req, res) => {
    const { firebaseId, email, name } = req.body;
    try {
        let user = await User.findOne({ firebaseId });
        if (!user) {
            user = new User({ firebaseId, email, name });
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Profile
router.get('/profile/:firebaseId', async (req, res) => {
    try {
        const user = await User.findOne({ firebaseId: req.params.firebaseId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
