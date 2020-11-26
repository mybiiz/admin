import { Box, Container, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import GenericCrudTable from "../GenericCrudTable/GenericCrudTable";

const PartnersPage = () => {
  const ctx = useContext(AppContext);

  const [state, setState] = useState({
    selectedServiceTypeId: 0,
  });

  return (
    <>
      <Container>
        <Box pt={2}>
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
        </Box>
        <>
          <GenericCrudTable
            url={`${ctx?.state.baseUrl}/partnerspaged?name=&serviceTypeId=${state.selectedServiceTypeId}`}
            path="partners"
            spreadsheetUrl="partnersexcel"
            head={[
              "Email",
              "Name",
              "Partner Name",
              "Phone",
              "Bank",
              "Bank Account #",
              "Service Type",
            ]}
            mapper={(partner) => {
              return {
                id: partner.id,
                content: [
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
                ],
              };
            }}
          />
        </>
      </Container>
    </>
  );
};

export default PartnersPage;
