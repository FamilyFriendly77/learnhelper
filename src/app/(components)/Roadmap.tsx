"use client";
import Xarrow from "react-xarrows";
import { RoadmapItemType } from "../(ShowDataAndTypes)/RoadmapTypes";
import RoadmapItem from "./RoadmapItem";
import { Session } from "next-auth";
import { UserQuery } from "../../../utils/queryFunctions";
import { QueryClient, useQuery } from "@tanstack/react-query";

type Props = {
  items: RoadmapItemType[];
  description: string;
  skillName: string;
  session: Session;
};

export default function Roadmap({
  items,
  description,
  skillName,
  session,
}: Props) {
  const queryClient = new QueryClient();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => UserQuery(session),
  });
  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const data = await fetch("");
      return data.json();
    },
  });

  return (
    <div className="w-full h-fit flex flex-col gap-30 mb-48 justify-start items-center">
      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-4xl text-[#171A21] flex justify-center items-center text-center max-w-[80%]">
          {skillName}
        </h1>
        <h3 className="text-2xl w-[80%] h-fit text-center font-semibold">
          {description}
        </h3>
      </div>
      <div className="w-full h-fit flex flex-col gap-30 justify-start items-start">
        {items.map((item: RoadmapItemType, i: number) => (
          <div
            key={`Item${i}`}
            className="w-fit h-fit items-start justify-start p-0"
          >
            <RoadmapItem Item={item} id={`Item${i}`} />

            {i < items.length - 1 ? (
              <Xarrow
                path="smooth"
                curveness={1.3}
                startAnchor={"bottom"}
                endAnchor={"top"}
                color="#2A2F3C"
                dashness={true}
                showHead={false}
                start={`Item${i}`}
                end={`Item${i + 1}`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
