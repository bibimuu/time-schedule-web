import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../config/firebase';
import { SchedulesCard } from '../../components/SchedulesCard';
import './TimeSchedules.css';

const TimeSchedules = ({ authUser }) => {
  const [scheduleList, setScheduleList] = useState(null);
  const [colorNumber, setColorNumber] = useState('');

  useEffect(() => {
    const loadSchedules = async () => {
      const db = firebase.firestore();
      const userId = authUser.uid;
      const userRef = db.collection('users').where('uid', '==', authUser.uid);
      const userSnap = await userRef.get();
      const userData = userSnap.docs[0].data();
      const userColorNumber = userData['colorNumber'];
      setColorNumber(userColorNumber);

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
    return <div className="pageLoading">L O A D I N G ...</div>;
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

  const changeColorFunction = async () => {
    const newColor = colorNumber === 5 ? 0 : colorNumber + 1;
    setColorNumber(newColor);
    const db = firebase.firestore();

    const userQuery = db.collection('users').where('uid', '==', authUser.uid);
    const userQuerySnapshot = await userQuery.get();
    if (userQuerySnapshot.docs.length !== 1) {
      throw new Error('failed to fetch valid users count');
    }
    const userId = userQuerySnapshot.docs[0].id;

    const scheduleId = db.collection('users').doc(userId);
    const updateColorNumber = () => {
      scheduleId.update({
        colorNumber: newColor,
      });
    };

    updateColorNumber();
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
                    <SchedulesCard
                      schedule={schedule}
                      key={`mon+${i}`}
                      day="mon"
                      time={i}
                    />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = tuesdayScheduleList.find(
                    (s) => s.time === i
                  );
                  return (
                    <SchedulesCard
                      key={`tue+${i}`}
                      schedule={schedule}
                      day="tue"
                      time={i}
                    />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = wednesdayScheduleList.find(
                    (s) => s.time === i
                  );
                  return (
                    <SchedulesCard
                      key={`wed+${i}`}
                      schedule={schedule}
                      day="wed"
                      time={i}
                    />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = thursdayScheduleList.find(
                    (s) => s.time === i
                  );
                  return (
                    <SchedulesCard
                      key={`thu+${i}`}
                      schedule={schedule}
                      day="thu"
                      time={i}
                    />
                  );
                })}
              </div>

              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  const schedule = fridayScheduleList.find((s) => s.time === i);
                  return (
                    <SchedulesCard
                      key={`fri+${i}`}
                      schedule={schedule}
                      day="fri"
                      time={i}
                    />
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
