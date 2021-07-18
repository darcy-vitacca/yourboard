import React from 'react';
import Routes from './Routes';
import { GlobalStyle } from './styles/Global.styles';
import { Header } from './shared/header';
import { Footer } from './shared/footer';
import axios from 'axios';

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
