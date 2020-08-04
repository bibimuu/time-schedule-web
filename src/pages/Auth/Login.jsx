import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import { Error } from '../../components/Error';
import firebase from '../../config/firebase';
import './Auth.css';

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
    <div className="backgroundContainer">
      <div className="background">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="formContainer">
            <div className="inputBoxContainer">
              <InputBox
                placeholder="email"
                register={register({ required: true, maxLength: 30 })}
                name="loginEmail"
                type="email"
                color="#ffffff"
                label="メールアドレス"
              />
              <div className="errorContainer">
                {errors.loginEmail?.type === 'required' && (
                  <Error>メールアドレスが入力されてないよ</Error>
                )}
                {errors.loginEmail?.type === 'maxLength' && (
                  <Error>最大30文字までだよ</Error>
                )}
              </div>
            </div>
            <div className="inputBoxContainer">
              <InputBox
                placeholder="password"
                register={register({
                  required: true,
                  maxLength: 20,
                  minLength: 7,
                })}
                name="loginPassword"
                type="password"
                label="パスワード"
              />
              <div className="errorContainer">
                {errors.loginPassword?.type === 'required' && (
                  <Error>パスワードが入力されてないよ</Error>
                )}
                {errors.loginPassword?.type === 'maxLength' && (
                  <Error>最大20文字までだよ</Error>
                )}
                {errors.loginPassword?.type === 'minLength' && (
                  <Error>７文字以上で登録してね</Error>
                )}
              </div>
            </div>
            <div className="InputButtonContainer">
              <InputButton value="ログイン" />
            </div>
          </div>
        </form>
        <div className="btnContainer">
          <button
            className="textButton"
            onClick={() => history.push('./signup')}
          >
            サインアップはこっちだよ→
          </button>
        </div>
      </div>
    </div>
  );
};
