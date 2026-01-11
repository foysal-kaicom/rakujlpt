"use client";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import TestimonialCard from "../TestimonialCard";
import { useTranslation } from "react-i18next";

interface Testimonial {
  id: null | number;
  body: string;
  reviewer_name: string;
  reviewer_designation: string;
  rating: number;
  image: string;
}

export default function TestimonialsSection() {
  const { t } = useTranslation("common");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const reviewList = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/list`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setTestimonials(data?.data || []);
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
            <SwiperSlide>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
