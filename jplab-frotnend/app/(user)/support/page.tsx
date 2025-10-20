"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { IoIosSend } from "react-icons/io";
import SuspenseLoader from "@/components/SuspenseLoader";
import { useAuthStore } from "@/stores/useAuthStore";

interface Message {
  candidate_id: number;
  user_id: number | null;
  body: string;
  created_at: string;
}

export default function SupportForm() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Support", to: "/support" },
  ];

  const uID = useAuthStore().user?.id;
  const [loading, setLoading] = useState(false);
  const [msgLoading, setMsgLoading] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const el = chatContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessageData = async () => {
    try {
      const response = await axiosInstance.get(
        `support/get-conversation/${uID}`
      );
      setMessages(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    if (uID) {
      getMessageData();
    }
  }, [uID]);

  const handleSend = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await axiosInstance.post("support/send-message", {
        candidate_id: uID,
        body: input,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="flex flex-col bg-gray-50 ">
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="mt-5 lg:px-8 flex flex-col">
          <UserHeadline mainText="Support Chat" preText="" subText="" />

          {/* Chat Box */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-end h-[55vh]">
            <div
              ref={chatContainerRef}
              className="overflow-y-auto p-4 space-y-4"
            >
              {messages.length === 0 && msgLoading && (
                <div className="text-center text-sm text-gray-400 mt-5">
                  Loading messages ..
                </div>
              )}

              {messages.length === 0 && !msgLoading && (
                <div className="text-center text-sm text-gray-400 mt-5">
                  No conversation started !!
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end ${
                    msg.user_id === null ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative px-4 py-2 rounded-2xl max-w-xs sm:max-w-sm text-sm break-words shadow-md transition-all duration-300 ${
                      msg.user_id === null
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.body}</p>
                    <p className="text-right mt-1 text-xs">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-t-gray-300 px-4 py-3 flex gap-2 items-center w-full"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-[calc(100%-10px)] sm:w-[calc(100%-100px)] px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-sm bg-white"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 h-10 w-10 sm:w-[100px] flex items-center justify-center gap-1 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {" "}
                <span>
                  <IoIosSend />
                </span>
                <span className="hidden sm:block">
                  {loading ? "Sending..." : "Send"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
