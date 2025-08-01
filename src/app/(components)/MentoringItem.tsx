"use client";
import { useEffect, useState } from "react";
import { RoadmapType } from "../(ShowDataAndTypes)/RoadmapTypes";
import MentorChat from "./MentorChat";
import { UserType } from "../../../utils/types";
import MentorModal from "./MentorModal";
export default function MentoringItem({
  skill,
  userData,
}: {
  skill: number;
  userData: UserType;
}) {
  const [roadmap, setRoadmap] = useState<RoadmapType>();
  const [hover, setHover] = useState<boolean>(false);
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`/api/skills/${skill}`);
        const data = await response.json();
        console.log(data);
        setRoadmap({
          description: data.description,
          skillName: data.skillname,
          items: JSON.parse(data.items),
        });
      } catch (e) {
        console.error("Fetching data error: ", e);
      }
    };
    fetchRoadmap();
  }, []);
  return (
    <>
      <div
        className="flex flex-col w-240 h-24 justify-center items-start rounded-2xl p-2  border-3 border-[#171A21]"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <div className="flex flex-row w-full h-full grow-1 p-0 justify-between items-center text-[#EBEBEB] text-xl font-bold">
            <button className="bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] rounded-2xl h-full w-[45%] overflow-clip flex items-center justify-center">
              Edit!
            </button>
            <div className="w-0.5 h-full bg-[#171A21] mx-2" />
            <button className="bg-[#FF1F1F] rounded-2xl overflow-clip h-full w-[45%] flex items-center justify-center">
              Answer to messages!
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-bold text-2xl">{roadmap?.skillName}</h1>
            <h3 className="font-semibold text-xl">{roadmap?.description}</h3>
          </>
        )}
      </div>
      <MentorModal>
        <MentorChat skillId={skill} userData={userData} />
      </MentorModal>
    </>
  );
}
