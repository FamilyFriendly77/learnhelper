import { RoadmapType } from '@/app/(ShowDataAndTypes)/RoadmapTypes';
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

export async function getSkillRoadmap(query: string) {
  const sql = postgres(process.env.DATABASE_URL || '', { ssl: 'require' });
  const response =
    await sql`SELECT * FROM public."Roadmaps" WHERE "SkillId" =  || ${query} ||`;
  return response;
}

export async function createSkillRoadmap(query: string, roadmap: RoadmapType) {
  const sql = postgres(process.env.DATABASE_URL || '', { ssl: 'require' });
}
