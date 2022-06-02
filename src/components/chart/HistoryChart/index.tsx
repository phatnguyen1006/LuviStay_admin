import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartType } from "../types";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { useQuery } from "react-query";
import { getAllRevenueQuery } from "app/query";
import { Spin } from "antd";
import "./styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  chartType: ChartType;
}

export default function HistoryChart({
  chartType = ChartType.all,
}: ChartProps) {
  const {
    data: historyData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery("history-revenue", getAllRevenueQuery);
  const [labels, setLabels] = useState<Array<string>>([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      // title: {
      //   display: true,
      //   text: "Biểu đồ doanh thu",
      // },
    },
  };

  const historyLabels = ["2018", "2019", "2020", "2021", "2022"];
  // const labels = historyLabels;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "History Revenue",
        data:
          (historyData &&
            historyData?.result
              ?.map((year) => year.totalRevenueMonthOfYear)
              .reverse()) ??
          [],
        borderColor: "#c1b086",
        backgroundColor: "#c1b086",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() =>
      //     faker.datatype.number({ min: -1000, max: 1000 })
      //   ),
      //   borderColor: "#001529",
      //   backgroundColor: "#001529",
      // },
    ],
  };

  useEffect(() => {
    historyData &&
      setLabels(
        historyData.result.map((year) => year.year.toString()).reverse()
      );
  }, [historyData]);

  const SpinLoader: React.FC = () => {
    return (
      <div className="example">
        <Spin />
      </div>
    );
  };

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Line options={options} data={data} />
    </Spin>
  );
}
