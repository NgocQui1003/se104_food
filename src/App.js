import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { routes } from './routes';

import Header from './Components/Header';
// import HeaderHomepage from './Components/HeaderHomepage';

function App() {
  return (
    <>
      <Router>
        <Header />
        {/* <HeaderHomepage /> */}
        <Switch>
          {routes.map(({ path, component }, key) =>
            <Route
              exact
              path={path}
              component={component}
              key={key}
            />
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
