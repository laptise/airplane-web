import { Button, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import App from "../components/App";
import { signinWithEmail } from "../firebase/auth";
import { useDispatch } from "react-redux";
import authSlice from "../store/auth/slice";
import { useAuthState } from "../store/auth/selector";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { OnServer, ServerSideProps } from "../components/OnServer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const dispatch = useDispatch();
  const { login } = authSlice.actions;

  const router = useRouter();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("start");
    e.preventDefault();
    await signinWithEmail(email, pw);
    router.reload();
  };

  return (
    <App userName={null} bodyId="login" title="ログイン">
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

export const getServerSideProps = ServerSideProps.CustomerOnly;
