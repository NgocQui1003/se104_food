import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header.js';
import Navbar from './components/header/HeaderHomepage.js';
import Home from './components/pages/Home';
import Register from './components/Register/Register';


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Header />
      <Switch>
        <Route path='/' exact component={Home}>
        </Route>
        <Route path='/dang-ki' exact component={Register}>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
