"use client";

import { useState } from "react";

import { toast } from "raku-toast-react";
import { useTranslation } from "react-i18next";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import HTMLReactParser from "html-react-parser/lib/index";

import { contactService } from "@/services/common.service";
import { ContactPayload } from "@/types/index.types";

export default function ContactSocialComponent() {
  const { t } = useTranslation();
  const settings = useBusinessSettingsStore((state) => state.settings);
  const [formData, setFormData] = useState<ContactPayload>({
    first_name: "",
    last_name: "",
    email: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await contactService.sendQuery(formData);

      toast.success(res.data || res.message || t("contact.success"));
    } catch (error) {
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        body: "",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Left Info Card */}
      <div className="p-10 rounded-2xl backdrop-blur-md bg-white/70 shadow-xl border border-white/50">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {t("contact.info_title")} 📍
        </h2>

        <div className="space-y-5 text-gray-700">
          <div>
            <p className="text-lg font-semibold">{t("contact.address")}</p>
            <p>{HTMLReactParser(settings?.address || "")}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{t("contact.email")}</p>
            <p>{settings?.business_email || ""}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{t("contact.phone")}</p>
            <p>{HTMLReactParser(settings?.business_phone || "")}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <a
            href={settings?.facebook_url || ""}
            target="_blank"
            className="p-3 rounded-full bg-linear-to-tr from-blue-400 to-blue-600 text-white shadow-lg hover:scale-110 duration-300"
          >
            <FaFacebookF className="size-5" />
          </a>
          <a
            href={settings?.linkedin_url || ""}
            target="_blank"
            className="p-3 rounded-full bg-linear-to-tr from-blue-500 to-indigo-700 text-white shadow-lg hover:scale-110 duration-300"
          >
            <FaLinkedinIn className="size-5" />
          </a>
          <a
            href={settings?.youtube_url || ""}
            target="_blank"
            className="p-3 rounded-full bg-linear-to-tr from-red-500 to-pink-600 text-white shadow-lg hover:scale-110 duration-300"
          >
            <IoLogoYoutube className="size-5" />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="relative p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">
          <span className="bg-linear-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            {t("contact.form_title")}
          </span>{" "}
          ✉️
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              name="first_name"
              placeholder={t("contact.first_name")}
              required
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none"
            />
            <input
              type="text"
              name="last_name"
              placeholder={t("contact.last_name")}
              required
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder={t("contact.email_placeholder")}
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none"
          />
          <textarea
            name="body"
            placeholder={t("contact.message_placeholder")}
            required
            rows={6}
            value={formData.body}
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold rounded-lg bg-linear-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 shadow-lg duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t("contact.sending") : t("contact.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
