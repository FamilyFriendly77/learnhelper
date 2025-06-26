import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
} from 'lucide-react';
import { RoadmapItemType } from '../(ShowDataAndTypes)/RoadmapTypes';
import { useState } from 'react';

type Props = {
  Item: RoadmapItemType;
  id: string;
};
export default function RoadmapItem({ Item, id }: Props) {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  return (
    <div className='h-fit w-full flex flex-row'>
      <div
        className='w-full h-fit text-wrap flex flex-row gap-16 justify-between p-4 items-center '
        id={id}
      >
        <div className='flex flex-row justify-start w-fit h-fit items-center gap-4'>
          <CircleCheck size={48} />
          <div className='flex-col w-min border-2 p-4 min-w-200 rounded-xl pl-8 pr-8'>
            <div className='flex flex-col gap-2 justify-start items-start'>
              <h1 className='text-3xl font-bold text-nowrap w-fit'>
                {Item.content}
              </h1>
              <p className='text-lg text-wrap'>{Item.description}</p>
            </div>
            <button
              onClick={() => setIsUnwrapped(isUnwrapped ? false : true)}
              className='flex flex-row gap-1 hover:animate-bounce p-0.5 border-transparent border-b-1 hover:border-[#171A21] items-center justify-center transition-all delay-100 duration-500 '
            >
              <span className='text-lg '>See more</span>
              <ChevronDown
                size={20}
                className={`transition-all ${isUnwrapped ? '' : '-rotate-90'}`}
              />
            </button>
            {isUnwrapped ? (
              <div className='pt-4'>
                <p>References:</p>
              </div>
            ) : null}
          </div>
        </div>
        {Item.quickTips ? (
          <div className='w-80 h-60  bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] flex rounded-lg justify-center items-center mr-6'>
            <div className='w-77.5 h-57.5 bg-[#EBEBEB] rounded-sm flex flex-col justify-between items-center'>
              <h1 className=' w-full text-center p-2 text-2xl font-bold bg-gradient-to-r from-[#00A1E0] to-[#0CAC64] bg-clip-text text-transparent'>
                Quick Tip
              </h1>
              <div className='flex flex-row justify-center items-center'>
                <button
                  onClick={() =>
                    Item.quickTips
                      ? tipIndex > 0
                        ? setTipIndex(tipIndex - 1)
                        : null
                      : null
                  }
                >
                  <ChevronLeft
                    size={20}
                    className='p-0.5'
                  />
                </button>
                <p>{Item.quickTips[tipIndex]}</p>
                <button
                  onClick={() =>
                    Item.quickTips
                      ? tipIndex < Item.quickTips.length - 1
                        ? setTipIndex(tipIndex + 1)
                        : null
                      : null
                  }
                >
                  <ChevronRight
                    size={20}
                    className='p-0.5'
                  />
                </button>
              </div>
              <div className='flex flex-row justify-center items-center gap-1 pb-4'>
                {Item.quickTips?.map((tip, i) => {
                  return (
                    <div
                      key={i}
                      className={`bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] rounded-full ${
                        tipIndex == i ? 'size-2.5' : 'size-2'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
