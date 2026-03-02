import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { prompt, resolution = '1024x1024', style = 'realistic' } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `${style} style, ${prompt}, high resolution, professional quality`,
            n: 1,
            size: resolution,
        });

        const imageUrl = response.data[0].url;

        return NextResponse.json({ url: imageUrl, imageUrl: imageUrl });
    } catch (error) {
        console.error('DALL-E Generation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
