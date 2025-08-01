"use client";
import { useQuery } from "@tanstack/react-query";
import { UserQuery } from "../../../utils/queryFunctions";
import { useSession } from "next-auth/react";
import MentoringItem from "../(components)/MentoringItem";

export default function Mentor() {
  const { data: session } = useSession();
  const { data: userData, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => UserQuery(session),
  });
  if (isPending) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="w-full h-full rounded-3xl bg-[#EBEBEB] flex flex-col justify-center items-center mt-16 pt-16">
        <h1 className="text-3xl font-bold flex jusfity-center items-center">
          Mentoring
        </h1>
        <div>
          {userData.mentoring.map((item: number) => {
            return (
              <MentoringItem
                key={`mentoringItem${item}`}
                skill={item}
                userData={userData}
              />
            );
          })}
        </div>
      </div>
    );
}
