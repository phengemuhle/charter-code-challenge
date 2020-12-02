import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import HomePage from "./components/HomePage";
import AreYouSurePage from "./components/AreYouSurePage";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt",
      },
    })
      .then((response) => response.json())
      .then((info) => setData(info))
      .then(() => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ height: "100vh" }}>
          <Switch>
            <Route path="/dashboard">
              <DashboardPage fetch={data} />
            </Route>
            <Route path="/areYouSure">
              <AreYouSurePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}
