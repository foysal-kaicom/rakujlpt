"use client";

import Link from "next/link";
import { SidebarData } from "./sidebarData";
import { FaSignOutAlt } from "react-icons/fa";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const user = useAuthStore().user;

  const MainSidebar = () => {
    return (
      <div className="min-h-[75vh] bg-white w-[300px] sticky top-0 shadow-lg hidden xl:block">
        {/* <h1 className="text-2xl font-semibold p-5 bg-blue-900 text-blue-50">
          Candidate Dashboard
        </h1> */}
        <Link href="/profile">
          <div className="p-5 flex flex-col items-center relative pt-8">
            <div className="h-22 w-full bg-purple-300 absolute left-0 top-0"></div>
            <Image
              src={user?.photo || ""}
              alt="profile picture"
              height={100}
              width={100}
              className="rounded-full size-24 aspect-auto object-cover relative z-10 ring-5 ring-white bg-white"
            />
            <p className="text-2xl font-semibold px-5">
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
              className={`p-1.5 rounded group hover:text-blue-500 hover:bg-slate-100 ${
                path.startsWith(data.to)
                  ? "text-blue-500 bg-slate-100"
                  : "text-gray-500"
              }`}
            >
              <div className="flex gap-3 items-center">
                <p
                  className={`p-2 rounded border group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-200 ${
                    path.startsWith(data.to)
                      ? " bg-white text-blue-500 border-blue-200"
                      : "bg-slate-100 text-blue-400 drop-shadow border-slate-100 "
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
            className={`p-1.5 rounded text-gray-500 hover:bg-slate-100 hover:text-red-400 group`}
          >
            <div className="flex gap-3 items-center">
              <p
                className={`p-2 rounded bg-slate-100 group-hover:bg-white text-red-400 drop-shadow border border-slate-100 group-hover:border-blue-200`}
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
    const pathname = usePathname();

    return (
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white shadow-t border-t border-gray-200 flex justify-evenly gap-3 items-center py-4 rounded-t-2xl xl:hidden">
        {SidebarData.slice(0,4).map((item, i) => (
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
            <span className="mt-1 hidden md:block">{item.label}</span>
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
