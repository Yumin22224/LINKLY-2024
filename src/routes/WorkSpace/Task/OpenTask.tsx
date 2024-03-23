import styled from "styled-components";
import { family } from "../../../DataSet";
import { useState } from "react";

//일단 task에 isRepeat, days가 있고, isAllDay인 것으로만

const StyledTask = styled.div<{ $done: boolean }>`
  display: grid;

  border-radius: 17px;
  background-color: #c4f8f2;
  margin-bottom: 10px;
  min-height: 70px;

  padding: 5px;

  align-items: center;
  justify-items: flex-start;

  ${(props) =>
    props.$done &&
    `opacity: 50%; filter: blur(0.5px);`}
`;

const TaskHeader = styled.div`
  display: flex;
  align-content: space-between;
  justify-content: space-around;
  width: 100%;
  margin: 10px 0;
`;

const TaskTitle = styled.div`
  font-weight: bold;
`;
const TaskMember = styled.div`
  margin-top: 5px;
  font-size: small;
`;

const TaskDuration = styled.div`
  font-size: small;
  margin-left: 20px;
`;
const TaskTime = styled.div`
  font-size: small;
  margin-left: 20px;

  margin-bottom: 20px;
`;

const TaskContent = styled.div`
  font-size: small;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const BtnLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TaskButton = styled.div<{ $color: string }>`
  width: 49%;
  background-color: ${(props) => props.$color};
  border-radius: 17px/ 20px;
  height: 43px;
  line-height: 44px;
`;

const OpenTask = ({ task, handleClick }) => {
  const filteredFamilyMembers = family.memberList.filter((member) =>
    task.member.includes(member.id)
  );
  const memberList = filteredFamilyMembers.map((member) => member.name + " ");

  const [done, setDone] = useState(false);

  const handleStop = () => {
      setDone(!done);
  };

  const handleDelete = () => {};

  return (
    <div>
      <StyledTask onClick={handleClick} $done={done}>
        <TaskHeader>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskMember>{memberList}</TaskMember>
        </TaskHeader>
        <TaskDuration>{task.duration}</TaskDuration>
        {task.time && (
          <TaskTime>
            {task.time[0]} ~ {task.time[1]}
          </TaskTime>
        )}
        <TaskContent>{task.content}</TaskContent>
      </StyledTask>
      <BtnLayout>
        <TaskButton $color="#F2F2F2" onClick={handleStop}>
          중단
        </TaskButton>
        <TaskButton $color="#FF4E4E" onClick={handleDelete}>
          삭제
        </TaskButton>
      </BtnLayout>
    </div>
  );
};

export default OpenTask;
