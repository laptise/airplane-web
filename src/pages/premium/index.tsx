import { Button } from "@mui/material";
import Link from "next/link";
import App from "../../components/App";

export default function PremiumUser() {
  return (
    <App title="公式" bodyId="premium">
      <>
        <Welcome />
        <AboutAirplane />
        <UseCase />
        <FeatureAirplane />
        <AirplaneService />
        <GetStarted />
      </>
    </App>
  );
}
function Welcome() {
  return (
    <section id="welcome">
      <small>Welcome</small>
      <h2>認定ユーザーになりましょう</h2>
      <p>Airplaneでは認定ユーザーを随時募集しています!今すぐ登録して始めましょう。</p>
    </section>
  );
}
function AboutAirplane() {
  return (
    <section id="aboutAirplane">
      <small>About airplane</small>
      <h2>Airplaneでできること</h2>
      <p>
        Airplaneは、認定ユーザーが複数の利用者を相手にチャットをサービスとして提供できるプラットフォームです。
        <br />
        ライブ配信をサービスとして提供しているように、チャットをサービスとして提供できる環境を用意しています。
        <br />
        メッセージングをサービスとして提供することで、収入を得られるようになります。
      </p>
    </section>
  );
}

function UseCase() {
  return (
    <section id="useCase">
      <small>Use case</small>
      <h2>Airplaneを利用するパターンとしておすすめのユースケース</h2>
      <p>Airplaneの利用例のいくつかを紹介します。</p>
      <div className="cases">
        <h3>アーティストのとファンの交流の場</h3>
        <p>
          アーテイストの特別な写真や日常話などを提供しましょう。ファンから返ってくるメッセージに対応するのは難しいですが、Airplaneでは組み方次第で、実践可能な範囲でプランを作ることができます。
        </p>
      </div>
      <div className="cases">
        <h3>有料情報の定期的な提供</h3>
        <p>
          情報提供をビジネスモデルとするサービスにも読者に情報を届ける用途として向いています。プランによって提供する内容を分けるなど、便利に使えます。
        </p>
      </div>
      <div className="cases">
        <h3>コンテンツクリエイター</h3>
        <p>読者に特別なコンテンツを届けることができます。限定コンテンツを届けましょう。</p>
      </div>
    </section>
  );
}

function FeatureAirplane() {
  return (
    <section id="features">
      <small>Features</small>
      <h2>Airplaneの機能</h2>
      <p>Airplaneでは一人の認定ユーザーが多数の顧客を相手にチャットを進めやすいように様々な機能を取り揃えています。</p>
      <ul className="featureList">
        <li className="feature">
          <h3>柔軟なメッセージ送信</h3>
          <p>メッセージを送信する際に、一括送信、プラン別送信、個別送信、さらにはカスタム送信設定して送ることができます。</p>
        </li>
        <li className="feature">
          <h3>見やすい受信メッセージ</h3>
          <p>多数の顧客がメッセージに返信してきたときにも、便利に確認できます。</p>
        </li>
        <li className="feature">
          <h3>優れた顧客管理機能</h3>
          <p>顧客一人一人のプラン状態、過去の会話の内容、個別メモなどができます。</p>
        </li>
        <li className="feature">
          <h3>自由なプラン設定</h3>
          <p>
            認定ユーザーが自由にプランを作成することができます。プランの月額チケット枚数、プランの内容、制限事項などを自由に設けることができます。
          </p>
        </li>
        <li className="feature">
          <h3>自由な出金設定</h3>
          <p>顧客からプランの料金として回収したチケットは換金することができます。自動出金を設定して月給のように受け取ることも可能です。</p>
        </li>
      </ul>
    </section>
  );
}

function Feature() {
  return (
    <li className="feature">
      <h3>楽なメッセージ送信</h3>
      <p>メッセージを送信する際に、一括送信、プラン別送信、個別送信、さらにはカスタム送信設定して送ることができます。</p>
    </li>
  );
}

function AirplaneService() {
  return (
    <section id="services">
      <small>Plans</small>
      <h2>多種多様なプラン</h2>
      <Course />
    </section>
  );
}

function Course() {
  return (
    <div className="course">
      <h3>シャトル</h3>
      <p>プレミアムユーザーと1:1メッセージを受け渡しするプラン</p>
    </div>
  );
}

function GetStarted() {
  return (
    <section id="getStarted">
      <small>Get started!</small>
      <h2>準備はよろしいですか？注意事項を読み、始めましょう。</h2>
      <p>
        Airplaneではコミュニケーションや特別な情報発信を取ることをサービスとして提供するプラットフォームです。
        <br />
        顧客はこのサービスを提供してもらうために対価を支払います。既存の他アプリのメッセージと同じように、放置して終わるのではなく、発信というものがサービスになっていることを改めて意識しましょう。
      </p>
      <Link href="/premium/getStarted">
        <Button variant="outlined">登録ページへ</Button>
      </Link>
    </section>
  );
}
