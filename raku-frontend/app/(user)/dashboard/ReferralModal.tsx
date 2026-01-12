import { useEffect } from "react";

import { MdCopyAll } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function ReferralModal({ isOpen, onClose, referralLink }: any) {
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-pink-800 to-violet-700 p-6 shadow-2xl animate-fade-in font-medium">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute z-10 translate-x-1/2 right-1/2 -bottom-12 text-white hover:rotate-90 size-10 duration-300 rounded-full bg-rose-500/20 cursor-pointer text-2xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
          Invite Friends &{" "}
          <span className="text-violet-200">Earn Rewards!</span>
        </h2>
        <p className="mt-2 text-sm text-purple-100 drop-shadow-sm">
          Share your referral link and get <strong>20% commission</strong> for
          every successful signup.
        </p>

        {/* Referral Link */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-white">
            Your referral link
          </label>
          <div className="flex items-center gap-2 bg-white rounded-md">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 rounded-xl border border-white/30 bg-white px-4 py-2 text-sm backdrop-blur-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={copyLink}
              className="rounded-md bg-purple-700 px-3 py-1 text-sm font-bold text-white transition-transform hover:scale-105 cursor-pointer mr-1 shadow shadow-purple-500 border-b border-b-white/50 flex items-center gap-1"
            >
              <MdCopyAll className="size-4" />
              Copy
            </button>
          </div>
        </div>

        {/* Share */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-white">Share via</p>
          <div className="flex gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                referralLink
              )}`}
              target="_blank"
              className="rounded-full text-blue-600 font-semibold bg-white hover:scale-110 duration-300"
            >
              <FaFacebook className="size-8" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(referralLink)}`}
              target="_blank"
              className="rounded-full bg-green-600 font-semibold text-white hover:scale-110 duration-300"
            >
              <FaWhatsapp className="size-8" />
            </a>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 rounded-2xl bg-white/20 p-4 text-sm text-yellow-100 text-center font-medium backdrop-blur-sm">
          💡 Tip: Invite more friends, watch your rewards skyrocket!
        </div>
      </div>
    </div>
  );
}
