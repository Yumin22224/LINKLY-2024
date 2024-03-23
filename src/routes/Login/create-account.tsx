import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const CreateAccountForm = styled.form``;
const Input = styled.input``;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      return;
    }
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: username,
      });
      navigate("/find-family");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "username") {
      setUsername(value);
    }
  };
  return (
    <>
      <CreateAccountForm onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={username}
          type="text"
          name="username"
          placeholder="username"
        ></Input>
        <Input
          onChange={onChange}
          value={email}
          type="email"
          name="email"
          placeholder="email"
        ></Input>
        <Input
          onChange={onChange}
          value={password}
          type="password"
          name="password"
          placeholder="password"
        ></Input>
        <Input type="submit" value="Create Account" />
      </CreateAccountForm>
    </>
  );
}
