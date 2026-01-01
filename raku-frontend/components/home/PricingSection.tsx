"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  const [plansData, setPlansData] = useState<Plan[]>(defaultPlans);


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
            />
          ))}
        </div>

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
