import { PlusCircleOutlined } from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { Modal, Space, Button } from "antd";
import { IProps } from "./types";
import "./styles.scss";
// fake Api

export default function UserDetail({
    visible,
    hideModal
}: IProps): ReactElement {
//   if (!idea) {
//     return <></>;
//   }

  return (
    <Modal
      title="Chi tiết khách sạn"
      visible={visible}
      onOk={hideModal}
      onCancel={hideModal}
      footer={[
        <Space key="Duyet" size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => {
              console.log("Click");
              
            }}
          >
            Duyệt
          </Button>
          <Button
            key="Loai"
            danger
            onClick={() => {
              console.log("Click");
              
            }}
          >
            Loại
          </Button>
        </Space>,
      ]}
    >
      <p>
        <strong>Tên: </strong>
        LuviStay
      </p>
      <p>
        <strong>Tên đề tài: </strong> Show something
      </p>
      <strong>Nội dung: </strong>
      <p>Hôm nay bla bla bla bla bla blabla bla bla bla bla bla bla bla bla bla bla bla</p>
    </Modal>
  );
}
