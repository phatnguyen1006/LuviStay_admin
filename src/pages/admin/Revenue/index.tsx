import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
} from "antd";
import type { DatePickerProps, InputRef, TableProps } from "antd";
import YearlyChart from "components/chart";
import { ChartType } from "components/chart/types";
import { BsSliders } from "react-icons/bs";
import {
  IFlag,
  numberWithCommas,
  parseAddress,
  reverseDateFormat,
} from "app/utils/extension";
import moment from "moment";
import Highlighter from "react-highlight-words";
import {
  IAddress,
  MonthlyRevenueResponse,
  TagType,
  YearlyRevenueResponse,
} from "app/model";
import {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
  SorterResult,
} from "antd/lib/table/interface";
import { ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { getMonthlyRevenueQuery, getYearlyRevenueQuery } from "app/query";
import "./styles.scss";

const { Option } = Select;

interface DataType {
  // id: string;
  apartmentName: string;
  // tags: number;
  // address: string;
  monthlyRevenue: number;
}

type DataIndex = keyof DataType;

const monthlyChildren: React.ReactNode[] = [];
const yearlyChildren: React.ReactNode[] = [];
for (let i = 1; i <= 12; i++) {
  monthlyChildren.push(
    <Option key={i} value={i}>
      {i}
    </Option>
  );
}
for (let i = 20; i <= 22; i++) {
  yearlyChildren.push(
    <Option key={2000 + i} value={2000 + i}>
      {2000 + i}
    </Option>
  );
}

const monthFormat = "MM-YYYY";
const yearFormat = "YYYY";

const RevenuePage = (): JSX.Element => {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const {
    data: monthlyRevenuesData = null,
    isLoading: isMonthlyLoading,
    error: monthlyError,
    isError: isMonthlyError,
    refetch: monthlyRefetch,
  } = useQuery(["monthly-revenue", { month, year }], getMonthlyRevenueQuery);

  const {
    data: yearlyRevenuesData = null,
    isLoading: isYearlyLoading,
    error: yearError,
    isError: isYearError,
    refetch: yearlyRefetch,
  } = useQuery(["yearly-revenue", { year }], getYearlyRevenueQuery);
  const {
    data: yearlyCompareRevenuesData = null,
    isLoading: compareIsLoading,
    error: compareError,
    isError: compareIsError,
    refetch: comapreRefetch,
  } = useQuery(
    ["yearly-compare-revenue", { year: year - 1 }],
    getYearlyRevenueQuery
  );

  const [chartType, setchartType] = useState<ChartType>(ChartType.month);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const onDatePickerChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (!dateString) return;
    if (chartType == ChartType.month) {
      setMonth(parseInt(dateString.substring(0, 2)));
      setYear(parseInt(dateString.substring(3)));
    } else if (chartType == ChartType.year) {
      setYear(parseInt(dateString));
    }
  };

  const chartTypeChange = (value: ChartType) => {
    // console.log(value);
    setchartType(value);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <a>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </a>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "apartmentName",
      key: "apartmentName",
      ...getColumnSearchProps("apartmentName"),
    },
    {
      title: "Revenue (VNĐ)",
      dataIndex: "monthlyRevenue",
      key: "monthlyRevenue",
      render: (revenue) => <p>{numberWithCommas(revenue)} VNĐ</p>,
    },
  ];

  const yearlyColumns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Revenue (VNĐ)",
      dataIndex: "revenueOfMonth",
      key: "revenueOfMonth",
      render: (revenue) => <p>{numberWithCommas(revenue)} VNĐ</p>,
    },
  ];

  return (
    <div className="revenue-page-container">
      <div className="title-container">
        <h2>Revenue</h2>
        <Space>
          <DatePicker
            defaultValue={moment(new Date())}
            format={chartType === ChartType.month ? monthFormat : yearFormat}
            onChange={onDatePickerChange}
            picker={
              chartType as
                | "month"
                | "year"
                | "time"
                | "date"
                | "week"
                | "quarter"
            }
          />
          <Select
            style={{ width: 120 }}
            value={chartType}
            onChange={chartTypeChange}
          >
            <Option key="month">
              <strong>Month</strong>
            </Option>
            <Option key="year">
              <strong>Year</strong>
            </Option>
          </Select>
        </Space>
      </div>
      <section className="body-revenue-page">
        <section className="chart-layout">
          {yearlyRevenuesData && (
            <YearlyChart
              chartType={ChartType.year}
              labelForChartData={year}
              chartData={
                yearlyRevenuesData &&
                (yearlyRevenuesData as YearlyRevenueResponse).result
              }
              labelForComapreData={year-1}
              chartCompareData={
                yearlyCompareRevenuesData &&
                (yearlyCompareRevenuesData as YearlyRevenueResponse).result
              }
            />
          )}
        </section>
        <section className="statistic-container">
          <section className="table-revenue-container">
            {chartType === ChartType.month ? (
              <Table
                rowKey="bookingCalendarId"
                columns={columns as ColumnsType<any>}
                dataSource={
                  monthlyRevenuesData &&
                  (monthlyRevenuesData as MonthlyRevenueResponse).result
                }
                loading={isMonthlyLoading}
              />
            ) : (
              <Table
                rowKey="bookingCalendarId"
                columns={yearlyColumns as ColumnsType<any>}
                dataSource={
                  yearlyRevenuesData &&
                  (yearlyRevenuesData as YearlyRevenueResponse).result
                }
                loading={isYearlyLoading}
              />
            )}
          </section>
          <Card className="summary-revenue-container">
            <Space direction="vertical">
              <Statistic
                title={<h3>Summary</h3>}
                value={yearlyRevenuesData.totalRevenueMonth/yearlyCompareRevenuesData.totalRevenueMonth}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
              <Statistic
                style={{ marginTop: 30 }}
                title={<h3>Total</h3>}
                value={
                  chartType === ChartType.month
                    ? monthlyRevenuesData &&
                      (monthlyRevenuesData as MonthlyRevenueResponse)
                        .totalRevenueApartmentOfMonth
                    : yearlyRevenuesData &&
                      (yearlyRevenuesData as YearlyRevenueResponse)
                        .totalRevenueMonth
                }
                suffix="VNĐ"
              />
            </Space>
          </Card>
        </section>
      </section>
    </div>
  );
};

export default RevenuePage;
