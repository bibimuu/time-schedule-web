import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../config/firebase';
import { ScheduleCard } from '../../components/SchedulesCard';
import { Blank } from '../../components/Blank';
import './TimeSchedules.css';

const TimeSchedules = ({ history, authUser }) => {
  // TODO: colorNumberに変更
  const [scheduleList, setScheduleList] = useState(null)
  const [number, setNumber] = useState(0);
  useEffect(()=> {
    const loadSchedules = async() => {
      const db = firebase.firestore()
      const userQuery = db.collection('users').where('uid', '==', authUser.uid);
      const userQuerySnapshot = await userQuery.get();
      if (userQuerySnapshot.docs.length !== 1) {
        throw new Error('failed to fetch valid users count');
      }
      const userId = userQuerySnapshot.docs[0].id;
      // userドキュメントのIdを使って該当するscheduleドキュメントを取得
      const scheduleQuery = db
        .collection('schedules')
        .where('userId', '==', userId);
      // const a = await scheduleQuery.get()
      await scheduleQuery.onSnapshot((snap) => {
        setScheduleList(snap.docs.map(doc => {
          return {
            ...doc.data(),
            id : doc.id
          }
        }))
      })
    }
    loadSchedules()

  }, [authUser.uid])

  if (scheduleList=== null) {
    return <>loading</>
  }

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('ログアウトしました');
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  };

  const changeColorFunction = () => {
    setNumber(number + 1);
    if (number === 5) {
      setNumber(0);
    }
  };

  const days = {
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
  };

  const scheduleColorNumber = `scheduleColorNumber${number}`;


  const mondayScheduleList = scheduleList.filter(s => s.day === 'mon').sort((s1,s2)  => s1.time - s2.time)
  const tuesdayScheduleList = scheduleList.filter(s => s.day === 'tue').sort((s1,s2)  => s1.time - s2.time)
  const fridayScheduleList = scheduleList.filter(s => s.day === 'fri').sort((s1,s2)  => s1.time - s2.time)
  return (
    <div className="timeSchedulesBackgroundContainer">
      <div className="timeSchedulesBackground">
        <div>
          <p>月曜の時間割は</p>
          <>
          {[1,2,3,4,5].map(i => {
            const schedule = mondayScheduleList.find(s => s.time === i)
            return (
              <div>
                {!schedule && <>登録なし</>}
                {schedule && <div>
                  <div>{schedule.time}</div>
                  <div>{schedule.title}</div>
                  <div>{schedule.teacher}</div>
                  <div>{schedule.room}</div>
              </div>
              }
              </div>
            )
          })}
          </>
          <p>火曜の時間割は</p>
          {tuesdayScheduleList.map(s => (
            <div>
              <div>{s.time}</div>
              <div>{s.title}</div>
              <div>{s.teacher}</div>
              <div>{s.room}</div>
            </div>
          ))}
          <p>金曜の時間割は</p>
          {fridayScheduleList.map(s => (
            <div>
              <div>{s.time}</div>
              <div>{s.title}</div>
              <div>{s.teacher}</div>
              <div>{s.room}</div>
            </div>
          ))}
          
        </div>
        <div className="btnTextButtonContainer">
          <button
            className="textButton"
            id="changeColor"
            onClick={changeColorFunction}
          >
            色を変える→
          </button>
          <button className="textButton" onClick={logout}>
            ログアウト→
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TimeSchedules);
