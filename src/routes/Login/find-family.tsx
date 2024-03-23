import styled from "styled-components";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const Form = styled.form``;
const Input = styled.input``;
const CreateFamilyBtn = styled.button``;

export default function FindFamily() {
  const [familyId, setFamilyId] = useState(undefined);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "familyId") {
      setFamilyId(value);
    }
  };
  const onSubmit = async () => {
    await addDoc(collection(db, "users"), {
      id: auth.currentUser.uid,
      familyId: familyId,
    });
  };
  const onClick = async () => {
    
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="number"
          placeholder="Family ID"
          value={familyId}
          name="familyId"
        ></Input>
      </Form>
      <CreateFamilyBtn onClick={onClick}>Create Family</CreateFamilyBtn>
    </>
  );
}
