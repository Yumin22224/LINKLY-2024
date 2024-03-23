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

  margin-left: 120px;
  margin-right: 120px;
  margin-top: 71px;
  background-size: 100%;
  display: inline-block;
`;

const Content1 = styled.div`
  width: 220px;
  height: 58px;
  margin-top: 50px;
  margin-left: 120px;
  margin-right: 120px;
  display: inline-block;
  align-content: center;
  align-items: center;
`;

const Content2 = styled.div`
  width: 83px;
  height: 38px;
  bottom: 560px;
  color: #11eae0;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 120px;
  margin-right: 120px;
  display: inline-block;
  align-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70vh;
  flex-direction: column;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 317px;
  margin: 10px 20px;
  padding: 10px;
  bottom: 293px;
  border: none;
  margin-top: 20px;
  border-radius: 10px;
`;
const SubmitInput = styled.input`
  width: 317px;
  height: 56.4px;
  margin-top: 30px;
  border: none;
  background-color: #11eae0;
  color: #ffffff;
  border-radius: 20px;
`;

const Memberegister = styled.input`
  width: 317px;
  height: 56.4px;
  margin-top: 10px;
  background-color: #ffffff;
  border: none;
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
          <h2>
            우리 가족만의 <br />
            이야기가 모인 공간,
          </h2>
        </Content1>
        <Content2>
          <h2>링클리</h2>
        </Content2>
        <Input
          onChange={onChange}
          value={email}
          type="email"
          name="email"
          placeholder="Email"
        ></Input>{" "}
        <Input
          onChange={onChange}
          value={password}
          type="password"
          name="password"
          placeholder="password"
        ></Input>
        <SubmitInput type="submit" value="로그인" />
        <Memberegister type="submit" value="회원가입" />
      </LoginForm>
      {error !== "" ? <Error>{error}</Error> : null}
    </>
  );
}
