import { blue, gold, purple, red, yellow } from "@ant-design/colors";
import { Button, Card } from "antd";
import React, { useContext } from "react";

import { AppContext } from "../../App";
import Login from "../Login/Login";

const MainComponent = () => {
  const ctx = useContext(AppContext);

  console.log("Comntext:", ctx)

  return (
    <>
      {/* {JSON.stringify(ctx?.state)} */}
      {ctx?.state.loggedIn ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card
            style={{
              borderColor: blue[2],
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>This is the admin page main component. Say hello!</div>
              <div
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Button
                  onClick={(e) => {
                    alert("Hello clicked!");
                  }}
                  style={{
                    backgroundColor: gold.primary,
                    borderColor: gold[6],
                    color: gold[9],
                  }}
                >
                  Hello!
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: purple.primary,
                    borderColor: purple[6],
                    color: purple[0],
                  }}
                >
                  Hi!
                </Button>
                <Button
                  onClick={(e) => {
                    localStorage.removeItem("apiKey");

                    ctx?.setState({
                      ...ctx.state,
                      loggedIn: false,
                      apiKey: null,
                    });
                  }}
                  type="primary"
                  style={{
                    backgroundColor: red.primary,
                    borderColor: red[6],
                    color: red[0],
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MainComponent;
