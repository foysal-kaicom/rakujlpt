"use client";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Sidebar from "@/components/user/Sidebar/Sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header/>
      <div className="w-full min-h-screen xl:min-h-[calc(100vh-80px)] bg-purple-100 xl:bg-purple-100 flex pt-0 xl:pt-0 pb-20 xl:pb-0">
        <Sidebar />
        <div className="w-full xl:w-[calc(100%-300px)] min-h-[calc(100vh-80px)] px-5 sm:px-10 py-5 bg-purple-100">
          {children}
        </div>
      </div>
      {/* <div className="hidden xl:block">
        <Footer />
      </div> */}
    </>
  );
}
