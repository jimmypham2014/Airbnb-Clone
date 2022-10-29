// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotBrowser from "./components/SpotBrowser/index.js";
import SpotDetails from "./components/SpotBrowser/SpotDetails";
import CreateSpotForm from "./components/SpotBrowser/CreateSpotForm";
import GetSpotsOfCurrentUser from "./components/SpotBrowser/GetSpotsOfCurrentUser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route path='/' exact>
        <SpotBrowser/>
        </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

      

          <Route path ='/spots/form' exact>
          <CreateSpotForm/>
        </Route>

          <Route path ='/spots/:spotId'>
            <SpotDetails/>
          </Route>

          <Route path ='/myspots'>
          <GetSpotsOfCurrentUser/>
        </Route>


        </Switch>
      )}
    </>
  );
}

export default App;