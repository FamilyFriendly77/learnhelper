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
//in future it should idealy be separate tables for quick tips and items but for now it will do, yes i know its wrong but im tired and screw it, it works and for now it is not that bad
//ye ye i will do it tomorrow
export async function createSkillRoadmap(
  query: string,
  roadmap: RoadmapType,
  skillId: number
) {
  const sql = postgres(process.env.DATABASE_URL || '', { ssl: 'require' });
  const response =
    await sql`INSERT INTO public."Roadmaps"(skillname, description, items, skillid) VALUES(${
      roadmap.skillName
    }, ${roadmap.description}, ${JSON.stringify(roadmap.items)}, ${skillId}) `;
  console.log(response);
  return response;
}
