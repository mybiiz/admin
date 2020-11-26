import {
  Container
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import GenericCrudTable from "../GenericCrudTable/GenericCrudTable";

const UsersPage = () => {
  const ctx = useContext(AppContext);

  const [state, setState] = useState({});

  return (
    <>
      <Container>
        {/* <Box pt={2}>
          <Box flexWrap display="flex" alignItems="center">
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
          </Box>
        </Box> */}
        <>
          <GenericCrudTable
            url={`${ctx?.state.baseUrl}/userspaged?name=`}
            path="/users"
            head={["Email", "Registration Completed?"]}
            mapper={(user) => {
              return {
                id: user.id,
                content: [
                  <>{user.email ?? ""}</>,
                  <>
                    <strong
                      style={{
                        color: user.registrationCompleted
                          ? green[500]
                          : red[500],
                      }}
                    >
                      {user.registrationCompleted ? "Yes" : "No"}
                    </strong>
                  </>,
                ],
              };
            }}
          />
        </>
      </Container>
    </>
  );
};

export default UsersPage;
