import type { Metadata } from 'next';
import './globals.css';
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
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
