import { pickMember } from '../manager/memberManager.js'
import * as slashCommandReplier from '../replier/slashCommandReplier.js';
import * as meetingManager from "../manager/meetingManager.js";

const weekdayMap = {
  "월": true,
  "화": true,
  "수": true,
  "목": true,
  "금": true,
  "토": true,
  "일": true,
};

export function handleSlashCommand(interaction){
    const cmd = interaction.commandName;

    switch (cmd){
      case 'lotto':
        handleLottery(interaction);
        break;
      case 'ruthere':
        handleCheckAlive(interaction);
        break;
        
      case "schedule-meeting":
          handleScheduleMeeting(interaction);
          break;
      case "current-meeting":
          handleCheckMeetingInfo(interaction);
          break;
    }
}

const handleLottery = async (interaction) => {
    const winner = await pickMember(1);

    slashCommandReplier.sendLotteryWinnerMessage(interaction, winner);
}

const handleCheckAlive = (interaction) => {
  slashCommandReplier.sendAliveMessage(interaction);
}

const handleCheckMeetingInfo = (interaction) => {
  const requestedMeetingInfo = meetingManager.getMeetingInfo();
  if(!requestedMeetingInfo || !requestedMeetingInfo.meetingTime){
    // 에러처리 할 것.
    console.error(requestedMeetingInfo);
  }
  const weekday = requestedMeetingInfo.weekday;
  const hour = requestedMeetingInfo.meetingTime[0];
  const minute = requestedMeetingInfo.meetingTime[1];
  slashCommandReplier.sendCurrentMeetingInfoMessage(interaction, weekday, hour, minute);
}

const handleScheduleMeeting = (interaction) => {
  const weekdayInput = interaction.options.get('요일').value.trim();

  if(!verifyWeekdayInput(weekdayInput)){
    slashCommandReplier.sendInvalidWeekdayMessage(interaction);
    return;
  }

  const hourInput = interaction.options.get('시').value;
  const minuteInput = interaction.options.get('분').value;

  if(!verifyHourAndMinuteType(hourInput, minuteInput)){
    slashCommandReplier.sendInvalidTimeTypeMessage(interaction);
    return;
  }

  if(!verifyHourAndMinuteRange(hourInput, minuteInput)){
    slashCommandReplier.sendInvalidTimeRangeMessage(interaction);
    return;
  }

  const newMeetingInfo = meetingManager.setMeetingForThisWeek(weekdayInput.trim(), hourInput, minuteInput);
  
  const weekday = newMeetingInfo.weekday;
  const hour = newMeetingInfo.meetingTime[0];
  const minute = newMeetingInfo.meetingTime[1];
  slashCommandReplier.sendScheduleMeetingSuccessfulMessage(interaction, weekday, hour, minute);
}

const verifyWeekdayInput = (weekdayInput) => {
  return weekdayMap[weekdayInput];
}

const verifyHourAndMinuteType = (hourInput, minuteInput) => {
  return !hourInput.isNan && !minuteInput.isNan;
}

const verifyHourAndMinuteRange = (hourInput, minuteInput) => {
  return (hourInput >= 0 && hourInput < 24 && minuteInput >= 0 && minuteInput < 60)
}