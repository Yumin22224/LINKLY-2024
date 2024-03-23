import React, { useState } from "react";
import styled from "styled-components";
// useNavigate를 사용하려면 react-router-dom을 import해야 합니다.
// 만약 라우터를 사용하지 않는다면, useNavigate와 navigate를 제거하십시오.
import { useNavigate } from "react-router-dom";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const contname = styled.div`
  width: 100%;
  padding: 10px;
`;

const PostCard = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FloatingButton = styled.button`
  position: fixed;
  align-items: center;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  z-index: 101;
`;

const CloseButton = styled.button`
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

const MemoInput = styled.textarea`
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 100px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #00bfff;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

const PostCardComponent: React.FC<PostCardProps> = ({ post }) => (
  <PostCard>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
  </PostCard>
);

// 컴포넌트 이름을 PascalCase로 변경했습니다.
export default function Whiteboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemo, setNewMemo] = useState("");
  // 게시물 데이터
  const posts: Post[] = [
    { id: 1, title: "게시물 1", content: "내용 1" },
    { id: 2, title: "게시물 2", content: "내용 2" },
    // ... 추가 게시물 데이터 ...
  ];

  // 모달을 여닫는 함수
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // 메모 저장 함수
  const handleSaveMemo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMemo); // 현재는 콘솔에 출력
    setNewMemo(""); // 메모 필드 초기화
    toggleModal(); // 모달 닫기
    // 메모 저장 후 메인 페이지로 이동하는 로직을 추가할 수 있습니다.
    // navigate('/');
  };

  return (
    <BoardContainer>
      {/* <SearchBar type="text" placeholder="검색" /> */}
      {posts.map((post) => (
        <PostCardComponent key={post.id} post={post} />
      ))}
      <FloatingButton onClick={toggleModal}>+</FloatingButton>
      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={toggleModal}>×</CloseButton>
            <MemoForm onSubmit={handleSaveMemo}>
              <h2>새 메모</h2>
              <MemoInput
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                placeholder="메모를 입력하세요..."
              />
              <SaveButton type="submit">저장</SaveButton>
            </MemoForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </BoardContainer>
  );
}
