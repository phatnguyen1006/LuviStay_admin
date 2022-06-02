import React from "react";
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
import { ChartType } from "./types";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { YearlyRevenue } from "app/model";
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
  labelForChartData: number;
  labelForComapreData?: number;
  chartData: YearlyRevenue[];
  chartCompareData?: YearlyRevenue[];
}

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default function YearlyChart(props: ChartProps) {
  const { chartType, labelForChartData, chartData, labelForComapreData, chartCompareData } = props;
  console.log(props);

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

  const yearLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octorber",
    "November",
    "December",
  ];
  const historyLabels = ["2018", "2019", "2020", "2021", "2022"];
  let labels = yearLabels;

  (() => {
    if (chartType === ChartType.year) {
      labels = yearLabels;
    } else if (chartType === ChartType.all) {
      labels = historyLabels;
    }
  })();

  console.log(
    "check ",
    chartData && chartData.map((data) => data.revenueOfMonth)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelForChartData.toString(),
        data: chartData && chartData.map((data) => data.revenueOfMonth),
        borderColor: "#c1b086",
        backgroundColor: "#c1b086",
      },
      {
        label: labelForComapreData ? labelForComapreData.toString() : "No history to compare",
        data: chartCompareData
          ? (chartCompareData as YearlyRevenue[]).map(
              (data) => data.revenueOfMonth
            )
          : [],
        borderColor: "#001529",
        backgroundColor: "#001529",
      },
    ],
  };

  return chartData ? <Line options={options} data={data} /> : <Loader />;
}
