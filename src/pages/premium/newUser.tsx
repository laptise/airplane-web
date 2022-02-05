import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import App from "../../components/App";

const NewUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const addNewPremiumUser = async () => {
    const credential = await createUserWithEmailAndPassword(getAuth(), email, password);
    const uid = credential.user.uid;
    const colRef = collection(getFirestore(), "premiumUsers");
    const docRef = doc(colRef, uid);
    await setDoc(docRef, { lcName: name.toLowerCase(), name, note });
    window.alert("成功");
  };
  return (
    <App>
      EMAIL
      <input value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
      PASSWORD
      <input type="password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
      NAME
      <input onInput={(e) => setName(e.currentTarget.value)} />
      NOTE
      <input onInput={(e) => setNote(e.currentTarget.value)} />
      <button onClick={() => addNewPremiumUser()}>登録</button>
    </App>
  );
};
export default NewUser;
