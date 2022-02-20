import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import App from "../../components/App";
import { Stack } from "@mui/material";
import axios from "axios";
import SignupForm, { SignupFormEvent } from "../../components/SignupForm";

const NewUser: React.FC = () => {
  const fulfillState = useState(false);
  const [fulfilled, setFulfilled] = fulfillState;
  const addNewPremiumUser: SignupFormEvent = async ({ name, mei, sei, birth, email, password }) => {
    await axios.post("/api/v1/premiumUser/new", { email, password, name, sei, mei, birth });
    window.alert("成功");
  };
  return (
    <App userName={""} title="認定ユーザーの登録" bodyId="newUser">
      <SignupForm onSubmit={addNewPremiumUser} fulfillstate={fulfillState}>
        <button type="submit" disabled={!fulfilled}>
          OK
        </button>
      </SignupForm>
    </App>
  );
};
export default NewUser;
