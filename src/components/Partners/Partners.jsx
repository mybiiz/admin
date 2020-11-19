import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { grey, purple } from "@material-ui/core/colors";
import { Autocomplete } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import GenericCrudTable from "../GenericCrudTable/GenericCrudTable";

const PartnersPage = () => {
  const ctx = useContext(AppContext);

  const [state, setState] = useState({
    page: [],
    requestStatus: "NotAsked",
    selectedServiceTypeId: 0,
  });

  useEffect(() => {
    if (state.requestStatus === "NotAsked") {
      fetchData();
    }
  }, [state.requestStatus]);

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
        `${ctx?.state.baseUrl}/partnerspaged?page=0&perPage=1000&serviceTypeId=${state.selectedServiceTypeId}`,
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
      <Container>
        <Box pt={2}>
          <Box flexWrap display="flex" alignItems="center">
            <Box>
              Total: {state.page?.totalElements}
            </Box>
            <Autocomplete
              style={{ flexGrow: 1, backgroundColor: "white" }}
              size="small"
              options={
                ctx?.state.serviceTypes
                  ? [{ name: "All", id: 0 }, ...ctx.state.serviceTypes]
                  : []
              }
              getOptionLabel={(serviceType) => serviceType?.name ?? ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Service Type"
                  variant="outlined"
                />
              )}
              onChange={(e, value) => {
                console.log("ONchange:", e.target.value, value);
                setState({
                  ...state,
                  requestStatus: "NotAsked",
                  selectedServiceTypeId: value?.id ?? 0,
                });
              }}
            />
            {/* <Autocomplete
              style={{ flexGrow: 1, backgroundColor: "white" }}
              options={[]}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Service Type"
                  variant="outlined"
                />
              )}
            /> */}
            {state.requestStatus === "Loading" ? (
              <CircularProgress disableShrink />
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <>
          <GenericCrudTable
            head={[
              "Email",
              "Name",
              "Partner Name",
              "Phone",
              "Bank",
              "Bank Account #",
              "Service Type",
            ]}
          />
        </>
        <>
          <TableContainer
            style={{ height: "60vh", overflow: "auto" }}
            component={Paper}
            elevation={5}
          >
            <Table style={{ borderCollapse: "separate" }} size="small">
              <TableHead>
                <TableRow>
                  {[
                    "Email",
                    "Name",
                    "Partner Name",
                    "Phone",
                    "Bank",
                    "Bank Account #",
                    "Service Type",
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
                {state.page.content?.map((partner) => {
                  return (
                    <>
                      <TableRow>
                        {[
                          <>{partner?.user?.email ?? ""}</>,
                          <>
                            {partner?.firstName ?? ""} {partner?.lastName ?? ""}
                          </>,
                          <>{partner?.business?.name ?? ""}</>,
                          <>{partner?.phone ?? ""}</>,
                          <>
                            {partner?.bank && partner?.bank?.id !== 0
                              ? `${partner?.bank?.code ?? ""} - ${
                                  partner?.bank?.name ?? ""
                                }`
                              : ""}
                          </>,
                          <>{partner?.bankAccountId}</>,
                          <>{partner?.business?.serviceType?.name}</>,
                        ].map((cell) => {
                          return (
                            <TableCell
                              style={{
                                border: `1px solid ${grey[300]}`,
                                textAlign: "center",
                              }}
                            >
                              {cell}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Container>
    </>
  );
};

export default PartnersPage;
