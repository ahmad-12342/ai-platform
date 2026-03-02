import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        // Using PicoApps Image Generation API as requested
        const apiUrl = "https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQnBwZ243ZDlxMlZYenE4MjJvMGcxNjlKc2JtQ2dhZWluRmVjaV9ON00zZThzOHptbkEwX251eDVkcTc1TktlajRrbDFuYUFRRjN4UVQwdnludW5jYmNOX2NNYXc9PQ==";

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            return NextResponse.json({
                url: data.imageUrl,
                imageUrl: data.imageUrl
            });
        } else {
            console.error("Image API error:", data);
            return NextResponse.json({ error: data.error || 'Failed to generate image' }, { status: 400 });
        }
    } catch (error) {
        console.error('Image Generation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
