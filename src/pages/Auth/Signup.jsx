import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
// import './style.css';

export const Signup = ({ history }) => {
  const { handleSubmit, register, errors } = useForm();

  const handleSignup = async (data) => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    let response;
    try {
      response = await auth.createUserWithEmailAndPassword(
        data.signupEmail,
        data.signupPassword
      );
    } catch (e) {
      alert(e.message);
      return;
    }

    await db.collection('users').doc().set({
      email: data.signupEmail,
      uid: response.user.uid,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)}>
        <InputBox
          placeholder="email"
          register={register({ required: true, maxLength: 30 })}
          name="signupEmail"
        />
        {errors.signupEmail?.type === 'required' &&
          'メールアドレスが未入力です。'}
        {errors.signupEmail?.type === 'maxLength' && '最大30文字までです。'}
        <InputBox
          placeholder="password"
          register={register({ required: true, maxLength: 20, minLength: 7 })}
          name="signupPassword"
        />
        {errors.signupPassword?.type === 'required' &&
          'パスワードが未入力です。'}
        {errors.signupPassword?.type === 'maxLength' && '最大20文字までです。'}
        {errors.signupPassword?.type === 'minLength' &&
          '７文字以上で登録してください。'}

        <InputButton value="サインアップ" />
      </form>

      <button onClick={() => history.push('./login')}>ログイン画面へ</button>
    </>
  );
};
