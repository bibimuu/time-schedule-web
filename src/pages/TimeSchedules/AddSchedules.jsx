import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
import './TimeSchedules.css';

// NOTE: dayとtimeはscheduleがないときに新規登録するために使う
export const AddSchedules = ({ schedule, day, time }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (data) => {
    const db = firebase.firestore()
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
          placeholder="title"
          register={register({ required: true, maxLength: 30 })}
          name="title"
          type="text"
          defaultValue={schedule && schedule.title}
        />
        {errors.title?.type === 'required' && 'クラス名は、必須項目です。'}
        {errors.title?.type === 'maxLength' && '最大5文字までです。'}
        {/* <InputBox
          placeholder="teacher"
          register={register({ maxLength: 15 })}
          name="teacher"
          type="text"
        /> */}
        {/* {errors.teacher?.type === 'maxLength' && '最大15文字までです。'} */}
        <InputBox
          placeholder="classRoom"
          register={register({ maxLength: 5 })}
          name="classRoom"
          type="text"
          overlayClassName="overlay"
        />
        {errors.classRoom?.type === 'maxLength' && '最大5文字までです。'}
        <InputButton value="登録" />
      </form>
    </div>
  );
};
