import { blue, purple } from "@ant-design/colors";
import { Button, Form, Input, Space, Spin, Typography } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

const { Title } = Typography;

const Login = () => {
  const ctx = useContext(AppContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("Context:", ctx?.state);

    try {
      ctx?.setState({
        ...ctx.state,
        loginRequestStatus: "Loading",
      });

      const response = await fetch(`${ctx?.state.baseUrl}/login`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });

      if (response.status !== 200) throw await response.text();

      const apiKey = await response.text();
      localStorage.setItem("apiKey", apiKey);

      console.log("Response:", apiKey);

      ctx?.setState({
        ...ctx.state,
        loggedIn: true,
        loginRequestStatus: "Success",
        apiKey: apiKey,
      });
    } catch (e) {
      alert(e);

      ctx?.setState({
        ...ctx.state,
        loginRequestStatus: "Error",
      });
    }
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

          {ctx?.state.loginRequestStatus === "Loading" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Spin />
            </div>
          ) : (
            <></>
          )}

          <Form {...layout}>
            <Form.Item label="Email">
              <Input
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="Email..."
              />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                placeholder="Password..."
              />
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
