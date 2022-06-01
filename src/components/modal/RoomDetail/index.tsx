import { PlusCircleOutlined } from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { Modal, Space, Button, Form, Input, InputNumber, Select } from "antd";
import { IProps, IRoomStatus } from "./types";
import "./styles.scss";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const suffixSelector = (
  <Form.Item name="suffix" noStyle>
    <p>VNĐ</p>
  </Form.Item>
);

export default function RoomDetail({
  visible,
  hideModal,
  currentRoom,
  refetchRoomData,
}: IProps): ReactElement {
  const [onUpdate, setOnUpdate] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log(values);
  };

  if (!currentRoom) {
    return <></>;
  }

  return (
    currentRoom && (
      <Modal
        title="Chi tiết khách sạn"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Space key="footer" size="middle">
            <Button type="text" onClick={hideModal}>
              Cancel
            </Button>
            <Button
              key="update"
              type="primary"
              disabled={!onUpdate}
              onClick={() => {
                // mutate(currentUser._id);
              }}
              form="room-detail"
              htmlType="submit"
              // loading={isLoading}
            >
              Update
            </Button>
            <Button
              key="delete"
              danger
              onClick={() => {
                // mutate(currentUser._id);
              }}
              // loading={isLoading}
            >
              Delete
            </Button>
          </Space>,
        ]}
      >
        <Form
          {...layout}
          name="room"
          id="room-detail"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{
            name: currentRoom.name,
            bedName: currentRoom.bedName,
            capacity: currentRoom.capacity,
            square: currentRoom.square,
            isAvailable: currentRoom.isAvailable ? IRoomStatus.available : IRoomStatus.reserved,
            price: currentRoom.price,
          }}
          onChange={() => setOnUpdate(true)}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "please provide room name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bedName"
            label="Beds"
            rules={[{ required: true, message: "please provide beds" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Capacity"
            rules={[{ required: true, message: "please provide capacity" }]}
          >
            <Form.Item name="capacity" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> people</span>
          </Form.Item>

          <Form.Item
            label="Square"
            rules={[{ required: true, message: "please provide square" }]}
          >
            <Form.Item name="square" noStyle>
              <InputNumber min={1} />
            </Form.Item>
            <span className="ant-form-text"> m^2</span>
          </Form.Item>

          <Form.Item
            name="isAvailable"
            label="Status"
            rules={[{ required: true, message: "please provide status" }]}
          >
            <Select
              placeholder="Choose status"
              onChange={() => setOnUpdate(true)}
            >
              <Option value={IRoomStatus.available}>Available</Option>
              <Option value={IRoomStatus.reserved}>Reserved</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price (/night)"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  );
}
