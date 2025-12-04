"use client";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

// Icons
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import HTMLReactParser from "html-react-parser/lib/index";

export default function ContactSocialComponent() {
  const settings = useBusinessSettingsStore((state) => state.settings);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Left Info Card */}
      <div className="p-10 rounded-2xl backdrop-blur-md bg-white/70 shadow-xl border border-white/50">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Our Contact Info 📍
        </h2>

        <div className="space-y-5 text-gray-700">
          <div>
            <p className="text-lg font-semibold">Address</p>
            <p>
              {HTMLReactParser(settings?.address || '')}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Email</p>
            <p>{settings?.business_email || ""}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Phone</p>
            <p>
             {HTMLReactParser(settings?.business_phone || '')}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <a
            href={settings?.facebook_url || ""}
            target="_blank"
            className="p-3 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 text-white shadow-lg hover:scale-110 duration-300"
          >
            <FaFacebookF className="size-5" />
          </a>
          <a
            href={settings?.linkedin_url || ""}
            target="_blank"
            className="p-3 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-700 text-white shadow-lg hover:scale-110 duration-300"
          >
            <FaLinkedinIn className="size-5" />
          </a>
          <a
            href={settings?.youtube_url || ""}
            target="_blank"
            className="p-3 rounded-full bg-gradient-to-tr from-red-500 to-pink-600 text-white shadow-lg hover:scale-110 duration-300"
          >
            <IoLogoYoutube className="size-5" />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="relative p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Send Us a Message
          </span>{" "}
          ✉️
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="First name"
              className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none"
          />
          <textarea
            placeholder="Write your message here..."
            rows={6}
            className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 shadow-lg duration-300 cursor-pointer"
          >
            Submit Message
          </button>
        </form>
      </div>
    </div>
  );
}
