import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { routes } from './routes';

import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
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
