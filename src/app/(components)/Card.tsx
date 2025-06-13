import { ReactElement } from 'react';

type Props = {
  title: string;
  icon: ReactElement;
  description: string;
};
export default function Card({ title, icon, description }: Props) {
  return (
    <div className='w-80 h-108 border border-solid border-3 shadow-lg rounded-md border-[#171A21] flex flex-col justify-start items-center '>
      <div className='bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] flex justify-center items-center rounded-full w-22 h-22 mt-8 '>
        {icon}
      </div>
      <h2 className='text-xl text-center font-semibold pt-8 pb-6'>{title}</h2>
      <div className='bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] w-[80%] h-1 rounded-full'></div>
      <p className='text-wrap pt-6 text-lg text-center'>{description}</p>
    </div>
  );
}
