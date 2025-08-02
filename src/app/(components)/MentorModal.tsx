export default function MentorModal({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    <div className=" bg-[#171A21]/75 w-screen h-screen absolute top-0 left-0 z-11 flex justify-center items-center">
      <div className=" opacity-100 rounded-4xl overflow-clip border-2 border-[#171A21] bg-[#EBEBEB]">
        {children}
      </div>
    </div>
  );
}
