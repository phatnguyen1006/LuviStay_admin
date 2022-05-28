import { PlusCircleOutlined } from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { Modal, Space, Button, message } from "antd";
import { IProps } from "./types";
import "./styles.scss";
import { useMutation } from "react-query";
import { deleteOneUser } from "app/mutation";
// fake Api

export default function UserDetail({
  visible,
  hideModal,
  currentUser,
  refetchUserData,
}: IProps): ReactElement {
  const { mutate, isLoading } = useMutation(deleteOneUser, {
    onSuccess: () => {
      hideModal();
      message.success("Delete user successfully");
      refetchUserData();
    },
    onError: () => {
      hideModal();
      message.error("Failed to delete user. Please try again");
    },
  });

  if (!currentUser) {
    return <></>;
  }

  return (
    <Modal
      title={`Delete ${currentUser.email}`}
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
            onClick={() => {
              mutate(currentUser._id);
            }}
            loading={isLoading}
          >
            Delete
          </Button>
        </Space>,
      ]}
    >
      <p>
        <strong>Name: </strong>
        {currentUser.username}
      </p>
      <p>
        <strong>Phone: </strong> {currentUser.phone}
      </p>
      <p>
        <strong>Birth: </strong>
        {currentUser.dob}
      </p>
      <p>
        <strong>Gender: </strong>
        {currentUser.gender}
      </p>
    </Modal>
  );
}
