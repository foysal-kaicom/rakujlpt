"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import axios from "axios";

import WebpageWrapper from "../wrapper/WebpageWrapper";
import HeadLine from "../HeadLine";
import TestimonialCard from "../TestimonialCard";

import { AiOutlineLogin } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface TestimonialItem {
  id: number | string;
  candidate_name: string;
  candidate_designation: string;
  candidate_image: string;
  content: string;
  created_at: string;
}

export default function HomeTestimonial() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getTestimonialData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/list`);

      const allTestimonial = response.data.data || [];
      setTestimonials(allTestimonial.slice(0, 6));
    } catch (error) {
      console.error("Failed to fetch all testimonial data:", error);
      return [];
    }
  };

  useEffect(() => {
    getTestimonialData();
  }, []);

  return (
    <div className="relative z-10">
      <WebpageWrapper>
        <div className="lg:w-2/3 lg:mx-auto sm:text-center">
          <HeadLine
            preText="Words from People"
            mainText="Voices you can trust."
            subText="Read feedback from those who have successfully navigated our examination process. Their testimonials highlight the clarity, efficiency, and reliability we strive for in every step."
          />
        </div>

        <div className="flex sm:justify-center mt-5">
          <Link
            href="/testimonial"
            className="px-5 py-1.5 sm:py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg inline-flex items-center gap-1"
          >
            Show all reviews
            <AiOutlineLogin className="size-5" />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1224: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav !== "boolean") {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="">
                <TestimonialCard item={t} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-5 mt-5">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`rounded-full border-none size-[12px] opacity-100 ${
                    activeIndex === i
                      ? "primary-background-color"
                      : "bg-gray-300"
                  }`}
                  onClick={() => {
                    swiperRef.current?.slideToLoop(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
