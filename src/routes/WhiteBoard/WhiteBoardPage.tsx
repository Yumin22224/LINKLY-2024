import React from "react";
import styled from "styled-components";

//css : 임의
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
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
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

const PostCardComponent: React.FC<PostCardProps> = ({ post }) => {
  return (
    <PostCard>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </PostCard>
  );
};

const App: React.FC = () => {
  // 예시 게시물 데이터
  const posts: Post[] = [   
    { id: 1, title: "게시물 1", content: "내용 1" },
    { id: 2, title: "게시물 2", content: "내용 2" },
    // ... 추가 게시물
  ];

  return (
    <BoardContainer>
      <SearchBar type="text" placeholder="검색" />
      {posts.map((post) => (
        <PostCardComponent key={post.id} post={post} />
      ))}
      <FloatingButton>+</FloatingButton>
    </BoardContainer>
  );
};

export default App;
