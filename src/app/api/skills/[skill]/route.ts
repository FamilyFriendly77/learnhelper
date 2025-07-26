import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { Instructions } from "../../../../../openaiInstructions";
import {
  createSkillResult,
  createSkillRoadmap,
  doesSkillExist,
} from "../../../../../utils/postgres";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ skill: string }> },
) {
  const result = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { skill } = await params;
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
  return NextResponse.json({ result }, { status: 200 });
}
//openai creation of roadmap and sending it to postgres
export async function POST(
  req: Request,
  { params }: { params: Promise<{ skill: string }> },
) {
  let roadmap = null;
  let id = null;
  const { skill } = await params;
  try {
    const doesExist = await doesSkillExist(skill);
    if (doesExist) {
      id = doesExist.id;
    } else {
      const client = new OpenAI();
      console.log("++++");
      const res = await client.responses.create({
        model: "o4-mini-2025-04-16",
        instructions: Instructions,
        input: `I want to learn ${skill}, generate a roadmap to help me to achieve the goal and then become proficient in it and expand my knowlage`,
      });
      roadmap = JSON.parse(await res.output_text);
      roadmap = roadmap[0];
      id = await createSkillResult(skill);
      createSkillRoadmap(skill, roadmap, id);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
  return NextResponse.json({ skillId: id }, { status: 200 });
}
