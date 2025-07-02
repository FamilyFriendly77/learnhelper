'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import NavbarItem from './NavbarItem';
function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <NavbarItem
        label={'Sign Out'}
        Click={() => {
          signOut();
        }}
      />
    );
  }
  return (
    <NavbarItem
      label={'Sign In'}
      Click={() => {
        signIn();
      }}
    />
  );
}

export default function NavBar() {
  return (
    <div className='w-full h-16 border-b-1 sticky top-0 border-solid z-10 border-[#171A21] text-xl bg-[#EBEBEB] font-semibold text-[#171A21] flex flex-row  justify-between items-center pl-20 pr-8'>
      <h2 className='font-bold text-2xl'>LearnHelper</h2>
      <div className='flex flex-row gap-8'>
        <NavbarItem
          label='Start Learning'
          Click={() => {}}
        />
        <NavbarItem
          label='Contact Us'
          Click={() => {}}
        />
        <NavbarItem
          label='Learn More'
          Click={() => {}}
        />
        <AuthButton />
      </div>
    </div>
  );
}
