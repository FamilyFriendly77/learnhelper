import type { Metadata } from 'next';
import './globals.css';
import NavBar from './(components)/Navbar';
export const metadata: Metadata = {
  title: 'LearnHelper',
  description: 'Learn new skills faster and easier with our help!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      title='LearnHelper'
    >
      <body className='bg-[#EBEBEB] w-full text-[#0F0A0A] h-full'>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
