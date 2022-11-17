import { useEffect, useState } from "react";
import Clock from "react-clock";
import "./App.css";
import "react-clock/dist/Clock.css";
import AlarmForm from "./components/alarmForm/AlarmForm";
import AlarmList from "./components/alarmList/AlarmList";
import alarmTune from "./assets/ringtone/808alarm.mp3";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmList, setAlarmList] = useState([]);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [currRingingAlarmId, setCurrRingingAlarmId] = useState("");

  const ringtone = new Audio(alarmTune);
  if (isAlarmRinging) {
    ringtone.play();
  }

  const handleDelete = (id) => {
    const newArr = alarmList.filter((alm) => alm.id !== id);
    setAlarmList(newArr);
  };

  const handleSnooze = (id) => {
    ringtone.pause();
    setIsAlarmRinging(false);

    const alarm = alarmList.filter((alarm) => alarm.id === id);
    if (3 <= alarm[0].snooze) {
      alert("snooze not available");
      return;
    }

    //splitting and updating alarm
    const alarmTime = alarm[0].time;
    const time = alarmTime.split(" ");
    let newHour = Number(time[0]);
    let newMint = Number(time[2]);
    let newAmPm = time[5];
    if (newMint >= 55) {
      newHour += 1;
      if (newHour === 13) {
        newHour = 1;
        newAmPm = newAmPm === "AM" ? "PM" : "AM";
      }
    }
    newMint += 5;
    if (newMint >= 60) {
      newMint = newMint - 60;
    }
    newHour = newHour < 10 ? "0" + newHour : newHour.toString();
    newMint = newMint < 10 ? "0" + newMint : newMint.toString();
    const newTime = `${newHour} : ${newMint} : 00 ${newAmPm}`;
    alarm.time = newTime;
    alarm.snooze += 1;

    const newArr = alarmList.filter((alm) => alm.id !== id);

    setAlarmList([alarm, ...newArr]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currDate = new Date();
      setCurrentTime(currDate);
      const amOrPm = currDate.getHours() >= 12 ? "PM" : "AM";
      const currHour =
        currDate.getHours() === 0
          ? 12
          : currDate.getHours() < 10
          ? "0" + currDate.getHours()
          : currDate.getHours() > 12
          ? `0${currDate.getHours() - 12}`
          : currDate.getHours();
      const currMinute =
        currDate.getMinutes() < 10
          ? "0" + currDate.getMinutes()
          : currDate.getMinutes();

      const currSecond =
        currDate.getSeconds() < 10
          ? "0" + currDate.getSeconds()
          : currDate.getSeconds();

      const currTime = `${currHour} : ${currMinute} : ${currSecond} ${amOrPm}`;
      for (let i = 0; i < alarmList.length; i++) {
        const checkAlarm = alarmList[i].time;
        if (checkAlarm === currTime) {
          setIsAlarmRinging(true);
          setCurrRingingAlarmId(alarmList[i].id);
          break;
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmList]);

  return (
    <div className="App">
      <div className="app-clock">
        <Clock value={currentTime} />
        <AlarmForm setAlarmList={setAlarmList} alarmList={alarmList} />
        {isAlarmRinging ? <p>Alarm Ringing...</p> : <p>not ringing</p>}
        <div className="app-alarmButtons">
          {isAlarmRinging ? (
            <>
              {" "}
              <button
                onClick={() => handleSnooze(currRingingAlarmId)}
                className="app-alarmButtons__snooze"
              >
                Snooze
              </button>{" "}
              <button
                onClick={() => {
                  ringtone.pause();
                  setIsAlarmRinging(false);
                }}
                className="app-alarmButtons__stop"
              >
                Stop
              </button>{" "}
            </>
          ) : null}
        </div>
      </div>
      <div className="app-alarms">
        <h1>alarms</h1>
        <AlarmList alarmList={alarmList} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
