import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { EffectCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../store/auth/selector";
import authSlice from "../store/auth/slice";
import { Button, Stack } from "@mui/material";
import { getAuth } from "firebase/auth";
import nookies from "nookies";
import Users from "../firebase/firestore/user";
import { useRouter } from "next/router";
import { tokenLogout } from "../firebase/auth";

interface PopupMenuProps {
  viewState: State<boolean>;
  onSubscribeOpen?: () => void;
}

const UserMenu: React.FC<PopupMenuProps> = ({ viewState, onSubscribeOpen }) => {
  const [, setViewState] = viewState;
  const dispatch = useDispatch();
  const router = useRouter();

  const effect: EffectCallback = () => {};

  useEffect((): (() => void) => {
    document.onclick = (e) => !(e.target as HTMLElement).closest("userMenu") && setViewState(false);
    return () => (document.onclick = () => {});
  }, []);

  return (
    <ul className="userMenu">
      <Link href={"/user"}>
        <li>トップへ</li>
      </Link>
      <Link href={"/user/profile"}>
        <li>プロフィール管理</li>
      </Link>
      <li onClick={() => onSubscribeOpen?.()}>プラン管理</li>
      <li
        onClick={async () => {
          await tokenLogout();
          router.push("/login");
        }}
      >
        ログアウト
      </li>
    </ul>
  );
};

const Header: React.FC<AppProp> = ({ title, userName, headerClass, onSubscribeOpen }) => {
  const { auth } = useAuthState();
  const menuViewState = useState(false);
  const [menuView, setMenuView] = menuViewState;
  // useEffect(
  //   () =>
  //     getAuth().onAuthStateChanged(async (user) => {
  //       if (!user) {
  //         console.log("dasda");
  //         nookies.destroy(null, "token"); // cookiesを削除
  //         nookies.set(null, "token", "", {}); // ユーザーがログアウトしたらcookieを破棄
  //       } else {
  //         console.log("is on");
  //         const token = await user.getIdToken(); // jwtを取得する
  //         nookies.set(null, "token", token, {}); // jwtをcookieに保存
  //       }
  //     }),
  //   []
  // );
  const openMenu = () => {
    setMenuView(true);
  };

  return (
    <>
      <Head>
        <title>{title} - Airplane</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  (function(d) {
    var config = {
      kitId: 'tyk3arj',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
  `,
          }}
        />
      </Head>
      <header className={headerClass}>
        <Link href="/">
          <h1>Airplane</h1>
        </Link>
        <nav style={{ color: "black" }}>
          {userName ? (
            <>
              <Button color="inherit" onClick={openMenu} style={{ fontWeight: "bold" }}>
                <Stack spacing={2} direction="row" alignItems={"center"}>
                  <FontAwesomeIcon icon={faUser} />
                  {userName}
                </Stack>
              </Button>
              {menuView && <UserMenu onSubscribeOpen={onSubscribeOpen} viewState={menuViewState} />}
            </>
          ) : (
            <Link href="/login">ログイン</Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
