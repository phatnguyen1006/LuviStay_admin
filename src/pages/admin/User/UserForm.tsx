import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker,
  message,
} from "antd";
import type { DatePickerProps } from "antd";
import { IGender, UserPayload } from "app/model";
import "./styles.scss";
import { useMutation } from "react-query";
import { createNewUser } from "app/mutation";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { reverseDateFormat } from "app/utils/extension";

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

const NewUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || null;
  console.log(state);
  

  const { mutate, isLoading } = useMutation(createNewUser, {
    onSuccess: (data) => {
      message.success("Create new user successfully");
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER}`);
    },
    onError: () => {
      message.error("There was an error");
    },
  });

  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  const [birthString, setBirthString] = useState<string>(null);

  const onDatePickerChange: DatePickerProps["onChange"] = (_, dateString) => {
    setBirthString(dateString);
  };

  const onFinish = (values: any) => {
    const newUserPayload: UserPayload = {
      email: values.email,
      username: values.username,
      password: values.password,
      phone: (values.prefix + values.phone) as string,
      dob: reverseDateFormat(birthString),
      gender: values.gender,
    };

    mutate(newUserPayload);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div className="new-user-container">
      <h2>Create new user</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "+84",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Full Name"
          tooltip="What is your name?"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please provide your name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const passwordRegEx = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
                if (passwordRegEx.test(value)) return Promise.resolve();
                return Promise.reject(
                  new Error(
                    "Password must contains letters, digits and at least 6 characters"
                  )
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item> */}

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        {/* <Form.Item name="website" label="Website" rules={[{ required: false }]}>
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item> */}

        <Form.Item
          name="dob"
          label="Birth"
          rules={[{ required: true, message: "Please select birthday!" }]}
        >
          <DatePicker format="DD-MM-YYYY" onChange={onDatePickerChange} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value={IGender.male}>Male</Option>
            <Option value={IGender.female}>Female</Option>
            <Option disabled value="other">
              Other
            </Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item> */}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewUser;
