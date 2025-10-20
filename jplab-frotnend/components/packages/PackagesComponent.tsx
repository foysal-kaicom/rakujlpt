"use client";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../Loader";

// Define plan type
interface Plan {
  id: number;
  name: string;
  price: string;
  description: string;
  short_description: string;
  is_popular?: boolean;
}

const defaultPlans: Plan[] = [];

const PackagesComponent = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [plansData, setPlansData] = useState<Plan[]>([]);

  // modal state
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loader, setLoader] = useState(false);

  const getPlansData = async () => {
    setLoader(true);
    try {
      const response = await axios.get<{ success: boolean; data: Plan[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions`
      );
      if (response?.data?.success) {
        setLoader(false);
        setPlansData(response.data.data);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(
        error?.response?.data?.message ||
          "Can not get subscription plans at this moment"
      );
    }
    setLoader(false);
  };

  useEffect(() => {
    getPlansData();
  }, []);

  const subscribeModal = (plan: Plan) => {
    if (!isAuthenticated) {
      router.push(`/sign_in?redirecturl=packages`);
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSubscribe = async (plan: Plan) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe`,
        { package_id: plan.id }
      );
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
    <>
    {loader && <Loader />}
    <section
      id="pricing"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-blue-600">Learning Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan to accelerate your Japanese language
            learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansData.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative ${
                plan.is_popular ? "ring-4 ring-blue-200 relative" : ""
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                </div>
                <span>
                  {plan.short_description && parse(plan.short_description)}
                </span>
              </div>

              <div className="space-y-4 mb-12">
                <p className="text-gray-600">
                  {plan.description && parse(plan.description)}
                </p>
              </div>

              <div className="w-full absolute bottom-3 flex justify-center">
                <button
                  className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 mr-16 ${
                    plan.is_popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={() => subscribeModal(plan)}
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {plansData.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="p-2 rounded-lg transition-all duration-200 bg-gray-200 text-gray-400 cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              <button className="min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                1
              </button>
              <button className="min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg">
                2
              </button>
              <button className="min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg">
                3
              </button>
              <button className="min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 bg-transparent text-gray-400 cursor-default">
                ...
              </button>
              <button className="min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg">
                10
              </button>
            </div>

            <button className="p-2 rounded-lg transition-all duration-200 bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        {/* Modal Start */}
        {isModalOpen && selectedPlan && (
          <div
            className="fixed bg-gray bg-opacity-50 backdrop-blur-sm inset-0 flex items-center justify-center z-50"
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
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    agreed
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-300 text-white cursor-not-allowed"
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
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial • No credit card required
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ Money-back guarantee</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default PackagesComponent;
