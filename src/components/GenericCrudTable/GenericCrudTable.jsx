import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { grey, purple } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";

const GenericCrudTable = (props) => {
  const url = props.url ?? "";
  const tableHeads = props.head ?? [];
  const tableBodyMapper =
    props.mapper ??
    (() => {
      return (_) => "";
    });
  const tableContents = props.content ?? [];

  const [state, setState] = useState({
    firstRenderComplete: false,
    page: {
      page: 0,
      perPage: 10,
      content: [],
    },
  });

  // First time render
  useEffect(() => {
    setState({ ...state, firstRenderComplete: true });
  }, []);

  return (
    <>
      <Box borderRadius={15} my={2}>
        <TableContainer
          style={{ resize: "vertical" }}
          component={Paper}
          elevation={5}
        >
          <Table>
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
                    }}
                  >
                    {head}{" "}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContents.map((content) => {
                return (
                  <>
                    <TableRow>{tableBodyMapper(content)}</TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default GenericCrudTable;
