"use client";
import Xarrow from "react-xarrows";
import { RoadmapItemType } from "../(ShowDataAndTypes)/RoadmapTypes";
import RoadmapItem from "./RoadmapItem";
import { Session } from "next-auth";
import { UserQuery } from "../../../utils/queryFunctions";
import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";

type Props = {
  items: RoadmapItemType[];
  description: string;
  skillName: string;
  session: Session;
  skill: number;
};

export default function Roadmap({
  items,
  description,
  skillName,
  session,
  skill,
}: Props) {
  const queryClient = new QueryClient();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => UserQuery(session),
  });
  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      let data = await fetch(`/api/skills/progress/${skill}/${userData.id}`);
      let progress = await data.json();
      if (!progress.lenght) {
        data = await fetch(`/api/skills/progress/${skill}/${userData.id}/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ items: items.length }),
        });
        progress = await data.json();
      }
      return JSON.parse(progress.progress.progress);
    },
  });
  const { mutate: editProgress } = useMutation({
    mutationKey: ["progress"],
    mutationFn: async () => {
      return await fetch(`/api/skills/progress/${skill}/${userData.id}`, {
        method: "PATCH",
        body: JSON.stringify(progress),
      });
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(["progress"], () => result);
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
            <RoadmapItem progress={false} Item={item} id={`Item${i}`} />

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
