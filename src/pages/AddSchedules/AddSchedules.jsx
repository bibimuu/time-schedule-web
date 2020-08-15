import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import { Error } from '../../components/Error';
import firebase from '../../config/firebase';
import './AddSchedules.css';

// NOTE: dayとtimeはscheduleがないときに新規登録するために使う
export const AddSchedules = ({ schedule, day, time }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (data) => {
    const db = firebase.firestore();
    if (schedule) {
      // TODO: update
    } else {
      // TODO: create
      // dayとtimeと入力内容をfirestoreにset
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          placeholder="教科を入力してね"
          register={register({ required: true, maxLength: 5 })}
          name="title"
          type="text"
          defaultValue={schedule && schedule.title}
          smallInputBox="smallInputBox"
          small_text_underline="small_text_underline"
        />
        <div className="ModalErrorContainer">
          {errors.title?.type === 'required' && (
            <Error>クラス名は、必須だよ。</Error>
          )}
          {errors.title?.type === 'maxLength' && (
            <Error>最大5文字までだよ。</Error>
          )}
        </div>
        {/* <InputBox
          placeholder="teacher"
          register={register({ maxLength: 15 })}
          name="teacher"
          type="text"
        /> */}
        {/* {errors.teacher?.type === 'maxLength' && '最大15文字までです。'} */}
        <InputBox
          placeholder="クラスを入力してね"
          register={register({ maxLength: 5 })}
          name="classRoom"
          type="text"
          overlayClassName="overlay"
          defaultValue={schedule && schedule.room}
          smallInputBox="smallInputBox"
          small_text_underline="small_text_underline"
        />
        <div className="ModalErrorContainer">
          {errors.classRoom?.type === 'maxLength' && (
            <Error>最大5文字までだよ。</Error>
          )}
        </div>
        <div className="btnPosition">
          <InputButton value="登録" />
        </div>
      </form>
    </div>
  );
};
