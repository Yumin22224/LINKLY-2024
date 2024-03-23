import styled from "styled-components";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";

const Form = styled.form``;
const Input = styled.input`
    margin: 10px 20px;
    padding: 10px;
`

export default function FindFamily() {
  const [familyId, setFamilyId] = useState("");
  const [familyName, setFamilyName] = useState("");
  const onSubmit = async () => {
    const user = auth.currentUser;
    const snapshot = await getDoc(doc(db,'families',familyId))
    if ( user === null || !snapshot.exists() ||snapshot.data()?.memberList.includes(user.uid)) return;
    await addDoc(collection(db, "users"), {
      id: user.uid,
      familyId: familyId,
      username: user.displayName
    });
  };
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {target:{name,value}} = e;
    if (name === "familyId") {
        setFamilyId(value);
    } else if (name === "familyName") {
      setFamilyName(value);
    }}
  const onCreate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user === null) return;
    const doc = await addDoc(collection(db, "families"), {
      familyName: familyName,
      memberList: [user.uid]
    });
    await addDoc(collection(db, "users"), {
      id: user.uid,
      familyId: doc.id,
      username: user.displayName
    });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="text"
          placeholder="Family ID"
          value={familyId}
          name="familyId"
        ></Input>
        <Input type="submit"></Input>
      </Form>
      Create Family Group
      <Form onSubmit={onCreate}>
        <Input onChange={onChange} type="text" value={familyName} name="familyName" ></Input>
        <Input type="submit"></Input>
      </Form>
    </>
  );
}
