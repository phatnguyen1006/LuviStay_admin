import { useState } from "react";
import { Progress, Select, Space, Table } from "antd";
import Chart from "components/chart";
import { ChartType } from "components/chart/types";
import { BsSliders } from "react-icons/bs";
import StandingWindow from "components/standing";
import Slider from "components/slider";
import HistoryChart from "components/chart/HistoryChart";
import "./styles.scss";
import { CircleProgress } from "./CircleProgress";
import { Standing } from "./Standing";

const DashBoard = (): JSX.Element => {
  return (
    <div className="dashboard-page-container">
      {/* <h2 style={{ marginBottom: 30 }}>Dashboard</h2> */}
      <section className="header-section">
        <Slider />
      </section>
      <section className="body-section">
        <div className="body-main-layout">
          <HistoryChart chartType={ChartType.all} />
          <div className="more-information">
            <CircleProgress />
          </div>
        </div>
        <div className="body-sub-layout">
          <div className="standing-view">
            <Standing />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
