import React from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import firebase from '../../config/firebase';
import './TimeSchedules.css';

export const AddSchedules = ({ day, time, userId, closeModal }) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    const db = firebase.firestore();
    await db
      .collection('schedules')
      .doc(userId)
      .set(
        {
          [day]: [
            {
              title: data.title,
              // teacher: data.teacher,
              time: time,
              classRoom: data.classRoom,
            },
          ],
        },
        { merge: true }
      );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          placeholder="title"
          register={register({ required: true, maxLength: 30 })}
          name="title"
          type="text"
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
