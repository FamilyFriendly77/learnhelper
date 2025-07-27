import { NextResponse } from "next/server";
import {
  createRoadmapProgress,
  getRoadmapProgress,
  updateRoadmapProgress,
} from "../../../../../../../utils/postgres";
import type { NextApiRequest, NextApiResponse } from "next";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ skillid: number; userid: string }> },
) {
  const { skillid, userid } = await params;
  try {
    const progress = await getRoadmapProgress(skillid, userid);
    return NextResponse.json({ progress }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
export async function POST(
  req: Request,
  { params }: { params: Promise<{ skillid: number; userid: string }> },
) {
  const { skillid, userid } = await params;
  const { items } = await req.json();
  const generatedProgress = {};
  for (let i = 0; i < items; i++) {
    generatedProgress[i as unknown as string] = false;
  }
  try {
    const progress = await createRoadmapProgress(
      userid,
      skillid,
      JSON.stringify(generatedProgress),
    );
    return NextResponse.json({ progress }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ skillid: number; userid: string }> },
) {
  const { skillid, userid } = await params;
  const progress = JSON.stringify(req.body);
  try {
    await updateRoadmapProgress(skillid, userid, progress);
    JSON.parse(progress);
    return NextResponse.json(progress, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
