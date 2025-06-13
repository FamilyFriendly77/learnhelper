export type RoadmapType = {
  skillName: string;
  description: string;
  items: RoadmapItemType[];
};
export type RoadmapItemType = {
  content: string;
  description: string;
  quickTips: string[] | null;
  references: Reference[] | null;
};
export type Reference = {
  title: string;
  type: string;
  url: string;
};
