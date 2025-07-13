import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { skill: string } }
) {
  let result = null;
  const { skill } = await params;
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
  return NextResponse.json({ result }, { status: 200 });
}
//openai creation of roadmap and sending it to postgres
export async function POST(
  req: Request,
  { params }: { params: { skill: string } }
) {
  let result = null;
  const { skill } = await params;
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
  return NextResponse.json({ result }, { status: 200 });
}
