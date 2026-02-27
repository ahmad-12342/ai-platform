import express from 'express';
import OpenAI from 'openai';
import Replicate from 'replicate';
import User from '../models/User.js';
import Generation from '../models/Generation.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

// Generate Image
router.post('/image', async (req, res) => {
    const { userId, prompt, style, resolution } = req.body;
    try {
        const user = await User.findById(userId);
        if (user.credits < 1) return res.status(403).json({ message: 'Insufficient credits' });

        // Call DALL-E or Stability
        // For brevity, using placeholder logic
        const imageUrl = "https://placeholder-result.com/image.png";

        user.credits -= 1;
        await user.save();

        const generation = new Generation({
            userId,
            type: 'image',
            prompt,
            resultUrl: imageUrl,
            metadata: { style, resolution }
        });
        await generation.save();

        res.json({ imageUrl, creditsRemaining: user.credits });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Generate Content (Blog/Script/Code)
router.post('/content', async (req, res) => {
    const { userId, prompt, type } = req.body;
    try {
        const user = await User.findById(userId);
        if (user.credits < 2) return res.status(403).json({ message: 'Insufficient credits' });

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: prompt }],
        });

        const resultText = completion.choices[0].message.content;

        user.credits -= 2;
        await user.save();

        const generation = new Generation({
            userId,
            type: 'content',
            prompt,
            textContent: resultText,
            metadata: { type }
        });
        await generation.save();

        res.json({ text: resultText, creditsRemaining: user.credits });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
