import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputBox } from '../../components/InputBox';
import { InputButton } from '../../components/InputButton';
import { Error } from '../../components/Error';
import firebase from '../../config/firebase';
import './AddSchedules.css';

export const AddSchedules = ({ schedule, day, time, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const db = firebase.firestore();

    if (schedule) {
      const scheduleId = db.collection('schedules').doc(schedule.id);
      await scheduleId.update({
        title: data.title,
        room: data.classRoom,
      });
    } else {
      const userQuery = db.collection('users');
      const userQuerySnapshot = await userQuery.get();
      const userId = userQuerySnapshot.docs[0].id;
      const newSchedule = db.collection('schedules').doc();
      await newSchedule.set({
        title: data.title,
        room: data.classRoom,
        day: day,
        time: time,
        userId: userId,
      });
    }
    setLoading(false);
    closeModal();
  };

  return (
    <div>
      <div className="close" onClick={closeModal}>
        <span></span>
      </div>
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
          {loading ? (
            <div className="loading">ちょっと待ってね...</div>
          ) : (
            <InputButton value="登録" />
          )}
        </div>
      </form>
    </div>
  );
};
