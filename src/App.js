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
      {!authUser && (
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Redirect to="/signup" />
        </Switch>
      )}
      {authUser && (
        <>
          <Switch>
            <Route path="/schedules" exact component={TimeSchedules} />
            <Route path="/AddSchedules" exact component={AddSchedules} />
            <Redirect to="/schedules" />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
