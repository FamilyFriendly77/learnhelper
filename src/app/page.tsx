'use client';
import { ArrowRight, Blocks, BookMarkedIcon, Users } from 'lucide-react';
import Card from './(components)/Card';
import WelcomeCard from './(components)/WelcomeCard';
import Roadmap from './(components)/Roadmap';
import { Showcase } from './(ShowDataAndTypes)/showcase';
import Message from './(components)/Message';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Home() {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (session) {
        const data = await fetch(`/api/auth/getUser/${session?.user?.email}`);
        return await data.json();
      }
      return null;
    },
  });

  if (session) {
    return <div>{}</div>;
  }
  return (
    <div className='w-full h-full flex rounded-t-4xl flex-col  bg-fixed justify-center items-center'>
      <div className='w-full h-fit flex flex-col rounded-4xl bg-[#EBEBEB] mt-36 justify-start items-center'>
        <WelcomeCard />
        <h1 className='font-bold text-4xl text-[#171A21] mb-8'>
          Why are we the right choice?
        </h1>
        <div className='flex gap-16 mb-48'>
          <Card
            title='GROWING COMMUNITY OF MENTORS'
            icon={
              <Users
                color='#EBEBEB'
                size={64}
              />
            }
            description='Our community of mentors who participate in making your learning expirience better every day is rapidly growing.'
          />
          <Card
            title='BETTER ORGANIZED, FASTER AND EASIER LEARNING'
            icon={
              <BookMarkedIcon
                color='#EBEBEB'
                size={64}
              />
            }
            //tbc
            description='We will provide guidlines to help you in your jurney to learn new skills. Having a set route will boost your success odds.'
          />

          <Card
            //to be changed to another card, rn its placeholder
            title='BECOME A MENTHOR IN A TOPIC YOU LOVE'
            icon={
              <Blocks
                color='#EBEBEB'
                size={64}
              />
            }
            //tbc
            description='Help others in their journey by making roadmaps better or anwering their questions in our chat. Help them grow like others helped you.'
          />
        </div>
        <div className='w-full h-fit flex justify-center items-center'>
          <Roadmap Roadmap={Showcase} />
        </div>
        {/* Chat showcase  tbm to separate component when I will implement real chat*/}
        <div className='font-bold text-4xl text-[#171A21] mb-8font-bold text-4xl text-[#171A21] mb-16'>
          A Question popped up in your mind while learning? Ask Menthors from
          this topic.
        </div>
        <div className='border-3 rounded-t-3xl border-solid border-[#171A21] h-160 w-120 mb-48 flex flex-col justify-center items-between bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] rounded-t-3xl'>
          <div className='w-full h-fit border-b-2'>
            <h3 className='font-bold text-2xl text-[#171A21] p-2 flex justify-center text-[#EBEBEB] items-center '>
              How to learn a new skill easly?
            </h3>
          </div>
          <div className='flex flex-col justify-end items-center w-full h-full bg-[#EBEBEB]'>
            <Message
              message='I have a question. Can you help me?'
              SentByUser={true}
            />
            <Message
              message='Sure, what can I help you with?'
              SentByUser={false}
            />
          </div>
          <div className='w-full h-48 border-t-2 flex gap-4 justify-center items-center bg-[#EBEBEB]'>
            <div className='h-24 w-[85%] bg-[#dfe0e2] rounded-xl border-1'>
              <p className='p-4'>
                I cant quite get the hang of point 2 in the roadmap...
              </p>
            </div>
            <ArrowRight size={32} />
          </div>
        </div>
      </div>
      <div className='w-full h-64 mt-32 bg-[#EBEBEB] rounded-t-4xl flex justify-center items-center text-[#171A21]'>
        © 2025 Krystian Mikołajczak 2025
      </div>
    </div>
  );
}
