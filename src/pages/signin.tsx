import { TextFieldsOutlined } from "@mui/icons-material";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import App from "../components/App";
import app from "../firebase";

enum SigninStep {
  Agreement,
  BasicInfo,
  Payments,
  Done,
}

const Step: React.FC<{ keyStep: SigninStep; currentStep: SigninStep }> = ({ children, keyStep, currentStep }) => (
  <li data-activated={currentStep == keyStep}>{children}</li>
);

const StepContent: React.FC<{ step: SigninStep }> = ({ children, step }) => (
  <section className="singleStep" data-step={step}>
    {children}
  </section>
);

const Agreements: React.FC<{ stepState: State<SigninStep> }> = ({ stepState }) => {
  const [step, setStep] = stepState;
  return (
    <StepContent step={SigninStep.Agreement}>
      <h3>利用規約</h3>
      <small>以下を読み、同意の上、次に進んでください</small>
      <textarea readOnly={true}>Airplaneはメッセージングを商品とするサービスです。</textarea>
      <div className="buttons">
        <Button onClick={() => setStep(step + 1)} variant="outlined">
          次へ
        </Button>
      </div>
    </StepContent>
  );
};

const BasicInfoSection: React.FC<{ stepState: State<SigninStep> }> = ({ stepState }) => {
  const [step, setStep] = stepState;
  const [birth, setBirth] = useState(new Date());
  return (
    <StepContent step={SigninStep.BasicInfo}>
      <div className="basicForm">
        <h4>ログイン情報</h4>
        <TextField type={"email"} size="small" label="メールアドレス" variant="outlined" />
        <div style={{ display: "flex", gap: 20 }}>
          <TextField type={"password"} size="small" label="パスワード" variant="outlined" style={{ flex: 1 }} />
          <TextField type={"password"} size="small" label="パスワード確認" variant="outlined" style={{ flex: 1 }} />
        </div>
      </div>
      <div className="basicForm">
        <h4>個人情報</h4>
        <div style={{ display: "flex", gap: 20 }}>
          <TextField size="small" label="ニックネーム" variant="outlined" style={{ flex: 1 }} />
          <TextField size="small" label="姓" variant="outlined" style={{ flex: 1 }} />
          <TextField size="small" label="名" variant="outlined" style={{ flex: 1 }} />
        </div>
        <LocalizationProvider dateAdapter={DateAdapter}>
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
        <Button variant="outlined" onClick={() => setStep(step + 1)}>
          次へ
        </Button>
      </div>
    </StepContent>
  );
};

export default function Signin() {
  const stepState = useState(SigninStep.Agreement);
  const [step, setStep] = stepState;
  return (
    <App bodyId="signin" title="会員登録">
      <>
        <ol className="steps">
          <Step currentStep={step} keyStep={SigninStep.Agreement}>
            1. 利用規約同意
          </Step>
          <Step currentStep={step} keyStep={SigninStep.BasicInfo}>
            2. 基本情報入力
          </Step>
          <Step currentStep={step} keyStep={SigninStep.Payments}>
            3. 支払い情報
          </Step>
          <Step currentStep={step} keyStep={SigninStep.Done}>
            4. 完了
          </Step>
        </ol>
        <p>Index Page</p>
        <div className="stepMask">
          <div className="stepContents" style={{ left: 0 - step * 100 + "vw" }}>
            <Agreements stepState={stepState} />
            <BasicInfoSection stepState={stepState} />
            <StepContent step={SigninStep.Payments}>
              おddれ
              <div className="buttons">
                <Button variant="outlined" onClick={() => setStep(step - 1)}>
                  前へ
                </Button>
                <Button variant="outlined" onClick={() => setStep(step + 1)}>
                  次へ
                </Button>
              </div>
            </StepContent>
            <StepContent step={SigninStep.Done}>
              おddれ
              <div className="buttons">
                <Button variant="outlined" onClick={() => setStep(step - 1)}>
                  前へ
                </Button>
              </div>
            </StepContent>
          </div>
        </div>
      </>
    </App>
  );
}
