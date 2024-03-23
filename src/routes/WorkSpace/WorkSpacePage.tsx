import { taskList } from "../../DataSet";
import AddTask from "./AddTask";
import Task from "./Task/Task";
import styled from "styled-components";

const Layout = styled.div`
  &::-webkit-scrollbar {
    width: 0;
  }

  overflow-y: hidden;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 26px;
  line-height: 35px;
  align-self: flex-start;
  margin-top: 0;
`;
const StyledSubTitle = styled.div`
  display: flex;
  div {
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    margin-right: 10px;
  }
  align-self: flex-start;
  margin-bottom: 10px;
`;

const Header = styled.div`
  top: 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  background-color: white; /* 배경색을 추가하여 스크롤 시 내용이 겹치지 않도록 할 수 있습니다. */
  z-index: 100;
`;

const StyledTasks = styled.div`
  width: 310px;
  overscroll-behavior: contain;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const WorkSpace = () => {
  return (
    <Layout>
      <Header>
        <StyledTitle>워크스페이스</StyledTitle>
        <StyledSubTitle>
          <div>가족 업무</div>
          <div>내 업무</div>
        </StyledSubTitle>
      </Header>
      <StyledTasks>
        {taskList.map((task) => (
          <Task task={task} />
        ))}
        <AddTask />
      </StyledTasks>
    </Layout>
  );
};

export default WorkSpace;
