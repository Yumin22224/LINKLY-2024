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
const Input = styled.input`
    margin: 10px 20px;
    padding: 10px;
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
        <Input onChange={onChange} value={email} type="email" name="email" placeholder="Email"></Input>
        <Input onChange={onChange} value={password} type="password" name="password" placeholder="password"></Input>
        <Input type="submit" value="login"/>
     </LoginForm>
    </>);
}