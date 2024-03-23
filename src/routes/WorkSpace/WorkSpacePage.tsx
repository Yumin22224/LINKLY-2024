import { useState } from "react";
import { FamilyTaskList, MyTaskList } from "../../DataSet";
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
const StyledSubTitleBox = styled.div`
  display: flex;
  div {
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    margin-right: 10px;
  }
  align-self: flex-start;
  margin-bottom: 10px;
  color: #909090;
`;

const StyledSubTitle = styled.div<{ $select: boolean }>`
  ${(props) => props.$select && `color: black;`}
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
  width: 100%;

  //overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const WorkSpace = () => {
  const [select, setSelect] = useState(1);
  const [familyTaskList, setFamilyTaskList] = useState(FamilyTaskList);

  const handleClick = (num: number) => {
    setSelect(num);
  };
  return (
    <Layout>
      <Header>
        <StyledTitle>워크스페이스</StyledTitle>
        <StyledSubTitleBox>
          <StyledSubTitle $select={select === 1} onClick={() => handleClick(1)}>
            가족 업무
          </StyledSubTitle>
          <StyledSubTitle $select={select === 2} onClick={() => handleClick(2)}>
            내 업무
          </StyledSubTitle>
        </StyledSubTitleBox>
      </Header>
      <StyledTasks>
        {select === 1
          ? familyTaskList.map((task) => <Task task={task} />)
          : MyTaskList.map((task) => <Task task={task} />)}
        <AddTask
          setFamilyTaskList={setFamilyTaskList}
          familyTaskList={familyTaskList}
        />
      </StyledTasks>
    </Layout>
  );
};

export default WorkSpace;
