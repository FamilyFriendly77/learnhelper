import { NextResponse } from "next/server";
import { connectMongo } from "../../../../../../../utils/database";
import UserDB from "../../../../../../../models/User";

await connectMongo();
export async function PATCH(
  req: Request,
  context: { params: Promise<{ email: string }> },
) {
  const { skill } = await req.json();
  let user = null;
  const { email } = await context.params;
  try {
    user = await UserDB.findOne({ email: email });
    user.lastRoadmap = skill;
    user.save();
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
    },
    { status: 200 },
  );
}
