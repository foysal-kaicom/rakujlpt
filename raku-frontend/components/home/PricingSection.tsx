"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import PricingCard from "../PricingCard";

import { subscriptionService } from "@/services/website/subscription/subscription.service";
import { Plan } from "@/types/subscription/package.type";

const defaultPlans: Plan[] = [];

const PricingSection = () => {
  const { t } = useTranslation("common");
  const [plansData, setPlansData] = useState<Plan[]>(defaultPlans);

  const getPlansData = async () => {
    try {
      const plans = await subscriptionService.getHomePlans();
      setPlansData(plans);
    } catch (error: any) {
      toast.error(
        error?.message || t("pricing.error_fetching_plans", "Cannot get subscription plans at this moment" )
      );
      setPlansData([]);
    }
  };

  useEffect(() => {
    getPlansData();
  }, []);

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
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

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
