import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
import './style.css';

export const AddSchedules = ({
  location: {
    state: { day, time },
  },
  history,
}) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data) => {
    const db = firebase.firestore();
    db.collection('schedules')
      .doc('3IwLuJlxz3Pl4QLpvpwx')
      .set(
        {
          [day]: [
            {
              title: data.title,
              teacher: data.teacher,
              time: time,
              classRoom: data.classRoom,
            },
          ],
        },
        { merge: true }
      );
    history.push('/schedules');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          placeholder="title"
          register={register({ required: true, maxLength: 30 })}
          name="title"
        />
        {errors.title?.type === 'required' && 'クラス名は、必須項目です。'}
        {errors.title?.type === 'maxLength' && '最大30文字までです。'}
        <InputBox
          placeholder="teacher"
          register={register({ maxLength: 15 })}
          name="teacher"
        />
        {errors.teacher?.type === 'maxLength' && '最大15文字までです。'}
        <InputBox
          placeholder="classRoom"
          register={register({ maxLength: 10 })}
          name="classRoom"
        />
        {errors.classRoom?.type === 'maxLength' && '最大10文字までです。'}
        <InputButton value="登録" />
      </form>
    </div>
  );
};
