//직접 대입해서 확인해 볼 데이터 리스트입니다.


export const taskList = [
  {
    id: 1,
    event: 1,
    title: "주말 가족 여행 준비",
    content: "",
    member: [1, 2, 3],
    duration: "4.15~4.20",
    progress: false,
    isRepeat: "",
  },
  {
    id: 2,
    event: 0, //상위 이벤트가 없으면 0
    title: "장보기 분담",
    content: "",
    member: [1, 4],
    duration: "매주 토",
    progress: false,
    isRepeat: "",
  },
  {
    id: 3,
    event: 0,
    title: "강아지 산책 분담",
    content: "",
    member: [2, 3],
    duration: "매주 목, 금",
    progress: false,
    isRepeat: false,
  },
  {
    id: 1,
    event: 1,
    title: "주말 가족 여행 준비",
    content: "",
    member: [1, 2, 3],
    duration: "4.15~4.20",
    progress: false,
    isRepeat: "",
  },
  {
    id: 2,
    event: 0, //상위 이벤트가 없으면 0
    title: "장보기 분담",
    content: "",
    member: [1, 4],
    duration: "매주 토",
    progress: false,
    isRepeat: "",
  },
  {
    id: 3,
    event: 0,
    title: "강아지 산책 분담",
    content: "",
    member: [2, 3],
    duration: "매주 목, 금",
    progress: false,
    isRepeat: false,
  },
  {
    id: 1,
    event: 1,
    title: "주말 가족 여행 준비",
    content: "",
    member: [1, 2, 3],
    duration: "4.15~4.20",
    progress: false,
    isRepeat: "",
  },
  {
    id: 2,
    event: 0, //상위 이벤트가 없으면 0
    title: "장보기 분담",
    content: "",
    member: [1, 4],
    duration: "매주 토",
    progress: false,
    isRepeat: "",
  },
  {
    id: 3,
    event: 0,
    title: "강아지 산책 분담",
    content: "",
    member: [2, 3],
    duration: "매주 목, 금",
    progress: false,
    isRepeat: false,
  },
];





export const member1 = {
    id: 1,
    name: "김어쩌고1",
    myMemo: [],
    myEvent: []
}

export const member2 = {
  id: 2,
  name: "김어쩌고2",
  myMemo: [],
  myEvent: [],
}

export const member3 = {
  id: 3,
  name: "김어쩌고3",
  myMemo: [],
  myEvent: [],
}

export const member4 = {
  id: 4,
  name: "박어쩌고",
  myMemo: [],
  myEvent: [],
}


export const family = {
  id: 1,
  memberList: [member1, member2, member3, member4],
  memberCnt: 4,
};
