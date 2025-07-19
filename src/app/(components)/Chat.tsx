'use client';

import { QueryClient, useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { Session } from 'next-auth';
import { useState } from 'react';
import { UserQuery } from '../../../utils/queryFunctions';

export default function Chat({ session }: { session: Session | null }) {
  const [chatOpen, setChatOpen] = useState(false);
  const queryClient = new QueryClient();
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserQuery(session),
  });

  return (
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
              <ArrowRight size={36} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
