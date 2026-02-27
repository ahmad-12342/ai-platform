import { NextResponse } from 'next/server';
import { OPENAI_API_KEY } from '@/lib/apiKey';

export async function POST(req) {
    try {
        const { prompt, resolution } = await req.json();

        // Convert common resolutions to DALL-E 3 supported formats
        // Standard DALL-E 3 sizes: 1024x1024, 1024x1792, 1792x1024
        let size = '1024x1024';
        if (resolution === '1920x1080') size = '1792x1024'; // landscape approximation
        if (resolution === '1080x1920') size = '1024x1792'; // portrait approximation
        // Default to 1024x1024 for 512x512

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: prompt,
                n: 1,
                size: size
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to generate image from OpenAI');
        }

        return NextResponse.json({ url: data.data[0].url });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
