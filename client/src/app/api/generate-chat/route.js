import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
        });

        const text = completion.choices[0].message.content;

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Chat AI error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
