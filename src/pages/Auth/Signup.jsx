import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
// import './style.css';

export const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
          name="signupEmail"
        />
        {errors.signupEmail?.type === 'required' &&
          'メールアドレスが未入力です。'}
        {errors.signupEmail?.type === 'maxLength' && '最大30文字までです。'}
        <InputBox
          placeholder="password"
          value={password}
          onChange={passwordHandleChange}
          register={register({ required: true, maxLength: 20, minLength: 7 })}
          name="signupPassword"
        />
        {errors.signupPassword?.type === 'required' &&
          'パスワードが未入力です。'}
        {errors.signupPassword?.type === 'maxLength' && '最大20文字までです。'}
        {errors.signupPassword?.type === 'minLength' &&
          '７文字以上で登録してください。'}

        <InputButton value="サインアップ" onClick={handleSignup} />
      </form>

      <button onClick={() => history.push('./login')}>ログイン画面へ</button>
    </>
  );
};
