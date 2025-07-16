import NavBar from './Navbar';
import { getSession, SessionProvider } from 'next-auth/react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();
  return (
    <SessionProvider session={session}>
      <div className='bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] min-h-screen w-full text-[#171A21] min-h-screen bg-fixed flex flex-col'>
        <NavBar />
        <div className='grow-1 w-full flex'>{children}</div>
      </div>
    </SessionProvider>
  );
}
