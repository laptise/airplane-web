import Link from "next/link";
import React from "react";
import Header from "./Header";

interface AppProp {
  children: JSX.Element;
  bodyId: string;
  title: string;
}

const App: React.FC<AppProp> = ({ children, bodyId }) => (
  <>
    <Header pathname={"test"} />
    <main id={bodyId}>{children}</main>
    <footer>
      <h4>Airplane</h4>
      <nav>
        <Link href="/premium">
          <a>認定ユーザー</a>
        </Link>
      </nav>
    </footer>
  </>
);

export default App;
