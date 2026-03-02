import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { prompt, resolution = '1024x1024', style = 'realistic' } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
        }

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: `${style} style, ${prompt}, high resolution, professional quality`,
                n: 1,
                size: resolution,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI error:", data);
            return NextResponse.json({ error: data.error?.message || 'Failed to generate image' }, { status: response.status });
        }

        const imageUrl = data.data[0].url;

        return NextResponse.json({ url: imageUrl, imageUrl: imageUrl });
    } catch (error) {
        console.error('DALL-E Generation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
