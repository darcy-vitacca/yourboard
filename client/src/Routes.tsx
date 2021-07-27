import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing, NotFound, Login, Register } from './components/pages';
import { Header } from './shared/header';
import { AddLink } from './components/pages/AddLink';
import { AddProject } from './components/pages/AddProject';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/add-links" component={AddLink} />
        <Route exact path="/add-project" component={AddProject} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register" component={Register} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
