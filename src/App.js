import React from 'react';
import './App.css';
import Home from './Components/Home';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer'; 
 
function App() { 
  return (
        <div className="App">
          <Header/>
          <Home/>
          <Footer/>
        </div>
  );
}

export default App;
