import axios from "axios";
import type { Plan, Coupon } from "@/types/subscription/package.type";
import axiosInstance from "@/utils/axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const subscriptionService = {
  async getAll(): Promise<Plan[]> {
    const res = await axios.get<{ success: boolean; data: Plan[] }>(
      `${API_BASE}/subscriptions`
    );

    if (!res.data.success) {
      throw new Error("Failed to fetch subscription plans");
    }

    return res.data.data;
  },

  /** Get plans that should be shown on home */
  async getHomePlans(): Promise<Plan[]> {
    const allPlans = await subscriptionService.getAll();
    return allPlans.filter((plan) => plan.is_home === true);
  },

  async getPackageDetails(packageId: any): Promise<any> {
    const res = await axios.get(`${API_BASE}/package/${packageId}`);
    return res.data?.data ?? null;
  },

  async subscribePackage(
    packageId: any,
    couponCode?: string | null
  ): Promise<{ url?: string; status: string; message?: string }> {
    const payload: any = { package_id: packageId };
    if (couponCode) payload.coupon_code = couponCode;

    const res = await axiosInstance.post(`${API_BASE}/subscribe`, payload);
    return res.data;
  },

  async getCouponList(): Promise<Coupon[]> {
    const res = await axios.get(`${API_BASE}/coupon`);
    return res.data?.data ?? [];
  },

  async applyCoupon(couponCode: string): Promise<Coupon> {
    if (!couponCode) throw new Error("Coupon code is required");

    const res = await axios.get(`${API_BASE}/coupon/check`, {
      params: { coupon_code: couponCode },
    });

    return res.data?.data;
  },
};
