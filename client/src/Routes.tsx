import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing, NotFound, Login, Register } from "./components/pages";
import { Header } from "./shared/header";
import { AddLink } from "./components/pages/AddLink";
import { AddProject } from "./components/pages/AddProject";
import { Settings } from "./components/pages/Settings";
import { MyProfile } from "./components/pages/MyProfile";
import { Inbox } from "./components/pages/Inbox";
import { Notes } from './components/pages/Notes';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/add-links" component={AddLink} />
        <Route exact path="/notes" component={Notes} />
        <Route exact path="/add-project" component={AddProject} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/my-inbox" component={Inbox} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
