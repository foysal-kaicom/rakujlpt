import Image from "next/image";
import Link from "next/link";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

interface TestimonialItem {
  id: number | string;
  candidate_name: string;
  candidate_designation: string;
  candidate_image: string;
  content: string;
  created_at: string;
}

interface TestimonialCardProps {
  item: TestimonialItem;
}

export default function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <Link href={`/testimonial/${item.id}`}>
      <div className="flex flex-col justify-center items-center text-center group p-5">
        {item.candidate_image ? (
          <Image
            src={item.candidate_image}
            width={573}
            height={435}
            alt="overlay"
            className="size-36 aspect-square object-cover rounded-full relative z-10 p-2 bg-white shadow-md"
          />
        ) : (
          <IoPersonCircleOutline className="size-36 aspect-square object-cover rounded-full relative z-10 bg-white shadow-md  text-blue-300" />
        )}

        <div className="bg-blue-50 shadow p-5 rounded-md pt-20 -mt-16 group-hover:shadow-lg duration-500 min-h-[280px]">
          <div>
            <FaQuoteLeft className="size-2 sm:size-3 md:size-4 mr-1 text-blue-900" />
            <div
              className="text-sm sm:text-base md:text-lg line-clamp-2 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: item?.content ?? "",
              }}
            />
            <FaQuoteRight className="size-2 sm:size-3 md:size-4 ml-1 text-blue-900 float-end" />
          </div>
          <p className="sm:text-sm md:text-base font-semibold primary-text-color mt-5 mb-1">
            {item.candidate_name}
          </p>
          <p className="text-xs sm:text-sm tracking-wide text-gray-600">
            {item.candidate_designation}
          </p>
        </div>
      </div>
    </Link>
  );
}
