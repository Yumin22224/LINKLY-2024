import styled from "styled-components";
import { auth, db } from "../firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";

const Form = styled.form``;
const Input = styled.input``;

export default function FindFamily() {
  const [familyId, setFamilyId] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyIds, setFamilyIds] = useState<string[]>([]);
  const fetchFamilies  =async () => {
    const tweetsQuery = query(collection(db,"tweets"));
    await onSnapshot(tweetsQuery, (snapshot) => {
        setFamilyIds(snapshot.docs.map((doc) => doc.id));
    })}
  const onSubmit = async () => {
    const user = auth.currentUser;
    await fetchFamilies();
    if (user === null || familyIds.includes(familyId)) return;
    await addDoc(collection(db, "users"), {
      id: user.uid,
      familyId: familyId,
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
      </Form>
      <Form onSubmit={onCreate}>
        <Input onChange={onChange} type="text" value={familyName} name="familyName" ></Input>
        <Input type="submit">Create Family</Input>
      </Form>
    </>
  );
}
