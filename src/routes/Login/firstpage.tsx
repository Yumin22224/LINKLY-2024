import Image1 from "../image/Vector.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FirstForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

const Image = styled.div`
  background-image: url(${Image1});
  background-repeat: no-repeat;
  align-items: center;
  width: 193px;
  height: 60px;
  left: 91px;
  right: 91px;
  background-size: 100%;
`;

export default function FirstPage() {
  return (
    <>
      <FirstForm>
        <Image></Image>
      </FirstForm>
    </>
  );
}
