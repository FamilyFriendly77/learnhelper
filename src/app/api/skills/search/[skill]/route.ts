import { NextResponse } from 'next/server';
import { getSkillsResults } from '../../../../../../utils/postgres';

export async function GET(
  req: Request,
  { params }: { params: { skill: string } }
) {
  let result = null;
  const { skill } = await params;
  try {
    result = await getSkillsResults({ SearchQuery: skill });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
  return NextResponse.json({ result }, { status: 200 });
}
