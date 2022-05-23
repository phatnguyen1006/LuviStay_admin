import React, { ReactElement, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Table, Button, Space, Tag, message } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
// import { ideasAPI } from "app/api/ideasApi";
// import { IProps } from "./types";
import "./styles.scss";
import { ApartmentStatus, TagType } from "./types";
import { ColumnsType } from "antd/lib/table/interface";
import ApartmentDetail from "components/modal/ApartmentDetail";

const { TabPane } = Tabs;

export default function Apartment(): ReactElement {
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a onClick={showModal}>{text}</a>,
    },
    {
      title: "Địa chỉ",
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
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a><EditOutlined title="Cập nhật" /></a>
          <a style={{ color: "red" }}><DeleteOutlined title="Xoá" /></a>
        </Space>
      ),
    },
  ];

  const columnsPending = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a onClick={showModal}>{text}</a>,
    },
    {
      title: "Địa chỉ",
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
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <a style={{ color: "green" }}><CheckOutlined title="Duyệt" /></a>
          <a style={{ color: "red" }}><CloseOutlined title="Không duyệt" /></a>
        </Space>
      ),
    },
  ];

  const dataPending = [
    {
      key: "1",
      name: "Phượng Vỹ",
      address: "New York No. 1 Lake Park",
      tags: [`${TagType.resort}`],
    },
    {
      key: "2",
      name: "Drop Kaya",
      address: "London No. 1 Lake Park",
      tags: [`${TagType.motel}`],
    },
    {
      key: "3",
      name: "Tre Xanh",
      address: "Sidney No. 1 Lake Park",
      tags: [`${TagType.homestay}`],
    },
    {
      key: "4",
      name: "Bamboo",
      address: "Sidney No. 1 Lake Park",
      tags: ["hotel"],
    },
  ];

  const data = [
    {
      key: "1",
      name: "Mường Thanh",
      address: "New York No. 1 Lake Park",
      tags: [`${TagType.resort}`],
    },
    {
      key: "2",
      name: "Lá Xanh",
      address: "London No. 1 Lake Park",
      tags: [`${TagType.motel}`],
    },
    {
      key: "3",
      name: "HomeStay Đà Lạt",
      address: "Sidney No. 1 Lake Park",
      tags: [`${TagType.homestay}`],
    },
    {
      key: "4",
      name: "Landmark 81",
      address: "Sidney No. 1 Lake Park",
      tags: ["hotel"],
    },
    {
      key: "5",
      name: "Terracota",
      address: "Sidney No. 1 Lake Park",
      tags: [`${TagType.hotel}`, `${TagType.homestay}`],
    },
  ];

  return (
    <div>
      <h2>Quản lý khách sạn</h2>
      <Button type="primary">Thêm khách sạn</Button>
      <Tabs onChange={callback}>
        <TabPane tab="Tất cả" key={ApartmentStatus.all}>
          {/* <Table columns={columns} dataSource={data} /> */}
          <Table
            columns={columns as ColumnsType<any>}
            dataSource={data}
            onChange={onChange}
          />
        </TabPane>
        <TabPane tab="Đang chờ duyệt" key={ApartmentStatus.pending}>
          <Table
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
