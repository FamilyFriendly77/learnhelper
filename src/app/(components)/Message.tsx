type Props = {
  message: string;
  sentBy: string;
};
export default function Message({ message, sentBy }: Props) {
  return (
    <div
      className={`w-full h-fit flex justify-${
        sentBy === "user" ? "end" : sentBy === "system" ? "center" : "start"
      } items-center pb-2 px-4`}
    >
      <div
        className={`w-fit h-12 rounded-3xl p-2 flex justify-center items-center text-24 font-semibold 
        ${
          sentBy === "user"
            ? "bg-[#FF1F1F] text-[#dfe0e2]"
            : "bg-[#a2aebb] text-[#171A21]"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
