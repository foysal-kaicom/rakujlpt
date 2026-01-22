"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";

import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

import { subscriptionService } from "@/services/subscription/subscription.service";
import { Coupon , Plan } from "@/types/subscription/package.type";

export default function CheckoutPage() {
  const { t } = useTranslation("common");
  const id = useParams().id;

  const breadCrumbData = [
    {
      name: t("breadcrumb.home"),
      to: "/",
    },
    {
      name: t("breadcrumb.pricing"),
      to: "/packages",
    },
    {
      name: t("breadcrumb.checkout"),
      to: `/checkout/${id}`,
    },
  ];

  const [packageDetails, setPackageDetails] = useState<Plan | null>();
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [couponList, setcouponList] = useState<Coupon[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [maxDiscount, setMaxDiscount] = useState<number>(0);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_AMOUNT = packageDetails
    ? Number(packageDetails.price.replace(/[^\d]/g, ""))
    : 0;

  const calculateFinalAmount = () => {
    let calculatedDiscount = 0;

    if (discountType === "percentage") {
      calculatedDiscount = (BASE_AMOUNT * discount) / 100;
    } else if (discountType === "fixed") {
      calculatedDiscount = discount;
    }

    if (maxDiscount && calculatedDiscount > maxDiscount) {
      calculatedDiscount = maxDiscount;
    }

    return Math.max(BASE_AMOUNT - calculatedDiscount, 0);
  };

  const finalAmount = calculateFinalAmount();

  const handleApplyCoupon = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await subscriptionService.applyCoupon(selectedCoupon);

      setCouponCode(data.coupon_code ?? null);
      setDiscount(Number(data.discount_value) || 0);
      setDiscountType(data.type ?? "");
      setMaxDiscount(Number(data.max_discount) || 0);
    } catch (error: any) {
      setDiscount(0);
      setDiscountType("");
      setMaxDiscount(0);
      setCouponCode(null);
      setError(t("checkout.coupon_error"));
    } finally {
      setLoading(false);
    }
  };

  const addCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon?.coupon_code);
  };

  const removeCoupon = () => {
    setSelectedCoupon("");
    setCouponCode(null);
    setDiscount(0);
    setDiscountType("");
    setMaxDiscount(0);
  };

  const getCouponList = async () => {
    try {
      const list = await subscriptionService.getCouponList();
      setcouponList(list);
    } catch {
      setcouponList([]);
    } finally {
      setLoading(false);
    }
  };

  const getpackageData = async () => {
    if (!id) return;
    try {
      const data = await subscriptionService.getPackageDetails(id);
      setPackageDetails(data);
    } catch {
      setPackageDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getpackageData();
  }, []);

  useEffect(() => {
    if (packageDetails && !packageDetails.is_free) {
      getCouponList();
    }
  }, [packageDetails]);

  const handleSubscribe = async () => {
    if (!agreed) {
      toast.error(t("checkout.agreement_error"));
      return;
    }

    try {
      const response = await subscriptionService.subscribePackage(
        id,
        couponCode
      );

      const url = response?.url;
      if (url && /^https?:\/\/.+/.test(url)) {
        window.location.href = url;
      }
      toast.success(response?.message || t("checkout.success"));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || t("checkout.failed")
      );
    }
  };

  return (
    <div className="min-h-[75vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 lg:px-8 py-5">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
      </WebpageWrapper>

      {/* Gradient Border Wrapper */}
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full max-w-lg rounded-[28px] p-[1px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500">
          {/* Glass Card */}
          <div className="rounded-[27px] bg-white/80 backdrop-blur-xl p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                {t("checkout.title")}
              </h1>
              <p className="text-sm text-gray-700 font-medium">
                {t("checkout.subtitle")}
              </p>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border-2 border-fuchsia-100 bg-gradient-to-br from-gray-50/30 to-white/30 p-5 space-y-3 font-medium text-gray-700">
              <div className="flex justify-between text-sm">
                <span>{t("checkout.package_label")}</span>
                <span>{packageDetails?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("checkout.price_label")}</span>
                <span>
                  {t("checkout.currency")} {BASE_AMOUNT || t("checkout.free")}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm font-medium text-violet-600">
                  <span>{couponCode}</span>
                  <span>
                    - {discount}{" "}
                    {discountType != "percentage"
                      ? t("checkout.currency")
                      : "%"}
                  </span>
                </div>
              )}

              <div className="border-t border-fuchsia-400 pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {t("checkout.total_label")}
                </span>
                <span className="text-xl font-bold text-fuchsia-600">
                  {t("checkout.currency")} {finalAmount || t("checkout.free")}
                </span>
              </div>
            </div>
            {BASE_AMOUNT != 0 && couponList.length > 0 && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <p className="flex-1 rounded-xl text-gray-600 px-4 py-2 focus:outline-none outline outline-fuchsia-300/50 focus:ring-2 focus:ring-indigo-500 bg-white/50 w-[calc(100%-250px)] overflow-clip">
                    {selectedCoupon
                      ? selectedCoupon
                      : t("checkout.select_coupon")}
                  </p>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="rounded-xl border px-5 py-3 text-sm font-semibold text-white bg-gradient-to-br from-fuchsia-600 to-violet-600 hover:scale-105 duration-300 cursor-pointer"
                  >
                    {t("checkout.apply_btn")}
                  </button>
                </div>
                {couponList && (
                  <div className="font-medium text-violet-600 mt-3">
                    <span className="font-semibold">
                      {t("checkout.available_coupon")}
                    </span>
                    {couponList.map((coupon) => (
                      <div
                        key={coupon?.id}
                        className="flex items-center justify-between mt-1 bg-white/40 py-2 px-4 rounded-md"
                      >
                        <span className="w-[calc(100%-100px)] overflow-clip">
                          {coupon.coupon_code}
                        </span>
                        <div className="flex items-center gap-1">
                          <span>
                            - {Math.round(Number(coupon?.discount_value))}{" "}
                            {coupon?.type == "percentage"
                              ? "%"
                              : t("checkout.currency")}
                          </span>
                          {selectedCoupon != coupon?.coupon_code ? (
                            <IoMdAddCircle
                              onClick={() => addCoupon(coupon)}
                              className="size-6 text-violet-600 hover:scale-105 duration-300 cursor-pointer"
                            />
                          ) : (
                            <IoIosRemoveCircle
                              onClick={removeCoupon}
                              className="size-6 text-red-600 hover:scale-105 duration-300 cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}
              </div>
            )}

            {/* Agreement */}
            <label className="flex items-center justify-center gap-2 text-sm text-gray-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-purple-600 size-4"
              />
              {t("checkout.agreement_label")}
            </label>

            {/* CTA */}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 py-4 text-white text-lg font-semibold shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:scale-[1.01] transition disabled:opacity-50 ${
                agreed ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              {loading ? t("checkout.loading") : t("checkout.pay_btn")}
            </button>

            {/* Trust */}
            <p className="text-center text-xs text-gray-700 font-medium">
              {t("checkout.trust_text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
