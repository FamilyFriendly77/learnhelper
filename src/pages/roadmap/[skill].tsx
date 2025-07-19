import Layout from '@/app/(components)/Layout';
import { GetServerSidePropsContext } from 'next';
import '../../app/globals.css';
import { getSkillRoadmap } from '../../../utils/postgres';
import {
  RoadmapItemType,
  RoadmapType,
} from '@/app/(ShowDataAndTypes)/RoadmapTypes';
import Roadmap from '@/app/(components)/Roadmap';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { ParsedUrlQuery } from 'querystring';

export default function RoadmapPage({ roadmap }: { roadmap: RoadmapType }) {
  const openChat = async () => {
    console.log('connect to socket');
  };
  const sendMessage = async () => {};
  const closeChat = async () => {};
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <Layout>
      <div className='w-full  grow-1 flex items-center justify-center'>
        <div className='w-full h-fit flex flex-col rounded-4xl bg-[#EBEBEB] mt-36 justify-start items-center'>
          <div className='w-full h-fit pt-12 flex justify-center items-center'>
            <Roadmap Roadmap={roadmap as RoadmapType} />{' '}
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 right-32 w-96 h-fit flex-col transition-all'>
        <div
          className=' w-96 h-16 flex justify-between px-8 items-center text-2xl font-bold text-[#EBEBEB] border-2 border-[#171A21] bg-[#FF1F1F] rounded-t-3xl'
          onClick={() => {
            setChatOpen(!chatOpen);
          }}
        >
          <span>Ask a question</span>
          <div
            onClick={() => {
              if (!chatOpen) {
                openChat();
              }
            }}
          >
            {chatOpen ? (
              <ArrowDown
                color='#EBEBEB'
                size={32}
                className='hover:translate-y-1 active:scale-120 transition-all'
              />
            ) : (
              <ArrowUp
                color='#EBEBEB'
                size={32}
                className='hover:-translate-y-1 active:scale-120 transition-all'
              />
            )}
          </div>
        </div>
        {chatOpen ? (
          <div className='w-full h-112 border-x-2 border-[#171A21] bg-[#EBEBEB] flex-col items-center'>
            <div className='w-full h-[80%] border-b-3'></div>
            <div className='flex flex-row justify-center items-center w-full h-[20%] gap-2 px-4'>
              <input
                type='text'
                className='w-full h-16 bg-[#dfe0e2] overflow-y-scroll border-[#171A21] grow-7 rounded-xl px-6 text-wrap'
              />
              <button className='grow-3 hover:scale-120 transition-all'>
                <ArrowRight
                  size={36}
                  onClick={sendMessage}
                />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
interface Params extends ParsedUrlQuery {
  skill: string;
}
export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
) {
  const { params } = context;
  const skill = params?.skill as unknown as number;
  const roadmap = await getSkillRoadmap(skill);
  roadmap.items = JSON.parse(roadmap.items);
  roadmap.items.forEach((item: RoadmapItemType) => {
    if (!item.quickTips?.length) item.quickTips = null;
  });
  return {
    props: { roadmap: roadmap },
  };
}
