export type MonthlyRevenueResponse = {
  beginDate: string;
  apartmentName: string;
  bookingCalendarId: string;
  monthlyRevenue: number;
  apartmentId: string;
};

export type YearlyRevenueResponse = {
  bookingCalendarId: string;
  revenueOfMonth: number;
  month: number;
};
