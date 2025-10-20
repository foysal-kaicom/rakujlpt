import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import HeadLine2 from "@/components/HeadLine2";
import BreadCrumb from "@/components/BreadCrumb";
import axios from "axios";
import Link from "next/link";
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
    console.error("Failed to fetch news data:", error);
    return [];
  }
}

export default async function TestimonialDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/view/${slug}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    }
  );
  const testimonialDetails: TestimonialItem = response.data.data || {};
  const allTestimonials = await getTestimonialData();

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-UK", options);
  }

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Testimonial", to: "/testimonial" },
    { name: "Testimonial Details", to: `/testimonial/${slug}` },
  ];

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <WebpageWrapper>
          <div className="pt-5">
            <BreadCrumb breadCrumbData={breadCrumbData} />
            <div className="lg:w-1/2 lg:mx-auto mt-5">
              <HeadLine2 preText="" subText="" mainText="Testimonial Details" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10 pb-15 ">
            {/* Main Testimonial */}
            <article className="lg:col-span-2 bg-white shadow-md rounded-2xl overflow-hidden">
              {/* Featured Image */}
              <div className="relative size-[200px] rounded-full overflow-clip mx-auto mt-10">
                <Image
                  src={testimonialDetails?.candidate_image || "/"}
                  alt={testimonialDetails?.candidate_name || ""}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start gap-3 mb-6">
                  <div
                    className="text-lg text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: testimonialDetails?.content ?? "",
                    }}
                  />
                </div>

                <div className="flex justify-between items-center gap-4 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {testimonialDetails?.candidate_designation} —{" "}
                    {formatDate(testimonialDetails.created_at)}
                  </p>
                  <p className="font-semibold text-gray-900">
                    {" "}
                    {testimonialDetails?.candidate_name}
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar Testimonials */}
            <aside className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Other Testimonials
              </h2>
              {allTestimonials.map((item) => (
                <Link href={`/testimonial/${item?.id}`} key={item.id}>
                  <div className={`flex items-center gap-4 p-4 rounded-lg shadow-sm hover:shadow-md duration-200 cursor-pointer hover:bg-white mb-6 ${testimonialDetails?.id == item?.id ?"bg-white" :"bg-gray-100"}`}>
                    <Image
                      src={item?.candidate_image || "/"}
                      alt={item?.candidate_name || ""}
                      width={50}
                      height={50}
                      className="rounded-full border border-gray-200 size-[50px]"
                    />
                    <div className="w-[calc(100%-50px)]">
                      <div
                        className="font-semibold text-gray-800 line-clamp-1"
                        dangerouslySetInnerHTML={{
                          __html: item?.content ?? "",
                        }}
                      />
                      <p className="text-sm text-gray-500">
                        — {item?.candidate_name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </aside>
          </div>
        </WebpageWrapper>
      </Suspense>
    </>
  );
}
