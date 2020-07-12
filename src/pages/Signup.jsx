import React, { useEffect, useState } from 'react';
import firebase from '../config/firebase';
// import './style.css';
import { Redirect } from 'react-router-dom';

export const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('emailまたは、passwordを入力してください');
      history.push('./Signup.jsx');
      return;
    }
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
    history.push('./TimeSchedules/TimeSchedules.jsx');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('emailまたは、passwordを入力してください');
      history.push('./TimeSchedules/TimeSchedules.jsx');
      return;
    }
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
    history.push('./TimeSchedules/TimeSchedules.jsx');
  };

  return (
    <>
      <div className="App">サインアップ</div>
      <form>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={emailHandleChange}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={passwordHandleChange}
        />
        <input type="submit" value="Signup" onClick={handleSignup} />
        <input type="submit" value="Login" onClick={handleLogin} />
      </form>
    </>
  );
};
