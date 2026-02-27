import { NextResponse } from 'next/server';
import { OPENAI_API_KEY } from '@/lib/apiKey';

export async function POST(req) {
    try {
        const { prompt, duration } = await req.json();

        // Making a call to OpenAI's ecosystem using the provided API Key.
        // Assuming Sora or an equivalent OpenAI video model endpoint structure for simulation purposes.
        const response = await fetch('https://api.openai.com/v1/videos/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'sora-1.0-turbo', // Hypothetical or beta model for OpenAI video
                prompt: prompt,
                duration: duration
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to generate video from OpenAI');
        }

        return NextResponse.json({ url: data.data[0].url });

    } catch (error) {
        console.error("OpenAI Video Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
