import './App.css';
import React, {useState} from 'react';
import Login from './Components/SignIN comp/Login';
import {Paper} from "@material-ui/core";
import {ThemeProvider, createTheme} from "@material-ui/core/styles"
function App() {
  const [darkMode, setDarkMode]=useState(false);
  const darkTheme=createTheme({
    palette:{
      type:"dark",
    }
  })
  
  return (
    <Paper>
      <Login/>
    </Paper>
  );
}

export default App;
