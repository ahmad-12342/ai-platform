import express from 'express';
import User from '../models/User.js';
import Generation from '../models/Generation.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// POST /api/auth/sync  — Create or return user after Firebase login
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// GET /api/auth/profile/:firebaseId  — Full profile with stats
// ─────────────────────────────────────────────────────────────
router.get('/profile/:firebaseId', async (req, res) => {
    try {
        const user = await User.findOne({ firebaseId: req.params.firebaseId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Also return recent 5 generations for dashboard activity feed
        const recentGenerations = await Generation.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            _id: user._id,
            firebaseId: user.firebaseId,
            email: user.email,
            name: user.name,
            credits: user.credits,
            plan: user.plan,
            totalGenerations: user.totalGenerations,
            storageUsed: user.storageUsed,
            timeSaved: user.timeSaved,
            createdAt: user.createdAt,
            recentGenerations,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
