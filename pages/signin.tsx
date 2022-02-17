import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import React, { createContext, useState } from "react";
import App from "../components/App";
import axios from "axios";
import SignupForm, { SignupFormEvent } from "../components/SignupForm";

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
      <p className="textContent">Airplaneはメッセージングを商品とするサービスです。</p>
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
  const [isLoading, setIsLoaoding] = useState(false);
  const fulfillState = useState(false);
  const [fulfilled, setFulfilled] = fulfillState;
  const submit: SignupFormEvent = async ({ email, password, name, sei, mei, birth }) => {
    setIsLoaoding(true);
    await axios
      .post("/api/v3/customer/new", { email, password, name, sei, mei, birth })
      .then(() => {
        setIsLoaoding(false);
        setStep(step + 1);
      })
      .catch(() => {
        setIsLoaoding(false);
      });
  };

  return (
    <StepContent currentStep={step} step={SigninStep.BasicInfo}>
      <SignupForm onSubmit={submit} fulfillstate={fulfillState}>
        <div className="buttons">
          <Button variant="outlined" disabled={isLoading} onClick={() => setStep(step - 1)}>
            前へ
          </Button>
          <LoadingButton loading={isLoading} disabled={!fulfilled} variant="outlined" type="submit">
            完了
          </LoadingButton>
        </div>
      </SignupForm>
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
  return (
    <App userName={null} bodyId="signin" title="会員登録">
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
          <div className="stepContents">
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
