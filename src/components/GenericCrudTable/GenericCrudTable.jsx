import {
  Box,
  Button,
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
import DownloadIcon from "@material-ui/icons/CloudDownload";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

const GenericCrudTable = (props) => {
  const ctx = useContext(AppContext);

  const url = props.url ?? "";
  const path = props.path ?? "";
  const spreadsheetUrl = props.spreadsheetUrl ?? "";
  const tableHeads = props.head ?? [];
  const tableBodyMapper =
    props.mapper ??
    (() => {
      return (_) => "";
    });
  const tableContents = props.content ?? [];

  const [state, setState] = useState({
    firstRenderComplete: false,
    requestStatus: "NotAsked",
    page: 0,
    perPage: 10,
    pageData: null,
  });

  // First time render
  useEffect(() => {
    fetchData(true);
  }, []);

  // Refetch on URL change, don't do anything on first render
  useEffect(() => {
    if (state.firstRenderComplete) {
      fetchData(true);
    }
  }, [url]);

  // Refetch on page change, no reset
  useEffect(() => {
    if (state.firstRenderComplete) {
      fetchData(false);
    }
  }, [state.page]);

  const fetchData = async (reset) => {
    setState({ ...state, requestStatus: "Loading" });

    const pageData = await fetchItems();

    console.log("Reset:", reset);
    console.log("Page data:", pageData, pageData?.content);

    if (pageData) {
      setState({
        ...state,
        pageData: {
          ...pageData,
          content: reset
            ? pageData?.content
            : [...(state.pageData?.content ?? []), ...pageData?.content],
        },
        page: reset ? 0 : state.page,
        firstRenderComplete: true,
        requestStatus: "Success ",
      });
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${url}&page=${state.page}&perPage=${state.perPage}`,
        {
          headers: {
            authorization: ctx?.state.apiKey ?? "",
          },
        }
      );

      if (response.status !== 200) throw await response.text();

      return await response.json();
    } catch (e) {
      return null;
    }
  };

  return (
    <>
      {/* Page data content: {JSON.stringify(state.pageData?.content)} */}
      <Box
        pt={2}
        justifyContent="space-between"
        display="flex"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Link to={`/${path}/new`}>
            <Button size="small" variant="contained" color="primary">
              Add
            </Button>
          </Link>

          <Box ml={2}>
            Showing {state.pageData?.content?.length ?? 0} of{" "}
            {state.pageData?.totalElements ?? 0} items
          </Box>
        </Box>

        <Box>
          <a target="_blank" href={`${ctx?.state.baseUrl}/${spreadsheetUrl}`}>
            <Button color="primary" variant="contained">
              <DownloadIcon />
              <Box ml={1}>Download XLSX</Box>
            </Button>
          </a>
        </Box>

        {state.requestStatus === "Loading" ? (
          <CircularProgress thickness={6} size={24} disableShrink />
        ) : (
          <></>
        )}
      </Box>
      <Box borderRadius={15} my={2}>
        <TableContainer
          style={{ height: "60vh", resize: "vertical" }}
          component={Paper}
          elevation={5}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {tableHeads.map((head) => (
                  <TableCell
                    size="small"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: purple[300],
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      border: `3px solid ${grey[400]}`,
                      position: "sticky",
                      top: 0,
                    }}
                  >
                    {head}{" "}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.pageData?.content?.map((item) => {
                const mappedItem = tableBodyMapper(item);

                return (
                  <TableRow>
                    {mappedItem.content.map((row, i) => {
                      return (
                        <TableCell style={{ textAlign: "center" }}>
                          {i === 0 ? (
                            <Link
                              style={{ color: purple[500] }}
                              to={`/${path}/${item.id}`}
                            >
                              {row ?? "(No name)"}
                            </Link>
                          ) : (
                            row
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="center">
        {state.page === state.pageData?.last ? (
          <></>
        ) : (
          <Button
            onClick={() => {
              setState({
                ...state,
                page: state.page + 1,
              });
            }}
            variant="contained"
            color="primary"
          >
            Load more...
          </Button>
        )}
      </Box>
    </>
  );
};

export default GenericCrudTable;
