import { revenueAPI } from "app/api/revenue";
import { AllRevenueResponse, MonthlyRevenueResponse, YearlyRevenueResponse } from "app/model";

export const getMonthlyRevenueQuery = async ({
  queryKey,
}): Promise<MonthlyRevenueResponse> => {
  try {
    const [_, payload] = queryKey;

    const response = await revenueAPI.fetchMonthlyRevenue(payload);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch monthly revenue");
    throw Error("Failed to fetch monthly revenue");
  }
};

export const getYearlyRevenueQuery = async ({
  queryKey,
}): Promise<YearlyRevenueResponse> => {
  try {
    const [_, payload] = queryKey;

    const response = await revenueAPI.fetchYearlyRevenue(payload);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch yearly revenue");
    throw Error("Failed to fetch yearly revenue");
  }
};
export const getAllRevenueQuery = async ({
  queryKey,
}): Promise<AllRevenueResponse> => {
  try {
    const [_, payload] = queryKey;

    const response = await revenueAPI.fetchAllRevenue();
    return response.data;
  } catch (error) {
    console.log("Failed to fetch history of revenue");
    throw Error("Failed to fetch history of revenue");
  }
};
