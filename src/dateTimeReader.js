import * as dateUtil from "./dateUtil.js";
import * as notifier from "./notifier.js";

let month, day, hours, minutes, weekday;
let meetingDay = "월";

let alarmHour = [9, 0]
let readyHour = [12, 55]
let meetingHour = [13, 0];

export async function read(currentDate) {

    [month, day, hours, minutes, weekday] = dateUtil.getDateValuesFrom(currentDate);

    console.log(`${month}월 ${day}일 ${hours}시 ${minutes}분 ${weekday}요일`)
  
    if (weekday !== meetingDay || holidays[month][day]){
      return;
    }

    if (isTimeToReady()) {
      notifier.sendMeetingDayNotification(currentDate, meetingHour[0], meetingHour[1]);
    } else if (isTimeToMeet()){
      notifier.sendMeetingImminentNotification(readyHour[0], readyHour[1]);
    }
}

const isTimeToReady = () => {
  return hours === alarmHour[0] && minutes === alarmHour[1]
}

const isTimeToMeet = () => {
  return hours === readyHour[0] && minutes === readyHour[1]
}

