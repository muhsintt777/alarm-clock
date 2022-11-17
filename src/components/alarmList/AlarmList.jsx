import React from "react";
import "./AlarmList.css";

const AlarmList = ({ alarmList, handleDelete }) => {
  const renderedAlarmList = alarmList.map((alarm) => (
    <div key={alarm.id} className="alarmList-singleAlarm">
      <p>{alarm.time}</p>
      <button
        onClick={() => handleDelete(alarm.id)}
        className="alarmList-singleAlarm__deleteButton"
      >
        Delete
      </button>
    </div>
  ));
  return <div className="alarmList-container">{renderedAlarmList}</div>;
};

export default AlarmList;
