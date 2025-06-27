type Props = {
  message: string;
  SentByUser: boolean;
};
export default function Message({ message, SentByUser }: Props) {
  return (
    <div
      className={`w-full h-fit flex justify-${
        SentByUser ? 'end' : 'start'
      } items-center pb-2 px-4`}
    >
      <div
        className={`w-fit h-12 rounded-3xl p-2 flex justify-center items-center text-24 font-semibold 
        ${
          SentByUser
            ? 'bg-[#FF1F1F] text-[#dfe0e2]'
            : 'bg-[#a2aebb] text-[#171A21]'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
