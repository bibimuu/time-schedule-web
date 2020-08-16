import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import { Error } from '../../components/Error';
import firebase from '../../config/firebase';
import './Auth.css';

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
      if (e.code === 'auth/invalid-email') {
        alert('不正なメールアドレスです');
      }

      if (e.code === 'auth/email-already-in-use') {
        alert('メールアドレスはすでに登録されています');
      } else {
        alert(e.code);
      }
      return;
    }

    await db.collection('users').doc().set({
      email: data.signupEmail,
      uid: response.user.uid,
      colorNumber: 0,
    });
  };

  return (
    <div className="backgroundContainer">
      <div className="background ">
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="formContainer">
            <div className="inputBoxContainer">
              <InputBox
                register={register({ required: true, maxLength: 30 })}
                name="signupEmail"
                type="email"
                color="#ffffff"
                label="メールアドレス"
              />
              <div className="authErrorContainer">
                {errors.signupEmail?.type === 'required' && (
                  <Error>メールアドレスが入力されてないよ</Error>
                )}
                {errors.signupEmail?.type === 'maxLength' && (
                  <Error>最大30文字までだよ</Error>
                )}
              </div>
            </div>
            <div className="inputBoxContainer">
              <InputBox
                register={register({
                  required: true,
                  maxLength: 20,
                  minLength: 7,
                })}
                name="signupPassword"
                type="password"
                label="パスワード"
              />
              <div className="authErrorContainer">
                {errors.signupPassword?.type === 'required' && (
                  <Error>パスワードが入力されてないよ</Error>
                )}
                {errors.signupPassword?.type === 'maxLength' && (
                  <Error>最大20文字までだよ</Error>
                )}
                {errors.signupPassword?.type === 'minLength' && (
                  <Error>７文字以上で登録してね</Error>
                )}
              </div>
            </div>
            <div className="InputButtonContainer">
              <InputButton value="サインアップ" />
            </div>
          </div>
        </form>
        <div className="btnChangeAuthContainer">
          <button
            className="changeAuth"
            onClick={() => history.push('./login')}
          >
            ログインはこっちだよ→
          </button>
        </div>
      </div>
    </div>
  );
};
