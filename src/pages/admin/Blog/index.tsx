import React, { ReactElement, useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import {
  EditOutlined,
  FileTextOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Space, Table, Tabs } from "antd";
import type { InputRef } from "antd";
import type { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import Highlighter from "react-highlight-words";
import BlogDetail from "components/modal/BlogDetail";
import "./styles.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { getComfirmedBlog, getPendingBlog } from "app/query";
import { Blog } from "app/model";
import { acceptOneBlog, denyOneBlog } from "app/mutation";
import Snipper from "components/Snipper";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { convertMongoDatetoDMY } from "app/utils/extension";
import { CLIENT_SITE_URL } from "app/constants";
import { CLIENT_ENDPOINT } from "app/api/endpoint";

const { TabPane } = Tabs;

interface DataType {
  _id: string;
  author: string;
  // pictures: string[];
  // content: string;
  date: Date | string;
  // comments: string;
  // isConfirm: boolean;
}

type DataIndex = keyof DataType;

export default function BlogPage(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingTabDidInit, setPendingTabDidInit] = useState<boolean>(false);

  const {
    data: confirmedBlog = [],
    isFetching,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery(["blog", 1], getComfirmedBlog);

  const {
    data: pendingBlog = [],
    isFetching: isPendingFetching,
    isLoading: isPendingLoading,
    error: pendingError,
    isError: isPendingError,
    refetch: pendingrRefetch,
  } = useQuery(["pendingBlog", 1], getPendingBlog, {
    enabled: pendingTabDidInit,
  });

  const { mutate: acceptBlogMutation, isLoading: isAcceptedLoading } =
    useMutation(acceptOneBlog, {
      onSuccess: () => {
        message.success("Confirm blog successfully");
        refetchBlogData();
      },
      onError: () => {
        message.error("Failed to confirm blog. Please try again");
      },
    });

  const { mutate: denyBlogMutation, isLoading: isDeniedLoading } = useMutation(
    denyOneBlog,
    {
      onSuccess: () => {
        message.success("Decline blog successfully");
        refetchBlogData();
      },
      onError: () => {
        message.error("Failed to decline blog. Please try again");
      },
    }
  );

  const [visible, setVisible] = useState(false);
  const [currentDeletedBlog, setCurrentDeletedBlog] = useState<Blog>();
  const [idLoading, setIDLoading] = useState<string>();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const clientBlogPage = `${CLIENT_SITE_URL}${CLIENT_ENDPOINT.BLOG}`;

  // modal func
  const showModal = (data: Blog) => {
    setCurrentDeletedBlog(data);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  function callback(key) {
    // console.log(key);
    if (!pendingTabDidInit) {
      if (key === "pending") {
        setPendingTabDidInit(true);
      }
    }
  }

  const refetchBlogData = () => {
    refetch();
    pendingrRefetch();
  };

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
        <a rel="noreferrer" target="_blank" href={`${clientBlogPage}/${text}`}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </a>
      ) : (
        <a rel="noreferrer" target="_blank" href={`${clientBlogPage}/${text}`}>
          {text}
        </a>
      ),
  });

  const columns = [
    {
      title: "Blog ID",
      key: "_id",
      dataIndex: "_id",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => author?.email,
    },
    {
      title: "Created At",
      key: "date",
      dataIndex: "date",
      render: (date: string) => convertMongoDatetoDMY(date),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.BLOG_UPDATE}/${record._id}`}
            state={record}
          >
            <EditOutlined title="Update blog" />
          </Link>
          <a style={{ color: "lightgreen" }} onClick={() => showModal(record)}>
            <FileTextOutlined title="Detail" />
          </a>
          <a style={{ color: "red" }} onClick={() => showModal(record)}>
            <DeleteOutlined title="Delete blog" />
          </a>
        </Space>
      ),
    },
  ];

  const columnsPending = [
    {
      title: "Blog ID",
      key: "_id",
      dataIndex: "_id",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => author?.email,
    },
    {
      title: "Created At",
      key: "date",
      dataIndex: "date",
      render: (date: string) => convertMongoDatetoDMY(date),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>
            <FileTextOutlined title="Detail" />
          </a>
          <a
            style={{ color: "green" }}
            onClick={() => {
              setIDLoading(record._id);
              acceptBlogMutation(record._id);
            }}
          >
            {isAcceptedLoading && idLoading === record._id ? (
              <Snipper />
            ) : (
              <CheckOutlined title="Accept" />
            )}
          </a>
          <a
            style={{ color: "red" }}
            onClick={() => {
              setIDLoading(record._id);
              denyBlogMutation(record._id);
            }}
          >
            {isDeniedLoading && idLoading === record._id ? (
              <Snipper />
            ) : (
              <CloseOutlined title="Decline" />
            )}
          </a>
        </Space>
      ),
    },
  ];

  if (isError || isPendingError) {
    error && message.error(error.toString());
    pendingError && message.error(pendingError.toString());
  }

  return (
    <div>
      <h2 style={{ marginBottom: 30 }}>Post Management</h2>
      <div className="blog-container">
        <Button
          className="btn-container"
          type="primary"
          onClick={() => navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.BLOG_NEW}`)}
        >
          <GoPlus />
          &nbsp; New Post
        </Button>
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
      <Tabs onChange={callback}>
        <TabPane tab="Accepted" key="accepted">
          {/* <Table columns={columns} dataSource={data} /> */}
          <Table
            rowKey={"_id"}
            columns={columns as ColumnsType<any>}
            dataSource={confirmedBlog}
            onChange={onChange}
            loading={isLoading}
          />
        </TabPane>
        <TabPane tab="Pending" key="pending">
          <Table
            rowKey={"_id"}
            columns={columnsPending as ColumnsType<any>}
            dataSource={pendingBlog}
            onChange={onChange}
            loading={isPendingLoading}
          />
        </TabPane>
      </Tabs>
      <BlogDetail
        visible={visible}
        hideModal={hideModal}
        currentBlog={currentDeletedBlog}
        refetchBlogData={refetchBlogData}
      />
    </div>
  );
}
