import { Button, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import App from "../components/App";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebase-admin";
import { getFirebase } from "../firebase";
import { signinWithEmail } from "../firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import authSlice from "../store/auth/slice";
import { useAuthState } from "../store/auth/selector";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const dispatch = useDispatch();
  const { login } = authSlice.actions;
  const auth = useAuthState();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("start");
    e.preventDefault();
    const res = await signinWithEmail(email, pw);
    dispatch(login(res));
    console.log(res);
  };

  return (
    <App bodyId="login" title="ログイン">
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <h3>ログイン</h3>
          <TextField value={email} onChange={(e) => setEmail(e.currentTarget.value)} size="small" type={"email"} label="メールアドレス" />
          <TextField value={pw} onChange={(e) => setPw(e.currentTarget.value)} size="small" type={"password"} label="パスワード" />
          <Button variant="outlined" type="submit">
            サインイン
          </Button>
        </Stack>
      </form>
    </App>
  );
}
