import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing, NotFound, Login, Signup } from './components/pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
