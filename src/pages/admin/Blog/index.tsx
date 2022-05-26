import React, { ReactElement, useState, useRef } from "react";
import {
  EditOutlined,
  FileTextOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tabs } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import Detail from "components/modal/detail";
import "./styles.scss";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;

interface DataType {
  id: string;
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
  const [reload, setReload] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);

  // modal func
  const showModal = (data) => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  function callback(key) {
    console.log(key);
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const columns = [
    {
      title: "Blog Name",
      key: "name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <EditOutlined title="Update blog" />
          </a>
          <a style={{ color: "lightgreen" }}>
            <FileTextOutlined title="Detail" />
          </a>
          <a style={{ color: "red" }}>
            <DeleteOutlined title="Delete blog" />
          </a>
        </Space>
      ),
    },
  ];

  const columnsPending = [
    {
      title: "Blog Name",
      key: "name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
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
      key: "1",
      author: "Nguyễn Khuê",
      name: "Học tốt BackEnd",
      createdAt: Date(),
    },
    {
      key: "2",
      author: "Đặng Haha",
      name: "Hack NASA bằng HTML",
      createdAt: Date(),
    },
    {
      key: "3",
      author: "Sushi",
      name: "Xếp là số một",
      createdAt: Date(),
    },
    {
      key: "4",
      author: "Jackson",
      name: "Luyện code bằng mắt",
      createdAt: Date(),
    },
  ];

  const data = [
    {
      key: "1",
      author: "Nguyễn Trg Pht",
      name: "Làm sao để tối ưu hoá tìm kiếm",
      createdAt: Date(),
    },
    {
      key: "2",
      author: "Đặng Tiểu Bình",
      name: "Tạo ra AI với HTML",
      createdAt: Date(),
    },
    {
      key: "3",
      author: "Nguyễn Khuê",
      name: "Chạy ngay đi",
      createdAt: Date(),
    },
    {
      key: "4",
      author: "Cầu Mây",
      name: "Luyện gõ phím 10 ngón",
      createdAt: Date(),
    },
    {
      key: "5",
      author: "Nguyễn Ngọc Khôi",
      name: "Cách để học tốt ngữ văn lớp 7",
      createdAt: Date(),
    },
  ];

  return (
    <div>
      <h2>Blog Management</h2>
      <div className="blog-container">
        <Button type="primary">Add new blog</Button>
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
      <Tabs onChange={callback}>
        <TabPane tab="All" key="accepted">
          {/* <Table columns={columns} dataSource={data} /> */}
          <Table
            columns={columns as ColumnsType<any>}
            dataSource={data}
            onChange={onChange}
          />
        </TabPane>
        <TabPane tab="Pending" key="pending">
          <Table
            columns={columnsPending as ColumnsType<any>}
            dataSource={dataPending}
            onChange={onChange}
          />
        </TabPane>
      </Tabs>
      <Detail visible={visible} hideModal={hideModal} />
    </div>
  );
}
