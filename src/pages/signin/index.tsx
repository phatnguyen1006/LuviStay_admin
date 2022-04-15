import { AppRootState } from "app/redux/store";
import { signIn } from "app/redux/slices/auth";
import { ISignInPayload } from "app/redux/slices/auth/types";
import { useAppDispatch } from "app/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./styles.scss";

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(
    (state: AppRootState) => state.auth.isLoggedIn
  );

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : "/";

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  // 	event.preventDefault();

  // 	const formData = new FormData(event.currentTarget);
  // 	const username = formData.get("username") as string;
  // 	dispatch(signIn({ username, password: "123" } as ISignInPayload,
  // 		()=>{
  // 			navigate(from, { replace: true });
  // 		}
  // 	));

  // }

  const onFinish = (values: ISignInPayload) => {
    console.log("Received values of form: ", values);
    dispatch(
      signIn(
        { username: values.username, password: values.password },
        () => {
          navigate(from, { replace: true });
        },
        () => {
          message.error("Đăng nhập thất bại. Xin thử lại.");
        }
      )
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      // console.log("navigate", from);
      navigate(from, { replace: true });
    }
  }, []);
  // console.log(isLoggedIn);

  return (
    <div className="signin-container">
      {/* <img className="bg-logo-full" src="/images/logo-full.png" /> */}
      <div
        className="form-container"
        // style={{
        //   backgroundImage: "url('/images/logo-square-primary.png')",
        //   backgroundSize: "contain",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {/* <div className="logo mx-auto w-20 h-20 m-4 bg-gray-800">Logo</div> */}
        {/* <p className="text-red-400 pb-4">You must log in to view the page at {from}</p> */}
        <img className="logo-square" width={100} height={100} src="/images/logo-square-primary.png" />

        {/* <form onSubmit={handleSubmit}>
					<label>
						Username: <input name="username" type="text" />
					</label>{" "}
					<button type="submit">Login</button>
				</form> */}
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div className="login-btn-container">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-sky-600"
              >
                Log in
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
