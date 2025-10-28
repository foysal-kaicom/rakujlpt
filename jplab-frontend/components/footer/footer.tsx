"use client";
import Image from "next/image";
import WebpageWrapper from "../wrapper/WebpageWrapper";
import Link from "next/link";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

export default function Footer() {
  const settings = useBusinessSettingsStore((state) => state.settings);
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-xl"></div>

      <footer className="px-6 lg:px-8 relative container mx-auto">
        <div className="py-16 grid grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Column 1: Logo + brief */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                width={100}
                height={100}
                src="/assets/logo/logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500">
              Empowering learners worldwide with modern e-learning courses.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="#"
                className="bg-gradient-to-r from-indigo-300 to-purple-400 text-white rounded-full p-2"
              >
                <FaFacebookF className="size-4" />
              </Link>
              <Link
                href="#"
                className="bg-gradient-to-r from-indigo-300 to-purple-400 text-white rounded-full p-2"
              >
                <FaLinkedinIn className="size-4" />
              </Link>
              <Link
                href="#"
                className="bg-gradient-to-r from-indigo-300 to-purple-400 text-white rounded-full p-2"
              >
                <IoLogoYoutube className="size-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link href="/about_jpt" className="hover:text-purple-500 transition">
                  About JPLAB
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:text-purple-500 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms_condition" className="hover:text-purple-500 transition">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
             
              <li>
                <Link href="/faq" className="hover:text-purple-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-purple-500 transition">
                  Blog
                </Link>
              </li>
              <li>
                <a href="/refund_and_cancellation" className="hover:text-purple-500 transition">
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-500 text-sm mb-4">
              Get latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row sm:space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none border border-gray-500"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:bg-yellow-500 transition  cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-purple-300 text-gray-500 text-sm py-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="bg-gradient-to-r from-indigo-300 to-purple-400 text-white rounded-full p-2">
                <FaFacebookF className="size-4"/>
              </a>
              <a href="#" className="bg-gradient-to-r from-indigo-300 to-purple-400 text-white rounded-full p-2">
                  <FaLinkedinIn className="size-4"/>
              </a>
              <a href="#" className="bg-gradient-to-r from-indigo-300 to-purple-400 text-white rounded-full p-2">
                  <IoLogoYoutube className="size-4"/>
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link href="/about_jpt" className="hover:text-purple-500 transition">
                  About JPLAB
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:text-purple-500 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms_condition" className="hover:text-purple-500 transition">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
             
              <li>
                <Link href="/faq" className="hover:text-purple-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-purple-500 transition">
                  Blog
                </Link>
              </li>
              <li>
                <a href="/refund_and_cancellation" className="hover:text-purple-500 transition">
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-500 text-sm mb-4">
              Get latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row sm:space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none border border-gray-500"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:bg-yellow-500 transition  cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
