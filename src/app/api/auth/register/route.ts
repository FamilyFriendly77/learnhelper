import bcrypt from 'bcrypt';
import User from '../../../../../models/User';
import { connectMongo } from '../../../../../utils/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { email, name, password } = await req.json();
    const salt = await bcrypt.genSalt(10);
    const passwd = await bcrypt.hash(password, salt);
    await User.create({
      name: name,
      email: email,
      password: passwd,
      salt: salt,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' });
  }
  return NextResponse.json({ message: 'Registered new user' });
}
