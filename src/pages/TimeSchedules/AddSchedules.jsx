import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebase';
import './style.css';

export const AddSchedules = (props) => {
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('');
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const getSchedules = async () => {
  //     const db = firebase.firestore();

  //     const docRef = db.collection('schedules').doc('3IwLuJlxz3Pl4QLpvpwx');
  //     const docSnapShot = await docRef.get();
  //     setData(docSnapShot.data());
  //   };
  //   getSchedules();
  // }, []);

  // if (!data) {
  //   return <>loading</>;
  // }

  const titleHandleChange = (event) => {
    setTitle(event.target.value);
  };
  const teacherHandleChange = (event) => {
    setTeacher(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(event);
    debugger;
    if (title === '' || teacher === '') {
      alert('教科を入力してください');
      props.history.push('/AddSchedules');
      return;
    }
  };

  // db.collection('schedules').doc('3IwLuJlxz3Pl4QLpvpwx').set(data);

  return (
    <div>
      <form method="POST" action="AddSchedules" onSubmit={handleSubmit}>
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
