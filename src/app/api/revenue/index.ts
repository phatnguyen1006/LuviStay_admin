import { DataResponse, MonthlyRevenueResponse, YearlyRevenueResponse } from "app/model";
import axiosClient from "../axiosClient";
import { ADMIN_ENDPOINT } from "../endpoint";

export const revenueAPI = {
  fetchMonthlyRevenue: async (payload: { month: number; year: number }): Promise<DataResponse<MonthlyRevenueResponse>> => {
    if (!payload.month || !payload.year) return;
    const url = `${ADMIN_ENDPOINT.MONTHLY_REVENUE}?month=${payload.month}&year=${payload.year}`;
    return await axiosClient.get(url);
  },
  fetchYearlyRevenue: async (payload: { year: number }): Promise<DataResponse<YearlyRevenueResponse>> => {
    if (!payload.year) return;
    const url = `${ADMIN_ENDPOINT.YEARLY_REVENUE}?year=${payload.year}`;
    return await axiosClient.get(url);
  },
  fetchAllRevenue: async () => {
    const url = `${ADMIN_ENDPOINT.ALL_REVENUE}`;
    return await axiosClient.get(url);
  },
};
