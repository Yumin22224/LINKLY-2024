import styled from "styled-components";
import LogoImg from "../../assets/Logo.png";
import AddBtnImg from "../../assets/AddBtn_Question.png";
import { useState } from "react";

const Logo = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${LogoImg});
  width: 91px;
  height: 28px;
`;

const MainPhrase = styled.div`
  h2,
  h1 {
    margin: 0;
  }
  text-align: left;

  h1 {
    color: #11ead0;
    font-weight: 900;
  }
  margin-top: 30px;
  width: 300px;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodayQ = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #c4f8f2;
  .addBtn {
    margin-top: 20px;
    background-image: url(${AddBtnImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 48px;
    height: 48px;
  }
`;

const Background = styled.div<{ $show: boolean }>`
  filter: opacity(50%);
  background-color: black;
  width: 100vw;
  height: 100vh;
  z-index: 300;
  position: fixed;
  top: 0;
  left: 0;

  display: ${({ $show }) => ($show ? "block" : "none")};
`;

const Memo = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: white;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  .question {
  }

  textarea {
    width: 100%;
    height: 90%;
    border: none;
    margin-top: 5px;
  }

  textarea:placeholer {
    color: #909090;
  }

  width: 300px;
  height: 270px;
  padding: 20px;
`;

const Submit = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: #11ead0;
  color: white;
  font-weight: bold;
  top: 63%;
  left: 50%;
  transform: translateX(-50%);
  width: 330px;
  height: 50px;
  line-height: 2.6;
  border-radius: 30px/25px;
  font-size: 19px;
`;

const AddModal = ({ setOpen, setAnswerList, answerList }) => {
  const [answer, setAnswer] = useState("");
  const handleMemo = () => {
    const newList = [...answerList, answer];
    setAnswerList(newList);
    setOpen(false);
    setAnswer("");
  };

  return (
    <>
      <Background onClick={() => setOpen(false)} $show={true} />
      <Memo>
        <div className="question">
          Q. 어린 시절 가장 좋았던 기억은 무엇인가요?
        </div>
        <textarea
          placeholder="답변을 입력하세요."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </Memo>
      <Submit onClick={handleMemo}>메모하기</Submit>
    </>
  );
};

const AnswerContainer = styled.div<{ $open: boolean }>`
  background-color: #11ead0;
  margin-top: 10px;
  padding: 20px;
  text-align: left;

  .author {
  }

  .content {
    font-size: 22px;
  }
  ${(props) => props.$open && "height: 250px;"}
`;

const CommentContainer = styled.div`
  margin-top: 10px;
`;

const Comment = styled.div`
  background-color: white;
  display: flex;

  .comment {
    margin-left: 10px;
  }
  .profile {
    width: 50px;
    height: 50px;
    background-color: #c4f8f2;
  }
  height: 50px;
  line-height: 3.2;
`;

const Body = styled.div`
  z-index: 1000;

`;

const Answer = ({ answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Body>
        <AnswerContainer $open={open} onClick={() => setOpen(!open)}>
          <div className="author">김아무개1</div>
          <div className="content">{answer}</div>
        </AnswerContainer>
        {open && (
          <CommentContainer>
            <Comment>
              <div className="profile" />
              <div className="comment">재미있었겠다</div>
            </Comment>
          </CommentContainer>
        )}
      </Body>

      <Background $show={open} onClick={() => setOpen(!open)} />
    </>
  );
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [answerCmt, setAnswerCmt] = useState(0);
  const [selectedAns, setSelectedAns] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  return (
    <>
      <HomeBody>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <MainPhrase>
          <h2>우리 가족만의</h2>
          <h2>이야기가 모인 공간,</h2>
          <h1>링클리</h1>
        </MainPhrase>

        <TodayQ>
          <div className="question">
            Q. 어린 시절 가장 좋았던 기억은 무엇인가요?
          </div>
          <div className="addBtn" onClick={() => setOpen(true)} />
        </TodayQ>

        {answerList.map((answer) => (
          <Answer answer={answer} />
        ))}
      </HomeBody>
      {open && (
        <AddModal
          setOpen={setOpen}
          answerList={answerList}
          setAnswerList={setAnswerList}
        />
      )}
    </>
  );
};

export default Home;
