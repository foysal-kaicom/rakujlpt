"use client";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { useTranslation } from "react-i18next";

import TestimonialCard from "../TestimonialCard";

import { homePageService } from "@/services/common.service";
import { Testimonial } from "@/types/index.types";

export default function TestimonialsSection() {
  const { t } = useTranslation("common");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const reviewList = async () => {
    try {
      const res = await homePageService.getReviewList()
      setTestimonials(res || []);
    } catch (error) {
      setTestimonials([]);
    }
  };

  useEffect(() => {
    reviewList();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("success")} <span className="text-blue-600">{t("stories")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("testimonialText")}
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide className="mb-5">
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
