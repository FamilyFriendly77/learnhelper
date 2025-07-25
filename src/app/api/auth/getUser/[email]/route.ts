import { NextResponse } from "next/server";
import UserDB from "../../../../../../models/User";
import { connectMongo } from "../../../../../../utils/database";

export async function GET(
  req: Request,
  context: { params: Promise<{ email: string }> },
) {
  let user = null;
  const { email } = await context.params;
  try {
    await connectMongo();
    user = await UserDB.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
  return NextResponse.json(
    { id: user._id, email: user.email, name: user.name, image: user.image },
    { status: 200 },
  );
}
