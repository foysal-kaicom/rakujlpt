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
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const user = useAuthStore().user;
  const { t } = useTranslation("common");

  const MainSidebar = () => {
    return (
      <div className="fixed top-[80px] left-0 h-[calc(100vh-80px)] w-[300px] bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hidden xl:flex flex-col overflow-y-auto scrollbar-thin">
        {/* Profile */}
        <Link href="/profile">
          <div className="relative px-6 pt-10 pb-6 text-center">
            <div className="absolute inset-0 h-32 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 rounded-b-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              {user?.photo ? (
                <Image
                  src={user.photo}
                  alt="profile"
                  height={96}
                  width={96}
                  className="rounded-full size-24 object-cover ring-4 ring-white shadow-md"
                />
              ) : (
                <div className="size-24 rounded-full bg-white shadow-md flex items-center justify-center ring-4 ring-white">
                  <FaUser className="text-3xl text-purple-400" />
                </div>
              )}

              <p className="mt-3 text-lg font-semibold text-gray-800">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2 font-semibold">
          {SidebarData.map((data, index) => {
            const active = path.startsWith(data.to);

            return (
              <Link
                key={index}
                href={data.to}
                className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1.5 rounded-r-full bg-purple-500" />
                )}

                <div
                  className={`flex items-center justify-center size-10 rounded-lg border
                  ${
                    active
                      ? "bg-white border-purple-300 text-purple-700"
                      : "bg-white border-gray-200 text-purple-500 group-hover:border-purple-300"
                  }`}
                >
                  {data.icon}
                </div>

                <span className="text-sm">{t(data.label)}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="px-4 pb-6 font-semibold">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
          >
            <div className="size-10 flex items-center justify-center rounded-lg border border-red-200 bg-white">
              <FaSignOutAlt className="text-red-500" />
            </div>
            <span className="text-sm">{t("nav.logout")}</span>
          </button>
        </div>
      </div>
    );
  };

  const SmSidebar = () => {
    return (
      <div className="fixed bottom-0 inset-x-0 z-30 xl:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-around py-3 rounded-t-3xl">
        {SidebarData.slice(0, 6).map((item, i) => {
          const active = path.startsWith(item.to);

          return (
            <Link
              key={i}
              href={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition
              ${
                active
                  ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white scale-105"
                  : "text-purple-600 hover:bg-purple-50"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[11px] font-medium hidden md:block">
                {t(item.label)}
              </span>
            </Link>
          );
        })}
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/candidate/logout");

      if (response.status === 200) {
        // console.log("Logout Success:", response.data);
        useAuthStore.getState().logout();
        router.push("/sign_in");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Logout error",
      );
      useAuthStore.getState().logout();
      router.push("/sign_in");
    }
  };

  return (
    <>
      <MainSidebar />
      <SmSidebar />
    </>
  );
}
