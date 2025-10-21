"use client";

import Link from "next/link";
import { SidebarData } from "./sidebarData";
import { FaSignOutAlt } from "react-icons/fa";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  const MainSidebar = () => {
    return (
      <div className="min-h-[75vh] bg-white w-[300px] sticky top-0 shadow-lg hidden xl:block">
        {/* <h1 className="text-2xl font-semibold p-5 bg-blue-900 text-blue-50">
          Candidate Dashboard
        </h1> */}
        <div className="p-5 flex flex-col gap-4 font-semibold">
          {SidebarData.map((data, index) => (
            <Link
              key={index}
              href={data.to}
              className={`p-1.5 rounded group hover:text-blue-500 hover:bg-slate-100 ${
                path.startsWith(data.to) ? "text-blue-500 bg-slate-100" : "text-gray-500"
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
      {SidebarData.map((item, i) => (
        <Link
            key={i}
            href={item.to}
            className={`flex flex-col items-center text-xs tracking-wide p-2 transition-colors duration-200 ${
             path.startsWith(item.to)
                ? "bg-blue-400 text-white rounded-lg" : " bg-white text-blue-400 "
                
            }`}
          >
            <span className="text-xl">{item.icon}</span>
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
