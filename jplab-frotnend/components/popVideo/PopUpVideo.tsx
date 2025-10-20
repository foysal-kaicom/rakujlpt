"use client";

import { useEffect, useState } from "react";
import { usePopVideoModalStore } from "@/stores/usePopVideoStore";
import { RxCross1 } from "react-icons/rx";

const ANIM_MS = 300;

export default function PopUpVideo() {
  const { isOpen, closeModal, checkModal } = usePopVideoModalStore();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  // useEffect(() => {
  //   checkModal();
  // }, []);

  useEffect(() => {
    let t: number | undefined;

    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setActive(true)));

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      setActive(false);

      t = window.setTimeout(() => setMounted(false), ANIM_MS);
    }

    return () => {
      if (t) clearTimeout(t);
    };
  }, [isOpen, closeModal]);

  if (!mounted) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className={`fixed inset-0 z-50 flex items-center justify-center`}
    >
      <div
        onClick={closeModal}
        className={`absolute inset-0 transition-opacity duration-300 ${
          active ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"
        } bg-black`}
      />
      <div
        className={`relative z-10 rounded-lg bg-white/95 p-1 md:p-2 xl:p-4 transform transition-all duration-300
          ${active ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        style={{ width: "fit-content", maxWidth: "95%" }}
      >
        <iframe
          src="https://www.youtube.com/embed/df0h7YMXGZ8?si=U40JHj7A804YIxFt"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-[270px] sm:w-[500px] sm:h-[350px] h-[140px] lg:h-[450px] lg:w-[800px] border-0"
        />

        <button
          onClick={closeModal}
          aria-label="Close video"
          className="absolute -top-3 -right-3 bg-red-600 p-2 rounded-full text-white shadow-lg transform transition-transform duration-300 hover:rotate-180"
        >
          <RxCross1 />
        </button>
      </div>
    </div>
  );
}
