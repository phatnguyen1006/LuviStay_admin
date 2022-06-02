import { useState } from "react";
import { Progress, Select, Space, Table } from "antd";
import Chart from "components/chart";
import { ChartType } from "components/chart/types";
import { BsSliders } from "react-icons/bs";
import StandingWindow from "components/standing";
import Slider from "components/slider";
import HistoryChart from "components/chart/HistoryChart";
import "./styles.scss";
import { numberWithCommas } from "app/utils/extension";
import { CircleProgress } from "./CircleProgress";

const example = [
  {
    beginDate: "2022-06-10T00:00:00.000Z",
    apartmentName: "Almanity Hội An Wellness Resort",
    owner: "628c9b7796dc4b39c79b4fc8",
    bookingCalendarId: "6296eacf17795098a985fb40",
    monthlyRevenue: 8378182,
    apartmentId: "625690e2c97ce518e56b971c",
    owneradmin: {
      _id: "628c9b7796dc4b39c79b4fc8",
      username: "admin",
      password:
        "$argon2i$v=19$m=4096,t=3,p=1$uUc8t6gwsUenCcFn9XGCjQ$LJrAGepH3JbbnB3B5xsCzGIDr4bt/YPcL4o9c/nu4YU",
      __v: 0,
    },
  },
  {
    beginDate: "2022-06-09T00:00:00.000Z",
    apartmentName: "Khách sạn Sofitel Plaza Sài Gòn",
    owner: "628c9b7796dc4b39c79b4fc8",
    bookingCalendarId: "62982599f9fe22128d52bc55",
    monthlyRevenue: 19998720,
    apartmentId: "62568e135e56e6dbd7b7882d",
    owneradmin: {
      _id: "628c9b7796dc4b39c79b4fc8",
      username: "admin",
      password:
        "$argon2i$v=19$m=4096,t=3,p=1$uUc8t6gwsUenCcFn9XGCjQ$LJrAGepH3JbbnB3B5xsCzGIDr4bt/YPcL4o9c/nu4YU",
      __v: 0,
    },
  },
  {
    beginDate: "2022-06-01T00:00:00.000Z",
    apartmentName: "Khách sạn Manoir Des Arts",
    owner: "628c9b7796dc4b39c79b4fc8",
    bookingCalendarId: "62961d78a738d6262f1345d8",
    monthlyRevenue: 30400002,
    apartmentId: "6256911ec97ce518e56b9788",
    owneradmin: {
      _id: "628c9b7796dc4b39c79b4fc8",
      username: "admin",
      password:
        "$argon2i$v=19$m=4096,t=3,p=1$uUc8t6gwsUenCcFn9XGCjQ$LJrAGepH3JbbnB3B5xsCzGIDr4bt/YPcL4o9c/nu4YU",
      __v: 0,
    },
  },
  {
    beginDate: "2022-06-02T00:00:00.000Z",
    apartmentName: "Furama Resort Danang",
    owner: "6293281c2408913218c3786f",
    bookingCalendarId: "62962ed22b33af9a7861ae31",
    monthlyRevenue: 32469640,
    apartmentId: "62568ab0d6d1a4a941990909",
    owneruser: {
      _id: "6293281c2408913218c3786f",
      username: "Nguyễn Hữu Long",
      email: "19521789@gmail.com",
      gender: "male",
      password:
        "$argon2i$v=19$m=4096,t=3,p=1$GUeGJivAqSsvaHK00gI85g$JEXfZsh3zQrsqdW3M4RUjlk8QJ1QNC+5sxDE/NxBjLE",
      phone: "0999999999",
      dob: "2001-06-30T00:00:00.000Z",
      __v: 0,
    },
  },
];

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
            <Table
              rowKey={"bookingCalendarId"}
              title={() => (
                <h3>
                  <strong>Standing</strong>
                </h3>
              )}
              dataSource={example}
              columns={columns}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
