import { PlusCircleOutlined } from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { Modal, Space, Button, message } from "antd";
import { IProps } from "./types";
import "./styles.scss";
import { useMutation } from "react-query";
import { deleteOneBlog } from "app/mutation/blogMutation";
// fake Api

export default function BlogDetail({
  visible,
  hideModal,
  currentBlog,
  refetchBlogData,
}: IProps): ReactElement {
  const { mutate, isLoading } = useMutation(deleteOneBlog, {
    onSuccess: () => {
      hideModal();
      message.success("Delete blog successfully");
      refetchBlogData();
    },
    onError: () => {
      hideModal();
      message.error("Failed to delete blog. Please try again");
    },
  });

  if (!currentBlog) {
    return <></>;
  }

  return (
    <Modal
      title={`Post: ${currentBlog._id}`}
      visible={visible}
      onOk={hideModal}
      onCancel={hideModal}
      footer={[
        <Space key="footer" size="middle">
          <Button type="text">Cancel</Button>
          <Button
            key="delete"
            danger
            onClick={() => {
              mutate(currentBlog._id);
            }}
            loading={isLoading}
          >
            Delete
          </Button>
        </Space>,
      ]}
    >
      <p>
        <strong>Author: </strong>
        {currentBlog.author && currentBlog.author?.email}
      </p>
      <p>
        <strong>Date: </strong> {currentBlog.date}
      </p>
      <p>
        <strong>Content: </strong>
      </p>
      <p>- {currentBlog.content}</p>
      {currentBlog.pictures.length >= 1 && (
        <>
          <p>
            <strong>Pictures: </strong>
          </p>
          <div className="blog-img-container">
            {currentBlog.pictures.map((p, index) => (
              <div key={index} className="blog-img-content">
                <img src={p} width="100%" height="100%" />
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}
