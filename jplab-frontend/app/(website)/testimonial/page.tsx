import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Image from "next/image";
import HeadLine2 from "@/components/HeadLine2";
import BreadCrumb from "@/components/BreadCrumb";
import TestimonialCard from "@/components/TestimonialCard";
import axios from "axios";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";

interface TestimonialItem {
  id: number | string;
  candidate_name: string;
  candidate_designation: string;
  candidate_image: string;
  content: string;
  created_at: string;
}

async function getTestimonialData(): Promise<TestimonialItem[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/list`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    const allTestimonials: TestimonialItem[] = response.data.data || [];

    return allTestimonials;
  } catch (error) {
    console.error("Failed to fetch testimonial data:", error);
    return [];
  }
}

export default async function AllTestimonialsPage() {
  const allTestimonials = await getTestimonialData();
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Testimonial", to: "/testimonial" },
  ];

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className=" pb-15 pt-5 relative overflow-clip">
        <div className="relative z-10">
          <WebpageWrapper>
            <BreadCrumb breadCrumbData={breadCrumbData} />
            <div className="w-1/2 mt-5">
              <HeadLine2 preText="" subText="" mainText="Testimonial" />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 mt-5">
              {allTestimonials.map((t, i) => (
                <div key={i}>
                  <TestimonialCard item={t} />
                </div>
              ))}
            </div>
          </WebpageWrapper>
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

        {/* <Image
            src="/assets/img/overlay-4.png"
            width={612}
            height={408}
            alt=""
            className="absolute top-150 left-130 size-20"
          /> */}

        <Image
          src="/assets/img/overlay-8.png"
          width={612}
          height={408}
          alt=""
          className="absolute left-0 top-1/5 -translate-1/2 rotate-45 size-9"
        />
        <Image
          src="/assets/img/overlay-4.png"
          width={612}
          height={408}
          alt=""
          className="absolute right-0 top-1/3 -translate-1/2 rotate-45 size-9"
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
          className="absolute bottom-10 -right-40 size-76 opacity-35"
        />
      </div>
    </Suspense>
  );
}
