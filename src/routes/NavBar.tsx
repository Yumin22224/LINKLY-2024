import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Home from "../assets/Home.png";
import curHome from "../assets/Home_cur.png";
import Pin from "../assets/Pin.png";
import curPin from "../assets/Pin_cur.png";
import Add from "../assets/Add.png";
import curAdd from "../assets/Add_cur.png";
import Profile from "../assets/Profile.png";
import curProfile from "../assets/Profile_cur.png";
import { useState } from "react";

const NavDiv = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 310px;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  background-color: white;
  padding-top: 15px;
  padding-bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const IconContainer = styled.div`
  width: 48px;
  height: 32px;
  display: flex;
  align-content: center;
  justify-content: center;
`;

//24 22
const HomeIcon = styled.div<{ $isCurPage: boolean }>`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 24px;
  height: 22px;

  ${(props) =>
    props.$isCurPage
      ? `background-image: url(${curHome});`
      : `background-image:url(${Home});`}
`;

//23.52 24
const PinIcon = styled.div<{ $isCurPage: boolean }>`
  width: 23.52px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props) =>
    props.$isCurPage
      ? `background-image: url(${curPin});`
      : `background-image:url(${Pin});`}
`;

//24 24
const AddIcon = styled.div<{ $isCurPage: boolean }>`
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props) =>
    props.$isCurPage
      ? `background-image: url(${curAdd});`
      : `background-image:url(${Add});`}
`;

//17.4 22.82
const ProfileIcon = styled.div<{ $isCurPage: boolean }>`
  width: 17.4px;
  height: 22.82px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props) =>
    props.$isCurPage
      ? `background-image: url(${curProfile});`
      : `background-image:url(${Profile});`}
`;

//HomePage === Home / whiteboard === Pin / workspace === Add / Profile === profile

const NavBar = () => {
  const [curPage, setCurPage] = useState("home");
  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(`/${page}`);
    setCurPage(page);
  };

  return (
    <NavDiv>
      <IconContainer>
        <HomeIcon
          $isCurPage={curPage === "home"}
          onClick={() => handleClick("home")}
        />
      </IconContainer>
      <IconContainer>
        <PinIcon
          $isCurPage={curPage === "whiteboard"}
          onClick={() => handleClick("whiteboard")}
        />
      </IconContainer>
      <IconContainer>
        <AddIcon
          $isCurPage={curPage === "workspace"}
          onClick={() => handleClick("workspace")}
        />
      </IconContainer>
      <IconContainer>
        <ProfileIcon
          $isCurPage={curPage === "profile"}
          onClick={() => handleClick("profile")}
        />
      </IconContainer>
    </NavDiv>
  );
};

const Layout = () => {
  return (
    <div>
      <Outlet />
      <NavBar />
    </div>
  );
};

export default Layout;
