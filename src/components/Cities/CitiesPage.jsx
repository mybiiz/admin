import {
  Button,
    Container
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import GenericCrudTable from "../GenericCrudTable/GenericCrudTable";
  
  const CitiesPage = () => {
    const ctx = useContext(AppContext);
  
    const [state, setState] = useState({
    //   selectedServiceTypeId: 0,
    });
  
    return (
      <>
        <Container>
          <>
            <GenericCrudTable
              url={`${ctx?.state.baseUrl}/citiespaged?name=`}
              path="cities"
              spreadsheetUrl="citiesexcel"
              head={[
                "Name",
                "Latitude",
                "Longitude",
                "Google Maps"
              ]}
              mapper={(city) => {
                return {
                  id: city.id,
                  content: [
                    <>{city?.name ?? ""}</>,
                    <>{city?.lat ?? ""}</>,
                    <>{city?.lon ?? ""}</>,
                    <>
                      <a href={`https://www.google.com/maps/@${city?.lat ?? ""},${city?.lon ?? ""},10z`} target="_blank">
                        <Button size="small" color="primary" variant="contained">
                          Go
                        </Button>
                      </a>
                    </>
                  ],
                };
              }}
            />
          </>
        </Container>
      </>
    );
  };
  
  export default CitiesPage;
  