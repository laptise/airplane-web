import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Handler } from "./EventHandlers";
import DateAdapter from "@mui/lab/AdapterDateFns";
import jaLocale from "date-fns/locale/ja";

export interface SigninFormProps {
  onSubmit: SignupFormEvent;
  fulfillstate?: State<boolean>;
}

export type SignupFormEvent = (formData: { email: string; password: string; name: string; sei: string; mei: string; birth: string }) => void;

/**会員登録フォーム */
export const SignupForm: React.FC<SigninFormProps> = ({ onSubmit, children, fulfillstate }) => {
  const [birth, setBirth] = useState(null);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [fulfilled, setFulfilled] = fulfillstate || useState(false);
  const [sei, setSei] = useState("");
  const [mei, setMei] = useState("");
  const checkPassword = () => {
    if (password && password !== cPassword) setPasswordHasError(true);
    else if (password.length < 6) setPasswordHasError(true);
    else {
      setPasswordHasError(false);
    }
  };
  const checkFulfilled = () => {
    if (!passwordHasError && birth && email && sei && mei && name) setFulfilled(true);
    else setFulfilled(false);
  };
  useEffect(checkPassword, [password, cPassword]);
  useEffect(checkFulfilled, [passwordHasError, birth, email, name, sei, mei]);
  const submitProces = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, sei, mei, birth, password, name });
  };
  return (
    <form onSubmit={(e) => submitProces(e)}>
      <div className="basicForm">
        <h4>ログイン情報</h4>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type={"email"}
          size="small"
          label="メールアドレス"
          variant="outlined"
        />
        <Stack spacing={1}>
          <small>パスワードは最低6文字以上必要です。</small>
          <div style={{ display: "flex", gap: 20 }}>
            <TextField
              value={password}
              onChange={(e) => {
                Handler.Input(e, setPassword);
              }}
              error={passwordHasError}
              type={"password"}
              size="small"
              label="パスワード"
              variant="outlined"
              style={{ flex: 1 }}
            />
            <TextField
              value={cPassword}
              error={passwordHasError}
              onChange={(e) => {
                Handler.Input(e, setCPassword);
              }}
              type={"password"}
              size="small"
              label="パスワード確認"
              variant="outlined"
              style={{ flex: 1 }}
            />
          </div>
        </Stack>
      </div>
      <div className="basicForm">
        <h4>個人情報</h4>
        <div style={{ display: "flex", gap: 20 }}>
          <TextField
            onChange={(e) => Handler.Input(e, setName)}
            value={name}
            size="small"
            label="ニックネーム"
            variant="outlined"
            style={{ flex: 1 }}
          />
          <TextField onChange={(e) => Handler.Input(e, setSei)} value={sei} size="small" label="姓" variant="outlined" style={{ flex: 1 }} />
          <TextField onChange={(e) => Handler.Input(e, setMei)} value={mei} size="small" label="名" variant="outlined" style={{ flex: 1 }} />
        </div>
        <LocalizationProvider dateAdapter={DateAdapter} locale={jaLocale}>
          <MobileDatePicker
            label="生年月日"
            inputFormat="yyyy年 M月 d日"
            value={birth}
            onChange={(date) => setBirth(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {children}
    </form>
  );
};

export default SignupForm;
