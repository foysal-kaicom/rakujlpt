import axiosInstance from "@/utils/axios";
import { DashboardResponse } from "@/types/Dashboard/Dashboard.type";

export const DashboardService = {
  async getDashboardData(): Promise<DashboardResponse> {
    const response = await axiosInstance.get<DashboardResponse>(
      "/candidate/dashboard/data",
    );

    return response.data;
  },
};
