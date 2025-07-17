import Xarrow from 'react-xarrows';
import { RoadmapType } from '../(ShowDataAndTypes)/RoadmapTypes';
import RoadmapItem from './RoadmapItem';

type Props = {
  Roadmap: RoadmapType;
};

export default function Roadmap({ Roadmap }: Props) {
  return (
    <div className='w-full h-fit flex flex-col gap-30 mb-48 justify-start items-center'>
      <h1 className='font-bold text-4xl text-[#171A21] mb-8 flex justify-center items-center text-center max-w-[80%]'>
        {Roadmap.description}
      </h1>
      <div className='w-full h-fit flex flex-col gap-30 justify-start items-start'>
        {Roadmap.items.map((item, i) => (
          <div
            key={`Item${i}`}
            className='w-fit h-fit items-start justify-start p-0'
          >
            <RoadmapItem
              Item={item}
              id={`Item${i}`}
            />

            {i < Roadmap.items.length - 1 ? (
              <Xarrow
                path='smooth'
                curveness={1.3}
                startAnchor={'bottom'}
                endAnchor={'top'}
                color='#2A2F3C'
                dashness={true}
                showHead={false}
                start={`Item${i}`}
                end={`Item${i + 1}`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
