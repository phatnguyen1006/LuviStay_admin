import React, { ReactElement, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Rate,
  Space,
  Upload,
  Modal,
  message,
} from "antd";
import { city, districts } from "app/json";
import { DB_URI } from "app/constants";
import { ADMIN_ENDPOINT } from "app/api/endpoint";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";
import { Apartment, ApartmentPayload } from "app/model";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { updateOneApartmentMutation } from "app/mutation";
import "./styles.scss";

const { Option } = Select;

interface IProps {
  callback?: () => void;
  apartment: Apartment;
}

interface ICustomizedUploadFile extends UploadFile {
  url: string;
}

interface IBrowsingBlog extends Omit<ApartmentPayload, "pictures"> {
  pictures: Array<ICustomizedUploadFile>;
}

interface IOnChangeUploadProps {
  file: ICustomizedUploadFile;
  fileList: ICustomizedUploadFile[];
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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

export function UpdateAparemtForm({ apartment }: IProps): ReactElement {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: updateMutate, isLoading } = useMutation(
    updateOneApartmentMutation,
    {
      onSuccess: (data) => {
        message.success("Update blog successfully");
        navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT}`);
      },
      onError: () => {
        message.error("There was an error");
      },
    }
  );

  const [districtIndex, setDistrictIndex] = useState<number>(-1);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState<ICustomizedUploadFile[]>([
    {
      uid: apartment.thumbnail,
      name: "thumnail",
      url: apartment.thumbnail,
    },
  ]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({
    file: newFile,
    fileList: newFileList,
  }: IOnChangeUploadProps) => {
    // convert File type to UploadFile Customized Type
    // console.log("new: ", newFile.response && newFile.response?.data[0]);
    if (newFile && newFile.response && newFileList.length >= 1) {
      newFileList.pop();
      newFileList.push({
        uid: newFileList.length.toString(),
        name: `pic-${newFileList.length}`,
        url: newFile.response && newFile.response?.data[0],
      });
      setFileList([...newFileList]);
    } else {
      setFileList([]);
    }
  };

  const handleProvinceChange = (value: string) => {
    console.log(`selected ${value}`);
    setDistrictIndex(city.indexOf(value));
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    values = {
      apartmentId: apartment._id,
      apartmentData: {
        ...values,
        thumbnail: values.thumbnail[0]
          ? values.thumbnail[0].url
          : apartment.thumbnail,
      },
    };

    console.log(values);

    updateMutate(values);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="84">+84</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );

  return (
    apartment && (
      <div className="new-apartment-form-container">
        <Form
          {...formItemLayout}
          form={form}
          name="new-apartment"
          onFinish={onFinish}
          initialValues={{
            // prefix: "+84",
            name: apartment.name,
            address: apartment.address,
            description: apartment.description,
            thumbnail: [
              {
                uid: apartment.thumbnail,
                name: "thumnail",
                url: apartment.thumbnail,
              },
            ],
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
            // initialValue={"Việt Nam"}
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
            <Space
              style={{ display: "flex", marginBottom: 0 }}
              align="baseline"
            >
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

          {/* <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input apartment phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item> */}

          {/* <Form.Item
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
        </Form.Item> */}

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <Input.TextArea showCount rows={8} />
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
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              // defaultFileList={[
              //   {
              //     uid: apartment.thumbnail,
              //     name: "thumnail",
              //     url: apartment.thumbnail,
              //   },
              // ]}
            >
              {/* <Button icon={<UploadOutlined />}>Click to upload</Button> */}
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update Apartment
            </Button>
          </Form.Item>
        </Form>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    )
  );
}
