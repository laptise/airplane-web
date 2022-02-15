import { createTheme, ThemeProvider } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import theme from "./Theme";
import nookies from "nookies";

interface AppProp {
  children: JSX.Element;
  bodyId: string;
  title: string;
  userName: string;
  headerClass?: string;
}

const App: React.FC<AppProp> = ({ children, bodyId, title, userName, headerClass }) => (
  <ThemeProvider theme={theme}>
    <Header userName={userName} pathname={"test"} title={title} headerClass={headerClass} />
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
  </ThemeProvider>
);

export default App;
