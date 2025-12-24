"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import PricingCard from "../PricingCard";

// Define plan type
interface Plan {
  id: number;
  name: string;
  price: string;
  description: string;
  short_description: string;
  is_popular?: boolean;
  is_home: boolean;
  is_active: number;
}

const defaultPlans: Plan[] = [];

const PricingSection = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [plansData, setPlansData] = useState<Plan[]>(defaultPlans);

  // modal state
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const getPlansData = async () => {
    try {
      const response = await axiosInstance.get<{
        success: boolean;
        data: Plan[];
      }>(`/subscriptions`);
      if (response?.data?.success) {
        const showOnHome = response.data.data.filter(
          (plan) => plan.is_home == true
        );
        setPlansData(showOnHome);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Can not get subscription plans at this moment"
      );
    }
  };

  useEffect(() => {
    getPlansData();
  }, []);

  const subscribeModal = (plan: Plan) => {
    if (!isAuthenticated) {
      router.push(`/sign_in?callbackUrl=${encodeURIComponent("/")}`);
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSubscribe = async (plan: Plan) => {
    try {
      const response = await axiosInstance.post(`/subscribe`, {
        package_id: plan.id,
      });
      const url = response?.data?.url;
      if (
        response.status === 200 &&
        response?.data?.status === "success" &&
        typeof url === "string" &&
        /^https?:\/\/.+/.test(url)
      ) {
        window.location.href = url;
        toast.success(response?.data?.message || "Subscription successful");
      } else {
        toast.success(response?.data?.message || "Subscription successful");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Subscription failed"
      );
    }
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-blue-600">Learning Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan to accelerate your Japanese language
            learning journey.
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              href="/packages"
              className="px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
            >
              See All Packages
            </Link>
          </div>
        </div>

        <div
          className={`gap-8 flex flex-wrap justify-center`}
        >
          {plansData.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              subscribeModal={subscribeModal}
            />
          ))}
        </div>

        {/* Modal Start */}
        {isModalOpen && selectedPlan && (
          <div
            className="fixed bg-black/25 backdrop-blur-xs inset-0 flex items-center justify-center z-50 drop-shadow-sm"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedPlan(null);
              setAgreed(false);
            }}
          >
            <div
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()} // stop closing when clicking inside modal
            >
              {/* Cross button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedPlan(null);
                  setAgreed(false);
                }}
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-4">Confirm Subscription</h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to subscribe to{" "}
                <span className="font-semibold">{selectedPlan.name}</span>?
              </p>

              <label className="flex items-center mb-6 space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 underline">
                    Terms and Conditions
                  </Link>
                </span>
              </label>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPlan(null);
                    setAgreed(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={!agreed}
                  className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
                    agreed
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-300 text-white cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (selectedPlan) handleSubscribe(selectedPlan);
                    setIsModalOpen(false);
                    setSelectedPlan(null);
                    setAgreed(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal End */}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">No cards required</p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>✓ No monthly fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
