import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebase';

import { ScheduleCard } from '../../components/SchedulesCard';
import './style.css';

export const TimeSchedules = ({ history }) => {
  const [data, setData] = useState();
  const [schedulesCount, setSchedulesCount] = useState(5);

  useEffect(() => {
    const db = firebase.firestore();
    const getSchedules = async () => {
      const docRef = db.collection('schedules').doc('3IwLuJlxz3Pl4QLpvpwx');
      const docSnapShot = await docRef.get();
      setData(docSnapShot.data());
    };
    getSchedules();
  }, []);

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

  const addSchedule = (time, day) => {
    history.push({
      pathname: '/AddSchedules',
      state: { day: day, time: time },
    });
  };

  if (!data) {
    return <>loading</>;
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
