import Layout from '@/app/(components)/Layout';
import { GetServerSidePropsContext } from 'next';
import '../../app/globals.css';
import { getSkillRoadmap } from '../../../utils/postgres';
import {
  RoadmapItemType,
  RoadmapType,
} from '@/app/(ShowDataAndTypes)/RoadmapTypes';
import Roadmap from '@/app/(components)/Roadmap';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function RoadmapPage({ roadmap }: { roadmap: RoadmapType }) {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <Layout>
      <div className='w-full  grow-1 flex items-center justify-center'>
        <div className='w-full h-fit flex flex-col rounded-4xl bg-[#EBEBEB] mt-36 justify-start items-center'>
          <div className='w-full h-fit pt-12 flex justify-center items-center'>
            <Roadmap Roadmap={roadmap as RoadmapType} />
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 right-32 w-96 h-fit flex-col'>
        <div
          className=' w-96 h-16 flex justify-between px-8 items-center text-2xl font-bold text-[#EBEBEB] bg-[#FF1F1F] rounded-t-3xl'
          onClick={() => {
            setChatOpen(!chatOpen);
          }}
        >
          <span>Ask a question</span>
          {chatOpen ? (
            <ArrowDown
              color='#EBEBEB'
              size={32}
            />
          ) : (
            <ArrowUp
              className=''
              color='#EBEBEB'
              size={32}
            />
          )}
        </div>
        {chatOpen ? <div className='w-full h-96 border-1'></div> : null}
      </div>
    </Layout>
  );
}
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { skill } = params;
  const roadmap = await getSkillRoadmap(skill);
  roadmap.items = JSON.parse(roadmap.items);
  roadmap.items.forEach((item: RoadmapItemType) => {
    if (!item.quickTips?.length) item.quickTips = null;
  });
  return {
    props: { roadmap: roadmap },
  };
}
