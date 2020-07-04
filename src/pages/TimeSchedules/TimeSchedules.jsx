import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebase';
import { Data } from '../data.js';
import { ScheduleCard } from '../../components/SchedulesCard';
import './style.css';

export const TimeSchedules = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getSchedules = async () => {
      const db = firebase.firestore();

      const docRef = db.collection('schedules').doc('3IwLuJlxz3Pl4QLpvpwx');
      const docSnapShot = await docRef.get();
      setData(docSnapShot.data());
    };
    getSchedules();
  }, []);

  const days = {
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
  };

  if (!data) {
    return <>loading</>;
  }

  return (
    <div>
      <h1>時間割りページ</h1>
      <div className="schedulesContainer">
        {Object.keys(days).map((day) => {
          return (
            <div>
              <div>{days[day]}</div>
              <div>
                {[...Array(5)].map((_, i) => {
                  return (
                    <div>
                      {data[day] ? (
                        data[day].find((d) => d.time === i + 1) ? (
                          <ScheduleCard
                            title={
                              data[day].find((d) => d.time === i + 1).title
                            }
                          />
                        ) : (
                          <div className="blank"></div>
                        )
                      ) : (
                        <div className="blank"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
