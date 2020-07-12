import React, { useEffect, useState } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import { TimeSchedules } from './pages/TimeSchedules/TimeSchedules.jsx';
import { AddSchedules } from './pages/TimeSchedules/AddSchedules.jsx';
import { Signup } from './pages/Signup';
import { useAuth } from './useAuth';

function App() {
  const { authUser, loading } = useAuth();

  if (loading) return <>Loading...</>;

  return (
    <div className="App">
      {!authUser && <Route path="/" exact component={Signup} />}
      {authUser && (
        <>
          <Switch>
            <Route path="/schedules" exact component={TimeSchedules} />
            <Route path="/AddSchedules" exact component={AddSchedules} />
            <Redirect to="/schedules" />
          </Switch>
          <div>
            <Link to="/">homeへ</Link>
          </div>
          <div>
            <Link to="/schedules">schedulesへ</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
