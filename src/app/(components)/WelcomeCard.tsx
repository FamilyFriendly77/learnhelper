export default function WelcomeCard() {
  return (
    <div className=' flex w-full h-128 mt-16 mb-16 flex-col items-center justify-center'>
      <h1 className='font-bold text-4xl '>Do you want to learn a new skill?</h1>
      <h3 className='font-semibold text-3xl mt-2 '>
        LET US HELP YOU WITH THAT
      </h3>
      <button className='mt-8 bg-[#FF1F1F] text-[#EBEBEB] p-3 rounded-full font-bold '>
        Start Learning now!
      </button>
    </div>
  );
}
