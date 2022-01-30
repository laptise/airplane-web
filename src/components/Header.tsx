import * as React from "react";
import Link from "next/link";

const Header = ({ pathname }) => (
  <header>
    <Link href="/">
      <a className={pathname === "/" ? "is-active" : ""}>サービス紹介</a>
    </Link>
    <Link href="/about">
      <a className={pathname === "/about" ? "is-active" : ""}>About</a>
    </Link>
    <Link href="/premium">
      <a className={pathname === "/premium" ? "is-active" : ""}>公式ユーザー</a>
    </Link>
  </header>
);

export default Header;
