import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        // Using PicoApps Emoji Generation API and specific model version as requested
        const apiUrl = "https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQnBwaEQyVW85VlNrZ2VzX29Od29wd3A2bVc5dnd1RDB5ZVZpWmEtVTJMQk94ZExocGxRaC05VHNlMnRvMEtUYUFpUWxmNFJBZG9pa1VGNHRxV3hBR3dUUHpiZ1E9PQ==";

        const emojiPrompt = "A TOK emoji of a " + prompt;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: emojiPrompt,
                replicateModelVersion: "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e"
            }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            return NextResponse.json({
                imageUrl: data.imageUrl,
                url: data.imageUrl
            });
        } else {
            console.error("Emoji API error:", data);
            return NextResponse.json({ error: data.error || 'Failed to generate emoji' }, { status: 400 });
        }
    } catch (error) {
        console.error('Emoji Generation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
