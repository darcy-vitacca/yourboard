import React from 'react';
import Routes from './Routes';
import { GlobalStyle } from './styles/Global.styles';
import { Header } from './shared/header';
import { Footer } from './shared/footer';
import axios from 'axios';
import { TextField } from '@material-ui/core';
interface FormValue {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
const App = () => {
  axios.defaults.baseURL = 'http://localhost:5000';
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes />
      <Footer />
      </>
  );
};

export default App;
