import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/refine', async (req, res) => {
    const { prompt, type } = req.body;

    if (!prompt || prompt.length < 3) {
        return res.status(400).json({ error: 'Prompt is too short to be valid.' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are an AI Prompt Validator and Refiner. 
                    1. FIRST: Check if the user's prompt is a valid request, even if there are spelling mistakes. 
                    2. IF the prompt is total gibberish, random characters (like 'asdfgh'), or completely nonsensical, return ONLY the word '[INVALID]'.
                    3. IF it's valid, fix the spelling and refine it into a high-quality, cinematic ${type} prompt.
                    - Keep the core idea.
                    - Add artistic details.
                    - Keep it under 75 words.
                    - Return ONLY the refined prompt text (or [INVALID]), no explanations.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 150,
            temperature: 0.3, // Lower temperature for stricter validation
        });

        const refinedPrompt = response.choices[0].message.content.trim();

        if (refinedPrompt.includes('[INVALID]')) {
            return res.status(422).json({
                error: 'Nonsense or invalid prompt detected.',
                message: 'Aap ka prompt samajh nahi aa raha. Please sahi se likhein (e.g. "A cat in a hat" bajaye "asdhjkas").'
            });
        }

        res.json({ refinedPrompt });
    } catch (error) {
        console.error('Prompt refinement error:', error);
        res.status(500).json({ error: 'Failed to refine prompt' });
    }
});

export default router;
