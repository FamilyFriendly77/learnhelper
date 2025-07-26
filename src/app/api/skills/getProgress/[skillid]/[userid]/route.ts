export async function GET(
  req: Request,
  { params }: { params: Promise<{ skillid: number; userid: string }> },
) {
  const { skillid, userid } = await params;
}
