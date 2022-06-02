import { PlusCircleOutlined } from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { Modal, Space, Button } from "antd";
import { IProps } from "./types";
import { parseAddress } from "app/utils/extension";
import "./styles.scss";

export default function ApartmentDetail({
  visible,
  hideModal,
  currentApartment,
  refetchApartmentData,
}: IProps): ReactElement {
  if (!currentApartment) {
    return <></>;
  }

  return (
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
      <p>
        <strong>Apartment Name: </strong>
        {currentApartment.name}
      </p>
      <div className="thumbnail-img-container">
        <img
          style={{ maxWidth: 400, minWidth: 100 }}
          src={currentApartment.thumbnail}
        />
      </div>
      <p>
        <strong>Address: </strong> {parseAddress(currentApartment.address)}
      </p>
      <strong>Description: </strong>
      <div
        className="detail-description"
        dangerouslySetInnerHTML={{ __html: currentApartment.description }}
      ></div>
    </Modal>
  );
}
