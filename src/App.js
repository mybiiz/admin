import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MainComponent from './components/MainComponent/MainComponent'

const AppContext = React.createContext(null)

function App() {
  const [state, setState] = useState({
    apiKey: localStorage.getItem('apiKey'),
    loggedIn: false
  })

  return (
    <AppContext.Provider value={{ state: state, setState: setState }}>
      <MainComponent />
    </AppContext.Provider>
  )
}

export default App;
