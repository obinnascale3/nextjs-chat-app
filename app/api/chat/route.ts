import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
    })

    const reply = response.choices[0].message.content;
    return NextResponse.json(reply);
  } catch (error) {
    console.error('Error fetching OpenAI API:', error);
    return NextResponse.json({ error: 'Error fetching OpenAI API' }, { status: 500 });
  }
}
