import React, { useState } from 'react';
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
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const titleHandleChange = (event) => {
    setTitle(event.target.value);
  };
  const teacherHandleChange = (event) => {
    setTeacher(event.target.value);
  };
  const classHandleChange = (event) => {
    setClassRoom(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === '' || teacher === '' || classRoom === '') {
      alert('教科を入力してください');
      history.push('/AddSchedules');
      return;
    }
    const db = firebase.firestore();
    db.collection('schedules')
      .doc('3IwLuJlxz3Pl4QLpvpwx')
      .set(
        {
          [day]: [
            {
              title: title,
              teacher: teacher,
              time: time,
              classRoom: classRoom,
            },
          ],
        },
        { merge: true }
      );
    history.push('/schedules');
  };
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          placeholder="title"
          value={title}
          onChange={titleHandleChange}
          register={register({ required: true, maxLength: 20 })}
          name="title"
        />
        {errors.title?.type === 'required' && 'クラス名は、必須項目です。'}
        {errors.title?.type === 'maxLength' && '最大20文字までです。'}
        <InputBox
          placeholder="teacher"
          value={teacher}
          onChange={teacherHandleChange}
          register={register({ maxLength: 15 })}
          name="teacher"
        />
        {errors.teacher?.type === 'maxLength' && '最大15文字までです。'}
        <InputBox
          placeholder="classRoom"
          value={classRoom}
          onChange={classHandleChange}
          register={register({ maxLength: 10 })}
          name="classRoom"
        />
        {errors.classRoom?.type === 'maxLength' && '最大10文字までです。'}
        <InputButton value="登録" />
      </form>
    </div>
  );
};
