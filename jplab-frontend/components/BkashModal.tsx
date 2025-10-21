import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { IoIosCloseCircle } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import React from "react";
import { toast } from "sonner";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

interface FormData {
  booking_id: number;
  sender_number: string;
  trx_number: string;
}

interface BkashModalProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsModalOpen: (open: boolean) => void;
}

export default function BkashModal({
  handleChange,
  handleSubmit,
  setIsModalOpen,
  formData,
}: BkashModalProps) {
  const settings = useBusinessSettingsStore((state) => state.settings);
  const recieverNumber = settings?.bkash_number || "";
  const recieveAmount = settings?.certificate_amount || "";
  const copyNumber = () => {
    navigator.clipboard.writeText(recieverNumber);
    toast.success(`You have copied ${recieverNumber} number`);
  };
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 sm:px-6">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg flex flex-col sm:flex-row overflow-clip relative">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="absolute top-0 right-0 hover:rotate-90 duration-300"
          >
            <IoIosCloseCircle className="text-red-600 size-8" />
          </button>
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-1/2 p-6 sm:p-10 bg-white space-y-5"
          >
            <div className="flex gap-5 justify-between mb-4">
              <div className="w-[calc(100%-100px)] sm:w-full">
                <Image
                  src="/assets/logo/bkashlogo.png"
                  alt="Bkash Logo"
                  height={200}
                  width={200}
                  className="h-fit w-20 sm:w-35"
                />
                <h2 className="sm:text-xl font-bold text-[#E2136E]">
                  Bkash Send Money
                </h2>
              </div>
              <div className="w-15 block sm:hidden mr-3">
                <QRCodeSVG
                  value={recieverNumber}
                  fgColor="#E2136E" // Tailwind's red-600 hex code
                  bgColor="#FFFF"
                  className="size-full"
                />
              </div>
            </div>
            <div className="sm:hidden block text-xs">
              <p className="font-semibold text-gray-600 flex items-center gap-2">
                Bkash Number: {recieverNumber}
                <FiCopy
                  onClick={copyNumber}
                  className="cursor-pointer text-[#E2136E]
                  "
                  title="Copy number"
                />
              </p>
              <p className="mt-1 font-semibold text-gray-600">
                Reference Number: {formData.booking_id}
              </p>
            </div>

            <div className="text-xs sm:text-sm">
              <label className="block font-medium text-gray-700">
                Amount (৳)
              </label>
              <p className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-[#E2136E]">
                {recieveAmount}
              </p>
            </div>

            <div className="text-xs sm:text-sm">
              <label className="block font-medium text-gray-700">
                Sender Number
              </label>
              <input
                type="text"
                name="sender_number"
                value={formData.sender_number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-[#E2136E]"
                required
              />
            </div>

            <div className="text-xs sm:text-sm">
              <label className="block font-medium text-gray-700">
                Transaction Number
              </label>
              <input
                type="text"
                name="trx_number"
                value={formData.trx_number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-[#E2136E]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E2136E] text-white font-semibold py-2 rounded hover:bg-[#c41060] transition text-xs sm:text-sm "
            >
              Submit Payment Info
            </button>
          </form>

          {/* QR Code Section */}
          <div className="bg-gray-50/40 w-full sm:w-1/2 p-6 sm:p-8 hidden sm:flex flex-col items-center justify-center text-center">
            <p className="mb-3 font-semibold text-[#E2136E] hidden sm:inline">
              Scan to Pay via Bkash
            </p>
            <div className="w-[80%] max-w-[250px] hidden sm:block">
              <QRCodeSVG
                value={recieverNumber}
                fgColor="#E2136E" // Tailwind's red-600 hex code
                bgColor="#FFFF"
                className="size-full"
              />
            </div>
            <p className="mt-3 sm:text-lg font-semibold text-gray-600 flex gap-2 items-center">
                Bkash Number: {recieverNumber}
                                <FiCopy
                  onClick={copyNumber}
                  className="cursor-pointer text-[#E2136E]"
                  title="Copy number"
                />
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-600">
                Reference Number: {formData.booking_id}
              </p>
          </div>
        </div>
      </div>
    </>
  );
}
