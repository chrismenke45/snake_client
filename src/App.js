import React, { useEffect } from 'react';
import Game from './components/Game';
import ScoreDisplay from './components/ScoreDisplay';
import Error from './components/Error';
import audio from "./buttonSound.mp3"

import {
  //BrowserRouter as Router, - no
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  //below is to ping api to start up server
  useEffect(() => {
    let url = (process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL) + '/records';
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    };
    fetch(url, options)
      .then((response) => response.json())
      .then(scores => {
        console.log("pinged API for startup")
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])
  //above is to ping api to start up server

  const playPhoneKeyNoise = () => {
    new Audio(audio).play()
  }

  const phoneKeys = [];
  for (let i = 1; i < 10; i++) {
    phoneKeys.push(<div onClick={playPhoneKeyNoise} key={`pk${i}`}>{i}</div>);
  }
  phoneKeys.push(<div onClick={playPhoneKeyNoise} key="pk10">*</div>)
  phoneKeys.push(<div onClick={playPhoneKeyNoise} key="pk11">0</div>)
  phoneKeys.push(<div onClick={playPhoneKeyNoise} key="pk12">#</div>)
  return (
    <div id="phone">
      <div id="mobileNotice">Sorry, this app is not made to be run on mobile :{"("} Please try opening it on a computer's browser</div>
      <div id="instructionNotice">Use your arrow keys to control the snake and spacebar to pause!</div>
      <h1>Nokia Snake</h1>
      <Router>
        <Routes>
          <Route
            exact path='/'
            element={<Game />}>
          </Route>
          <Route
            exact path='/scores'
            element={<ScoreDisplay />}>
          </Route>
          <Route
            path='/*'
            element={<Error />}>
          </Route>
        </Routes>
      </Router>


      <div id='semiCircleBox'>
        <div id="underScreenSemiCircle"></div>
      </div>
      <div id="phoneKeys">
        {phoneKeys}
      </div>
    </div>
  );
}


export default App;
