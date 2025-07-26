import { Session } from "next-auth";
import { RoadmapItemType } from "../(ShowDataAndTypes)/RoadmapTypes";
import { getSkillRoadmap } from "../../../utils/postgres";
import Roadmap from "./Roadmap";

export default async function RoadmapServer({
  skill,
  session,
}: {
  skill: number;
  session: Session;
}) {
  const roadmap = await getSkillRoadmap(skill);
  const Items = JSON.parse(roadmap.items);
  const items = Items.map((item: RoadmapItemType) => ({
    ...item,
    quickTips: item.quickTips?.length ? item.quickTips : null,
  }));
  return (
    <Roadmap
      skillName={roadmap.skillname}
      items={items}
      description={roadmap.description}
    />
  );
}
