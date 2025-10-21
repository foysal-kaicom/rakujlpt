'use client'

import Image from "next/image";
import WebpageWrapper from "../wrapper/WebpageWrapper";
import Link from "next/link";
import { IoIosMail, IoIosCall, IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

export default function Footer() {
  const settings = useBusinessSettingsStore((state)=>state.settings)
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 py-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-xl"></div>
      
      <WebpageWrapper>
        {/* <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-white/30">
          <Link href="/">
            <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300">
              <Image
                src="/assets/logo/footer-logo.png"
                alt="logo"
                width={461}
                height={74}
                className="w-[150px] 2xl:w-[180px]"
              />
            </div>
          </Link>

          <div className="flex items-center justify-end gap-3">
            <a
              href={settings?.facebook_url}
              target="_blank"
              className="bg-white/20 border-3 border-white/50 hover:bg-blue-500 rounded-full p-3 transform hover:scale-125 hover:-rotate-12 transition-all duration-300 shadow-lg group"
            >
              <FaFacebookF className="size-5 text-white group-hover:animate-bounce" />
            </a>
            <a
              href={settings?.linkedin_url}
              target="_blank"
              className="bg-white/20 border-3 border-white/50 hover:bg-blue-700 rounded-full p-3 transform hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg group"
            >
              <FaLinkedinIn className="size-5 text-white group-hover:animate-bounce" />
            </a>
            <a
              href={settings?.youtube_url}
              target="_blank"
              className="bg-white/20 border-3 border-white/50 hover:bg-red-600 rounded-full p-3 transform hover:scale-125 hover:-rotate-12 transition-all duration-300 shadow-lg group"
            >
              <IoLogoYoutube className="size-5 text-white group-hover:animate-bounce" />
            </a>
          </div>
        </div> */}

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Address Section */}
          <div className=" rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-3 inline-block mb-4 shadow-lg transform -rotate-2">
              <p className="text-white text-xl font-bold tracking-wider">
                📍 Address
              </p>
            </div>
            <div className="text-white text-sm space-y-3">
              <p className="leading-relaxed">
                House Name: A-SHA, House No: 2 E (2nd Floor), Road: 8, Sector: 7,
                Uttara Model Town, Dhaka-1230. , In front of Milestone College
                (Near BNS CENTER & ASIAN UNIVERSITY).
              </p>
              <div className="bg-white/20 rounded-xl p-3 mt-3">
                <p className="text-yellow-300 font-bold tracking-wider text-base mb-1">
                  📝 Register Address:
                </p>
                <p>House: 15-Fulbaria, Nishat Nagar, Turag, Dhaka.</p>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex gap-2 items-center bg-white/10 rounded-full px-4 py-2 hover:bg-white/25 transition-all duration-300 cursor-pointer">
                  <IoIosMail className="size-5 text-yellow-300" />
                  <span className="text-sm">{settings?.business_email}</span>
                </div>
                <div className="flex gap-2 items-center bg-white/10 rounded-full px-4 py-2 hover:bg-white/25 transition-all duration-300 cursor-pointer">
                  <IoIosCall className="size-5 text-green-300" />
                  <span className="text-sm">{settings?.business_phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-green-400 to-cyan-400 rounded-2xl p-3 inline-block mb-4 shadow-lg transform rotate-2">
              <p className="text-white text-xl font-bold tracking-wider">
                🔗 Quick Links
              </p>
            </div>
            <div className="flex flex-col gap-2 text-white text-sm">
              {[
                { href: "/", text: "Home" },
                // { href: "/list_of_colleges_and_companies_admitted_to_jpt", text: "List of colleges and companies accept JPT" },
                // { href: "/application_procedure", text: "Application Procedure" },
                // { href: "/test_date_in_bangladesh", text: "Test Date in Bangladesh" },
                // { href: "/", text: "Certificate" },
                // { href: "/", text: "Result notification" },
                { href: "/about_us", text: "About Us" },
                { href: "/contact_us", text: "Contact Us" },
                { href: "/privacy_policy", text: "Privacy Policy" },
                { href: "/terms_condition", text: "Terms & condition" }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="bg-white/10 rounded-xl px-3 py-2 hover:bg-white/30 hover:pl-5 transition-all duration-300 hover:shadow-lg"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Other Information Section */}
          <div className="rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl p-3 inline-block mb-4 shadow-lg transform -rotate-2">
              <p className="text-white text-xl font-bold tracking-wider">
                ℹ️ Other Info
              </p>
            </div>
            <div className="flex flex-col gap-2 text-white text-sm">
              {[
                { href: "/differences_between_the_jpt_and_jlpt", text: "Differences between the JPT and JLPT" },
                { href: "/features_of_the_jpt", text: "Features of the JPT" },
                { href: "/recognized_by_isa_japan", text: "Recognized By Immigration Services Agency of Japan" },
                { href: "/refund_and_cancellation", text: "Refund and Cancellation" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="bg-white/10 rounded-xl px-3 py-2 hover:bg-white/30 hover:pl-5 transition-all duration-300 hover:shadow-lg"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Payment Gateway Section */}
          <div className=" rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl p-3 inline-block mb-4 shadow-lg transform rotate-2">
              <p className="text-white text-xl font-bold tracking-wider">
                💳 Payment Gateway
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:rotate-3 transition-all duration-300">
              <Image
                src="/assets/img/payment2.png"
                alt="payment gateway"
                width={498}
                height={490}
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t-4 border-white/30">
          <div className="bg-white/15 backdrop-blur-md rounded-full py-4 px-8 text-center shadow-xl border-3 border-white/30 transform hover:scale-105 transition-all duration-300">
            <p className="text-white text-sm font-medium">
              Copyright © 2025 {settings?.business_name} - All Rights Reserved. 🎉
            </p>
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
