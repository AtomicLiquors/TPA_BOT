let members = [];
let memberOrder = [];
let pickedMember = [];

export const shuffleAndTellOrder = async () => {
    await renewMembers();
    memberOrder = shuffleMembers();
    return memberOrderToString();
}

export const pickMember = async (n) => {
    await renewMembers();
    pickedMember = shuffleMembers();
    return pickedMember.slice(0, n);
}

const renewMembers = async () => {
  const memberArr = [];

  try {
    let tempMembers = await channel.guild.members.fetch();

    for (const [id, member] of tempMembers) {
      if (!member.user.bot) {
        const name = member.user.globalName ? member.user.globalName : member.user.username;
        memberArr.push(name);
      }
    }
    members = [...memberArr];
  } catch (error) {
    console.error(error);
  }
};

const shuffleMembers = (array) => {
  // Sattolo Shuffle
  const shuffledOrder = [...members];

  for (let i = shuffledOrder.length - 1; i >= 1; i--) {
    let roll = Math.floor(Math.random() * i);

    const temp = shuffledOrder[roll];
    shuffledOrder[roll] = shuffledOrder[i];
    shuffledOrder[i] = temp;
  }

  return [...shuffledOrder];
};

const memberOrderToString = () => {
    const stringifiedOrder = [...memberOrder, memberOrder[0]];
    return stringifiedOrder.join(" > ");
};
