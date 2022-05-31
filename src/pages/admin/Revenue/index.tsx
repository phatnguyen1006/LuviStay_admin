import React, { useRef, useState } from "react";
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
import Chart from "components/chart";
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
import { IAddress, TagType } from "app/model";
import {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
  SorterResult,
} from "antd/lib/table/interface";
import { ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
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

const apartments = [
  {
    beginDate: "2022-06-01T00:00:00.000Z",
    apartmentName: "Khách sạn Manoir Des Arts",
    bookingCalendarId: "62961d78a738d6262f1345d8",
    monthlyRevenue: 30400002,
    apartmentId: "6256911ec97ce518e56b9788",
  },
  {
    beginDate: "2022-06-02T00:00:00.000Z",
    apartmentName: "Furama Resort Danang",
    bookingCalendarId: "62962ed22b33af9a7861ae31",
    monthlyRevenue: 20293525,
    apartmentId: "62568ab0d6d1a4a941990909",
  },
  {
    beginDate: "2022-06-02T00:00:00.000Z",
    apartmentName: "Furama Resort Danang",
    bookingCalendarId: "62962ed22b33af9a7861ae31",
    monthlyRevenue: 20293525,
    apartmentId: "62568ab0d6d1a4a941990909",
  },
];

const RevenuePage = (): JSX.Element => {
  const [chartType, setchartType] = useState<ChartType>(ChartType.month);
  const [chartQuery, setChartQuery] = useState();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const onDatePickerChange: DatePickerProps["onChange"] = (_, dateString) => {
    // setChartQuery(reverseDateFormat(dateString));
    console.log(dateString);
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
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   render: (address: IAddress) => (
    //     <p>{parseAddress(address, IFlag.province)}</p>
    //   ),
    // },
    // {
    //   title: "Types",
    //   key: "type",
    //   dataIndex: "type",
    //   filters: [
    //     {
    //       text: `${TagType.hotel}`,
    //       value: `${TagType.hotel}`,
    //     },
    //     {
    //       text: `${TagType.motel}`,
    //       value: `${TagType.motel}`,
    //     },
    //     {
    //       text: `${TagType.resort}`,
    //       value: `${TagType.resort}`,
    //     },
    //     {
    //       text: `${TagType.homestay}`,
    //       value: `${TagType.homestay}`,
    //     },
    //   ],
    //   onFilter: (value, record) => record.type.includes(value),
    //   render: (type) => {
    //     let color = "green";
    //     if (type === TagType.hotel) {
    //       color = "orange";
    //     } else if (type === TagType.motel) {
    //       color = "geekblue";
    //     } else if (type === TagType.resort) {
    //       color = "cyan";
    //     } else if (type === TagType.homestay) {
    //       color = "magenta";
    //     }
    //     return (
    //       <Tag color={color} key={type}>
    //         {type.toUpperCase()}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Revenue (VNĐ)",
      dataIndex: "monthlyRevenue",
      key: "monthlyRevenue",
      render: (revenue) => <p>{numberWithCommas(revenue)} VNĐ</p>,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>
    //         <EditOutlined title="Update" />
    //       </a>
    //       <a style={{ color: "lightgreen" }}>
    //         <FileTextOutlined title="Detail" />
    //       </a>
    //       <a style={{ color: "red" }} onClick={() => showModal(record)}>
    //         <DeleteOutlined title="Delete" />
    //       </a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="revenue-page-container">
      <div className="title-container">
        <h2>Revenue</h2>
        <Space>
          <DatePicker
            defaultValue={moment(new Date())}
            format={chartType === "month" ? "MM-YYYY" : "YYYY"}
            value={chartQuery}
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
      {/* <section className="body-revenue-page">
        <div className="main-page-container">
          <div>
            <Chart chartType={chartType} />
          </div>
          <div>
            <Table
              rowKey="bookingCalendarId"
              columns={columns as ColumnsType<any>}
              dataSource={apartments}
              // loading={isLoading}
            />
          </div>
        </div>
        <div
          className="sub-layout-container"
        >
            <Statistic
              title={<h3>Summary</h3>}
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic title={<h3>This month revenue</h3>} value={112893} suffix="VNĐ" />
        </div>
      </section> */}
      <section className="body-revenue-page">
        <section className="chart-layout">
          <Chart chartType={chartType} />
        </section>
        <section className="statistic-container">
          <section className="table-revenue-container">
            <Table
              rowKey="bookingCalendarId"
              columns={columns as ColumnsType<any>}
              dataSource={apartments}
              // loading={isLoading}
            />
          </section>
          <Card className="summary-revenue-container">
            <Space direction="vertical">
              <Statistic
                title={<h3>Summary</h3>}
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
              <Statistic
                style={{ marginTop: 30 }}
                title={<h3>This month revenue</h3>}
                value={112893}
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
