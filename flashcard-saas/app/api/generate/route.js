import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

// Define the system prompt for generating flashcards
const systemPrompt = `
You are a flashcard creator. Take the following text and create multiple flashcards from it. Ensure exactly 10 flashcards.
Both front and back should be one sentence long.
Return the results in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  try {
    const requestData = await req.json();
    const text = requestData.text;

    // Use the Gemini Pro API key from environment variables
    const geminiProApiKey = "";

    // Call Gemini Pro using the API key
    const response = await fetch('https://api.geminipro.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${geminiProApiKey}`,
      },
      body: JSON.stringify({
        prompt: systemPrompt,
        text: text,
        model: 'gemini-pro',
      }),
    });

    const result = await response.json();

    // Assuming the response contains the flashcards in the expected format
    const flashcards = result.flashcards;

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
