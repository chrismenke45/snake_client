import React from 'react';

import Game from './components/Game';
import ScoreDisplay from './components/ScoreDisplay';
import Error from './components/Error';

import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {


  const phoneKeys = [];
  for (let i = 1; i < 10; i++) {
    phoneKeys.push(<div key={`pk${i}`}>{i}</div>);
  }
  phoneKeys.push(<div key="pk10">*</div>)
  phoneKeys.push(<div key="pk11">0</div>)
  phoneKeys.push(<div key="pk12">#</div>)
  return (
    <div id="phone">
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
