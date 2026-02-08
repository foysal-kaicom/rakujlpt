"use client";

import { useEffect, useState } from "react";

import { toast } from "raku-toast-react";
import { useTranslation } from "react-i18next";

import BreadCrumb from "../BreadCrumb";
import PricingCard from "../PricingCard";
import PackagesSkeleton from "@/app/(website)/packages/PackageSkeleton";
import PaginatedComponent from "@/components/PaginateComponent";

import { subscriptionService } from "@/services/subscription/subscription.service";
import { Plan } from "@/types/subscription/package.type";

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
  const { t } = useTranslation("common");
  const [plansData, setPlansData] = useState<Plan[]>([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getPlansData = async () => {
    try {
      const plans = await subscriptionService.getAll();
      setPlansData(plans);
    } catch (error: any) {
      toast.error(
        error?.message ||
          t(
            "pricing.error_fetching_plans",
            "Cannot get subscription plans at this moment",
          ),
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
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      {loader && <PackagesSkeleton />}
      <section
        id="pricing"
        className="pb-20 pt-5 relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 overflow-hidden"
      >
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="text-center mb-16 mt-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("pricing.title")}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500">
                {t("pricing.highlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className={`gap-8 flex flex-wrap justify-center`}>
            {paginatedPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <PaginatedComponent
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">{t("pricing.footer_note")}</p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              {(
                t("pricing.footer_features", {
                  returnObjects: true,
                }) as string[]
              ).map((item, idx) => (
                <span key={idx}>✓ {item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackagesComponent;
