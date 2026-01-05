"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import PricingCard from "../PricingCard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

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
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [plansData, setPlansData] = useState<Plan[]>(defaultPlans);
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
          t(
            "pricing.error_fetching_plans",
            "Cannot get subscription plans at this moment"
          )
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
        toast.success(
          response?.data?.message ||
            t("pricing.modal.success", "Subscription successful")
        );
      } else {
        toast.success(
          response?.data?.message ||
            t("pricing.modal.success", "Subscription successful")
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          t("pricing.modal.failed", "Subscription failed")
      );
    }
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("pricing.title")}{" "}
            <span className="text-blue-600">{t("pricing.highlight")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("pricing.subtitle")}
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              href="/packages"
              className="px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
            >
              {t("pricing.cta_packages")}
            </Link>
          </div>
        </div>

        <div className={`gap-8 flex flex-wrap justify-center`}>
          {plansData.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
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
              onClick={(e) => e.stopPropagation()}
            >
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

              <h3 className="text-2xl font-bold mb-4">
                {t("pricing.modal.title")}
              </h3>
              <p className="text-gray-700 mb-4">
                {t("pricing.modal.confirm_question")}{" "}
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
                  {t("pricing.modal.agree_terms")}{" "}
                  <Link href="/terms" className="text-blue-600 underline">
                    {t("pricing.modal.terms_link")}
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
                  {t("pricing.modal.cancel")}
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
                  {t("pricing.modal.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal End */}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{t("pricing.footer_note")}</p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            {(
              t("pricing.footer_features", { returnObjects: true }) as string[]
            ).map((item, idx) => (
              <span key={idx}>✓ {item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
