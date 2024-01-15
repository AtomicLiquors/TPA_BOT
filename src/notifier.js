import { shuffleAndTellOrder } from "./manager/memberManager.js";


function checkChannel(){
    if(!channel) throw new Error("채널을 확인할 수 없습니다.");
} 

export function sendMeetingDayNotification(date, hours, minutes){
    checkChannel();
    channel.send(
        `${date.toLocaleString(
          "ko-KR"
        )}
        \n오늘은 코드 리뷰 날입니다.
        \n${hours}시 ${minutes}분에 음성 채널에서 만나요!`
      );
}

export async function sendMeetingImminentNotification(hours, minutes){
    checkChannel();


    channel.send(
        `현재 시각 : ${hours}시 ${minutes}분
        \n잠시 후 코드 리뷰를 시작합니다.
        \n음성 채널로 접속해 주세요!`
    );

    const order = await shuffleAndTellOrder();

    channel.send(
        `오늘의 리뷰 순서 : 
            [ ${order} ]
        `
    );
}


export function sendTestNotification(){
    checkChannel();
    channel.send(
       `테스트 메시지입니다.`
      );
}
