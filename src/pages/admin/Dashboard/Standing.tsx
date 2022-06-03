import { Table } from "antd";
import { getMonthlyRevenueQuery } from "app/query";
import { numberWithCommas } from "app/utils/extension";
import { useQuery } from "react-query";
import "./styles.scss";

const columns = [
  {
    title: "Name",
    dataIndex: "apartmentName",
    key: "apartmentName",
  },
  {
    title: "Revenue (VNĐ)",
    dataIndex: "monthlyRevenue",
    key: "monthlyRevenue",
    render: (money: number) => <p>{numberWithCommas(money)}</p>,
  },
];

export const Standing: React.FC = () => {
  const {
    data: standingData = null,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery(
    [
      "monthly-revenue",
      { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    ],
    getMonthlyRevenueQuery
  );

  return (
    <Table
      className="table-around"
      rowKey={"bookingCalendarId"}
      title={() => (
        <h3>
          <strong>Standing</strong>
        </h3>
      )}
      dataSource={standingData ? standingData.result?.slice(0, 11) : []}
      loading={isLoading}
      columns={columns}
    />
  );
};
