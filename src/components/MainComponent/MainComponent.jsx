// import { blue, gold, purple, red, yellow } from "@ant-design/colors";
// import { Button, Card } from "antd";
import {
  AppBar,
  Box,
  Button,
  createMuiTheme,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { grey, purple } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext, useEffect } from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import { AppContext } from "../../App";
import CitiesPage from "../Cities/CitiesPage";
import Login from "../Login/Login";
import PartnersPage from "../Partners/Partners";
import UsersPage from "../Users/Users";

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

const MainComponent = () => {
  const ctx = useContext(AppContext);

  const fetchServiceTypes = async (apiKey) => {
    try {
      const response = await fetch(`${ctx?.state.baseUrl}/servicetypes`, {
        headers: {
          authorization: apiKey,
        },
      });

      return await response.json();
    } catch (e) {
      return [];
    }
  };

  const fetchInitialData = async (apiKey) => {
    return {
      serviceTypes: await fetchServiceTypes(apiKey),
    };
  };

  useEffect(() => {
    if (ctx?.state.apiKey) {
      console.log("Api key not null.");
      (async () => {
        const fetchedData = await fetchInitialData(ctx.state.apiKey);

        ctx?.setState({
          ...ctx.state,
          ...fetchedData,
        });
      })();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {ctx?.state.loggedIn ? (
        <Router>
          <AppBar position="sticky" color="primary">
            <Toolbar variant="dense">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                style={{ width: "100%" }}
              >
                <Box mr={2}>
                  <Typography style={{ fontWeight: "bold" }} variant="h6">
                    MyBiiz Admin
                  </Typography>
                </Box>
                <IconButton
                  onClick={() =>
                    ctx?.setState({ ...ctx.state, drawerOpen: true })
                  }
                  edge="start"
                >
                  <MenuIcon style={{ color: "white" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            anchor="right"
            onOpen={() => ctx?.setState({ ...ctx.state, drawerOpen: true })}
            onClose={() => ctx?.setState({ ...ctx.state, drawerOpen: false })}
            open={ctx?.state.drawerOpen ?? false}
          >
            <Box>
              <List>
                <Link
                  onClick={() =>
                    ctx?.setState({ ...ctx.state, drawerOpen: false })
                  }
                  to="/"
                  style={{ textDecoration: "none", color: grey[900] }}
                >
                  <ListItem button>
                    <ListItemText primary="Partners" />
                  </ListItem>
                </Link>
                <Link
                  onClick={() =>
                    ctx?.setState({ ...ctx.state, drawerOpen: false })
                  }
                  to="/users"
                  style={{ textDecoration: "none", color: grey[900] }}
                >
                  <ListItem button>
                    <ListItemText primary="Users" />
                  </ListItem>
                </Link>
                <Link
                  onClick={() =>
                    ctx?.setState({ ...ctx.state, drawerOpen: false })
                  }
                  to="/cities"
                  style={{ textDecoration: "none", color: grey[900] }}
                >
                  <ListItem button>
                    <ListItemText primary="Cities" />
                  </ListItem>
                </Link>
                <Link
                  onClick={() =>
                    ctx?.setState({ ...ctx.state, drawerOpen: false })
                  }
                  to="/comingsoonemails"
                  style={{ textDecoration: "none", color: grey[900] }}
                >
                  <ListItem button>
                    <ListItemText primary="Coming Soon Emails" />
                  </ListItem>
                </Link>

                <ListItem
                  onClick={() => {
                    localStorage.removeItem("apiKey");
                    ctx?.setState({
                      ...ctx.state,
                      apiKey: null,
                      loggedIn: false,
                      drawerOpen: false,
                    });
                  }}
                  button
                >
                  <Button variant="contained" color="secondary">
                    Logout
                  </Button>
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>

          <Box style={{ backgroundColor: purple[50], minHeight: "100vh" }}>
            <Switch>
              <Route exact path="/users">
                <UsersPage />
              </Route>
              <Route exact path="/cities">
                <CitiesPage />
              </Route>
              <Route exact path="/">
                <PartnersPage />
              </Route>
            </Switch>
          </Box>
        </Router>
      ) : (
        <Login fetchInitialData={fetchInitialData} />
      )}
    </ThemeProvider>
  );
};

export default MainComponent;
