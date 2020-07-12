import React, { useEffect, useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import firebase from './config/firebase';
import { TimeSchedules } from './pages/TimeSchedules/TimeSchedules.jsx';
import { AddSchedules } from './pages/TimeSchedules/AddSchedules.jsx';
import { Signup } from './pages/Signup';

function App() {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(); //ログインチェックが完了してるか
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <>Loading...</>;

  return (
    <div className="App">
      {!authUser && <Route path="/" exact component={Signup} />}
      {authUser && (
        <>
          <Switch>
            <Route path="/schedules" exact component={TimeSchedules} />
            <Route path="/AddSchedules" exact component={AddSchedules} />
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
