type Props = {
  label: string;
  navigateTo: string;
};
export default function NavbarItem({ label, navigateTo }: Props) {
  return (
    <span
      key={navigateTo}
      className='hover:bg-[#2A2F3C] hover:text-[#EBEBEB] rounded-xl p-2'
    >
      {label}
    </span>
  );
}
