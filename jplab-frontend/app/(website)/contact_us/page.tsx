import type { Metadata } from "next";

import Image from "next/image";
import { Suspense } from "react";

// Components
import HeadLine from "@/components/HeadLine";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

// Icons
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import SuspenseLoader from "@/components/SuspenseLoader";



// Metadata
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us",
};

export default function ContactUs() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Test Date in Bangladesh", to: "/test_date_in_bangladesh" },
  ];

  return (
    <Suspense
      fallback={
        <SuspenseLoader/>
      }
    >
      <div className=" pt-5 relative overflow-clip bg-yellow-50/15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="w-1/2 mt-5 mx-auto">
            <HeadLine preText="" subText="" mainText="Contact Us" />
          </div>
        </WebpageWrapper>
        <div className=" mt-15">
          <WebpageWrapper>
            <div className="flex gap-10">
              <div className="w-1/2 space-y-6 py-15">
                <h1 className="text-3xl font-semibold tracking-wider w-2/3">
                  We're Always Eager to Hear From You!
                </h1>
                <div className="space-y-2 tracking-wider">
                  <p className="text-xl font-semibold">Address</p>
                  <p className="text-gray-600">
                    A-SHA, House No: 2 E (2nd Floor), Road: 8,
                    <br /> Sector: 7, Dhaka 1230
                  </p>
                </div>

                <div className="space-y-2 tracking-wider">
                  <p className="text-xl font-semibold">Email</p>
                  <p className="text-gray-600">mocktestbd@gmail.com</p>
                </div>

                <div className="space-y-2 tracking-wider">
                  <p className="text-xl font-semibold">Phone</p>
                  <p className="text-gray-600">
                    +880 1847 291886, <br />
                    +880 1847 291881
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/JPTTESTBANGLADESH"
                    target="_blank"
                    className="p-2 border rounded-full border-gray-400 text-gray-500 group hover:bg-blue-400 duration-500"
                  >
                    <FaFacebookF className="size-4 group-hover:text-white duration-500" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kaicom-jpt-274196233/"
                    target="_blank"
                    className="p-2 border rounded-full border-gray-400 text-gray-500 group hover:bg-blue-700 duration-500"
                  >
                    <FaLinkedinIn className="size-4 group-hover:text-white duration-500" />
                  </a>
                  <a
                    href="https://www.youtube.com/@JPTBANGLADESH"
                    target="_blank"
                    className="p-2 border rounded-full border-gray-400 text-gray-500 group hover:bg-red-600 duration-500"
                  >
                    <IoLogoYoutube className="size-4 group-hover:text-white duration-500" />
                  </a>
                </div>
              </div>
              <div className="w-1/2 pt-15">
                <div className="p-12 bg-white space-y-5 tracking-wider -mb-[500px] relative z-20 rounded-lg shadow-lg drop-shadow-md">
                  <div className="space-y-2 ">
                    <h1 className="text-2xl font-semibold">Get In Touch</h1>
                    <p className="text-gray-600">
                      Fill out this form for booking a consultant advising
                      session.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-600"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-600"
                  />
                  <textarea
                    name=""
                    id=""
                    placeholder="Enter your message"
                    rows={8}
                    className="w-full border-b border-gray-300 px-2 pb-2 text-sm text-gray-600"
                  ></textarea>

                  <button className="px-8 py-2 bg-blue-700 hover:bg-blue-900 duration-500 text-white font-semibold rounded-lg">
                    Submit Message
                  </button>
                </div>
              </div>
            </div>
          </WebpageWrapper>
        </div>
        <div className="relative z-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.1385425776617!2d90.3980776695894!3d23.86996012505708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4142822ea93%3A0xd211d109862e0a68!2sMusubu%20Japanese%20Language%20and%20Cultural%20Center!5e0!3m2!1sen!2sbd!4v1750827768138!5m2!1sen!2sbd"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
        <Image
          src="/assets/img/overlay-6.png"
          width={612}
          height={408}
          alt=""
          className="absolute -top-20 left-150 size-36"
        />

        <Image
          src="/assets/img/overlay-10.png"
          width={612}
          height={408}
          alt=""
          className="absolute top-0 right-0 size-20"
          // style={{ animationDelay: "0.5s" }}
        />

        <Image
          src="/assets/img/overlay-4.png"
          width={612}
          height={408}
          alt=""
          className="absolute top-150 left-130 size-20"
        />

        <Image
          src="/assets/img/overlay-8.png"
          width={612}
          height={408}
          alt=""
          className="absolute left-90 top-120 size-10"
        />
        <Image
          src="/assets/img/overlay-11.png"
          width={612}
          height={408}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-1/2 rotate-45 size-9"
        />
        <Image
          src="/assets/img/overlay-5.png"
          width={612}
          height={408}
          alt=""
          className="absolute bottom-1/2 -left-30 size-56"
        />
        <Image
          src="/assets/img/overlay-9.png"
          width={612}
          height={408}
          alt=""
          className="absolute bottom-1/2 -right-40 size-86 opacity-35"
        />
      </div>
    </Suspense>
  );
}
