import { FaCertificate } from "react-icons/fa";

// interface CertificateProps {
//   studentName: string;
//   testName: string;
//   score: number;
//   totalScore: number;
//   date: string;
// }

export default function Certificate() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="relative w-full max-w-5xl bg-gradient-to-r from-white via-gray-50 to-white rounded-3xl shadow-xl p-12 border-[12px] border-pink-300">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full"></div>

        {/* Watermark Seal */}
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <FaCertificate className="text-yellow-400 text-[260px]" />
        </div>

        {/* Header */}
        <div className="text-center relative z-10 mb-10">
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tracking-wide">
            Certificate of Achievement
          </h1>
          <p className="text-lg text-gray-600 italic">
            This certificate is proudly presented to
          </p>
        </div>

        {/* Student Name */}
        <div className="text-center relative z-10 mb-6">
          <h2 className="text-6xl font-serif font-extrabold text-purple-700">
            {/* {studentName} */}
            Arif Akib
          </h2>
        </div>

        {/* Ribbon / Badge */}
        <div className="relative z-10 text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 px-10 py-3 rounded-full text-white text-lg font-semibold shadow-lg">
            Successfully Completed
          </div>
        </div>

        {/* Test Info */}
        <div className="text-center relative z-10 text-gray-700 text-lg mb-12 space-y-2">
          <p>
            For completing the <span className="font-semibold">
              {/* {testName} */}
JPT
            </span>
          </p>
          <p>
            Score:{" "}
            <span className="font-semibold">
              {/* {score} / {totalScore} */}
              180 / 200
            </span>
          </p>
          <p className="text-gray-500">
            {/* {date} */}
            November 6 , 2025
            </p>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between relative z-10 mt-12 px-20">
          <div className="text-center">
            <p className="border-t-2 border-gray-400 w-40 mx-auto"></p>
            <p className="font-serif text-gray-700 mt-2 italic text-lg">
              Instructor
            </p>
          </div>
          <div className="text-center">
            <p className="border-t-2 border-gray-400 w-40 mx-auto"></p>
            <p className="font-serif text-gray-700 mt-2 italic text-lg">
              Administrator
            </p>
          </div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-purple-600 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-purple-600 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-purple-600 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-purple-600 rounded-br-xl"></div>
      </div>
    </div>
  );
}
