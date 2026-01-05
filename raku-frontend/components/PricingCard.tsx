"use client";
import parse from "html-react-parser";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function PricingCard({ plan }: any) {
  const { isAuthenticated, token, user } = useAuthStore();
  const updateUser = useAuthStore((state) => state.updateUser);
  const { t } = useTranslation("common");
  const router = useRouter()

  useEffect(() => {
    if (token && isAuthenticated) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/candidate/profile");
      const {
        user_subscriptions_id,
        current_package_id,
        current_package_name,
        is_subscribed,
        is_free,
      } = response?.data?.data;

      updateUser({
        user_subscriptions_id,
        current_package_id,
        current_package_name,
        is_subscribed,
        is_free,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const gotoCheckout = (id: number) => {
    if (!isAuthenticated) {
      router.push(`/sign_in?callbackUrl=${encodeURIComponent("/packages")}`);
      return;
    }else{
      router.push(`/checkout/${id}`);
    }
  };

  return (
    <div
      key={plan.id}
      className={`p-0.5 w-[350px] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-linear-to-br relative ${
        plan.is_popular
          ? "from-purple-500 via-yellow-500 to-pink-500"
          : "from-orange-200 to-violet-300"
      }`}
    >
      {/* Most Popular Badge */}
      {plan.is_popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
            {t("pricing_card.most_popular")}
          </span>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 size-full relative overflow-clip">
        {/* Current Plan Ribbon */}
        {(user?.current_package_id == plan.id || !plan.is_active) && (
          <div
            className={`absolute top-6 -left-18 -rotate-45 text-white text-sm font-semibold px-20 py-1 text-center shadow-md ${
              user?.current_package_id == plan.id
                ? "bg-linear-to-r from-blue-600 to-purple-600"
                : "bg-red-600"
            }`}
          >
            {user?.current_package_id == plan.id
              ? t("pricing_card.current_plan")
              : t("pricing_card.upcoming")}
          </div>
        )}

        {/* Plan Info */}
        <div className="text-center mb-8 mt-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold bg-linear-to-tr from-blue-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              {plan.price}
            </span>
          </div>
          <span>{plan.short_description && parse(plan.short_description)}</span>
        </div>

        {/* Description */}
        <div className="space-y-4 mb-16">
          <div className="text-gray-600 font-medium leading-7">
            {plan.description && parse(plan.description)}
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="w-full flex justify-center absolute bottom-5 left-0 px-8">
          {(user?.current_package_id == plan.id && user?.is_subscribed == 1) ||
          (plan.is_free == true && user?.is_free == 1) ||
          plan.is_active == 0 ? (
            <button
              className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 cursor-not-allowed bg-linear-to-r from-blue-100 to-purple-100 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50`}
            >
              {t("pricing_card.subscribe")}
            </button>
          ) : (
            <button
              className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                plan.is_popular
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
                  : "bg-linear-to-r from-blue-500 to-blue-700 text-white drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
              }`}
              onClick={() => gotoCheckout(plan.id)}
            >
              {user?.current_package_id == plan.id
                ? t("pricing_card.renew")
                : t("pricing_card.subscribe")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
