import { NextResponse } from "next/server";
import { getChatrooms } from "../../../../../../utils/postgres";

export async function GET(
  req: Request,
  context: { params: Promise<{ skill: number }> },
) {
  const { skill } = await context.params;
  try {
    const chats = await getChatrooms(skill);
    return NextResponse.json({ room: chats });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
