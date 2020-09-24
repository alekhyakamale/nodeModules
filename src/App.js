import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import history from './Components/Layout/history';
import Home from './Components/Home';
import Results from './Components/Results';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer'; 
 
function App() { 
  return (
      <Router history={history}>
        <div className="App">
          <Header/>
          <Switch>
          <Route exact path ="/" component={Home}><Home/></Route>
          <Route exact path = "/results" component={Results}><Results/></Route>
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
