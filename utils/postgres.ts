import postgres from 'postgres';
export async function getSkillsResults({
  SearchQuery,
}: {
  SearchQuery: string;
}) {
  const sql = postgres(process.env.DATABASE_URL || '', { ssl: 'require' });
  const response = await sql`SELECT * FROM public."Skills"
 WHERE "Skill" ILIKE '%' || ${SearchQuery} || '%'`;
  return response;
}
