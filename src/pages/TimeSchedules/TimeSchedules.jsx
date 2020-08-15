import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../config/firebase';
import { SchedulesCard } from '../../components/SchedulesCard';
import './TimeSchedules.css';

const TimeSchedules = ({ authUser }) => {
  const [scheduleList, setScheduleList] = useState(null);
  const [colorNumber, setColorNumber] = useState(0);
  useEffect(() => {
    const loadSchedules = async () => {
      const db = firebase.firestore();
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
      await scheduleQuery.onSnapshot((snap) => {
        setScheduleList(
          snap.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          })
        );
      });
    };
    loadSchedules();
  }, [authUser.uid]);

  if (scheduleList === null) {
    return <>loading</>;
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
    setColorNumber(colorNumber + 1);
    if (colorNumber === 5) {
      setColorNumber(0);
    }
  };

  const days = {
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
  };

  const scheduleColorNumber = `scheduleColorNumber${colorNumber}`;

  const mondayScheduleList = scheduleList
    .filter((s) => s.day === 'mon')
    .sort((s1, s2) => s1.time - s2.time);
  const tuesdayScheduleList = scheduleList
    .filter((s) => s.day === 'tue')
    .sort((s1, s2) => s1.time - s2.time);
  const wednesdayScheduleList = scheduleList
    .filter((s) => s.day === 'wed')
    .sort((s1, s2) => s1.time - s2.time);
  const thursdayScheduleList = scheduleList
    .filter((s) => s.day === 'thu')
    .sort((s1, s2) => s1.time - s2.time);
  const fridayScheduleList = scheduleList
    .filter((s) => s.day === 'fri')
    .sort((s1, s2) => s1.time - s2.time);

  return (
    <div className="timeSchedulesBackgroundContainer">
      <div className="timeSchedulesBackground">
        <div className={`schedulesContainer ${scheduleColorNumber}`}>
          <div className="timeContainer">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>

          <div className="oneDaySchedules">
            <div className="daysContainer">
              <div className="day">月</div>
              <div className="day">火</div>
              <div className="day">水</div>
              <div className="day">木</div>
              <div className="day">金</div>
            </div>

            <div className="schedules">
              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = mondayScheduleList.find((s) => s.time === i);
                  return (
                    <SchedulesCard schedule={schedule} day="mon" time={i} />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = tuesdayScheduleList.find(
                    (s) => s.time === i
                  );
                  return (
                    <SchedulesCard schedule={schedule} day="tue" time={i} />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = wednesdayScheduleList.find(
                    (s) => s.time === i
                  );
                  return (
                    <SchedulesCard schedule={schedule} day="wed" time={i} />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = thursdayScheduleList.find(
                    (s) => s.time === i
                  );
                  return (
                    <SchedulesCard schedule={schedule} day="thu" time={i} />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = fridayScheduleList.find((s) => s.time === i);
                  return (
                    <SchedulesCard schedule={schedule} day="fri" time={i} />
                  );
                })}
              </div>
            </div>
          </div>
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
