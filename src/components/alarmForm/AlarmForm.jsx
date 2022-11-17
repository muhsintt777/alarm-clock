import React, { useState } from "react";
import "./AlarmForm.css";
import { v4 as uuidv4 } from "uuid";

const AlarmForm = ({ setAlarmList, alarmList }) => {
  const [hourInput, setHourInput] = useState();
  const [minuteInput, setMinuteInput] = useState();
  const [amInput, setAmInput] = useState();
  const hourOptions = ["hh"];
  const minuteOption = ["mm"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hourInput || !minuteInput || !amInput) {
      alert("Enter valid input");
      return;
    }
    const time = {
      id: uuidv4(),
      time: `${hourInput} : ${minuteInput} : 00 ${amInput}`,
      snooze: 0,
    };
    setAlarmList([time, ...alarmList]);
  };

  for (let index = 1; index <= 12; index++) {
    if (index < 10) {
      hourOptions.push("0" + index);
    } else {
      hourOptions.push(index.toString());
    }
  }

  for (let index = 0; index < 60; index++) {
    if (index < 10) {
      minuteOption.push("0" + index);
    } else {
      minuteOption.push(index.toString());
    }
  }

  return (
    <form className="alarmForm-form">
      <div className="alarmForm-form__inputContainer">
        <select
          className="alarmForm-form__inputContainer__select"
          value={hourInput}
          onChange={(e) => setHourInput(e.target.value)}
          name=""
          id=""
        >
          {hourOptions.map((hour) => (
            <option key={uuidv4()}>{hour}</option>
          ))}
        </select>{" "}
        :{" "}
        <select
          className="alarmForm-form__inputContainer__select"
          value={minuteInput}
          onChange={(e) => setMinuteInput(e.target.value)}
          name=""
          id=""
        >
          {minuteOption.map((minute) => (
            <option key={uuidv4()} value={minute}>
              {minute}
            </option>
          ))}
        </select>{" "}
        <select
          className="alarmForm-form__inputContainer__select"
          value={amInput}
          onChange={(e) => setAmInput(e.target.value)}
          name=""
          id=""
        >
          <option>-</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        className="alarmForm-form__button"
        type="submit"
        onClick={handleSubmit}
      >
        Set Alarm
      </button>
    </form>
  );
};

export default AlarmForm;
