import { User } from "./User";

export type MonthlyRevenue = {
  beginDate: string;
  apartmentName: string;
  bookingCalendarId: string;
  monthlyRevenue: number;
  apartmentId: string;
  owneradmin?: {
    _id: string;
    username: string;
  };
  owneruser?: User;
};

export type YearlyRevenue = {
  bookingCalendarId: string;
  revenueOfMonth: number;
  month: number;
};

export type HistoryRevenue = {
  bookingCalendarId: string;
  listRenvenueMonthOfYear: [
    {
      month: number;
      revenueOfMonth: number;
    }
  ];
  year: number;
  totalRevenueMonthOfYear: number;
};

export type MonthlyRevenueResponse = {
  result: MonthlyRevenue[];
  totalRevenueApartmentOfMonth: number;
};

export type YearlyRevenueResponse = {
  result: YearlyRevenue[];
  totalRevenueMonth: number;
};

export type AllRevenueResponse = {
  result: HistoryRevenue[];
  totalRevenueYear: number;
};
