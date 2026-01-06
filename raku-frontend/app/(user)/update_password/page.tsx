"use client";

import { Suspense, useState } from "react";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import SuspenseLoader from "@/components/SuspenseLoader";
import { useTranslation } from "react-i18next";

export default function UpdatePassword() {
  const { t } = useTranslation("common");

  const breadCrumbData = [
    { name: t("update_password.breadcrumbs.dashboard"), to: "/dashboard" },
    { name: t("update_password.breadcrumbs.settings"), to: "/settings" },
    {
      name: t("update_password.breadcrumbs.update_password"),
      to: "/update_password",
    },
  ];

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      toast.error(t("update_password.toasts.mismatch"));
      return;
    }

    try {
      const response = await axiosInstance.post("/candidate/update-password", {
        current_password: form.current_password,
        new_password: form.new_password,
        new_password_confirmation: form.confirm_password,
      });

      if (response.status === 200) {
        toast.success(t("update_password.toasts.success"));
        setForm({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const inputClass =
    "w-full border-b border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none";

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="min-h-[60vh]">
        <BreadCrumb breadCrumbData={breadCrumbData} />

        <div className="mt-5 flex items-center justify-center min-h-[calc(100vh-180px)]">
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full mx-auto space-y-6 bg-white p-6 rounded-md shadow"
          >
            <UserHeadline
              mainText={t("update_password.title")}
              subText=""
              preText=""
            />

            {/* Current Password */}
            <div className="relative">
              <input
                type={show.current ? "text" : "password"}
                placeholder={t("update_password.placeholders.current")}
                required
                value={form.current_password}
                onChange={(e) =>
                  setForm({ ...form, current_password: e.target.value })
                }
                className={inputClass}
              />
              <span
                onClick={() => setShow({ ...show, current: !show.current })}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {show.current ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                placeholder={t("update_password.placeholders.new")}
                required
                min={6}
                value={form.new_password}
                onChange={(e) =>
                  setForm({ ...form, new_password: e.target.value })
                }
                className={inputClass}
              />
              <span
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                placeholder={t("update_password.placeholders.confirm")}
                required
                min={6}
                value={form.confirm_password}
                onChange={(e) =>
                  setForm({ ...form, confirm_password: e.target.value })
                }
                className={inputClass}
              />
              <span
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-800 text-white text-sm font-semibold py-2 rounded-md cursor-pointer"
            >
              {t("update_password.submit_btn")}
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}