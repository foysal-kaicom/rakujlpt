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
      <Header />
      <div className="w-full min-h-screen xl:min-h-[75vh] bg-slate-50 xl:bg-white flex pt-20 xl:pt-0 pb-20 xl:pb-0">
        <Sidebar />
        <div className="w-full xl:w-[calc(100%-300px)] min-h-[75vh] px-5 sm:px-10 py-5 bg-slate-50">
          {children}
        </div>
      </div>
      <div className="hidden xl:block">
        <Footer />
      </div>
    </>
  );
}
