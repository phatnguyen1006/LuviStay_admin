import React, { ReactElement, useState, useRef } from "react";
import { UploadOutlined, FolderOpenOutlined, EditOutlined, FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import Detail from "components/modal/detail";
import "./styles.scss";
import { useLocation } from "react-router-dom";

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
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
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

  const data = [
    {
      key: "1",
      name: "Nguyễn Trg Pht",
      phone: "0987654321",
      email: "19521998@gm.uit.edu.vn",
    },
    {
      key: "2",
      name: "Nguyễn Ngọc Khôi",
      phone: "0987654321",
      email: "19521709khoinguyen@gm.uit.edu.vn",
    },
    {
      key: "3",
      name: "Nguyễn Lê Khôi",
      phone: "0987654321",
      email: "19521707bb@gm.uit.edu.vn",
    },
    {
      key: "4",
      name: "Some Name",
      phone: "0987654321",
      email: "something@gmail.com",
    },
    {
      key: "5",
      name: "No name",
      phone: "0987654321",
      email: "phtnguyen1998@gmail.com",
    },
  ];

  return (
    <div>
      <h2>Quản lý blog</h2>
      <div className="blog-container">
        <Button type="primary">Thêm blog</Button>
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
      <Table
        columns={columns as ColumnsType<any>}
        dataSource={data}
        onChange={onChange}
      />
      <Detail visible={visible} hideModal={hideModal} />
    </div>
  );
}
