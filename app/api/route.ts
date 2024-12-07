import { NextResponse } from "next/server";
import OpenAI from "openai";

import { persona } from "@/constants/persona";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content: `${persona[body.personaId].prompt}`,
        },
        {
          role: "user",
          content: `My name is ${body.name}, my problem is ${body.problem}`,
        },
      ],
      max_tokens: 400,
    });

    const result = response.choices[0].message.content;
    console.log(body);
    console.log(result);

    return NextResponse.json({ output: result }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API error: ", error);
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}
