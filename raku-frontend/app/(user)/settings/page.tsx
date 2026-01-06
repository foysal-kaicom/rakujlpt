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
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const breadCrumbData = [
    { name: t("settings.breadcrumbs.dashboard"), to: "/dashboard" },
    { name: t("settings.breadcrumbs.exam_booking"), to: "/exam_history" },
  ];

  const settingsOptions = [
    {
      icon: <FaUserCog className="text-blue-500 w-6 h-6" />,
      title: t("settings.options.profile.title"),
      description: t("settings.options.profile.desc"),
      path: "/profile",
    },
    {
      icon: <FaPalette className="text-purple-500 w-6 h-6" />,
      title: t("settings.options.password.title"),
      description: t("settings.options.password.desc"),
      path: "/update_password",
    },
  ];

  return (
    <div className="">
      <BreadCrumb breadCrumbData={breadCrumbData} />

      <div className="mt-5">
        <UserHeadline
          mainText={t("settings.title")}
          subText=""
          preText=""
        />
        <div className="w-full bg-white rounded-2xl border border-purple-200 p-8 mt-5">
          <div className="grid sm:grid-cols-2 gap-6">
            {settingsOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => router.push(option.path)}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all duration-300 text-left bg-white cursor-pointer"
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