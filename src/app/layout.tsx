import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./(components)/Navbar";

import SessionProvider from "./(components)/SessionProvider";
import { getServerSession } from "next-auth";
import Providers from "./providers";
export const metadata: Metadata = {
  title: "LearnHelper",
  description: "Learn new skills faster and easier with our help!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" title="LearnHelper">
      <body className="bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] w-full text-[#171A21] min-h-screen bg-fixed flex flex-col">
        <Providers>
          <SessionProvider session={session}>
            <NavBar />
            <div className="grow-1 w-full flex">{children}</div>
            <div className="w-full h-18 bg-[#EBEBEB] flex justify-center items-center mt-16 rounded-t-3xl ">
              © Krystian Mikołajczak 2025
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
