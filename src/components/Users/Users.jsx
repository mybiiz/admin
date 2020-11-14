import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { grey, purple } from "@material-ui/core/colors";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

const UsersPage = () => {
  const ctx = useContext(AppContext);

  const [state, setState] = useState({
    page: [],
    requestStatus: "NotAsked",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setState({ ...state, requestStatus: "Loading" });

    const [usersPage] = await Promise.all([fetchUsers()]);

    const fetchedData = {
      page: usersPage,
    };

    console.log("Fetched data;", fetchedData);

    setState({
      ...state,
      ...fetchedData,
      requestStatus: "Success",
    });
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${ctx?.state.baseUrl}/userspaged?page=0&perPage=1000`,
        {
          headers: {
            authorization: ctx?.state.apiKey ?? "",
          },
        }
      );

      if (response.status !== 200) throw await response.text();

      return await response.json();
    } catch (e) {
      console.error(e);

      return [];
    }
  };

  return (
    <>
      <Box>
        <Box m={2}>
          {state.requestStatus === "Loading" ? (
            <CircularProgress disableShrink />
          ) : (
            <TableContainer
              style={{ height: "60vh", overflow: "auto" }}
              component={Paper}
              elevation={5}
            >
              {/* <TableRow>{JSON.stringify(state)}</TableRow> */}

              <Table style={{ borderCollapse: "separate" }} size="small">
                <TableHead>
                  <TableRow>
                    {[
                      "Email",
                      "Name",
                      "Partner Name",
                      "Bank",
                      "Business Type",
                    ].map((cellName) => {
                      return (
                        <>
                          <TableCell
                            style={{
                              position: "sticky",
                              color: "white",
                              top: 0,
                              backgroundColor: purple[300],
                              fontWeight: "bold",
                              textAlign: "center",
                              border: `1px solid ${grey[400]}`,
                            }}
                          >
                            {cellName}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.page.content?.map((user) => {
                    return (
                      <>
                        <TableRow>
                          {[
                            <>{user?.email}</>,
                            <>
                              {user?.partners[0]?.firstName ?? ""}{" "}
                              {user?.partners[0]?.lastName ?? ""}
                            </>,
                            <>{user?.partners[0]?.business?.name}</>,
                            <>
                              {user?.partners[0]?.bank
                                ? `${user?.partners[0]?.bank?.code ?? ""} - ${
                                    user?.partners[0]?.bank?.name ?? ""
                                  }`
                                : ""}
                            </>,
                            <>{user?.partners[0]?.business?.serviceType?.name}</>
                          ].map((cell) => {
                            return (
                              <TableCell style={{ border: `1px solid ${grey[300]}`, textAlign: "center" }}>
                                {cell}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </>
                    );
                  })}
                  {/* {[...Array(100).keys()].map((test) => {
                    return (
                      <TableRow>
                        <TableCell style={{ textAlign: "center" }}>
                          TEst
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          TEst
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          TEst
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          TEst
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          TEst
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UsersPage;
