import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import TimeSchedules from './pages/TimeSchedules/TimeSchedules.jsx';
import { AddSchedules } from './pages/TimeSchedules/AddSchedules.jsx';
import { Signup } from './pages/Auth/Signup';
import { Login } from './pages/Auth/Login';
import { useAuth } from './useAuth';

function App() {
  const { authUser, loading } = useAuth();

  if (loading) return <>Loading auth user...</>;

  return (
    <div className="App">
      {!authUser && (
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Redirect to="/signup" />
        </Switch>
      )}
      {authUser && (
        <>
          <Switch>
            <Route
              path="/schedules"
              exact
              render={() => <TimeSchedules authUser={authUser} />}
            />
            <Route path="/AddSchedules" exact component={AddSchedules} />
            <Redirect to="/schedules" />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
