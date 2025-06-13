'use client';
import Xarrow from 'react-xarrows';
import { RoadmapType } from '../(ShowDataAndTypes)/RoadmapTypes';
import RoadmapItem from './RoadmapItem';

type Props = {
  Roadmap: RoadmapType;
};

export default function Roadmap({ Roadmap }: Props) {
  return (
    <div className='w-full h-200 flex flex-col gap-30'>
      <h1>{Roadmap.description}</h1>
      {Roadmap.items.map((item, i) => (
        <>
          <RoadmapItem
            Item={item}
            key={i}
            id={`Item${i}`}
          />

          {i < Roadmap.items.length - 1 ? (
            <Xarrow
              start={`Item${i}`}
              end={`Item${i + 1}`}
            />
          ) : null}
        </>
      ))}
    </div>
  );
}
