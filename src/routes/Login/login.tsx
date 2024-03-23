import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const LoginForm = styled.form` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`
const UsernameInput = styled.input`
    margin: 10px 20px;
    padding: 10px;
    placeholder="아이디를 입력해주세요"
    required
`

const PasswordInput = styled.input`
    margin: 10px 20px;
    padding: 10px;
    placeholder="비밀번호를 입력하세요"
    required
`

const SubmitBtn = styled.button`
    padding: 10px 20px;
    cursor: pointer;
`

export default function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name,value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "" || password === "") return ;
        try {
            await signInWithEmailAndPassword(auth,email, password)
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }
    return (
    <>
     <LoginForm onSubmit={onSubmit}>
        <UsernameInput onChange={onChange} value={email} type="email" name="email">{email}</UsernameInput>
        <PasswordInput onChange={onChange} value={password} type="password" name="password">{password}</PasswordInput>
        <SubmitBtn></SubmitBtn>
     </LoginForm>
    </>);
}