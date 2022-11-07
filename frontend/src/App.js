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
import EditSpotForm from "./components/SpotBrowser/EditSpotForm";
import { getAllSpots } from "../src/store/spot";
import { getReviews } from "./store/reviews";
import Footer from "./components/Footer/Footer";
import SpotImages from "./components/SpotImages/SpotImages";
import './fonts/AirbnbCereal_W_Bd.otf'
import './fonts/AirbnbCereal_W_Bk.otf'
import './fonts/AirbnbCereal_W_Blk.otf'
import './fonts/AirbnbCereal_W_Lt.otf'
import './fonts/AirbnbCereal_W_Md.otf'
import './fonts/AirbnbCereal_W_XBd.otf'
import CreateAImage from "./components/SpotImages/CreateImages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllSpots())
    dispatch(getReviews())
  }, [dispatch]);

  return (
    <>
      <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

        <Route path='/' exact>
               <SpotBrowser/>
         
        </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path ='/spots/:spotId/editspot' exact>
          <EditSpotForm/>
         </Route>

          <Route path ='/spots/myspots' exact>
          <GetSpotsOfCurrentUser/>
         </Route>
       

          <Route path ='/spots/form' exact>
          <CreateSpotForm/>
        </Route>

          <Route path ='/spots/:spotId'>
            <SpotDetails/>
          </Route>


        </Switch>
      )}
      </div>

      

    </>
  );
}

export default App;