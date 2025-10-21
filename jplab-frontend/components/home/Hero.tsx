"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { IoLogIn } from "react-icons/io5";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import WebpageWrapper from "../wrapper/WebpageWrapper";
import Link from "next/link";

export default function Hero({}) {
  const heroText = [
    {
      preText: "Your Officially Recognized Path to Study and Work in Japan",
      mainText: "The Official Gateway to Japan",
      subText:
        "The JPT is trusted and utilized by the Japanese Immigration Services Agency and over 500 academic institutions. Start your journey with the confidence that your qualification is officially recognized.",
    },
    {
      preText: "Don't Let Rigid Schedules Delay Your Dreams",
      mainText: "Test on Your Schedule",
      subText:
        "With test dates available 12 times a year, the JPT fits your timeline. Prepare at your own pace and test when you are ready, without the long six-month wait.",
    },
    {
      preText: "Go Beyond a Simple Pass or Fail",
      mainText: "Measure Your True Progress",
      subText:
        "The JPT's detailed 200 point scoring system measures your exact ability. Track your improvement over time and provide tangible proof of your progress to universities and employers.",
    },
    {
      preText: "Your Journey to Japanese Proficiency Starts Here",
      mainText: "For Beginners and Beyond",
      subText:
        "Whether you are just beginning (N5 level) or advancing your skills (N4 level), the JPT is the single, comprehensive test designed to measure your communication skills.",
    },
  ];

  const [visibleIndexes, setVisibleIndexes] = useState(0);

  const increment = () => {
    setVisibleIndexes((prev) => (prev < heroText.length - 1 ? prev + 1 : 0));
  };

  const decrement = () => {
    setVisibleIndexes((prev) => (prev > 0 ? prev - 1 : heroText.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndexes((prev) => {
        if (prev >= heroText.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [heroText.length]);

  return (
    <div className="relative overflow-x-clip">
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
      />

      <Image
        src="/assets/img/overlay-4.png"
        width={612}
        height={408}
        alt=""
        className="absolute top-150 left-130 size-20"
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
        className="absolute top-1/2 -left-30 size-56"
      />
      <Image
        src="/assets/img/overlay-9.png"
        width={612}
        height={408}
        alt=""
        className="absolute -bottom-40 -right-40 size-86 opacity-35"
      />

      <WebpageWrapper>
        <div className="py-5 relative z-10">
          <div className=" flex flex-col-reverse lg:flex-row gap-x-20 items-center group pb-10 min-h-[calc(100vh-80px)]">
            <div className="absolute flex lg:flex-col gap-3 left-0 lg:-left-14 z-30">
              <div className=" opacity-10 group-hover:opacity-100 duration-300">
                <button
                  onClick={decrement}
                  className="bg-[#0000006b] text-white size-8 rounded-full flex items-center justify-center"
                >
                  <IoMdArrowDropleft className="size-6" />
                </button>
              </div>
              <div className="opacity-10 group-hover:opacity-100 duration-300">
                <button
                  onClick={increment}
                  className="bg-[#0000006b] text-white size-8 rounded-full flex items-center justify-center"
                >
                  <IoMdArrowDropright className="size-6" />
                </button>
              </div>
            </div>
            <div className="w-full min-h-[450px] lg:w-[calc(100%-400px)] xl:w-[calc(100%-450px)] 2xl:w-[calc(100%-550px)] relative group">
              {heroText.map((text, index) => (
                <div
                  key={index}
                  className={`space-y-7 absolute top-1/2 -translate-y-1/2 left-0  ${
                    visibleIndexes == index
                      ? "opacity-100 z-20"
                      : "opacity-0 z-10"
                  }`}
                >
                  <p
                    className={`text-sm sm:text-base md:text-lg 2xl:text-xl text-gray-600 duration-500 ease-in ${
                      visibleIndexes == index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-10"
                    }`}
                  >
                    {text.preText}
                  </p>
                  <h1
                    className={`text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold primary-text-color duration-500 ease-in ${
                      visibleIndexes == index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-10"
                    }`}
                  >
                    {text.mainText}
                  </h1>
                  <p
                    className={`text-sm sm:text-base md:text-lg 2xl:text-xl text-gray-600 duration-500 ease-in ${
                      visibleIndexes == index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {text.subText}
                  </p>
                  <div
                    className={`space-x-5 space-y-2 duration-500 ease-in ${
                      visibleIndexes == index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <Link
                      href="/registration"
                      className="px-5 sm:px-10 py-1.5 sm:py-3 bg-[#173fa4] text-white text-xs sm:text-sm md:text-base font-semibold rounded-md inline-flex items-center gap-2 hover:bg-blue-700 cursor-pointer duration-500 ease-in"
                    >
                      Register <IoLogIn className="size-5 md:size-7" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[400px] xl:w-[450px] 2xl:w-[550px] flex flex-row  gap-4 justify-end items-center">
              <Image
                src="/assets/img/home/h-8.png"
                width={400}
                height={400}
                alt=""
                className="w-full bg-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
