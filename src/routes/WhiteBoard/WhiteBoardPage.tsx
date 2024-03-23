import React, { useEffect, useState } from "react";
import styled from "styled-components";
// useNavigate를 사용하려면 react-router-dom을 import해야 합니다.
// 만약 라우터를 사용하지 않는다면, useNavigate와 navigate를 제거하십시오.
import Image1 from "../image/Group 65.png";
import { Unsubscribe } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";

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

const ModalOverlay = styled.div`
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

const Datee = styled.div`
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
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  likeCnt: string[];
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


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Whiteboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemo, setNewMemo] = useState("");
  // 게시물 데이터
  const [posts,setPosts] = useState<Post[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [memo, setmemo] = useState<any>();
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchPosts  =async () => {
        const user = auth.currentUser;
        if (user === null) return;
        const snapshot = await getDoc(doc(db,'users',user.uid))
        const postsQuery = query(
            collection(db,"memos"),where("familyId","==",snapshot.data()?.familyId)
        );
        unsubscribe = onSnapshot(postsQuery, (snapshot) => {
          const postss = snapshot.docs.map((docc) => {
            const { title, content,author, date,likeCnt } = docc.data();
            return {
              title,
              content,
              id: docc.id,
              author,
              date,
              likeCnt
               // Convert id to number
            };
          });
          setPosts(postss);
        })
    }
    fetchPosts();
    return () => {
        unsubscribe && unsubscribe();
    }
}, []);
  // 모달을 여닫는 함수
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    if (showProfile === true) {
      setShowProfile(false);
      setNewMemo("");
      setmemo({});
    };
  };

  // 메모 저장 함수
  const handleSaveMemo = async(e: React.MouseEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user === null) return;
    if (newMemo === "") return;
    if (e.currentTarget.id === "delete") {
      setIsModalOpen(false);
    } else if (e.currentTarget.id === "create") {
      const snapshot = await getDoc(doc(db,'users',user.uid))
      await addDoc(collection(db, "memos"), {
        content: newMemo,
        author : user.uid,
        date : Date.now(),
        likeCnt : [],
        isPinned : false,
        familyId: snapshot.data()?.familyId
      })
      setNewMemo("");
    } else if (e.currentTarget.id === "edit") {
        await updateDoc(doc(db,'memos',memo.postId),{
          content: newMemo,
        })}else if (e.currentTarget.id === "exist-delete"){
        await deleteDoc(doc(db,'memos',memo.postId))
      };}
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {target:{name,value}} = e;
    if (name === "newMemo") {
        setNewMemo(value);
    }
  }
  const onPostClick = async(e: React.MouseEvent) => {
    const postId = e.currentTarget.id;
    const snapshot = await getDoc(doc(db,'memos',postId))
    const usernme = await getDoc(doc(db,'users',snapshot.data()?.author))
    const obj1 = snapshot.data();
    obj1.postId = postId;
    obj1.username = usernme.data()?.username
    setNewMemo(snapshot.data()?.content);
    setmemo(obj1);
    setIsModalOpen(true);
    setShowProfile(true);
    console.log(showProfile);
  }
  const onlikeClick = async(e: React.MouseEvent) => {
    const snapshot = await getDoc(doc(db,'memos',memo.postId))
    const user = auth.currentUser;
    if (user === null) return;
    const likeList = snapshot.data()?.likeCnt;
    console.log(likeList);
    console.log(typeof likeList)
    if (likeList.includes(user.uid)) {
      const index = likeList.indexOf(user.uid);
      likeList.splice(index,1);
      setmemo((prev:any) => {
        return {
          ...prev,
          likeCnt: likeList
        }
      });
    } else {
      likeList.push(user.uid);
      setmemo((prev:any) => {
        return {
          ...prev,
          likeCnt: likeList
        }
      });
    }
    await updateDoc(doc(db,'memos',memo.postId),{
      likeCnt : likeList
    })
  }
  return (
    <>
      <Contname>
        <Header>화이트보드</Header>
        <Midheader>가족과 나누는 일상의 기록.</Midheader>
        <BoardContainer>
          {posts.map((post) => (
              <PostCard key={post.id} id={post.id} onClick={onPostClick}>
                <Contents>{post.content}</Contents>
                <Good>
                  <Image2></Image2>{post.likeCnt.length}
                </Good>
              </PostCard>
          ))}
          {isModalOpen && (
            <ModalOverlay onClick={toggleModal}>
              <ModalContent onClick={(e) => {
                e.stopPropagation()}}>
                <CloseButton onClick={toggleModal}>×</CloseButton>
                {showProfile ? (<MemoModal>
                  <Member>
                    <Photo></Photo>
                    <Name>{
                      memo.username
                      }</Name>
                  </Member>
                </MemoModal>) : null}
                  <MemoInput
                    value={newMemo}
                    onChange={onChange}
                    name="newMemo"
                    placeholder="화이트보드에 마음껏 메모하세요."
                  />
                <Datee></Datee>
                <Good>
                  <Image onClick={onlikeClick}></Image>{showProfile ? memo.likeCnt.length : null}
                </Good>
              </ModalContent>
              <ButtonContainer>
                {showProfile ? (<><SaveButton type="submit" id="edit" onClick={handleSaveMemo}>메모</SaveButton>
                <DeleteButton type="submit" id="exist-delete" onClick={handleSaveMemo}>메모 삭제</DeleteButton></>) : (<><SaveButton type="submit" id="create" onClick={handleSaveMemo}>메모</SaveButton>
                <DeleteButton type="submit" id="delete" onClick={handleSaveMemo}>메모 삭제</DeleteButton></>)}
              </ButtonContainer>
            </ModalOverlay>
          )}
        </BoardContainer>
      </Contname>

      <FloatingButton onClick={toggleModal}>+</FloatingButton>
    </>
  );
}