import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import KeyIcon from "@mui/icons-material/Key";
import { FormEvent, useState } from "react";
import App from "../components/App";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { OnServer } from "../components/OnServer";

export default function Home({ user }) {
  console.log(user);
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
  const test = () => {};
  return (
    <section id="quickStart">
      <h2>Airplaneを始める</h2>
      <div className="selection">
        <div className="way">
          <h3>
            <KeyIcon />
            招待コードからスタート
          </h3>
          <p>
            認定ユーザーから受け取った招待コードから利用を開始します。
            <br />
          </p>
          <div className="contextZone" style={{ gap: 20 }}>
            <TextField
              size="small"
              value={code}
              onChange={(e) => setCode(e.currentTarget.value)}
              label="コードを入力してください"
              variant="outlined"
            />
            <Button disabled={!code} variant="outlined">
              コードからスタート
            </Button>
          </div>
        </div>
        <div className="way">
          <h3>会員登録からスタート</h3>
          <p>招待コードがなくても、公開プランは検索から探すことができます。</p>
          <div className="contextZone">
            <Link href="/signin">
              <Button variant="outlined">会員登録ページへ</Button>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await OnServer.getClientFromToken(ctx);
  return { props: { user: user ? JSON.parse(JSON.stringify(user)) : null } }; // DashboardPageにpropsを渡して遷移する
};
