import React from 'react';
import Routes from './Routes';
import { GlobalStyle } from './styles/Global.styles';
import axios from 'axios';
import { AuthProvider } from './components/context/context';


const App = () => {
  axios.defaults.baseURL = 'http://localhost:5000/api';
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
