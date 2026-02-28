import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(req) {
    try {
        const body = await req.json();
        // Forward to Express backend which handles credits, saving & tracking
        const response = await fetch(`${BACKEND_URL}/api/generate/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.error || data.message }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Generate image proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
