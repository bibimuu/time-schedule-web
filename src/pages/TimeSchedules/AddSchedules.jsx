import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebase';
import './style.css';

export const AddSchedules = (props) => {
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('');

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
      props.history.push('/AddSchedules');
      return;
    }
    let mon = {
      title: title,
      teacher: teacher,
    };
    const db = firebase.firestore();
    db.collection('schedules')
      .doc('3IwLuJlxz3Pl4QLpvpwx')
      .set({ mon }, { merge: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={titleHandleChange}
        />
        <input
          type="text"
          placeholder="teacher"
          value={teacher}
          onChange={teacherHandleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
