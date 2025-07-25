import Chat from "@/app/(components)/Chat";
import RoadmapServer from "@/app/(components)/RoadmapServer";
import { getServerSession } from "next-auth";
interface Params {
  params: Promise<{ skill: number }>;
}

export default async function RoadmapPage({ params }: Params) {
  const session = await getServerSession();
  const { skill } = await params;
  if (session)
    return (
      <div className="w-full  grow-1 flex items-center justify-center">
        <div className="w-full h-fit flex flex-col rounded-4xl bg-[#EBEBEB] mt-36 justify-start items-center">
          <div className="w-full h-fit pt-12 flex justify-center items-center">
            <RoadmapServer skill={skill} />
            <Chat session={session} SkillId={skill} />
          </div>
        </div>
      </div>
    );
  else return null;
}
