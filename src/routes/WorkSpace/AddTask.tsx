import styled from "styled-components";
import AddBtnImg from "../../assets/AddBtn.png";
import { useState } from "react";

const StyledDiv = styled.div`
  background-color: #fffee8;
  min-height: 90px;
  border-radius: 17px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AddBtn = styled.div`
  background-image: url(${AddBtnImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 48px;
  height: 48px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledBtn = styled.div<{ $color: string }>`
  width: 49%;
  background-color: ${(props) => props.$color};
  border-radius: 17px/ 20px;
  height: 43px;
  line-height: 44px;
`;

const OpenLayout = styled.div`
  background-color: #fffee8;
  border-radius: 17px;
  padding: 20px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  text-align: start;

  input::placeholder {
    color: #909090;
  }

  .taskTitle {
    font-weight: bold;
    font-size: 20px;
    background: none;
    border: none;
    margin-bottom: 15px;
  }

  .days,
  .repeat,
  .allDay,
  .member,
  .memberList {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
  }

  .days,
  .repeat,
  .allDay,
  .comment {
    border-top: 1px solid #fff859;
    padding-top: 10px;
  }

  .memberName {
    font-size: x-small;
    margin-right: 5px;
    line-height: 22px;
    border-radius: 8px;
  }

  .commentInput {
    background: none;
    border: none;
  }

  .day.selected,
  .memberName.selected {
    background-color: #fff859;
    color: black;
  }
`;

const StyledDaysContainer = styled.div`
  display: flex;

  .day {
    border-radius: 50%;
    background-color: #f2f2f2;
    width: 20px;
    height: 20px;
    color: #909090;
    font-size: small;
    margin-right: 2px;
    display: flex;
    justify-content: center;
  }
`;

const Days = ["월", "화", "수", "목", "금", "토", "일"];
const Members = [
  { name: "김어쩌구1", id: 1 },
  { name: "김어쩌구2", id: 2 },
  { name: "김어쩌구3", id: 3 },
  { name: "박어쩌구", id: 4 },
];

const AddTask = ({ setFamilyTaskList, familyTaskList }) => {
  const [open, setOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskMembers, setTaskMembers] = useState([]);
  const [taskDays, setTaskDays] = useState([]);
  const [taskComment, setTaskComment] = useState("");

  const toggleMemberSelection = (member) => {
    setTaskMembers((prevMembers) =>
      prevMembers.includes(member)
        ? prevMembers.filter((m) => m !== member)
        : [...prevMembers, member]
    );
  };

  const toggleDaySelection = (day) => {
    setTaskDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSubmit = () => {
    const newTask = [
      ...familyTaskList,
      {
        title: taskTitle,
        content: taskComment,
        member: taskMembers,
        duration: "매주 " + taskDays,
      },
    ];
    setFamilyTaskList(newTask);
    setOpen(false);
    setTaskTitle("");
    setTaskMembers([]);
    setTaskDays([]);
    setTaskComment("");
  };

  const handleOpen = () => {
    setOpen(!open);
    setTaskTitle("");
    setTaskMembers([]);
    setTaskDays([]);
    setTaskComment("");
  };

  return (
    <>
      {!open && (
        <StyledDiv>
          <div>업무 추가하기</div>
          <AddBtn onClick={handleOpen} />
        </StyledDiv>
      )}

      {open && (
        <>
          <OpenLayout>
            <input
              placeholder="업무 제목 입력"
              className="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <div className="selectForm">
              <div className="member">
                <div className="label">인원 선택</div>
                <div className="memberList">
                  {Members.map((member) => (
                    <div
                      className={`memberName ${
                        taskMembers.includes(member.id) ? "selected" : ""
                      }`}
                      onClick={() => toggleMemberSelection(member.id)}
                    >
                      {member.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="repeat">
                <div className="label">매주 반복</div>
                <input type="checkbox" checked />
              </div>

              <div className="days">
                <div className="label">요일 선택</div>
                <StyledDaysContainer>
                  {Days.map((day) => (
                    <div
                      className={`day ${
                        taskDays.includes(day) ? "selected" : ""
                      }`}
                      onClick={() => toggleDaySelection(day)}
                    >
                      {day}
                    </div>
                  ))}
                </StyledDaysContainer>
              </div>

              <div className="allDay">
                <div className="label">하루 종일</div>
                <input type="checkbox" checked />
              </div>

              <div className="comment">
                <input
                  placeholder="업무 소개..."
                  className="commentInput"
                  value={taskComment}
                  onChange={(e) => setTaskComment(e.target.value)}
                />
              </div>
            </div>
          </OpenLayout>
          <BtnContainer>
            <StyledBtn $color="#F2F2F2" onClick={handleOpen}>
              취소
            </StyledBtn>
            <StyledBtn $color="#FFDD4B" onClick={handleSubmit}>
              완료
            </StyledBtn>
          </BtnContainer>
        </>
      )}
    </>
  );
};

export default AddTask;
