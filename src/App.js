import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./components/DashbaordPage";
import HomePage from "./components/HomePage";
import AreYouSure from "./components/AreYouSure";

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/areYouSure">
          <AreYouSure />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}
