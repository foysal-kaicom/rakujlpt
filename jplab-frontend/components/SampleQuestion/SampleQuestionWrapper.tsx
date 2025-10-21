"use client";

import { useEffect, useState } from "react";

import Modal1 from "@/components/modal1";
import DownloadableQuestion from "./DownloadableQuestion";
import { useAccessFormStore } from "@/stores/useAccessFormStore";
import axios from "axios";
import { toast } from "sonner";

interface Files {
  file: string;
  title: string;
}

export default function SampleQuestionWrapper() {
  const [showModal, setShowModal] = useState(false);
  const [audioFiles, setAudioFiles] = useState<Files[]>([]);
  const [pdfFiles, setPdfFiles] = useState<Files[]>([]);

  const { formData, accessGranted, setFormData, setAccessGranted } =
    useAccessFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessGranted(true);
    setShowModal(false);
  };

  const getQuestionData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/demo-questions/get-all-demo-questions`
      );
      const pdf: Files[] = response?.data?.data?.pdf || [];
      const audio: Files[] = response?.data?.data?.audio || [];

      setPdfFiles(pdf);
      setAudioFiles(audio);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Can not gate sample question at this moment"
      );
    }
  };

  useEffect(() => {
    getQuestionData();
  }, []);

  return (
    <>
      {!accessGranted && (
        <div className="space-y-5">
          <div className="mt-10 bg-red-50 border-l-4 border-red-400 p-5 rounded-xl shadow-md">
            <div className="flex items-start gap-3">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-.01-10a9 9 0 11-0.01 18 9 9 0 010-18z"
                />
              </svg>
              <div className="text-sm sm:text-base text-red-700 leading-relaxed">
                <p className="font-semibold">Warning:</p>
                <p>
                  By registering, you agree that you are only allowed to
                  download the PDF file — not the audio file. Sharing of the
                  document is strictly prohibited.
                  <br />
                  <span className="font-medium">
                    All rights are reserved by JPTBD.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-800 text-white sm:font-semibold text-xs md:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-md shadow-sm transition-all"
          >
            Request Access
          </button>
        </div>
      )}
      {showModal && (
        <Modal1
          form={formData}
          setShowModal={setShowModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <div className="mt-10">
        {accessGranted && (
          <DownloadableQuestion audioFiles={audioFiles} pdfFiles={pdfFiles} />
        )}
      </div>
    </>
  );
}
