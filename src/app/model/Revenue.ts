export type MonthlyRevenue = {
  beginDate: string;
  apartmentName: string;
  bookingCalendarId: string;
  monthlyRevenue: number;
  apartmentId: string;
};

export type YearlyRevenue = {
  bookingCalendarId: string;
  revenueOfMonth: number;
  month: number;
};

export type MonthlyRevenueResponse = {
  result: MonthlyRevenue[];
  totalRevenueApartmentOfMonth: number;
};

export type YearlyRevenueResponse = {
  result: YearlyRevenue[];
  totalRevenueMonth: number;
};
