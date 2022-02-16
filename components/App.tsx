import { createTheme, ThemeProvider } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import theme from "./Theme";
import nookies from "nookies";

const App: React.FC<AppProp> = (props) => {
  const { bodyId, children } = props;
  return (
    <ThemeProvider theme={theme}>
      <Header {...props} />
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
};

export default App;
