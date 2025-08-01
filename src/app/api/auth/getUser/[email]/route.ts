import { NextResponse } from "next/server";
import UserDB from "../../../../../../models/User";
import { connectMongo } from "../../../../../../utils/database";

await connectMongo();
export async function GET(
  req: Request,
  context: { params: Promise<{ email: string }> },
) {
  let user = null;
  const { email } = await context.params;
  try {
    user = await UserDB.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
  return NextResponse.json(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      lastRoadmap: user.lastRoadmap,
      image: user.image,
      mentoring: user.mentoring,
    },
    { status: 200 },
  );
}
