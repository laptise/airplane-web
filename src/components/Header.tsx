import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../store/auth/selector";
import authSlice from "../store/auth/slice";
import { Button, Stack } from "@mui/material";
import { getAuth } from "firebase/auth";
import nookies from "nookies";
import Users from "../firebase/firestore/user";
import { useRouter } from "next/router";

const UserMenu = ({ view }: { view: boolean }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { logout, login } = authSlice.actions;

  return (
    <Stack className="userMenu">
      <a
        onClick={() => {
          getAuth().signOut();
          router.reload();
        }}
      >
        {" "}
        sing out
      </a>
    </Stack>
  );
};

const Header = ({ pathname, title, userName }) => {
  const dispatch = useDispatch();
  const { logout, login } = authSlice.actions;
  const { auth } = useAuthState();
  const router = useRouter();
  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("dasda");
        nookies.destroy(null, "token"); // cookiesを削除
        nookies.set(null, "token", "", {}); // ユーザーがログアウトしたらcookieを破棄
        dispatch(logout());
      } else {
        const token = await user.getIdToken(); // jwtを取得する
        const ent = (await Users.getFromUid(user.uid)).data();
        dispatch(login(ent));
        nookies.set(null, "token", token, {}); // jwtをcookieに保存
      }
    });
  }, []);

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
      <header>
        <Link href="/">
          <h1>Airplane</h1>
        </Link>
        <nav style={{ color: "black" }}>
          {userName ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  getAuth().signOut();
                  router.reload();
                }}
                style={{ fontWeight: "bold" }}
              >
                <Stack spacing={2} direction="row" alignItems={"center"}>
                  <FontAwesomeIcon icon={faUser} />
                  {userName}
                </Stack>
              </Button>
              <UserMenu view={false} />
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
