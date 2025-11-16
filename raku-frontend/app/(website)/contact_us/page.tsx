import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

// Components
import HeadLine from "@/components/HeadLine";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import SuspenseLoader from "@/components/SuspenseLoader";

// Icons
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us — we’d love to hear from you!",
};

export default function ContactUs() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Contact Us", to: "/contact" },
  ];

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-100 via-pink-50 to-blue-100 pt-5">
        {/* Funky background blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/40 rounded-full blur-[120px] -z-10"></div>

        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="w-full text-center mt-10 mb-14">
            <h1 className="text-5xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-blue-500">Get in Touch</span> 💬
            </h1>
            <p className="text-gray-600 mt-2 text-lg tracking-wide">
              We’d love to hear your ideas, feedback, or collaboration requests!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left Info Card */}
            <div className="p-10 rounded-2xl backdrop-blur-md bg-white/70 shadow-xl border border-white/50">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Our Contact Info 📍
              </h2>

              <div className="space-y-5 text-gray-700">
                <div>
                  <p className="text-lg font-semibold">Address</p>
                  <p>A-SHA, House No: 2 E (2nd Floor), Road: 8,<br />Sector: 7, Dhaka 1230</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">Email</p>
                  <p>mocktestbd@gmail.com</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">Phone</p>
                  <p>+880 1847 291886 <br /> +880 1847 291881</p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.facebook.com/JPTTESTBANGLADESH"
                  target="_blank"
                  className="p-3 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 text-white shadow-lg hover:scale-110 duration-300"
                >
                  <FaFacebookF className="size-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kaicom-jpt-274196233/"
                  target="_blank"
                  className="p-3 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-700 text-white shadow-lg hover:scale-110 duration-300"
                >
                  <FaLinkedinIn className="size-5" />
                </a>
                <a
                  href="https://www.youtube.com/@JPTBANGLADESH"
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
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">Send Us a Message</span> ✉️
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
                  className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 shadow-lg duration-300"
                >
                  Submit Message
                </button>
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="my-20 rounded-2xl overflow-hidden shadow-lg border border-white/70">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.1385425776617!2d90.3980776695894!3d23.86996012505708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4142822ea93%3A0xd211d109862e0a68!2sMusubu%20Japanese%20Language%20and%20Cultural%20Center!5e0!3m2!1sen!2sbd!4v1750827768138!5m2!1sen!2sbd"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
        </WebpageWrapper>
      </div>
    </Suspense>
  );
}
