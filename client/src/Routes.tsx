import React , {useEffect }from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga"
import {Route, Switch } from "react-router-dom";
import { Landing, NotFound, Login, Register } from "./components/pages";
import { Header } from "./shared/header";
import { AddLink } from "./components/pages/AddLink";
import { AddProject } from "./components/pages/AddProject";
import { Settings } from "./components/pages/Settings";
import { MyProfile } from "./components/pages/MyProfile";
import { Inbox } from "./components/pages/Inbox";
import { Notes } from './components/pages/Notes';
import { Reset } from './components/pages/Reset';

declare global {
  interface Window { GA_INITIALIZED: any; }
}

 const usePageViews = () => {
     let location = useLocation();
     useEffect(() => {
       if(process.env.REACT_APP_ENV !== "development")
         if (!window.GA_INITIALIZED) {
           ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS}`);
           window.GA_INITIALIZED = true;
         }
         ReactGA.set({ page: location.pathname });
         ReactGA.pageview(location.pathname);
     }, [location]);
}

export const Routes = () => {
  usePageViews();
  return (
     <>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset/:id?" component={Reset} />
        <Route exact path="/add-links" component={AddLink} />
        <Route exact path="/notes" component={Notes} />
        <Route exact path="/add-project" component={AddProject} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/my-inbox" component={Inbox} />
        <Route exact path="*" component={NotFound} />
      </Switch>
     </>
  );
};


