import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../config/firebase';

import { ScheduleCard } from '../../components/SchedulesCard';
import './style.css';

const TimeSchedules = ({ history, authUser }) => {
  const [data, setData] = useState(null);
  const [schedulesCount, setSchedulesCount] = useState(5);
  useEffect(() => {
    const db = firebase.firestore();
    const getSchedules = async () => {
      // userドキュメントのIdを取得
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

      const scheduleQuerySnapshot = await scheduleQuery.get();

      // 時間割り未登録のユーザーの場合
      if (scheduleQuerySnapshot.docs.length === 0) {
        db.collection('schedules').doc().set({
          userId: userId,
        });
        return;
      }

      if (scheduleQuerySnapshot.docs.length > 1) {
        throw new Error('failed to fetch valid schedules count');
      }

      const scheduleDocData = scheduleQuerySnapshot.docs[0];
      setData({ ...scheduleDocData.data(), id: scheduleDocData.id });
    };
    getSchedules();
  }, [authUser.uid]);

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

  const days = {
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
  };

  const addSchedule = async (time, day) => {
    history.push({
      pathname: '/AddSchedules',
      state: { day: day, time: time, userId: data.id },
    });
  };

  if (data === null) {
    return <>loading schedules</>;
  }

  return (
    <div>
      <h1>時間割りページ</h1>
      <div className="schedulesContainer">
        <div>
          {[...Array(schedulesCount + 1)].map((_, i) => {
            const showTime = i;
            if (showTime === 0) return <div className="blank"></div>;

            return <div>{showTime}</div>;
          })}
        </div>
        {Object.keys(days).map((day) => {
          return (
            <div>
              <div>{days[day]}</div>
              <div>
                {[...Array(schedulesCount)].map((_, i) => {
                  const time = i + 1;
                  return (
                    <div>
                      {data[day] ? (
                        data[day].find((d) => d.time === time) ? (
                          <ScheduleCard
                            title={data[day].find((d) => d.time === time).title}
                            classRoom={
                              data[day].find((d) => d.time === time).classRoom
                            }
                            teacher={
                              data[day].find((d) => d.time === time).teacher
                            }
                            addSchedule={() => addSchedule(time, day)}
                          />
                        ) : (
                          <div
                            className="blank"
                            onClick={() => addSchedule(time, day)}
                          ></div>
                        )
                      ) : (
                        <div
                          className="blank"
                          onClick={() => addSchedule(time, day)}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default withRouter(TimeSchedules);
