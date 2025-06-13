import { Users } from 'lucide-react';
import Card from './(components)/Card';
import WelcomeCard from './(components)/WelcomeCard';

export default function Home() {
  return (
    <div className='w-full h-full flex rounded-t-4xl flex-col  bg-fixed justify-center items-center'>
      <div className='w-full h-256 flex flex-col rounded-t-4xl bg-[#EBEBEB] mt-36 justify-center items-center'>
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
        </div>
      </div>
    </div>
  );
}
