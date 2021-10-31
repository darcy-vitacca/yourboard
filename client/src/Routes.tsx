import React, { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga";
import { Route, Switch } from "react-router-dom";
import { Landing, NotFound, Login, Register } from "./components/pages";
import { Header } from "./shared/header";
import { AddLink } from "./components/pages/AddLink";
import { AddProject } from "./components/pages/AddProject";
import { Settings } from "./components/pages/Settings";
import { MyProfile } from "./components/pages/MyProfile";
import { Inbox } from "./components/pages/Inbox";
import { Notes } from "./components/pages/Notes";
import { Reset } from "./components/pages/Reset";
import { ChatWidget } from "@papercups-io/chat-widget";
import { Footer } from "./shared/footer";
import { Contact } from "./components/pages/Contact/Contact";
import { Privacy } from "./components/pages/Privacy/Privacy";

declare global {
  interface Window {
    GA_INITIALIZED: any;
  }
}
const usePageViews = () => {
  let location = useLocation();
  useEffect(() => {
    if (process.env.REACT_APP_ENV !== "development") {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS}`);
        window.GA_INITIALIZED = true;
      }
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    }
  }, [location]);
};

export const Routes = () => {
  usePageViews();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/add-links" component={AddLink} />
        <Route exact path="/add-project" component={AddProject} />
        <Route exact path="/notes" component={Notes} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset/:id?" component={Reset} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/my-inbox" component={Inbox} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="*" component={NotFound} />
      </Switch>
      <Footer />
      <ChatWidget
        token="4f32ddf5-a054-4f69-90a9-b39f5d381dac"
        inbox="70f5af34-a300-4f2b-a7fa-cab4e3e2e14d"
        title="Welcome to urboard"
        subtitle="Ask us anything in the chat window below 😊"
        primaryColor="#10b981"
        greeting="Hello, Need Help? Have a feature request? See a bug? I'm a human so please be nice and I'll do my best to get back to you as soon as possible. 😊 If you want to be contacted by email please leave that in the message."
        newMessagePlaceholder="Start typing..."
        showAgentAvailability={false}
        agentAvailableText="We're online right now!"
        agentUnavailableText="We're away at the moment."
        requireEmailUpfront={false}
        iconVariant="outlined"
        baseUrl="https://app.papercups.io"
      />
    </>
  );
};
