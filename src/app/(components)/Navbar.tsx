import NavbarItem from './NavbarItem';

export default function NavBar() {
  return (
    <div className='w-full h-16 border-b-1 sticky top-0 border-solid z-10 border-[#171A21] text-xl bg-[#EBEBEB] font-semibold text-[#171A21] flex flex-row  justify-between items-center pl-20 pr-8'>
      <h2 className='font-bold text-2xl'>LearnHelper</h2>
      <div className='flex flex-row gap-8'>
        <NavbarItem
          label='Start Learning'
          navigateTo='dashboard'
        />
        <NavbarItem
          label='Contact Us'
          navigateTo='dashboard'
        />
        <NavbarItem
          label='Learn More'
          navigateTo='dashboard'
        />
        <NavbarItem
          label='Sign In'
          navigateTo='dashboard'
        />
      </div>
    </div>
  );
}
