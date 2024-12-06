import { NextResponse } from "next/server";
import OpenAI from "openai";

import { persona } from "@/constants/persona";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const runPrompt = async (name: string, problem: string, personaId: number) => {
  const prompt = `
    My name is ${name}, my problem is ${problem}.
  `;
};

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
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
    max_tokens: 200,
  });

  const result = response.choices[0].message.content;
  console.log(body);
  console.log(result);

  return NextResponse.json({ output: result }, { status: 200 });
}
