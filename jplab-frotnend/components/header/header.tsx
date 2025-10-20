"use client";

import {
  IoIosMail,
  IoIosCall,
  IoLogoYoutube,
  IoMdArrowDropright,
  IoMdArrowDropdown,
} from "react-icons/io";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTachometerAlt,
  FaUser,
  FaHeadset,
} from "react-icons/fa";
import { IoLogIn, IoLogOut, IoMailOpenOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { GoBellFill } from "react-icons/go";
import { PiExamFill } from "react-icons/pi";

import { toast } from "sonner";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { navdata } from "./navdata";

import axios from "axios";
import axiosInstance from "@/utils/axios";

import { useAuthStore } from "@/stores/useAuthStore";
import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  url?: string;
  time: string;
  is_read?: boolean;
}

interface NotificationsData {
  unread_count: number;
  notifications: NotificationItem[];
}

export default function Header() {
  const [scrollCount, setScrollCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationsData>({
    unread_count: 0,
    notifications: [],
  });
  const settings = useBusinessSettingsStore((state) => state.settings);
  const { isAuthenticated, token, logout, user } = useAuthStore();

  const path = usePathname();
  const router = useRouter();

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
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

  const getNotificationData = async () => {
    if (token) {
      try {
        const response = await axiosInstance.get("/notifications/list");
        const data = response.data?.data;
        setNotifications(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getNotificationData();
  }, [token]);

  const notificationRead = async (id: number) => {
    try {
      const response = await axiosInstance.get(`notifications/${id}/read`);
      getNotificationData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const notificationReadAll = async () => {
    try {
      const response = await axiosInstance.get(`notifications/read-all`);
      getNotificationData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getSettingsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`
      );
      const data = response.data?.data;

      if (data) {
        const businessData = {
          business_name: data.business_name,
          business_email: data.business_email,
          business_phone: data.business_phone,
          bkash_number: data.bkash_number,
          website_url: data.website_url,
          certificate_amount: data.certificate_amount,
          address: data.address,
          bin_number: data.bin_number,
          tin_number: data.tin_number,
          trade_license: data.trade_license,
          legal_docs: data.legal_docs,
          certification_docs: data.certification_docs,
          authorized_docs: data.authorized_docs,
          logo: data.logo,
          facebook_url: data.facebook_url,
          twitter_url: data.twitter_url,
          linkedin_url: data.linkedin_url,
          youtube_url: data.youtube_url,
          instagram_url: data.instagram_url,
        };

        useBusinessSettingsStore.getState().setSettings(businessData);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSettingsData();
  }, []);

  const SubHeader = () => {
    return (
      <div className="primary-background-color hidden xl:flex py-2 items-center justify-between relative z-40 px-[4%] md:px-[9%]">
        <div className="flex gap-5 text-gray-200 text-sm">
          <div className="flex gap-2 items-center hover:text-white duration-300">
            <IoIosMail className="size-5" />
            <span>{settings?.business_email}</span>
          </div>
          <div className="flex gap-2 items-center hover:text-white duration-300">
            <IoIosCall className="size-5" />
            <span>{settings?.business_phone}</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 text-gray-200">
          <a
            href={settings?.facebook_url}
            target="_blank"
            className="border-white border-r-1 pr-2"
          >
            <FaFacebookF className="size-4 hover:text-white duration-300" />
          </a>
          <a
            href={settings?.linkedin_url}
            target="_blank"
            className="border-white border-r-1 pr-2"
          >
            <FaLinkedinIn className="size-4 hover:text-white duration-300" />
          </a>
          <a href={settings?.youtube_url} target="_blank">
            <IoLogoYoutube className="size-4 hover:text-white duration-300" />
          </a>
        </div>
      </div>
    );
  };

  const MainHeader = () => {
    return (
      <div className="hidden xl:flex gap-3 2xl:gap-5 h-full xl:items-center">
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
              className={`font-semibold text-sm 2xl:text-base ${
                item.id === "mockTest"
                  ? "flex gap-2 items-center bg-white/95 backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 duration-300 cursor-pointer p-3 px-5 rounded-2xl border-3 border-purple-300 hover:border-white/50 shadow-lg transform hover:scale-105 hover:-rotate-1 group"
                  : ""
              }`}
            >
              {item.label}
            </Link>
            {Array.isArray(item.links) && (
              <div className="bg-white absolute overflow-hidden scale-0 group-hover:scale-100 transform origin-top-left left-0 top-[80px] w-[300px] duration-400 rounded-md shadow outline outline-gray-200 py-2 grid grid-cols-1 gap-1">
                {item.links.map((link, i) => (
                  <Link href={link.to} key={i}>
                    <div
                      className={`w-[300px] px-5 py-1.5 hover:bg-blue-50/70 hover:text-[#173fa4] duration-300 text-sm ${
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

  const Notification = () => {
    return (
      <div className=" flex justify-end relative group">
        <div
          onClick={toggleNotification}
          className="p-1 rounded-full bg-white border border-gray-200 drop-shadow font-semibold relative"
        >
          <GoBellFill className="size-5 text-blue-600" />
          {notifications?.unread_count > 0 && (
            <p className="size-3 bg-red-600 rounded-full absolute -top-1 -right-1"></p>
          )}
        </div>
        <div
          className={`absolute right-0 top-[30px] scale-0 group-hover:scale-100 w-[300px] sm:w-[350px] bg-white shadow rounded h-[400px] overflow-y-scroll duration-500 transform origin-top-right border border-gray-200 ${
            isNotificationOpen ? "scale-100 xl:scale-0" : "scale-0 xl:scale-0"
          }`}
        >
          <div className="border-b border-gray-200 flex gap-3 justify-between items-center p-2 sticky top-0 bg-white">
            <p className="font-semibold">Notification</p>

            <button
              disabled={notifications?.unread_count < 1}
              onClick={notificationReadAll}
              className={`duration-300 text-xs ${
                notifications?.unread_count > 0
                  ? "cursor-pointer hover:text-blue-600"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Mark as read
            </button>
          </div>
          {notifications?.notifications.length > 0 ? (
            notifications.notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => notificationRead(item.id)}
                className={`p-2 flex gap-3 border-b border-b-gray-200 hover:bg-blue-50/70 mb-2 cursor-pointer ${
                  !item?.is_read ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="size-[28px] p-1 bg-blue-100 rounded-full text-blue-700 ">
                  {!item?.is_read ? (
                    <IoIosMail className="size-5" />
                  ) : (
                    <IoMailOpenOutline className="size-5" />
                  )}
                </div>
                <div className="w-[calc(100%-28px)] space-y-1">
                  <p className="font-semibold text-sm">{item?.title}</p>
                  <p className="text-xs">{item?.message}</p>
                  <p className="text-xs">{item?.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm p-2 text-center">No notification</p>
          )}
        </div>
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
          <div className="bg-white grid grid-cols-1 rounded-md text-sm shadow absolute right-0 top-[40px] scale-0 group-hover:scale-100 w-[150px] h-[160px] overflow-clip duration-400 origin-top outline outline-gray-200">
            <Link
              href="/dashboard"
              className="flex gap-1.5 items-center hover:bg-blue-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4"
            >
              <span className="p-1 bg-white rounded outline outline-blue-100">
                <FaTachometerAlt className="text-blue-500" />
              </span>
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="flex gap-1.5 items-center hover:bg-blue-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4"
            >
              <span className="p-1 bg-white rounded outline outline-blue-100">
                <FaUser className="text-blue-500" />
              </span>
              Profile
            </Link>
            <Link
              href="/mock_test_result"
              className="flex gap-1.5 items-center hover:bg-blue-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4"
            >
              <span className="p-1 bg-white rounded outline outline-blue-100">
                <PiExamFill className="text-blue-500" />
              </span>
              Mock Test
            </Link>
            <Link
              href="/support"
              className="flex gap-1.5 items-center hover:bg-blue-50 duration-300 cursor-pointer line-clamp-1 p-1 px-4"
            >
              <span className="p-1 bg-white rounded outline outline-blue-100">
                <FaHeadset className="text-blue-500" />
              </span>
              Support
            </Link>
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
            🎪 Register
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
          className={`xl:hidden h-[calc(100vh-80px)] w-full fixed z-40 top-20 left-0 bg-blue-950/95 text-white duration-500 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-5 h-full overflow-y-scroll pb-10 pt-5 px-[4%] md:px-[9%] scrollbar-hide">
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
                          isActive ? "text-[#00d9ff]" : ""
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
                          isActive
                            ? "text-[#00d9ff]"
                            : item.id == "mockTest"
                            ? "text-amber-300 animate-pulse"
                            : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {Array.isArray(item.links) && isOpen && (
                      <div className="pl-5 mt-3 space-y-3 grid grid-cols-1">
                        <Link
                          onClick={toggleSidebar}
                          href={item.to}
                          className={`mb-3 text-sm ${
                            item.label == "Test & Sample Question"
                              ? "hidden"
                              : item.to == path
                              ? "text-[#00d9ff]"
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
                            className={`block hover:text-[#00d9ff] text-sm duration-300 ${
                              link.to === path ? "text-[#00d9ff]" : ""
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
                className="text-xs 2xl:text-sm flex w-full items-center gap-1 py-1 px-3 2xl:py-2 2xl:px-5 text-white bg-red-600 rounded-full border-2 border-red-600 hover:bg-white hover:text-red-600 duration-300 cursor-pointer"
              >
                Logout
                <IoLogOut className="size-5" />
              </button>
            ) : (
              <>
                <Link
                  onClick={toggleSidebar}
                  href="/registration"
                  className="text-xs 2xl:text-sm flex items-center gap-1 py-1 px-3 2xl:py-2 2xl:px-5 text-[#173fa4] bg-white rounded-full border-2 border-[#173fa4] hover:bg-[#173fa4] hover:text-white duration-300 "
                >
                  Register
                  <IoLogIn className="size-5" />
                </Link>

                <Link
                  onClick={toggleSidebar}
                  href="/sign_in"
                  className="text-xs 2xl:text-sm flex items-center gap-1 py-1 px-3 2xl:py-2 2xl:px-5 rounded-full border-2 border-[#173fa4] bg-[#173fa4] text-white hover:bg-white hover:text-[#173fa4] duration-300"
                >
                  Sign In
                  <IoLogIn className="size-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <SubHeader />

      <div className="h-[80px] w-full bg-white flex items-center fixed xl:relative z-50 justify-between px-[4%] md:px-[9%] top-0">
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
          {/* <Image
            src="/assets/logo/logo.png"
            alt="logo"
            width={461}
            height={74}
            className="w-[130px] 2xl:w-[180px]"
          /> */}
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-blue-400 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Hashira
          </div>
        </Link>
        <MainHeader />

        <div className="hidden xl:grid grid-cols-2 items-center gap-8">
          <NavCta />
        </div>
        {isAuthenticated && token && user ? (
          <div className="block xl:hidden">
            <Notification />
          </div>
        ) : (
          <p className="block xl:hidden"></p>
        )}
      </div>

      <div
        className={`hidden xl:block fixed top-0 py-3 px-[3%] md:px-[5%] duration-700 z-50 w-full ${
          scrollCount > 350 ? "translate-y-0" : "-translate-y-[200%]"
        }`}
      >
        <div className="h-[80px] flex items-center px-5 bg-blue-50 justify-between rounded-md drop-shadow-2xl shadow relative">
          <Link href="/">
            {/* <Image
              src="/assets/logo/logo.png"
              alt="logo"
              width={461}
              height={74}
              className="w-[130px] 2xl:w-[180px]"
            /> */}
            <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-blue-400 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Hashira
            </div>
          </Link>
          <MainHeader />
          <div className="hidden xl:grid grid-cols-2 items-center gap-8">
            <NavCta />
          </div>
        </div>
      </div>

      <SmHeader />
    </>
  );
}
