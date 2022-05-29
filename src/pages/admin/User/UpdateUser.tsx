import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  Skeleton,
  Space,
} from "antd";
import type { DatePickerProps } from "antd";
import { IGender, User, UserPayload } from "app/model";
import "./styles.scss";
import { useMutation } from "react-query";
import { updateOneUser } from "app/mutation";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { reverseDateFormat } from "app/utils/extension";
import { getOneUserQuery } from "app/query";
import moment from "moment";

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

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const NewUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: userID } = useParams();

  const [state, setState] = useState<User>((location.state as User) || null);
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate, isLoading: isMutationLoading } = useMutation(updateOneUser, {
    onSuccess: (data) => {
      message.success("Update user successfully");
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER}`);
    },
    onError: () => {
      message.error("There was an error");
    },
  });

  const [form] = Form.useForm();
  const [birthString, setBirthString] = useState<string>(null);

  const onDatePickerChange: DatePickerProps["onChange"] = (_, dateString) => {
    setBirthString(reverseDateFormat(dateString));
  };

  const onFinish = (values: any) => {
    const userPayload: UserPayload = {
      _id: userID,
      email: values.email,
      username: values.username,
      phone: values.phone,
      dob: birthString,
      gender: values.gender,
    };

    mutate(userPayload);
  };

  useEffect(() => {
    if (!state) {
      // refetch
      console.log("✈️✈️ Refetch user data from id");

      (async () => {
        setLoading(true);
        await getOneUserQuery(null, userID).then((res) => {
          setLoading(false);
          setState(res);
        });
      })();
    }
  }, []);

  return (
    <div className="new-user-container">
      <h2 style={{ marginBottom: 50 }}>Update user</h2>
      {loading ? (
        <Loader />
      ) : (
        state && (
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
              initialValue={state.username}
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
              initialValue={state.email}
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
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              initialValue={state.phone}
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="dob"
              label="Birth"
              initialValue={moment(state.dob, "YYYY-MM-DDh:mm:ss")}
              rules={[{ required: true, message: "Please select birthday!" }]}
            >
              <DatePicker format="DD-MM-YYYY" onChange={onDatePickerChange} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              initialValue={state.gender}
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
              <Button
                type="primary"
                htmlType="submit"
                loading={isMutationLoading}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        )
      )}
    </div>
  );
};

export default NewUser;
