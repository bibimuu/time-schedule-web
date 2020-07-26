import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
// import './style.css';

export const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error.code, error.message);
      });
  };

  return (
    <>
      <form>
        <InputBox
          placeholder="email"
          value={email}
          onChange={emailHandleChange}
          register={register({ required: true, maxLength: 30 })}
          name="loginEmail"
        />
        {errors.loginEmail?.type === 'required' &&
          'メールアドレスが未入力です。'}
        {errors.loginEmail?.type === 'maxLength' && '最大30文字までです。'}
        <InputBox
          placeholder="password"
          value={password}
          onChange={passwordHandleChange}
          register={register({ required: true, maxLength: 20, minLength: 7 })}
          name="loginPassword"
        />
        {errors.loginPassword?.type === 'required' &&
          'パスワードが未入力です。'}
        {errors.loginPassword?.type === 'maxLength' && '最大20文字までです。'}

        <InputButton value="ログイン" onClick={handleLogin} />
      </form>

      <button onClick={() => history.push('./signup')}>
        サインアップ画面へ
      </button>
    </>
  );
};
