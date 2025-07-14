import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Instructions } from '../../../../../openaiInstructions';

export async function GET(
  req: Request,
  { params }: { params: { skill: string } }
) {
  let result = null;
  const { skill } = await params;
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
  return NextResponse.json({ result }, { status: 200 });
}
//openai creation of roadmap and sending it to postgres
export async function POST(
  req: Request,
  { params }: { params: { skill: string } }
) {
  let roadmap = null;
  try {
    const { skill } = await params;
    const client = new OpenAI();
    const res = await client.responses.create({
      model: 'o4-mini-2025-04-16',
      instructions: Instructions,
      input: `I want to learn ${skill}, generate a roadmap to help me to achieve the goal and then become proficient in it and expand my knowlage`,
    });
    roadmap = JSON.parse(await res.output_text);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
  return NextResponse.json({ roadmap }, { status: 200 });
}
