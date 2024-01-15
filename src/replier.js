import { pickMember } from "./manager/memberManager.js";

const fullTimeOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Asia/Seoul",
};


export function handleIncomingMessage(msg) {
  
  if (msg.content === "RUTHERE") {
    sendAliveMessage(msg);
  }else if (msg.include("pick")){
    
  }
}

const sendAliveMessage = (msg) => {
  let currentDate = new Date();

  msg.channel.send(
    `알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat(
      "ko-KR",
      fullTimeOptions
    ).format(currentDate)}`
  );
}
