"use client";

import Link from "next/link";
import { SidebarData } from "./sidebarData";
import { FaSignOutAlt } from "react-icons/fa";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { FaUser } from "react-icons/fa";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const user = useAuthStore().user;

  const MainSidebar = () => {
    return (
      <div className="h-[calc(100vh-80px)] bg-white w-[300px] fixed top-[80px] shadow-lg hidden xl:block overflow-y-auto scrollbar-thin">
        <Link href="/profile">
          <div className="p-5 flex flex-col items-center relative pt-8">
            <div className="h-22 w-full bg-purple-400 absolute left-0 top-0"></div>
            {user?.photo ? (
              <Image
                src={user?.photo || ""}
                alt="profile picture"
                height={100}
                width={100}
                className="rounded-full size-24 aspect-auto object-cover relative z-10 ring-5 ring-white bg-white"
                loading="lazy"
              />
            ) : (
              <FaUser className="rounded-full size-24 aspect-auto object-cover text-purple-400 relative z-10 ring-5 ring-white bg-white" />
            )}

            <p className="text-2xl font-semibold px-5 mt-2">
              {user?.first_name} {""} {user?.last_name}
            </p>
            <p className="font-medium text-gray-600 px-5">{user?.email}</p>
          </div>
        </Link>

        <div className="p-5 flex flex-col gap-4 font-semibold">
          {SidebarData.map((data, index) => (
            <Link
              key={index}
              href={data.to}
              className={`p-1.5 rounded group hover:text-purple-700 hover:bg-pink-50 ${
                path.startsWith(data.to)
                  ? "text-purple-700 bg-pink-50"
                  : "text-gray-600"
              }`}
            >
              <div className="flex gap-3 items-center">
                <p
                  className={`p-1.5 rounded border group-hover:bg-white group-hover:text-purple-600 group-hover:border-purple-400 text-xl ${
                    path.startsWith(data.to)
                      ? " bg-white text-purple-600 border-purple-400"
                      : "bg-white text-purple-600 border-purple-400 "
                  }`}
                >
                  {data.icon}
                </p>
                <p>{data.label}</p>
              </div>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className={`p-1.5 rounded text-gray-600 hover:bg-pink-50 hover:text-red-500 group cursor-pointer`}
          >
            <div className="flex gap-3 items-center">
              <p
                className={`p-2 rounded bg-white group-hover:bg-white text-red-400 border border-pink-400 group-hover:border-pink-500`}
              >
                <FaSignOutAlt />
              </p>
              <p>Logout</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const SmSidebar = () => {

    return (
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white shadow-t border-t border-gray-200 flex justify-evenly gap-3 items-center py-4 rounded-t-2xl xl:hidden">
        {SidebarData.slice(0, 5).map((item, i) => (
          <Link
            key={i}
            href={item.to}
            className={`flex flex-col items-center text-xs tracking-wide p-1 transition-colors duration-200 rounded-lg ${
              path.startsWith(item.to)
                ? "bg-gradient-to-tr from-purple-500 to-indigo-500 text-white "
                : " bg-white text-purple-600 border"
            }`}
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="mt-1 hidden md:block font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/candidate/logout");

      if (response.status === 200) {
        console.log("Logout Success:", response.data);
        useAuthStore.getState().logout(); // Clear auth state
        router.push("/sign_in"); // Redirect to sign-in
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Logout error"
      );
      useAuthStore.getState().logout(); // Fallback: still clear auth state
      router.push("/sign_in"); // Redirect anyway
    }
  };

  return (
    <>
      <MainSidebar />
      <SmSidebar />
    </>
  );
}
