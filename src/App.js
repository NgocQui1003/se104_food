import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { routes } from './routes';

import RootHeader from './Components/RootHeader';
import Footer from './Components/Footer';
function App() {

  return (
    <>
      <Router>
        <RootHeader />
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
        <Footer />
      </Router>
    </>
  );
}

export default App;
