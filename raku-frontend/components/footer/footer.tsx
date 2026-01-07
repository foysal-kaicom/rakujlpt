"use client";

import Image from "next/image";
import Link from "next/link";

import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const settings = useBusinessSettingsStore((state) => state.settings);
  const [newLetterEmail, setNewsLetterEmail] = useState("");

  const postNewsLetter = async (e: any) => {
    e.preventDefault();
    if (newLetterEmail == "") return;
    try {
      const form = new FormData();
      form.append("email", newLetterEmail);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news-letter-subscribe`,
        form
      );
      if (res.data.success) {
        toast.success(
          res.data.message || t("footer.newsletter_success")
        );
      }
    } catch (error: any) {
      toast.error(
        error.response?.data.message ||
          t("footer.newsletter_error")
      );
    } finally {
      setNewsLetterEmail("");
    }
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-purple-50 py-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-xl"></div>

      <footer className="px-6 lg:px-8 relative container mx-auto">
        <div className="py-16 grid grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                width={100}
                height={100}
                src="/assets/logo/logo.png"
                alt="Logo"
                className="h-10 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-gray-500">
              {t("footer.description")}
            </p>

            <div className="mt-6 flex space-x-4">
              <a
                href={settings?.facebook_url || ""}
                target="_blank"
                className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-full p-2 drop-shadow-sm drop-shadow-violet-400 border-b border-white/50 hover:scale-110 duration-300"
              >
                <FaFacebookF className="size-4" />
              </a>
              <a
                href={settings?.linkedin_url || ""}
                target="_blank"
                className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-full p-2 drop-shadow-sm drop-shadow-violet-400 border-b border-white/50 hover:scale-110 duration-300"
              >
                <FaLinkedinIn className="size-4" />
              </a>
              <a
                href={settings?.youtube_url || ""}
                target="_blank"
                className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-full p-2 drop-shadow-sm drop-shadow-violet-400 border-b border-white/50 hover:scale-110 duration-300"
              >
                <IoLogoYoutube className="size-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.company")}
            </h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link href="/about_us" className="hover:text-purple-500 transition">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:text-purple-500 transition">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/certificate" className="hover:text-purple-500 transition">
                  {t("footer.verify_certificate")}
                </Link>
              </li>
              <li>
                <Link href="/terms_condition" className="hover:text-purple-500 transition">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link href="/faq" className="hover:text-purple-500 transition">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-purple-500 transition">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link href="/refund_and_cancellation" className="hover:text-purple-500 transition">
                  {t("footer.refund")}
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy" className="hover:text-purple-500 transition">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.subscribe")}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {t("footer.subscribe_text")}
            </p>

            <form
              onSubmit={(e) => postNewsLetter(e)}
              className="flex flex-col sm:flex-row sm:space-x-2"
            >
              <input
                type="email"
                placeholder={t("footer.email_placeholder")}
                required
                value={newLetterEmail}
                onChange={(e) => setNewsLetterEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none border border-gray-500"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-8 py-2 bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition drop-shadow-md drop-shadow-violet-400 border-b border-white/50 cursor-pointer"
              >
                {t("footer.subscribe_button")}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-purple-300 text-gray-500 text-sm py-6">
          <div className="flex justify-center">
            <p>
              © {new Date().getFullYear()} RAKU JLPT. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
