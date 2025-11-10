"use client";

import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";


import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { navdata } from "./navdata";
import { SidebarData } from "../user/Sidebar/sidebarData";

import { useAuthStore } from "@/stores/useAuthStore";
import Notification from "./notificationComponent";

export default function Header() {
  const [scrollCount, setScrollCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const { isAuthenticated, token, logout, user } = useAuthStore();

  const path = usePathname();
  const router = useRouter();

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollCount(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollCount]);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/candidate/logout");
      if (response.status == 200) {
        router.push("/sign_in");
        logout();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toggleSidebar();
    }
  };

  const MainHeader = () => {
    return (
      <div className="hidden xl:flex gap-5 lg:gap-15 h-full xl:items-center">
        {navdata.map((item, index) => (
          <div
            key={index}
            className={`group border-b-4 hover:border-b-[#173fa4] relative duration-300 h-full flex items-center ${
              item.to === path ||
              (Array.isArray(item.links) &&
                item.links.some((link) => link.to === path))
                ? "border-b-[#173fa4]"
                : "border-b-transparent"
            }`}
          >
            <Link
              href={item.to}
              className={`font-semibold text-base lg:text-lg flex items-center gap-1`}
            >
              {item.label}
              {Array.isArray(item.links) && (
                <IoMdArrowDropdown className="size-6 group-hover:-rotate-180 duration-300" />
              )}
            </Link>
            {Array.isArray(item.links) && (
              <div className="bg-white absolute overflow-hidden scale-0 group-hover:scale-100 transform origin-top left-1/2 -translate-x-1/2 top-[80px] w-[230px] duration-400 rounded-md shadow ring-1 ring-purple-200 py-2 grid grid-cols-1 gap-1">
                {item.links.map((link, i) => (
                  <Link href={link.to} key={i}>
                    <div
                      className={`w-[230px] px-5 py-1.5 hover:bg-blue-50/70 hover:text-[#173fa4] duration-300 text-sm font-semibold ${
                        link.to === path ? "text-[#173fa4] bg-blue-50/70" : ""
                      }`}
                    >
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const NavCta = () => {
    if (!hydrated) {
      return null;
    }
    return isAuthenticated && token && user ? (
      <>
        <Notification />
        <div className="flex gap-2 items-center relative group cursor-pointer">
          {user?.photo ? (
            <Image
              src={user.photo}
              alt="profile pic"
              height={40}
              width={40}
              className="size-8 rounded-full object-cover aspect-auto ring-2 ring-purple-400"
            />
          ) : (
            <FaUser className="size-8 rounded-full object-cover aspect-auto ring-3 ring-purple-400 text-white bg-purple-400" />
          )}
          <div>
            <p className="line-clamp-1 capitalize font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user?.first_name} {""}
              {user?.last_name}
            </p>
            <p className="line-clamp-1 text-xs font-semibold bg-gradient-to-r from-blue-600  to-purple-600 bg-clip-text text-transparent">
              {user?.email || user?.phone_number}
            </p>
          </div>

          <div className="bg-white grid grid-cols-1 rounded-md text-sm shadow absolute right-1/2 translate-x-1/2 top-[40px] scale-0 group-hover:scale-100 w-[200px] h-[180px] overflow-clip duration-400 origin-top outline outline-gray-200">
            {SidebarData.slice(0, 4).map((item, i) => (
              <Link
                key={i}
                href={item.to}
                className="flex gap-1.5 items-center hover:bg-purple-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4"
              >
                <span className="p-1 bg-white rounded outline outline-purple-200 text-purple-500">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
            <p
              onClick={handleLogout}
              className="flex gap-1.5 items-center hover:bg-blue-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4 text-red-500"
            >
              <span className="p-1 bg-white rounded outline outline-blue-100">
                <IoLogOut className="text-red-500" />
              </span>
              Logout
            </p>
          </div>
        </div>
      </>
    ) : (
      <>
        <Link
          href="/registration"
          className="text-xs 2xl:text-sm flex items-center gap-2 py-3 px-5 2xl:py-4 2xl:px-7 text-indigo-700 bg-white rounded-full border-4 border-indigo-300 hover:border-orange-400 duration-300 shadow-2xl transform hover:scale-110 hover:-rotate-2 font-bold group relative overflow-hidden max-w-42"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:translate-x-full transition-all duration-700 -skew-x-12"></div>
          <span className="relative z-10 group-hover:text-orange-600 transition-colors duration-300">
            🎪 Sign Up
          </span>
          <IoLogIn className="size-5 relative z-10 group-hover:text-orange-600 group-hover:scale-125 transition-all duration-300" />
        </Link>

        <Link
          href="/sign_in"
          className="text-xs 2xl:text-sm flex items-center gap-2 py-3 px-5 2xl:py-4 2xl:px-7 rounded-full border-4 border-white/50 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-pink-500 hover:to-rose-500 hover:border-pink-300 duration-300 shadow-2xl transform hover:scale-110 hover:rotate-2 font-bold group relative overflow-hidden max-w-42"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 -skew-x-12"></div>
          <span className="relative z-10">🔑 Sign In</span>
          <IoLogIn className="size-5 relative z-10 group-hover:scale-125 transition-all duration-300" />
        </Link>
      </>
    );
  };

  const SmHeader = () => {
    return (
      <>
        <div
          className={`xl:hidden h-[calc(100vh-80px)] w-full fixed z-40 top-20 left-0 bg-gradient-to-r from-indigo-200 to-purple-200 duration-500 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-5 h-full overflow-y-scroll pb-10 pt-5 px-6 lg:px-8 container mx-auto scrollbar-hide">
            <div className="space-y-5">
              {isAuthenticated && token && user && (
                <>
                <div
                  onClick={toggleSidebar}
                  className="space-y-3 flex flex-col items-center border-b pb-3 border-white/70"
                >
                  <Link href="/dashboard">
                    {user.photo ? (
                      <Image
                        src={user.photo || "#"}
                        alt="profile pic"
                        height={100}
                        width={100}
                        className="size-30 rounded-full object-cover aspect-auto border-3 border-white"
                      />
                    ) : (
                      <FaUser className="size-30 rounded-full object-cover aspect-auto border-5 border-purple-400 bg-purple-400 text-white" />
                    )}
                  </Link>

                  <Link href="/dashboard" className="text-center mt-3">
                    <p className="capitalize font-semibold text-xl">
                      {user?.first_name} {user?.last_name}
                    </p>

                    <p className="text-sm">
                      {user?.email || user?.phone_number}
                    </p>
                  </Link>
                </div>
                <div className="space-y-5 border-b border-white/70 pb-5 text-indigo-800">
                    {/* Sidebar Items */}
                    {SidebarData.map((item, index) => (
                      <Link
                        key={index}
                        href={item.to}
                        onClick={toggleSidebar}
                        className={`font-semibold text-sm 2xl:text-base hover:text-[#d400ff] transition flex items-center gap-2 ${
                          path.startsWith(item.to) ? "text-[#d400ff]" : ""
                        }`}
                      >
                        <span className="text-lg rounded-sm">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
                
              )}

              {navdata.map((item, index) => {
                const isActive =
                  item.to === path ||
                  (Array.isArray(item.links) &&
                    item.links.some((link) => link.to === path));

                const isOpen = openDropdown === index;

                return (
                  <div key={index}>
                    {item.links ? (
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex justify-between gap-2 w-full text-left font-semibold text-sm 2xl:text-base hover:text-[#d400ff]  ${
                          isActive ? "text-[#d400ff]" : "text-indigo-800"
                        }`}
                      >
                        <p className="w-[calc(100%-24px)]">{item.label}</p>
                        <span>
                          {isOpen ? (
                            <IoMdArrowDropdown className="size-6" />
                          ) : (
                            <IoMdArrowDropright className="size-6" />
                          )}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.to}
                        onClick={toggleSidebar}
                        className={`flex justify-between gap-2 w-full text-left font-semibold text-sm 2xl:text-base hover:text-[#d400ff] ${
                          isActive ? "text-[#d400ff]" : "text-indigo-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {Array.isArray(item.links) && isOpen && (
                      <div className="pl-3 mt-3 space-y-3 grid grid-cols-1">
                        <Link
                          onClick={toggleSidebar}
                          href={item.to}
                          className={`mb-3 text-sm ${
                            item.label == "Information"
                              ? "hidden"
                              : item.to == path
                              ? "text-[#d400ff]"
                              : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                        {item.links.map((link, i) => (
                          <Link
                            onClick={toggleSidebar}
                            key={i}
                            href={link.to}
                            className={`block hover:text-[#d400ff] text-sm duration-300 font-medium ${
                              link.to === path ? "text-[#d400ff]" : "text-indigo-800"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {isAuthenticated && token && user ? (
              <button
                onClick={handleLogout}
                className="text-xs 2xl:text-sm flex w-[100px] items-center gap-1 py-1 px-3 2xl:py-2 2xl:px-5 text-white bg-red-600 rounded-full border-2 border-red-600 hover:bg-white hover:text-red-600 duration-300 cursor-pointer"
              >
                Logout
                <IoLogOut className="size-5" />
              </button>
            ) : (
              <div className="flex justify-between">
                <Link
                  onClick={toggleSidebar}
                  href="/registration"
                  className="text-sm font-medium flex items-center gap-1 py-1 px-3 2xl:py-2 2xl:px-5 rounded-full border-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-pink-500 hover:to-rose-500 hover:border-pink-300 duration-300 w-[100px]"
                >
                  Register
                  <IoLogIn className="size-5" />
                </Link>

                <Link
                  onClick={toggleSidebar}
                  href="/sign_in"
                  className="text-sm font-medium flex items-center gap-1 py-1 px-3 2xl:py-2 2xl:px-5 rounded-full border-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-pink-500 hover:to-rose-500 hover:border-pink-300 duration-300 w-[100px]"
                >
                  Sign In
                  <IoLogIn className="size-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <div
        className={`w-full sticky z-50 top-0 ${
          scrollCount > 10 ? "bg-purple-50" : "bg-white"
        }`}
      >
        <div className="px-6 lg:px-8 container mx-auto flex justify-between xl:grid grid-cols-3 items-center h-[80px] ">
          <div
            className="text-purple-600 drop-shadow-2xl drop-shadow-amber-500 xl:hidden"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <RxCross2 className="size-6" />
            ) : (
              // <HiViewGridAdd className="size-6" />
              <Image src="/assets/icon/menu.png"
              alt="menu"
              width={64}
              height={64} className="size-6"/>
            )}
          </div>
          <Link href="/">
            <Image
              src="/assets/logo/logo.png"
              alt="logo"
              width={600}
              height={160}
              className="w-30 md:w-36"
            />
          </Link>
          <MainHeader />

          <div
            className={`hidden items-center gap-8 xl:flex justify-end
               
            `}
          >
            <NavCta />
          </div>
          {isAuthenticated && token && user ? (
            <div className="block xl:hidden">
              <Notification token={token} />
            </div>
          ) : (
            <p className="block xl:hidden"></p>
          )}
        </div>
      </div>

      <SmHeader />
    </>
  );
}
