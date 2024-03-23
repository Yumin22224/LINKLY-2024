import styled from "styled-components";
import { family } from "../../../DataSet";
import { useState } from "react";
import OpenTask from "./OpenTask";

const StyledTask = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 200px 100px;
  border-radius: 17px;
  background-color: #c4f8f2;
  margin-bottom: 20px;
  min-height: 70px;

  padding: 5px;

  align-items: center;
  justify-items: center;
`;
const TaskTitle = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;

  font-weight: bold;
`;

const TaskMember = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;

  font-size: small;
`;

const TaskDuration = styled.div`
  grid-column: 2/3;
  grid-row: 1/3;

  font-weight: bold;
`;

const Task = ({ task }) => {
  const filteredFamilyMembers = family.memberList.filter((member) =>
    task.member.includes(member.id)
  );
  const memberList = filteredFamilyMembers.map((member) => member.name + " ");

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };
  return !selected ? (
    <StyledTask onClick={handleClick}>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskDuration>{task.duration}</TaskDuration>
      <TaskMember>{memberList}</TaskMember>
    </StyledTask>
  ) : (
    <OpenTask task={task} handleClick={handleClick} />
  );
};

export default Task;
