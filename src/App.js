import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import MainComponent from "./components/MainComponent/MainComponent";

export const AppContext = React.createContext(null);

function App() {
  const [state, setState] = useState({
    baseUrl: process.env.REACT_APP_BASE_URL,
    apiKey: localStorage.getItem("apiKey"),
    loggedIn: localStorage.getItem("apiKey") ? true : false,
    loginRequestStatus: "NotAsked", // NotAsked, Login, Success, Error
  });

  return (
    <AppContext.Provider value={{ state: state, setState: setState }}>
      <MainComponent />
    </AppContext.Provider>
  );
}

export default App;
