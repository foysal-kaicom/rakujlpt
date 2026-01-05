"use client";

import Link from "next/link";
import { MdLockClock } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function ServiceSection() {
  const { t } = useTranslation("common");

  const brands = [
    {
      name: "JPT",
      img: "/assets/brands/jpt.png",
      background: "/assets/japan/j.jpg",
      text: t("service.brands.jpt"),
      status: 1,
    },
    {
      name: "JLPT",
      img: "/assets/brands/jlpt.png",
      background: "/assets/japan/j2.jpg",
      text: t("service.brands.jlpt"),
      status: 1,
    },
    {
      name: "NAT",
      img: "/assets/brands/nat.png",
      background: "/assets/japan/j3.jpg",
      text: t("service.brands.nat"),
      status: 0,
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-linear-to-br from-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="px-6 lg:px-8 relative container mx-auto text-center text-black">
        <h2 className="text-4xl font-bold mb-6">
          {t("service.title")}{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            JPT
          </span>
          ,
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            JLPT
          </span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {t("service.description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((item, i) => (
            <div
              key={i}
              className="relative rounded-3xl overflow-hidden bg-cover bg-center transition-all duration-500 ease-out hover:scale-[1.03] group shadow-lg"
              style={{ backgroundImage: `url(${item.background})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-purple-300/10 mix-blend-overlay z-10"></div>

              {!item.status && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md text-white z-30 flex gap-2 justify-center items-center text-xl font-medium">
                  <MdLockClock className="opacity-80" />
                  {t("service.coming_soon")}
                </div>
              )}

              <div className="relative z-20 min-h-[300px] lg:min-h-[250px] flex flex-col justify-center items-center p-6">
                <h3 className="text-5xl md:text-6xl font-bold bg-linear-to-bl from-purple-500 via-pink-400 to-violet-500 bg-clip-text text-transparent tracking-tight transition-all duration-500 group-hover:scale-110 group-hover:translate-y-[-4px]">
                  {item.name}
                </h3>

                <p className="text-purple-600 text-sm md:text-base xl:text-lg text-center mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-white/90 backdrop-blur-md rounded-xl p-4 w-[85%] mx-auto shadow-md">
                  {item.text}
                </p>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-tr from-purple-300/40 to-pink-200/40 blur-3xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/mock_test_select"
            className="px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
          >
            {t("service.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
