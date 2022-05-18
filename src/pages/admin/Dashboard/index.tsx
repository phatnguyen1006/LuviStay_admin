import { useState } from "react";
import { Select } from "antd";
import Chart from "components/chart";
import { ChartType } from "components/chart/types";
import { BsSliders } from "react-icons/bs";
import "./styles.scss";

const { Option } = Select;

const DashBoard = (): JSX.Element => {
  const [chartType, setchartType] = useState<ChartType>(ChartType.year);

  function handleChange(value) {
    setchartType(value);
  }

  return (
    <div>
      <section className="dashboard-section-container">
        <h2>Dashboard</h2>
        <p>This is my dashboard today information</p>
      </section>
      <section className="second-section">
        <div className="turnover-section-container">
          <div className="turnover-header">
            <h2>Turn Over</h2>
            <div className="filter-btn-container">
              <Select
                // style={{ width: "70%" }}
                defaultValue={ChartType.year}
                className="selection-antd"
                suffixIcon={null}
                onChange={handleChange}
              >
                <Option value={ChartType.year}>{ChartType.year}</Option>
                <Option value={ChartType.history}>{ChartType.history}</Option>
              </Select>
              <BsSliders className="filter-icon" />
            </div>
            {/* <div className="custom-selection-btn-with-icon">
              <div className="selection-icon-prefix">
                <BsSliders />
              </div>
              <div className="custom-selection-btn">
                <Select
                  defaultValue={ChartType.year}
                  className="selection-antd"
                  suffixIcon={null}
                  onChange={handleChange}
                >
                  <Option value={ChartType.year}>{ChartType.year}</Option>
                  <Option value={ChartType.history}>{ChartType.history}</Option>
                </Select>
              </div>
            </div> */}
          </div>
          <div className="chart-container">
            <Chart chartType={chartType} />
          </div>
        </div>
        <section className="news-view">
          <h3>Xếp hạng khách sạn</h3>
          <ul>
            <li>LuviStay 1</li>
            <li>LuviStay 2</li>
            <li>LuviStay 3</li>
            <li>LuviStay 4</li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default DashBoard;
