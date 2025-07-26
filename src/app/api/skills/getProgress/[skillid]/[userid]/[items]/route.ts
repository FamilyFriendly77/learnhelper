import { NextResponse } from "next/server";
import {
  createRoadmapProgress,
  getRoadmapProgress,
} from "../../../../../../../../utils/postgres";

export async function GET(
  req: Request,
  {
    params,
  }: { params: Promise<{ skillid: number; userid: string; items: number }> },
) {
  const { skillid, userid, items } = await params;
  try {
    let progress = await getRoadmapProgress(skillid, userid);
    if (!progress.length) {
      let generatedProgress = "{";
      for (let i = 0; i < items; i++) {
        generatedProgress += `"${i}" : false`;
        if (i !== items - 1) {
          generatedProgress += ",";
        }
      }
      generatedProgress += "}";
      progress = await createRoadmapProgress(
        userid,
        skillid,
        generatedProgress,
      );
    }
    return NextResponse.json({ progress }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
