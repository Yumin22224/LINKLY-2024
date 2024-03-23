import styled from "styled-components";
import { family } from "../../../DataSet";

const StyledTask = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 200px 100px;
  border-radius: 17px;
  background-color: #c4f8f2;
  margin-bottom: 20px;
  min-height: 70px;
`;
const TaskTitle = styled.div``;

const TaskMember = styled.div``;

const TaskDuration = styled.div``;

const Task = ({ task }) => {
  const filteredFamilyMembers = family.memberList.filter((member) =>
    task.members.includes(member.id)
  );
  const memberList = filteredFamilyMembers.map((member) => member.name);

  return (
    <StyledTask>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskDuration>{task.duration}</TaskDuration>
      <TaskMember>{memberList}</TaskMember>
    </StyledTask>
  );
};

export default Task;
