"use client";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import ContactSocialComponent from "./ContactSocialComponent";
import { useTranslation } from "react-i18next";

export default function ContactUsComponent() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Contact Us", to: "/contact" },
  ];

  const { t } = useTranslation("common");
  return (
      <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-purple-100 via-pink-50 to-blue-100 pt-5">
        {/* Funky background blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/40 rounded-full blur-[120px] -z-10"></div>

        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="w-full text-center mt-10 mb-14">
            <h1 className="text-5xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-700 via-pink-500 to-blue-500">
                {t("contactUsPage.title")}
              </span>{" "}
              💬
            </h1>
            <p className="text-gray-600 mt-2 text-lg tracking-wide">
              {t("contactUsPage.description")}
            </p>
          </div>

          <ContactSocialComponent />

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
  );
}
