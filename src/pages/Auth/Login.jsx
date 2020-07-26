import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
// import './style.css';

export const Login = ({ history }) => {
  const { handleSubmit, register, errors } = useForm();

  const handleLogin = async (data) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(data.loginEmail, data.loginPassword)
      .catch((error) => {
        alert(error.code, error.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <InputBox
          placeholder="email"
          register={register({ required: true, maxLength: 30 })}
          name="loginEmail"
        />
        {errors.loginEmail?.type === 'required' &&
          'メールアドレスが未入力です。'}
        {errors.loginEmail?.type === 'maxLength' && '最大30文字までです。'}
        <InputBox
          placeholder="password"
          register={register({ required: true, maxLength: 20, minLength: 7 })}
          name="loginPassword"
        />
        {errors.loginPassword?.type === 'required' &&
          'パスワードが未入力です。'}
        {errors.loginPassword?.type === 'maxLength' && '最大20文字までです。'}

        <InputButton value="ログイン" />
      </form>

      <button onClick={() => history.push('./signup')}>
        サインアップ画面へ
      </button>
    </>
  );
};
