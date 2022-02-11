import Link from "next/link";
import React from "react";
import Header from "./Header";

interface AppProp {
  children: JSX.Element;
  bodyId: string;
  title: string;
}

const App: React.FC<AppProp> = ({ children, bodyId, title }) => (
  <>
    <Header pathname={"test"} title={title} />
    <main id={bodyId}>{children}</main>
    <footer>
      <h4>Airplane</h4>
      <nav>
        <Link href="/premium">
          <a>認定ユーザー向け</a>
        </Link>
        <a>個人情報</a>
        <a>運営会社</a>
      </nav>
    </footer>
  </>
);

export default App;
