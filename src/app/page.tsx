'use client';
import { ArrowRight, Blocks, BookMarkedIcon, Users } from 'lucide-react';
import Card from './(components)/Card';
import WelcomeCard from './(components)/WelcomeCard';
import Roadmap from './(components)/Roadmap';
import { Showcase } from './(ShowDataAndTypes)/showcase';
import Message from './(components)/Message';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//it might be a good idea to make search bar user component and the whole front page a server component, it should not be complicated it can make the site more snappy and overall ipmrove optimazation but it is a task for later
export default function Home() {
  const { data: session } = useSession();
  const [skillExists, setSkillExists] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient();
  const router = useRouter();
  const [submited, setSubmited] = useState(false);
  const [hovers, setHovers] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [skill, setSkill] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const SubmitCreateSkill = async () => {
    try {
      const data = await fetch(`/api/skills/${skill}`, { method: 'POST' });
      const response = await data.json();
      console.log(response);
      console.log(response.skillId);
      router.push(`/roadmap/${response.skillId}`);
      //navigate
    } catch (e) {
      console.log(e);
    }
  };
  const Search = useCallback(async (query: string) => {
    try {
      setSkillExists(false);
      const data = await fetch(`/api/skills/search/${query}`);
      const res = await data.json();
      const filteredResults = res.result.filter((item: { Skill: string }) => {
        if (item.Skill !== query.trimEnd()) {
          return true;
        } else {
          setSkillExists(true);
          return false;
        }
      });
      setSearchResults(filteredResults);
    } catch (e) {
      console.log('Search Error:', e);
      return 0;
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (skill.trim()) {
        Search(skill.trim());
      }
    }, 300); // debounce by 300ms

    return () => clearTimeout(delayDebounce);
  }, [skill, Search]);

  if (session) {
    return (
      <div className='w-full  grow-1 flex items-center justify-center'>
        <div className='w-[60%] flex flex-col justify-center items-center h-fit bg-[#EBEBEB] rounded-3xl'>
          <h1 className='font-bold text-2xl w-full text-center pb-6 pt-8'>
            WHAT DO YOU WANT TO LEARN TODAY?
          </h1>
          <div className='w-full flex justify-center items-start pb-6'>
            <h3 className='font-semibold text-xl pr-2 h-12 justify-center items-center flex'>
              I want to learn
            </h3>
            <div className='flex-col justify-center items-center'>
              <input
                id='SkillInput'
                type='text'
                onFocus={() => {
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  if (!hovers) setShowSuggestions(false);
                }}
                className='p-2 rounded-2xl w-128 h-12 border-2 border-[#171A21]'
                value={skill}
                onChange={(e) => {
                  const value = e.target.value;
                  setSkill(value.toUpperCase());
                }}
              />
              {showSuggestions ? (
                <div
                  className='w-128 flex justify-center items-center absolute'
                  onMouseEnter={() => setHovers(true)}
                  onMouseLeave={() => setHovers(false)}
                >
                  <div className='flex-col justify-center items-center'>
                    {searchResults.map((res: { id: number; Skill: string }) => {
                      return (
                        <div
                          key={res.id}
                          className='border-solid border-x-2 border-b-2 w-120 h-8 text-center flex justify-center content-box items-center font-semibold bg-[#EBEBEB] hover:bg-[#FF1F1F] hover:border-[#171A21] hover:text-[#EBEBEB]'
                          onClick={() => {
                            setSkill(res.Skill);
                            Search(res.Skill);
                            document.getElementById('SkillInput')?.focus();
                          }}
                        >
                          {res.Skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className='pb-8'>
            <button
              className='bg-[#FF1F1F] h-14 w-32 rounded-4xl text-xl py-1 px-2 text-[#EBEBEB] font-semibold'
              onClick={() => {
                if (skillExists) {
                  //naviigate
                } else {
                  if (searchResults.length && !submited) {
                    console.log('suggestions');
                    setSubmited(true);
                    //show popup (We already have something simmilar ready for you, check search suggestions and if anything seems like something you are interested in, if not submit again)
                    return null;
                  } else {
                    console.log('no suggestions');
                    SubmitCreateSkill();
                  }
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
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
            description='Our community of mentors who participate in making your learning experience better every day is rapidly growing.'
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
            description='We will provide guidlines to help you in your journey to learn new skills. Having a set route will boost your success odds.'
          />

          <Card
            //to be changed to another card, rn its placeholder
            title='BECOME A MENTOR IN A TOPIC YOU LOVE'
            icon={
              <Blocks
                color='#EBEBEB'
                size={64}
              />
            }
            //tbc
            description='Help others in their journey by making roadmaps better or answering their questions in our chat. Help them grow like others helped you.'
          />
        </div>
        <div className='w-full h-fit flex justify-center items-center'>
          <Roadmap Roadmap={Showcase} />
        </div>
        {/* Chat showcase  tbm to separate component when I will implement real chat*/}
        <div className='font-bold text-4xl text-[#171A21] mb-8font-bold text-4xl text-[#171A21] mb-16'>
          A Question popped up in your mind while learning? Ask Mentors from
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
