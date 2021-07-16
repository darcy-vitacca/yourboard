import React from 'react';
import Routes from './Routes';
import { GlobalStyle } from './styles/Global.styles';
import { Header } from './shared/header';
import { Footer } from './shared/footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes />
      <Footer />
    </>
  );
}

export default App;
