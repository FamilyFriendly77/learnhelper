import Layout from '@/app/(components)/Layout';
import { GetServerSidePropsContext } from 'next';
import '../../app/globals.css';
import { getSkillRoadmap } from '../../../utils/postgres';
import { RoadmapType } from '@/app/(ShowDataAndTypes)/RoadmapTypes';
import Roadmap from '@/app/(components)/Roadmap';

export default function RoadmapPage({ roadmap }: { roadmap: RoadmapType }) {
  console.log(roadmap);
  return (
    <Layout>
      <div className='w-full  grow-1 flex items-center justify-center'>
        <div className='w-full h-fit flex flex-col rounded-4xl bg-[#EBEBEB] mt-36 justify-start items-center'>
          <Roadmap Roadmap={roadmap as RoadmapType} />
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({
  res,
  params,
}: GetServerSidePropsContext) {
  const { skill } = params;
  const roadmap = await getSkillRoadmap(skill);
  roadmap.items = JSON.parse(roadmap.items);
  roadmap.items.forEach((item) => {
    if (!item.quickTips.length) item.quickTips = null;
  });
  return {
    props: { roadmap: roadmap },
  };
}
