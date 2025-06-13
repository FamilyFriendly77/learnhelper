import { BookMarkedIcon, Users } from 'lucide-react';
import Card from './(components)/Card';
import WelcomeCard from './(components)/WelcomeCard';
import Roadmap from './(components)/Roadmap';
import { Showcase } from './(ShowDataAndTypes)/showcase';

export default function Home() {
  return (
    <div className='w-full h-full flex rounded-t-4xl flex-col  bg-fixed justify-center items-center'>
      <div className='w-full h-400 flex flex-col rounded-t-4xl bg-[#EBEBEB] mt-36 justify-center items-center'>
        <WelcomeCard />
        <h1 className='font-bold text-4xl text-[#171A21] mb-8'>
          Why are we the right choice?
        </h1>
        <div className='flex gap-16 mb-32'>
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
        </div>
        <div className='w-full h-200 '>
          <Roadmap Roadmap={Showcase} />
        </div>
      </div>
    </div>
  );
}
