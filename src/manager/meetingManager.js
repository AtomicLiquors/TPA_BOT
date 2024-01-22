const defaultAlarmHour = 9;
const readyTimeOffsetInMinute = 5;

const defaultMeeting = {
    weekday: "월",
    alarmTime: [defaultAlarmHour, 0],
    meetingTime: [13, 0],
    readyTime: [12, 55],
    modified: false
}

global.meetingInfo = {
    ...defaultMeeting
}

export const getMeetingInfo = () => {
    console.log(meetingInfo);
    return {...meetingInfo}
}

export const setMeetingForThisWeek = (weekday, hour, minute) => {
    meetingInfo.weekday = weekday;
    meetingInfo.meetingTime = [hour, minute];

    const isPrevHour = (minute < readyTimeOffsetInMinute);
    const readyTimeHour = isPrevHour ? hour - 1 : hour;
    const readyTimeMinute = isPrevHour ? 60 - (readyTimeOffsetInMinute - minute) : minute - readyTimeOffsetInMinute;
    meetingInfo.readyTime = [readyTimeHour, readyTimeMinute];

    if(hour < defaultAlarmHour + 1){
        meetingInfo.alarmTime[0] = hour - 1;
    }

    meetingInfo.modified = true;
    return {...meetingInfo};
}

export const setMeetingToDefault = () => {
    meetingInfo = {...defaultMeeting}
}