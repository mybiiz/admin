// import { blue, purple } from "@ant-design/colors";
// import { Button, Form, Input, Space, Spin, Typography } from "antd";
import {
  Box,
  Button,
  CircularProgress,
  createMuiTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { Title } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

// const { Title } = Typography;
const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

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
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
          backgroundColor: purple[100],
        }}
      >
        <form>
          <Box
            style={{ backgroundColor: "white" }}
            borderRadius={5}
            p={3}
            boxShadow={3}
            m={1}
            flexDirection="column"
          >
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" style={{ color: purple[600] }}>
                MyBiiz Admin
              </Typography>
            </Box>

            {ctx?.state.loginRequestStatus === "Loading" ? (
              <Box display="flex" justifyContent="center" my={1}>
                <CircularProgress disableShrink />
              </Box>
            ) : (
              <></>
            )}

            <Box my={2}>
              <TextField
                label="Email"
                name="email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                // placeholder="Email..."
              />
            </Box>

            <Box my={2}>
              <TextField
                label="Password"
                type="password"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                // placeholder="Password..."
              />
            </Box>

            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
