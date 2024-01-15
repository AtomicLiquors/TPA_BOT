import { pickMember } from '../manager/memberManager.js'


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
  

export function handleSlashCommand(interaction){
    const cmd = interaction.commandName;
    if(cmd === 'lotto'){
        sendLotteryWinnerMessage(interaction);
    }else if(cmd === 'ruthere'){
        sendAliveMessage(interaction);
    }
}

const sendLotteryWinnerMessage = async (interaction) => {
    const winner = await pickMember();

    interaction.reply(
        `🎉 축하합니다! 🎉
        \n ${winner}님 당첨! 🥳` 
    );
}

const sendAliveMessage = (interaction) => {
    const currentDate = new Date();
  
    interaction.reply(
      `알림봇이 동작하고 있어요!\n현재 시간 : ${new Intl.DateTimeFormat(
        "ko-KR",
        fullTimeOptions
      ).format(currentDate)}`
    );
  }
  