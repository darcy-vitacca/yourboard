import React from "react";
import { Routes } from './Routes';

import { BrowserRouter as Router} from "react-router-dom";
import { GlobalStyle } from "./styles/Global.styles";
import axios from "axios";
import { AuthProvider } from "./components/context/context";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });


const App = () => {
  axios.defaults.baseURL =
    process.env.REACT_APP_ENV === "production"
      ? "/api/"
      : "http://localhost:5000/api";

  axios.defaults.withCredentials = true;
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Router>
        <Routes />
          </Router>
      </AuthProvider>
    </>
  );
};

export default App;
