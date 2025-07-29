"use client";
import Xarrow from "react-xarrows";
import { RoadmapItemType } from "../(ShowDataAndTypes)/RoadmapTypes";
import RoadmapItem from "./RoadmapItem";
import { Session } from "next-auth";
import { UserQuery } from "../../../utils/queryFunctions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { isPending: userPending, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => UserQuery(session),
  });
  const { isPending: progressPending, data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const data = await fetch(`/api/skills/progress/${skill}/${userData.id}`);
      let progress = await data.json();
      if (!progress.progress) {
        const newData = await fetch(
          `/api/skills/progress/${skill}/${userData.id}/`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ items: items.length }),
          },
        );
        progress = await newData.json();
      }
      return progress.progress.progress;
    },
  });
  const mutation = useMutation({
    mutationKey: ["progress"],
    mutationFn: async (index: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const newProgress = progress.slice();
      newProgress[index] = !progress[index];
      queryClient.setQueryData(["progress"], newProgress);
      const response = await fetch(
        `/api/skills/progress/${skill}/${userData.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress: newProgress }),
        },
      );

      const result = await response.json();
      return result.progress;
    },
  });
  if (progressPending || userPending) {
    return <div> Loading...</div>;
  }
  return (
    <div className="w-full h-fit flex flex-col gap-30 mb-48 justify-start items-center">
      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="font-bold text-4xl text-[#171A21] flex justify-center items-center text-center max-w-[80%]">
          {skillName}
        </h1>
        <h3
          className="text-2xl w-[80%] h-fit text-center font-semibold"
          onClick={() => console.log(progress)}
        >
          {description}
        </h3>
      </div>
      <div className="w-full h-fit flex flex-col gap-30 justify-start items-start">
        {items.map((item: RoadmapItemType, i: number) => (
          <div
            key={`Item${i}`}
            className="w-fit h-fit items-start justify-start p-0"
          >
            <RoadmapItem
              progress={progress[i]}
              Item={item}
              id={{ index: i, id: `Item${i}` }}
              onCheck={mutation.mutate}
            />

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
