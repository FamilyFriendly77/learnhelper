import { RoadmapItemType } from '../(ShowDataAndTypes)/RoadmapTypes';

type Props = {
  Item: RoadmapItemType;
  id: string;
};
export default function RoadmapItem({ Item, id }: Props) {
  return (
    <div
      className='w-full flex flex-col gap-2 justify-center items-center'
      id={id}
    >
      <h1 className='text-xl font-bold'>{Item.content}</h1>
      <p>{Item.description}</p>
    </div>
  );
}
