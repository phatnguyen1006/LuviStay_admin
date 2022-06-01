import { PlusCircleOutlined } from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { Modal, Space, Button } from "antd";
import { IProps } from "./types";
import "./styles.scss";
// fake Api

export default function Detail({
  visible,
  hideModal,
  title,
  description,
  callback,
}: IProps): ReactElement {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={hideModal}
      onCancel={hideModal}
      footer={[
        <Space key="footer" size="middle">
          <Button type="text" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            key="delete"
            danger
            //loading={isLoading}
          >
            Delete
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
      <p>
        Hôm nay bla bla bla bla bla blabla bla bla bla bla bla bla bla bla bla
        bla bla
      </p>
    </Modal>
  );
}
