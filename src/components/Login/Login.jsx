import { blue, purple } from "@ant-design/colors";
import { Button, Form, Input, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

const { Title } = Typography;

const Login = () => {
  const ctx = useContext(AppContext);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    alert("test");

    console.log("Context:", ctx)

    ctx?.setState({
      ...ctx.state,
      loggedIn: true
    })
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <div
        style={{
          backgroundColor: purple[3],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: purple[0],
            padding: "1em",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Title level={3}>MyBiiz Admin</Title>
          </div>

          <Form {...layout}>
            <Form.Item label="Username">
              <Input placeholder="Username..." />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password placeholder="Password..." />
            </Form.Item>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                htmlType="submit"
                style={{
                  backgroundColor: blue.primary,
                  color: blue[0],
                  borderColor: blue.primary,
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
