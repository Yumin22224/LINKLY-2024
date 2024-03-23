import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export const Error =styled.span`
 font-weight: 600;
 color: tomato;
 display: flex;
 justify-content: center;
`

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
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState("");
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
        if (isLoading ||email === "" || password === "") return ;
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth,email, password)
            navigate("/find-family")
        } catch (e) {
            if (e instanceof FirebaseError){
                setError(e.message)
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
    <>
     <LoginForm onSubmit={onSubmit}>
        <Input onChange={onChange} value={email} type="email" name="email" placeholder="Email"></Input>
        <Input onChange={onChange} value={password} type="password" name="password" placeholder="password"></Input>
        <Input type="submit" value="login"/>
     </LoginForm>
     {error !== "" ? <Error>{error}</Error>:null}
    </>);
}