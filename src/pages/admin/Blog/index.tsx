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

export default function Blog(): ReactElement {
  const location = useLocation();
  const [reload, setReload] = useState<boolean>(false);
  // const [currentTab, setCurrentTab] = useState<IStatus>(IStatus.pending);
  const [visible, setVisible] = useState(false);
  const [currentIdea, setCurrentIdea] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const columns = [
    {
      title: "Tên blog",
      key: "name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <EditOutlined title="Cập nhật blog" />
          </a>
          <a style={{ color: "lightgreen" }}>
            <FileTextOutlined title="Chi tiết blog" />
          </a>
          <a style={{ color: "red" }}>
            <DeleteOutlined title="Xoá người blog" />
          </a>
        </Space>
      ),
    },
  ];

  const columnsPending = [
    {
      title: "Tên blog",
      key: "name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: "green" }}>
            <CheckOutlined title="Duyệt blog" />
          </a>
          <a style={{ color: "red" }}>
            <CloseOutlined title="Không duyệt blog" />
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
      <h2>Quản lý blog</h2>
      <div className="blog-container">
        <Button type="primary">Thêm blog</Button>
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
      <Tabs onChange={callback}>
        <TabPane tab="Tất cả" key="accepted">
          {/* <Table columns={columns} dataSource={data} /> */}
          <Table
            columns={columns as ColumnsType<any>}
            dataSource={data}
            onChange={onChange}
          />
        </TabPane>
        <TabPane tab="Đang chờ duyệt" key="pending">
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
