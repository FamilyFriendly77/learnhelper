import { NextResponse } from "next/server";
import { createChatroom, getChatrooms } from "../../../../../../utils/postgres";

export async function GET(
  req: Request,
  context: { params: Promise<{ skill: number; room: string }> },
) {
  const { skill, room } = await context.params;
  try {
    let chats = await getChatrooms(skill);
    if (chats.length === 0) {
      chats = await createChatroom({ room: room, skill: skill });
    }
    return NextResponse.json({ room: chats });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
