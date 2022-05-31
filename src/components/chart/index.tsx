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

export default function Chart({ chartType }: ChartProps) {
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

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#c1b086",
        backgroundColor: "#c1b086",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#001529",
        backgroundColor: "#001529",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
