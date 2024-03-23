import React, { useState } from "react";
import styled from "styled-components";
// useNavigate를 사용하려면 react-router-dom을 import해야 합니다.
// 만약 라우터를 사용하지 않는다면, useNavigate와 navigate를 제거하십시오.
import { useNavigate } from "react-router-dom";
import Image1 from "../image/Group 65.png";

const BoardContainer = styled.div`
  display: inline-block;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  text-align: center;
`;

const Header = styled.h2``;

const Midheader = styled.h3``;

const Contname = styled.div`
  width: 100%;

  justify-content: center;
`;

const PostCard = styled.div`
  background-color: #fffbaf;
  display: inline-block;
  gap: 20px;
  padding-top: 34px;
  padding-left: 14px;
  padding-right: 12px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 145px;
  height: 180px;
`;

const FloatingButton = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  bottom: 100px;
  right: 40%;
  border-radius: 50px;
  font-size: 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #fffbaf;
  cursor: pointer;
`;

const ModalOverlay = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 120;
`;

const ModalContent = styled.div`
  background: #fffee8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 300px;
  z-index: 140;
`;

const CloseButton = styled.button`
  justify-content: center;
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const MemoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const MemoInput = styled.input`
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  border: 0px;
  border-radius: 5px;
  height: 100px;
  background: #fffee8;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  width: 161px;
  height: 51px;
  background-color: #ffd622;
  border: none;
  border-radius: 17px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  width: 161px;
  height: 51px;
  background-color: #ff4242;
  border: none;
  border-radius: 17px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

const MemoModal = styled.div``;

const Member = styled.div``;

const Photo = styled.div`
  margin-top: 19px;
`;

const Name = styled.div`
  margin-top: 19px;
`;

const Date = styled.div`
  margin-top: 58.69px;
  text-align: center;
`;

const Good = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const Image = styled.div`
  position: relative;
  background-image: url(${Image1});
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  left: 150px;
  background-size: 160%;
`;

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

const Contents = styled.div`
  width: 135px;
  height: 95px;
  margin-left: 14px;
  margin-right: 12px;
  overflow: hidden;
  text-align: left;
  white-space: normal;
  text-overflow: ellipsis;
  display: inline-block;
`;
const Image2 = styled.div`
  position: relative;
  background-image: url(${Image1});
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  left: 70px;
  background-size: 160%;
`;
const PostCardComponent: React.FC<PostCardProps> = ({ post }) => (
  <PostCard>
    <Contents>가나다SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</Contents>
    <Good>
      <Image2></Image2>
    </Good>
  </PostCard>
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Whiteboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemo, setNewMemo] = useState("");
  // 게시물 데이터
  const posts: Post[] = [
    { id: 1, title: "게시물 1", content: "내용 1" },
    { id: 2, title: "게시물 2", content: "내용 2" },
  ];

  // 모달을 여닫는 함수
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // 메모 저장 함수
  const handleSaveMemo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMemo); // 현재는 콘솔에 출력
    setNewMemo(""); // 메모 필드 초기화
    toggleModal(); // 모달 닫기
  };

  return (
    <>
      <Contname>
        <Header>화이트보드</Header>
        <Midheader>가족과 나누는 일상의 기록.</Midheader>
        <BoardContainer>
          {/* <SearchBar type="text" placeholder="검색" /> */}
          {posts.map((post) => (
            <PostCardComponent key={post.id} post={post} />
          ))}
          {isModalOpen && (
            <ModalOverlay onClick={toggleModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={toggleModal}>×</CloseButton>
                <MemoModal>
                  <Member>
                    <Photo></Photo>
                    <Name></Name>
                  </Member>
                </MemoModal>
                <MemoForm onSubmit={handleSaveMemo}>
                  <MemoInput
                    value={newMemo}
                    onChange={(e) => setNewMemo(e.target.value)}
                    placeholder="화이트보드에 마음껏 메모하세요."
                  />
                </MemoForm>
                <Date></Date>
                <Good>
                  <Image></Image>
                </Good>
              </ModalContent>
              <ButtonContainer>
                <SaveButton type="submit">메모</SaveButton>;
                <DeleteButton type="submit">메모 삭제</DeleteButton>;
              </ButtonContainer>
            </ModalOverlay>
          )}
        </BoardContainer>
      </Contname>

      <FloatingButton onClick={toggleModal}>+</FloatingButton>
    </>
  );
}
