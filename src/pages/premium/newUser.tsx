import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import App from "../../components/App";

const NewUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const addNewPremiumUser = async () => {
    await createUserWithEmailAndPassword(getAuth(), email, password);
    await addDoc(collection(getFirestore(), "premiumUsers"), { lcName: name.toLowerCase(), name, note });
    window.alert("成功");
  };
  return (
    <App>
      EMAIL
      <input value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
      PASSWORD
      <input type="password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
      <input onInput={(e) => setName(e.currentTarget.value)} />
      <input onInput={(e) => setNote(e.currentTarget.value)} />
      <button onClick={() => addNewPremiumUser()}>登録</button>
    </App>
  );
};
export default NewUser;
