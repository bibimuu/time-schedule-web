import React, { useState } from 'react';

import { InputBox } from '../components/InputBox';
import { InputButton } from '../components/InputButton';
import firebase from '../config/firebase';
// import './style.css';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changeButton, setChangeButton] = useState(true);

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
      return;
    }
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error.code, error.message);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('emailまたは、passwordを入力してください');
      return;
    }
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error.code, error.message);
      });
  };

  const toggleButton = () => {
    setChangeButton(!changeButton);
  };

  return (
    <>
      <form>
        <InputBox
          placeholder="email"
          value={email}
          onChange={emailHandleChange}
        />
        <InputBox
          placeholder="password"
          value={password}
          onChange={passwordHandleChange}
        />

        {changeButton && (
          <InputButton value="サインアップ" onClick={handleSignup} />
        )}
        {!changeButton && (
          <InputButton value="ログイン" onClick={handleLogin} />
        )}
      </form>

      <button onClick={toggleButton}>
        {changeButton ? 'ログイン画面へ' : 'サインアップ画面へ'}
      </button>
    </>
  );
};
