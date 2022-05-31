import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./styles.scss";
import { DB_URI } from "app/constants";
import { ADMIN_ENDPOINT } from "app/api/endpoint";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function NewBlog(): ReactElement {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="new-blog-page-container">
      <h2 style={{ marginBottom: 50 }}>New Blog</h2>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <Form.Item name="content" label="Content">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="pictures"
          label="Pictures"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Choose your photos"
        >
          <Upload
            name="thumbnail"
            method="POST"
            action={`${DB_URI}${ADMIN_ENDPOINT.UPLOAD}`}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
