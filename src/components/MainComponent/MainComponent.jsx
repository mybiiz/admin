// import { blue, gold, purple, red, yellow } from "@ant-design/colors";
// import { Button, Card } from "antd";
import {
  AppBar,
  Box,
  Button,
  createMuiTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import { AppContext } from "../../App";
import Login from "../Login/Login";
import { grey, purple } from "@material-ui/core/colors";
import { SettingsApplications } from "@material-ui/icons";
import UsersPage from "../Users/Users";
import PartnersPage from "../Partners/Partners";

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

const MainComponent = () => {
  const ctx = useContext(AppContext);

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
                {/* <Link
                  onClick={() =>
                    ctx?.setState({ ...ctx.state, drawerOpen: false })
                  }
                  to="/"
                  style={{ textDecoration: "none", color: grey[900] }}
                >
                  <ListItem button>
                    <ListItemText primary="Users" />
                  </ListItem>
                </Link> */}
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
                  to="/comingsoonemails"
                  style={{ textDecoration: "none", color: grey[900] }}
                >
                  <ListItem button>
                    <ListItemText primary="Coming Soon Emails" />
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

          <Switch>
            {/* <Route exact path="/">
              <UsersPage />
            </Route> */}
            <Route exact path="/">
              <PartnersPage />
            </Route>
          </Switch>
          
        </Router>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
};

export default MainComponent;
