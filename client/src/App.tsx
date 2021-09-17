import React from "react";
import Routes from "./Routes";
import { GlobalStyle } from "./styles/Global.styles";
import axios from "axios";
import { AuthProvider } from "./components/context/context";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const App = () => {
  axios.defaults.baseURL = "/api/";

  axios.defaults.withCredentials = true;
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
