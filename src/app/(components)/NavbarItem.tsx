type Props = {
  label: string;
  Click: () => void;
};
export default function NavbarItem({ label, Click }: Props) {
  return (
    <button
      key={label}
      className='hover:bg-[#2A2F3C] hover:text-[#EBEBEB] rounded-xl p-2'
      onClick={Click}
    >
      {label}
    </button>
  );
}
