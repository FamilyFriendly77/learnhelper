import { ChevronDown, CircleCheck } from 'lucide-react';
import { RoadmapItemType } from '../(ShowDataAndTypes)/RoadmapTypes';

type Props = {
  Item: RoadmapItemType;
  id: string;
};
export default function RoadmapItem({ Item, id }: Props) {
  return (
    <div
      className='w-fit h-fit text-wrap flex flex-row gap-4 justify-start p-4 items-center '
      id={id}
    >
      <CircleCheck size={48} />
      <div className='flex-col w-min border-2 p-4 min-w-200 rounded-xl pl-8 pr-8'>
        <div className='flex flex-col gap-2 justify-start items-start'>
          <h1 className='text-3xl font-bold text-nowrap w-fit'>
            {Item.content}
          </h1>
          <p className='text-lg text-wrap'>{Item.description}</p>
        </div>
        <button className='flex flex-row gap-1 items-center justify-center'>
          <span className='text-lg'>See more</span>
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}
