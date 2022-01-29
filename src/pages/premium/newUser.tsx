import { useState } from "react";
import App from "../../components/App";

const NewUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <App>
      EMAIL
      <input value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
      PASSWORD
      <input type="password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
    </App>
  );
};

export default NewUser;
