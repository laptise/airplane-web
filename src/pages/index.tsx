import { Box, TextField } from "@mui/material";
import Link from "next/link";
import { FormEvent, useState } from "react";
import App from "../components/App";

export default function Home() {
  return (
    <App bodyId="home" title="ホーム">
      <>
        <AboutAirplane />
        <QuickStart />
        <WhosInAirplane />
      </>
    </App>
  );
}

function AboutAirplane() {
  return (
    <section id="top">
      <div className="titleZone">
        <h4>サブスクリプション型</h4>
        <h4>プレミアムチャットサービス</h4>
      </div>
      <h1>Airplane</h1>
      <p>Airplaneでは、あなたのメッセージが確実に届きます。</p>
    </section>
  );
}

function QuickStart() {
  const [mode, setMode] = useState(0);
  const [code, setCode] = useState("");
  return (
    <section id="quickStart">
      <h2>Airplaneを始める</h2>
      <div className="selection">
        <div className="way">
          <h3>招待コードからスタート</h3>
          <p>
            認定ユーザーから受け取った招待コードから利用を開始します。
            <br />
          </p>
          <div className="contextZone">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={code}
                onInput={(e: FormEvent<HTMLInputElement>) => setCode(e.currentTarget.value)}
                label="コードを入力してください"
                variant="outlined"
              />
            </Box>
          </div>
        </div>
        <div className="way">
          <h3>会員登録からスタート</h3>
          <p>招待コードがなくても、公開プランは検索から探すことができます。</p>
          <div className="contextZone">
            <Link href="/signin">
              <a>会員登録ページへ</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhosInAirplane() {
  return (
    <section id="whosInAirplane">
      Airplaneを利用している人
      <Slider />
    </section>
  );
}

function Slider() {
  return (
    <div className="slider">
      <div className="slide">1</div>
      <div className="slide">2</div>
      <div className="slide">3</div>
      <div className="slide">4</div>
      <div className="slide">5</div>
      <div className="slide">6</div>
      <div className="slide">7</div>
      <div className="slide">9</div>
      <div className="slide">10</div>
    </div>
  );
}
