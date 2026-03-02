import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "user", content: prompt },
                ],
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI Chat error:", data);
            return NextResponse.json({ error: data.error?.message || 'Chat AI failed' }, { status: response.status });
        }

        const text = data.choices[0].message.content;

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Chat AI error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
