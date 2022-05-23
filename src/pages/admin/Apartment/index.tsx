import React, { ReactElement, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Table, Button, Space, Tag, message, Input } from "antd";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/lib/table/interface";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./styles.scss";
import { ApartmentStatus, TagType } from "./types";
import type { ColumnsType, ColumnType } from "antd/lib/table";
import ApartmentDetail from "components/modal/ApartmentDetail";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

const { TabPane } = Tabs;

interface DataType {
  id: string;
  name: string;
  tags: number;
  address: string;
}

type DataIndex = keyof DataType;

export default function Apartment(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const [reload, setReload] = useState<boolean>(false);
  // const [currentTab, setCurrentTab] = useState<IStatus>(IStatus.pending);
  const [visible, setVisible] = useState(false);
  const [currentIdea, setCurrentIdea] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // modal func
  const showModal = (data) => {
    // setCurrentIdea(data);
    setVisible(true);
  };

  const hideModal = () => {
    // setCurrentIdea(null);
    setVisible(false);
  };

  function callback(key) {
    console.log(key);
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

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
        <a onClick={showModal}><Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        /></a>
      ) : (
        <a onClick={showModal}>{text}</a>
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      filters: [
        {
          text: `${TagType.hotel}`,
          value: `${TagType.hotel}`,
        },
        {
          text: `${TagType.motel}`,
          value: `${TagType.motel}`,
        },
        {
          text: `${TagType.resort}`,
          value: `${TagType.resort}`,
        },
        {
          text: `${TagType.homestay}`,
          value: `${TagType.homestay}`,
        },
      ],
      onFilter: (value, record) => record.tags.includes(value),
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = "green";
            if (tag === TagType.hotel) {
              color = "orange";
            } else if (tag === TagType.motel) {
              color = "geekblue";
            } else if (tag === TagType.resort) {
              color = "cyan";
            } else if (tag === TagType.homestay) {
              color = "magenta";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <EditOutlined title="Update" />
          </a>
          <a style={{ color: "red" }}>
            <DeleteOutlined title="Delete" />
          </a>
        </Space>
      ),
    },
  ];

  const columnsPending = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a onClick={showModal}>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      filters: [
        {
          text: `${TagType.hotel}`,
          value: `${TagType.hotel}`,
        },
        {
          text: `${TagType.motel}`,
          value: `${TagType.motel}`,
        },
        {
          text: `${TagType.resort}`,
          value: `${TagType.resort}`,
        },
        {
          text: `${TagType.homestay}`,
          value: `${TagType.homestay}`,
        },
      ],
      onFilter: (value, record) => record.tags.includes(value),
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = "green";
            if (tag === TagType.hotel) {
              color = "orange";
            } else if (tag === TagType.motel) {
              color = "geekblue";
            } else if (tag === TagType.resort) {
              color = "cyan";
            } else if (tag === TagType.homestay) {
              color = "magenta";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <a style={{ color: "green" }}>
            <CheckOutlined title="Accept" />
          </a>
          <a style={{ color: "red" }}>
            <CloseOutlined title="Decline" />
          </a>
        </Space>
      ),
    },
  ];

  const dataPending = [
    {
      id: "1",
      name: "Phượng Vỹ",
      address: "New York No. 1 Lake Park",
      tags: [`${TagType.resort}`],
    },
    {
      id: "2",
      name: "Drop Kaya",
      address: "London No. 1 Lake Park",
      tags: [`${TagType.motel}`],
    },
    {
      id: "3",
      name: "Tre Xanh",
      address: "Sidney No. 1 Lake Park",
      tags: [`${TagType.homestay}`],
    },
    {
      id: "4",
      name: "Bamboo",
      address: "Sidney No. 1 Lake Park",
      tags: ["hotel"],
    },
  ];

  const data = [
    {
      id: "1",
      name: "Mường Thanh",
      address: "New York No. 1 Lake Park",
      tags: [`${TagType.resort}`],
    },
    {
      id: "2",
      name: "Lá Xanh",
      address: "London No. 1 Lake Park",
      tags: [`${TagType.motel}`],
    },
    {
      id: "3",
      name: "HomeStay Đà Lạt",
      address: "Sidney No. 1 Lake Park",
      tags: [`${TagType.homestay}`],
    },
    {
      id: "4",
      name: "Landmark 81",
      address: "Sidney No. 1 Lake Park",
      tags: ["hotel"],
    },
    {
      id: "5",
      name: "Terracota",
      address: "Sidney No. 1 Lake Park",
      tags: [`${TagType.hotel}`, `${TagType.homestay}`],
    },
  ];

  return (
    <div>
      <h2>Apartment Management</h2>
      <Button type="primary" onClick={() => navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT_NEW}`)}>Add new apartment</Button>
      <Tabs onChange={callback}>
        <TabPane tab="All" key={ApartmentStatus.all}>
          {/* <Table columns={columns} dataSource={data} /> */}
          <Table
            rowKey="id"
            columns={columns as ColumnsType<any>}
            dataSource={data}
            onChange={onChange}
          />
        </TabPane>
        <TabPane tab="Pending" key={ApartmentStatus.pending}>
          <Table
            rowKey="id"
            columns={columnsPending as ColumnsType<any>}
            dataSource={dataPending}
            onChange={onChange}
          />
        </TabPane>
      </Tabs>
      <ApartmentDetail visible={visible} hideModal={hideModal} />
    </div>
  );
}
