import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Rate,
  Space,
  Upload,
} from "antd";
import { city, districts } from "app/json";
import "./styles.scss";
import { DB_URI } from "app/constants";
import { ADMIN_ENDPOINT } from "app/api/endpoint";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";

interface IProps {
  callback?: () => void;
}

interface ICustomizedUploadFile extends UploadFile {
  url: string;
}

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const NewAparemtForm: React.FC = ({ callback }: IProps) => {
  const [form] = Form.useForm();

  const [districtIndex, setDistrictIndex] = useState<number>(-1);

  const handleProvinceChange = (value: string) => {
    console.log(`selected ${value}`);
    setDistrictIndex(city.indexOf(value));
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="new-apartment-form-container">
      <Form
        {...formItemLayout}
        form={form}
        name="new-apartment"
        onFinish={onFinish}
        initialValues={{
          prefix: "+84",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Apartment Name"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["address", "country"]}
          label="Country"
          tooltip="Sorry. International apartment is unavaiable now"
          initialValue={"Việt Nam"}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={["address", "province"]}
          label="Province/City"
          rules={[
            {
              required: true,
              message: "Please input apartment province!",
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Choose apartment's province/city"
            onChange={handleProvinceChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare(
                  (optionB!.children as unknown as string).toLowerCase()
                )
            }
          >
            {city.map((p, i) => (
              <Option key={i} value={p}>
                {p}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={["address", "district"]}
          label="District"
          rules={[
            {
              required: true,
              message: "Please input apartment district!",
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Choose apartment's province first, then choose district"
            optionFilterProp="children"
            disabled={!districtIndex}
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare(
                  (optionB!.children as unknown as string).toLowerCase()
                )
            }
          >
            {districtIndex > -1 &&
              districts[districtIndex].map((d, i) => (
                <Option key={i} value={d}>
                  {d}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Street"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
            <Form.Item
              name={["address", "apartmentNumber"]}
              rules={[
                {
                  required: true,
                  message: "Please input apartment number!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Apartment Number" />
            </Form.Item>
            <Form.Item
              name={["address", "street"]}
              rules={[
                {
                  required: true,
                  message: "Please input street!",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Street" />
            </Form.Item>
          </Space>
        </Form.Item>

        {/* <Form.Item
          name={["address", "apartmentNumber"]}
          label="Apartment Number"
          rules={[
            {
              required: true,
              message: "Please input apartment number!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["address", "street"]}
          label="Street"
          rules={[
            {
              required: true,
              message: "Please input apartment number!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input apartment phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Rooms & Rates"
          rules={[{ required: true, message: "Please input rooms count!" }]}
        >
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name="rooms">
              <InputNumber />
            </Form.Item>

            <Form.Item name="rate" style={{ width: "100%" }}>
              <Rate />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail"
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add Apartment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
