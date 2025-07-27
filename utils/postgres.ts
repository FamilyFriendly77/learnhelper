import { RoadmapType } from "@/app/(ShowDataAndTypes)/RoadmapTypes";
import postgres from "postgres";
export const sql = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
export async function getSkillsResults(SearchQuery: string) {
  const response = await sql`SELECT * FROM public."Skills"
 WHERE "Skill" ILIKE '%' || ${SearchQuery} || '%'`;
  return response;
}

export async function doesSkillExist(SearchQuery: string) {
  const response = await sql`SELECT * FROM public."Skills"
 WHERE "Skill" = ${SearchQuery}`;
  return response[0];
}

export async function createSkillResult(query: string) {
  const response =
    await sql`INSERT INTO public."Skills"("Skill") VALUES(${query}) RETURNING id`;
  return response[0].id;
}

export async function getSkillRoadmap(query: number) {
  const response =
    await sql`SELECT * FROM public."Roadmaps" WHERE "skillid" = ${query}`;
  return response[0];
}
//at the end of a day I decided to leave it as it is,
//  the reason for that is i don't really need to query by items, evolve a schema or do anything that requires normalizing this data,
//  it's complex and by storing it in json I don't take a risk of mixing up the order without additional fiields
export async function createSkillRoadmap(
  query: string,
  roadmap: RoadmapType,
  skillId: number,
) {
  const response =
    await sql`INSERT INTO public."Roadmaps"(skillname, description, items, skillid) VALUES(${
      roadmap.skillName
    }, ${roadmap.description}, ${JSON.stringify(roadmap.items)}, ${skillId}) `;
  return response;
}
export async function createRoadmapProgress(
  userid: string,
  skillid: number,
  generatedProgress: string,
) {
  const response =
    await sql`INSERT INTO public."RoadmapsProgress"(skillid, userid, progress) VALUES(${
      skillid
    }, ${userid}, ${generatedProgress}) RETURNING *`;
  return response[0];
}

export async function getRoadmapProgress(skillid: number, userid: string) {
  const response =
    await sql`SELECT * FROM public."RoadmapsProgress" WHERE skillid = ${skillid} AND userid = ${userid}`;
  return response;
}
export async function updateRoadmapProgress(
  skillid: number,
  userid: string,
  progress: string,
) {
  const response =
    await sql`UPDATE public."RoadmapsProgress" SET progress = ${progress} WHERE userid = ${userid} AND skillid = ${skillid} RETURNING *`;
  return response;
}
