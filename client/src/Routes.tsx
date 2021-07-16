import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {
  Landing,
  NotFound,
  Page1,
  Page2,
  Page3,
  Page4,
} from './components/pages';

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/page1" component={Page1} />
        <Route exact path="/page2" component={Page2} />
        <Route exact path="/page3" component={Page3} />
        <Route exact path="/page4" component={Page4} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
