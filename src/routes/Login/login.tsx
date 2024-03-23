import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import Image1 from "../image/Vector.png";

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  display: flex;
  justify-content: center;
`;
const Image = styled.div`
  background-image: url(${Image1});
  background-repeat: no-repeat;
  align-items: center;
  align-content: center;
  width: 91px;
  height: 28px;
  left: 142px;
  right: 142px;
  margin-top: 71px;
  background-size: 100%;
  display: inline-block;
`;

const Content1 = styled.div`
  width: 184px;
  height: 58px;
  align-content: center;
  align-items: center;
  margin-top: 115px;
`;

const Content2 = styled.div`
  width: 83px;
  height: 38px;
  align-content: center;
  align-items: center;
  margin-top: 8px;
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;
const Input = styled.input`
  margin: 10px 20px;
  padding: 10px;
`;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/find-family");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Image></Image>
      <LoginForm onSubmit={onSubmit}>
        <Content1>
          우리 가족만의 <br />
          이야기가 모인 공간,
        </Content1>
        <Content2>링클리</Content2>
        <Input
          onChange={onChange}
          value={email}
          type="email"
          name="email"
          placeholder="Email"
        ></Input>
        <Input
          onChange={onChange}
          value={password}
          type="password"
          name="password"
          placeholder="password"
        ></Input>
        <Input type="submit" value="login" />
      </LoginForm>
      {error !== "" ? <Error>{error}</Error> : null}
    </>
  );
}
