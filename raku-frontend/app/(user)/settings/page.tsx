"use client";

import { useRouter } from "next/navigation";
import {
  FaUserCog,
  FaPalette,
  FaBell,
  FaLock,
  FaLanguage,
  FaInfoCircle,
} from "react-icons/fa";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";

export default function SettingsPage() {
  const router = useRouter();
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Exam Booking", to: "/exam_history" },
  ];

  const settingsOptions = [
    {
      icon: <FaUserCog className="text-blue-500 w-6 h-6" />,
      title: "Profile Settings",
      description: "Manage your profile, email and phone number",
      path: "/profile",
    },
    {
      icon: <FaPalette className="text-purple-500 w-6 h-6" />,
      title: "Password Settings",
      description: "Change your password",
      path: "/update_password",
    },
    // {
    //   icon: <FaBell className="text-yellow-500 w-6 h-6" />,
    //   title: "Notifications",
    //   description: "Control push and email notifications",
    //   path: "/settings/notifications",
    // },
    // {
    //   icon: <FaLock className="text-red-500 w-6 h-6" />,
    //   title: "Privacy & Security",
    //   description: "Adjust privacy and security preferences",
    //   path: "/settings/security",
    // },
    // {
    //   icon: <FaLanguage className="text-green-500 w-6 h-6" />,
    //   title: "Language",
    //   description: "Change language and region settings",
    //   path: "/settings/language",
    // },
    // {
    //   icon: <FaInfoCircle className="text-indigo-500 w-6 h-6" />,
    //   title: "About",
    //   description: "Learn more about this app",
    //   path: "/settings/about",
    // },
  ];

  return (
    <div className="">
      <BreadCrumb breadCrumbData={breadCrumbData} />

      <div className="mt-5 lg:px-10 lg:pb-10">
        <UserHeadline mainText="Settings" subText="" preText="" />
        <div className="w-full bg-white rounded-2xl shadow-xl p-8 mt-5">
          <div className="grid sm:grid-cols-2 gap-6">
            {settingsOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => router.push(option.path)}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all duration-300 text-left bg-white"
              >
                <div className="mt-1">{option.icon}</div>
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {option.title}
                  </h2>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
