import React from 'react';
import { Route, Link } from 'react-router-dom';

import { TimeSchedules } from './pages/TimeSchedules/TimeSchedules.jsx';
import { AddSchedules } from './pages/TimeSchedules/AddSchedules.jsx';
import { Signup } from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Signup} />
      <Route path="/schedules" exact component={TimeSchedules} />
      <Route path="/AddSchedules" exact component={AddSchedules} />
      <div>
        <Link to="/">homeへ</Link>
      </div>
      <div>
        <Link to="/schedules">schedulesへ</Link>
      </div>
    </div>
  );
}

export default App;
