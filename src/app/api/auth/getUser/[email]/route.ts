import { NextResponse } from 'next/server';
import UserDB from '../../../../../../models/User';
import { connectMongo } from '../../../../../../utils/database';

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  let user = null;
  const { email } = await params;
  try {
    await connectMongo();
    user = await UserDB.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
  return NextResponse.json(
    { email: user.email, name: user.name, image: user.image },
    { status: 200 }
  );
}
