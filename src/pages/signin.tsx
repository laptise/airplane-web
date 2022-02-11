import { CheckBox, TextFieldsOutlined } from "@mui/icons-material";
import { LoadingButton, LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Link from "next/link";
import React, { createContext, useContext, useEffect, useState } from "react";
import App from "../components/App";
import { Handler } from "../components/EventHandlers";
import jaLocale from "date-fns/locale/ja";
import app from "../firebase";

enum SigninStep {
  Agreement,
  BasicInfo,
  Done,
}

interface SubmitContent {
  password: string;
  cPassword: string;
  name: string;
  sei: string;
  mei: string;
  birth: Date;
}

const SigninContext = createContext<SubmitContent>(null);
const Step: React.FC<{ keyStep: SigninStep; currentStep: SigninStep }> = ({ children, keyStep, currentStep }) => (
  <li data-activated={currentStep == keyStep}>{children}</li>
);

const StepContent: React.FC<{ currentStep: SigninStep; step: SigninStep }> = ({ children, step, currentStep }) => (
  <section className="singleStep" data-step={step} data-disabled={currentStep !== step}>
    {children}
  </section>
);

const Agreements: React.FC<{ stepState: State<SigninStep> }> = ({ stepState }) => {
  const [step, setStep] = stepState;
  const [agreed, setAgreed] = useState(false);
  return (
    <StepContent currentStep={step} step={SigninStep.Agreement}>
      <h3>利用規約</h3>
      <small>以下を読み、同意の上、次に進んでください</small>
      <textarea tabIndex={-1} readOnly={true}>
        Airplaneはメッセージングを商品とするサービスです。
      </textarea>
      <FormControlLabel control={<Checkbox onChange={(e) => setAgreed(e.currentTarget.checked)} />} label="同意します" />
      <div className="buttons">
        <Button tabIndex={-1} disabled={!agreed} onClick={() => setStep(step + 1)} variant="outlined">
          次へ
        </Button>
      </div>
    </StepContent>
  );
};

/**基本情報タブ */
const BasicInfoSection: React.FC<{ stepState: State<SigninStep> }> = ({ stepState }) => {
  const [step, setStep] = stepState;
  const [birth, setBirth] = useState(null);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [fulfilled, setFulfilled] = useState(false);
  const [sei, setSei] = useState("");
  const [mei, setMei] = useState("");
  const [isLoading, setIsLoaoding] = useState(false);
  const checkPassword = () => {
    if (password && password !== cPassword) setPasswordHasError(true);
    else {
      setPasswordHasError(false);
    }
  };
  const checkFulfilled = () => {
    if (!passwordHasError && birth && email && sei && mei && name) setFulfilled(true);
    else setFulfilled(false);
  };

  const submit = async () => {
    setIsLoaoding(true);
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    setIsLoaoding(false);
    setStep(step + 1);
  };

  useEffect(checkPassword, [password, cPassword]);
  useEffect(checkFulfilled, [passwordHasError, birth, email, name, sei, mei]);
  const dateAdapter = DateAdapter;
  return (
    <StepContent currentStep={step} step={SigninStep.BasicInfo}>
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
        <div style={{ display: "flex", gap: 20 }}>
          <TextField
            value={password}
            onChange={(e) => {
              Handler.Input(e, setPassword);
            }}
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
      <div className="buttons">
        <Button variant="outlined" onClick={() => setStep(step - 1)}>
          前へ
        </Button>
        <LoadingButton loading={isLoading} disabled={!fulfilled} variant="outlined" onClick={submit}>
          完了
        </LoadingButton>
      </div>
    </StepContent>
  );
};

const Done: React.FC<{ stepState: State<SigninStep> }> = ({ stepState }) => {
  const [step, setStep] = stepState;
  return (
    <StepContent currentStep={step} step={SigninStep.Done}>
      <h3>完了</h3>
      <small>
        会員登録は以上となります。サービスの利用にはチケットが必要になります。チケット購入のために必要な支払い手段はログイン後設定をしてください。
      </small>
      <div className="buttons">
        <Link href={"/login"}>
          <Button variant="outlined">完了</Button>
        </Link>
      </div>
    </StepContent>
  );
};

export default function Signin() {
  const stepState = useState(SigninStep.Agreement);
  const [step, setStep] = stepState;
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
      }
    });
  }, []);
  return (
    <App bodyId="signin" title="会員登録">
      <SigninContext.Provider value={{ password: "", cPassword: "", name: "", sei: "", mei: "", birth: null }}>
        <ol className="steps">
          <Step currentStep={step} keyStep={SigninStep.Agreement}>
            1. 利用規約同意
          </Step>
          <Step currentStep={step} keyStep={SigninStep.BasicInfo}>
            2. 基本情報入力
          </Step>
          <Step currentStep={step} keyStep={SigninStep.Done}>
            3. 完了
          </Step>
        </ol>
        <div className="stepMask">
          <div className="stepContents" style={{ left: 0 - step * 100 + "vw" }}>
            <Agreements stepState={stepState} />
            <BasicInfoSection stepState={stepState} />
            <Done stepState={stepState} />
            <StepContent currentStep={step} step={SigninStep.Done}>
              おddれ
              <div className="buttons">
                <Button variant="outlined" onClick={() => setStep(step - 1)}>
                  前へ
                </Button>
              </div>
            </StepContent>
          </div>
        </div>
      </SigninContext.Provider>
    </App>
  );
}
