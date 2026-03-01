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

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are an expert AI prompt engineer. Your task is to refine the user's simple prompt into a high-quality, detailed, and cinematic prompt for an ${type} generation model like DALL-E 3 or Runway Gen-2. 
                    - Keep the core idea.
                    - Add specific details about lighting, atmosphere, camera angle, and style.
                    - Use professional artistic terms.
                    - Keep it under 75 words.
                    - Return ONLY the refined prompt text, no explanations.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        const refinedPrompt = response.choices[0].message.content.trim();
        res.json({ refinedPrompt });
    } catch (error) {
        console.error('Prompt refinement error:', error);
        res.status(500).json({ error: 'Failed to refine prompt' });
    }
});

export default router;
