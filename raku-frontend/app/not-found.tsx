"use client";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-purple-200 px-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-lg w-full text-center border border-gray-200">
        <img src="/assets/img/raku_sad.gif" alt="" className="h-20 mx-auto" />

        <h1 className="text-6xl font-extrabold text-purple-700 mb-2">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Not Found</p>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-violet-700 transition-all duration-300 shadow-md"
        >
          Return to Home page
        </button>
      </div>
    </div>
  );
}
