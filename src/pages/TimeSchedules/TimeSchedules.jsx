import React from "react";
import { Data } from '../data.js';

import './style.css'

export const TimeSchedules = () => {
  console.log("time schedule page render!");
  // const weekContainer = {
    
  // }

  const days = {
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
  }

  return (
    <div>
      <h1>時間割りページ</h1>
      <div className="schedulesContainer">
        {
          Object.keys(days).map(day => {
            return (
              <div>
                <div>{days[day]}</div>
                <div>
                  {
                    [...Array(5)].map((_, i) => {
                      return <div>
                        { 
                          Data[day] ? 
                            Data[day].find(d => d.time === i + 1) ? 
                            Data[day].find(d => d.time === i + 1).title
                            : 'none'
                          : 'nothing' }
                      </div>
                    })
                  }
                </div>
              </div>)
          })
        }
      </div>
    </div>
  );
};
