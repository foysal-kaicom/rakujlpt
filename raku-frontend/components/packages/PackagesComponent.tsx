"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import axios from "@/utils/axios";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";

import { ChevronLeft, ChevronRight } from "lucide-react";

import BreadCrumb from "../BreadCrumb";
import PricingCard from "../PricingCard";
import PackagesSkeleton from "@/app/(website)/packages/PackageSkeleton";

// Define plan type
interface Plan {
  id: number;
  name: string;
  price: string;
  description: string;
  short_description: string;
  is_popular?: boolean;
  is_active:number
}

const breadCrumbData = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Pricing",
    to: "/packages",
  },
];

const ITEMS_PER_PAGE = 3;

const PackagesComponent = () => {
  const [plansData, setPlansData] = useState<Plan[]>([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getPlansData = async () => {
    try {
      const response = await axios.get<{ success: boolean; data: Plan[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriptions`
      );
      if (response?.data?.success) {
        setPlansData(response.data.data);
      }
    } catch (error: any) {
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

  // Derived pagination values
  const totalPages = Math.ceil(plansData.length / ITEMS_PER_PAGE);
  const paginatedPlans = plansData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {loader && <PackagesSkeleton />}
      <section
        id="pricing"
        className="pb-20 pt-5 relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="text-center mb-16 mt-15">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-blue-600">Learning Path</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect plan to accelerate your Japanese language
              learning journey.
            </p>
          </div>

          <div
            className={`gap-8 flex flex-wrap justify-center`}
          >
            {paginatedPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {/* Prev button */}
              <button
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg"
                }`}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 3),
                    Math.min(totalPages, currentPage + 2)
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-200 ${
                        page === currentPage
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
              </div>

              {/* Next button */}
              <button
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg"
                }`}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">No credit card required</p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span>✓ No monthly fees</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 24/7 support</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackagesComponent;
