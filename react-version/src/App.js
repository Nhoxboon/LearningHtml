import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Nav from './components/Nav';
import TitleAndButton from './components/TitleAndButton';
import Page from './components/Page';




function App() {
  return (
    <>
      <Nav />
      <TitleAndButton />
      <Page />
    </>
    
  );
}

export default App;
