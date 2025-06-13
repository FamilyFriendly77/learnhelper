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
      <body className='bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] w-full text-[#171A21] h-full bg-fixed'>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
