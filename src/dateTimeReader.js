import * as dateUtil from "./dateUtil.js";
import * as notifier from "./notifier.js";
import * as meetingManager from "./manager/meetingManager.js";

let month, day, hours, minutes, weekday;


export async function read(currentDate) {

    [month, day, hours, minutes, weekday] = dateUtil.getDateValuesFrom(currentDate);

   // console.log(`${month}월 ${day}일 ${hours}시 ${minutes}분 ${weekday}요일`)

    if (weekday !== meetingInfo.weekday){
      return;
    }

    if (isTimeToReady()) {
      notifier.sendMeetingDayNotification(currentDate, meetingInfo.meetingTime[0], meetingInfo.meetingTime[1]);
    } else if (isTimeToMeet()){
      notifier.sendMeetingImminentNotification(meetingInfo.readyTime[0], meetingInfo.readyTime[1]);
      if(meetingInfo.modified) meetingManager.setMeetingToDefault();
    }
}

const isTimeToReady = () => {
  return hours === meetingInfo.alarmTime[0] && minutes === meetingInfo.alarmTime[1]
}

const isTimeToMeet = () => {
  return hours === meetingInfo.readyTime[0] && minutes === meetingInfo.readyTime[1]
}

