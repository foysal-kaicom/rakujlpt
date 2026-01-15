"use client";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";

import { homePageService } from "@/services/common.service";
import { Partner } from "@/types/index.types";

export default function AssociatedSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  const getPartnersList = async () => {
    try {
      const res = await homePageService.getPartnerList()
      setPartners(res || []);
    } catch (error) {
      setPartners([]);
    }
  };

  useEffect(() => {
    getPartnersList();
  }, []);

  return (
    <>
      <section className="relative py-10 px-6 bg-linear-to-br from-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="px-2 lg:px-8 container mx-auto text-center text-black">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={4000}
            autoplay={{
              // delay: 1,
              disableOnInteraction: false,
            }}
            allowTouchMove={false}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {partners.concat(partners).map((item, i) => (
              <SwiperSlide key={i}>
                <div className="inline-flex shrink-0 hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-12 object-contain grayscale-100 mx-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
