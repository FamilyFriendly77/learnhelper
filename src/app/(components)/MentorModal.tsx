export default function MentorModal({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    <div className=" bg-[#171A21]/75 w-screen h-screen absolute top-0 left-0 z-11 flex justify-center items-center">
      <div className="w-fit h-fit opacity-100 rounded-4xl border-2 p-8 border-[#171A21] bg-[#EBEBEB]">
        {children}
      </div>
    </div>
  );
}
