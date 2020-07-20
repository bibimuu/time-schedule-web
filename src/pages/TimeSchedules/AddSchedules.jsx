import React, { useEffect, useState } from 'react';

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

  // const day = props.location.state.day;
  // const time = props.location.state.time;

  const titleHandleChange = (event) => {
    setTitle(event.target.value);
  };
  const teacherHandleChange = (event) => {
    setTeacher(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || teacher === '') {
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
            },
          ],
        },
        { merge: true }
      );
    history.push('/schedules');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputBox
          placeholder="title"
          value={title}
          onChange={titleHandleChange}
        />
        <InputBox
          placeholder="teacher"
          value={teacher}
          onChange={teacherHandleChange}
        />
        <InputButton value="登録" />
      </form>
    </div>
  );
};
