'use client'

import { usePopVideoModalStore } from "@/stores/usePopVideoStore";

import { FaYoutube } from "react-icons/fa";

export default function PoPVideoButton() {
  const { openModal } = usePopVideoModalStore();

  return (
    <button
      onClick={openModal}
      className="p-1.5 sm:p-3 bg-red-600 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full inline-flex items-center gap-2 hover:bg-red-500 cursor-pointer duration-500 ease-in fixed bottom-10 right-5 animate-bounce z-40"
    >
      <FaYoutube className="size-7 md:size-10" />
    </button>
  );
}
