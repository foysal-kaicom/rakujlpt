import Image from "next/image";
import Link from "next/link";

import { SlCalender } from "react-icons/sl";

interface Exam {
  title: string;
  description: string;
  exam_date: string;
  application_deadline: string;
  image: string | null;
  result_publish_date: string;
  slug: string;
  start_time: string;
  end_time: string;
  fee: string;
  available_to_apply:boolean
}

interface ExamCardProps {
  exam: Exam;
  index: number;
}

export default function ExamCard({ exam, index }: ExamCardProps) {
  const bgColors = [
    "bg-gradient-to-br from-blue-500 to-indigo-600",
    // "bg-gradient-to-br from-green-400 to-teal-600",
    // "bg-gradient-to-br from-pink-500 to-rose-600",
    "bg-gradient-to-br from-yellow-400 to-amber-500",
    // "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    // "bg-gradient-to-br from-red-400 to-pink-500",
    // "bg-gradient-to-br from-cyan-400 to-blue-500",
    // "bg-gradient-to-br from-lime-400 to-green-500",
    // "bg-gradient-to-br from-amber-400 to-yellow-500",
    // "bg-gradient-to-br from-emerald-400 to-teal-500",
    // "bg-gradient-to-br from-violet-500 to-purple-700",
    // "bg-gradient-to-br from-sky-400 to-indigo-500",
  ];

  function formatDate(dateStr: string): string {
    const [day, month, year] = dateStr.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return `${formattedDate} , ${year}`;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-6 p-3 sm:p-8 bg-white border border-gray-100 rounded-md shadow-md hover:shadow-xl transition-shadow duration-500 min-h-[450px] overflow-clip">
        <div className="flex flex-col items-center gap-6 ">
{/* Icon Circle */}
        <div
          className={`flex items-center justify-center size-20 rounded-full text-white text-3xl shadow-md ${
            bgColors[index % bgColors.length]
          }`}
        >
          <SlCalender className="size-8" />
        </div>

        {/* Title */}
        <h3 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 line-clamp-2">
          {exam.title}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
          <span className="text-gray-500">Exam Fee</span>
          <span className="font-semibold text-gray-800">{exam.fee}</span>
          <span className="text-gray-500">Exam Time</span>
          <span className="font-semibold text-gray-800">
            {exam.start_time}{" "}
            <span className="text-blue-600 font-medium">to</span>{" "}
            {exam.end_time}
          </span>

          <span className="text-gray-500">Exam Date</span>
          <span className="font-semibold text-gray-800">
            {exam.exam_date}
          </span>

          <span className="text-red-500 font-medium">Deadline</span>
          <span className="font-semibold text-gray-800">
            {exam.application_deadline}
          </span>

          <span className="text-gray-500">Result Date</span>
          <span className="font-semibold text-gray-800">
            {exam.result_publish_date}
          </span>
        </div>
        </div>
        

        {/* Optional CTA Button */}
        {!exam?.available_to_apply ? (
          <p className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md text-sm font-medium text-center transition-colors duration-300 cursor-not-allowed">
            Can’t apply
          </p>
        ) : (
          <Link
            href={`/registration_terms/${exam.slug}`}
            className="mt-4 w-full bg-[#173fa4] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-800 text-center transition-colors duration-300"
          >
            Apply for Exam
          </Link>
        )}
      </div>
    </>
  );
}
