import React, { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga";
import { Route, Switch } from "react-router-dom";
import { ChatWidget } from "@papercups-io/chat-widget";
import { Loader } from "./shared/loaders";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from "react-dnd";
import {isMobile} from "react-device-detect";


const Landing = lazy(() => import("./components/pages/Landing"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const Header = lazy(() => import("./shared/header/Header"));
const AddLink = lazy(() => import("./components/pages/AddLink"));
const AddProject = lazy(() => import("./components/pages/AddProject"));
const Settings = lazy(() => import("./components/pages/Settings"));
const MyProfile = lazy(() => import("./components/pages/MyProfile"));
const Inbox = lazy(() => import("./components/pages/Inbox"));
const Notes = lazy(() => import("./components/pages/Notes"));
const Reset = lazy(() => import("./components/pages/Reset"));
const Footer = lazy(() => import("./shared/footer"));
const Contact = lazy(() => import("./components/pages/Contact/Contact"));
const Privacy = lazy(() => import("./components/pages/Privacy/Privacy"));
const RoadMap = lazy(() => import("./components/pages/RoadMap"));

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
      <Suspense fallback={<Loader />}>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/add-links" component={AddLink} />
            <Route exact path="/add-folder" component={AddProject} />
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset/:id?" component={Reset} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path="/my-inbox" component={Inbox} />
            <Route exact path="/roadmap" component={RoadMap} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </DndProvider>
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
      </Suspense>
    </>
  );
};
