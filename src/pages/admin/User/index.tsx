import React, { ReactElement, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Highlighter from "react-highlight-words";
import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Avatar,
  Input,
  Skeleton,
} from "antd";
import type { InputRef } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IProps } from "./types";
import "./styles.scss";
import {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
} from "antd/lib/table/interface";
import UserDetail from "components/modal/UserDetail";
import { User } from "app/model";
import Meta from "antd/lib/card/Meta";
import { getUserQuery } from "app/query";

interface IExpandRowRenderProps {
  record: User;
  style?: React.CSSProperties;
}

interface DataType {
  _id: string;
  email: string;
  username: string;
  phone: number;
}

type DataIndex = keyof DataType;

export default function UserPage(): ReactElement {
  const {
    data: users = [],
    isFetching,
    isLoading,
    error,
    isError,
  } = useQuery("user", getUserQuery);

  const location = useLocation();
  const [reload, setReload] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);

  // search filter
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
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <EditOutlined title="Update user" />
          </a>
          {/* <a style={{ color: "lightgreen" }}>
          <FileTextOutlined title="Chi tiết người dùng" />
        </a> */}
          <a style={{ color: "red" }}>
            <DeleteOutlined title="Delete user" />
          </a>
        </Space>
      ),
    },
  ];

  const ExpandRowRender = ({ record }: IExpandRowRenderProps) => (
    <div className="expand-row-render-container">
      <Skeleton loading={isLoading} avatar active>
        <Meta
          className="user-meta-card"
          avatar={
            <Avatar
              size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
              src={record.avatar}
            />
          }
          title={<h4>{record.gender}</h4>}
          description={
            <div>
              <p>Birth: {record.dob}</p>
              <p>id: {record._id}</p>
            </div>
          }
        />
      </Skeleton>
    </div>
  );

  if (isError) {
    // console.log("Failed to load users: ", error);
    message.error(error);
  }

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="add-btn-container">
        <Button type="primary">Add new user</Button>
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
      <Table
        columns={columns as ColumnsType<any>}
        dataSource={users}
        onChange={onChange}
        rowKey="_id"
        loading={isLoading}
        expandable={{
          expandedRowRender: (record) => <ExpandRowRender record={record} />,
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
      <UserDetail visible={visible} hideModal={hideModal} />
    </div>
  );
}
