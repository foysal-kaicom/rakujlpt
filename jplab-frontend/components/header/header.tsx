"use client";

import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

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
import { useAuthSession } from "@/utils/authSession";

export default function Header() {
  const [scrollCount, setScrollCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

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
        logout();
        router.push("/sign_in");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toggleSidebar();
    }
  };

  const MainHeader = () => {
    return (
      <div className="hidden xl:flex gap-5  2xl:gap-15 h-full xl:items-center">
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
              className={`font-semibold text-sm 2xl:text-lg flex items-center gap-1`}
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
    return isAuthenticated && token && user ? (
      <>
        <Notification />
        <div className="flex gap-2 items-center relative group cursor-pointer">
          <Image
            src={user.photo}
            alt="profile pic"
            height={40}
            width={40}
            className="size-8 rounded-full object-cover aspect-auto ring-2 ring-[#173fa4]"
          />
          <p className="line-clamp-1 capitalize font-semibold text-[#173fa4]">
            {user?.first_name?.slice(0, 10)}
            {user?.first_name.length > 10 && "..."}
          </p>
          <div className="bg-white grid grid-cols-1 rounded-md text-sm shadow absolute right-1/2 translate-x-1/2 top-[40px] scale-0 group-hover:scale-100 w-[200px] h-[180px] overflow-clip duration-400 origin-top outline outline-gray-200">
            {SidebarData.slice(0, 4).map((item, i) => (
              <Link
                key={i}
                href={item.to}
                className="flex gap-1.5 items-center hover:bg-blue-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4"
              >
                <span className="p-1 bg-white rounded outline outline-blue-100 text-blue-500">
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
          className="text-xs 2xl:text-sm flex items-center gap-2 py-3 px-5 2xl:py-4 2xl:px-7 text-indigo-700 bg-white rounded-full border-4 border-indigo-300 hover:border-orange-400 duration-300 shadow-2xl transform hover:scale-110 hover:-rotate-2 font-bold group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:translate-x-full transition-all duration-700 -skew-x-12"></div>
          <span className="relative z-10 group-hover:text-orange-600 transition-colors duration-300">
            🎪 Sign Up
          </span>
          <IoLogIn className="size-5 relative z-10 group-hover:text-orange-600 group-hover:scale-125 transition-all duration-300" />
        </Link>

        <Link
          href="/sign_in"
          className="text-xs 2xl:text-sm flex items-center gap-2 py-3 px-5 2xl:py-4 2xl:px-7 rounded-full border-4 border-white/50 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-pink-500 hover:to-rose-500 hover:border-pink-300 duration-300 shadow-2xl transform hover:scale-110 hover:rotate-2 font-bold group relative overflow-hidden"
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
          className={`xl:hidden h-[calc(100vh-80px)] w-full fixed z-40 top-20 left-0 bg-gradient-to-r from-indigo-300 to-purple-200 duration-500 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-5 h-full overflow-y-scroll pb-10 pt-5 px-6 lg:px-8 container mx-auto scrollbar-hide">
            <div className="space-y-5">
              {isAuthenticated && token && user && (
                <div onClick={toggleSidebar} className="space-y-3">
                  <Link href="/dashboard">
                    <Image
                      src={user.photo}
                      alt="profile pic"
                      height={40}
                      width={40}
                      className="size-20 rounded-full object-cover aspect-auto"
                    />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="line-clamp-1 capitalize font-semibold text-white text-lg mt-3"
                  >
                    {user?.first_name}
                  </Link>
                </div>
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
                        className={`flex justify-between gap-2 w-full text-left font-semibold text-sm 2xl:text-base ${
                          isActive ? "text-[#001aff]" : ""
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
                        className={`flex justify-between gap-2 w-full text-left font-semibold text-sm 2xl:text-base ${
                          isActive ? "text-[#001aff]" : ""
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
                              ? "text-[#001aff]"
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
                            className={`block hover:text-[#001aff] text-sm duration-300 font-medium ${
                              link.to === path ? "text-[#001aff]" : ""
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

  // useAuthSession()

  return (
    <>
      <div
        className={`w-full sticky z-50 top-0 ${
          scrollCount > 10 ? "bg-purple-50" : "bg-white"
        }`}
      >
        <div className="px-6 lg:px-8 container mx-auto flex items-center justify-between h-[80px] ">
          <div
            className="p-1.5 bg-blue-50 rounded shadow-sm xl:hidden"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <RxCross2 className="size-4" />
            ) : (
              <GiHamburgerMenu className="size-4" />
            )}
          </div>
          <Link href="/">
            <Image
              src="/assets/logo/logo.png"
              alt="logo"
              width={461}
              height={74}
              className="w-[130px] 2xl:w-[180px] h-[45px]"
            />
          </Link>
          <MainHeader />

          <div className="hidden xl:grid grid-cols-2 items-center gap-8">
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
