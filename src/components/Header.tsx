import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../store/auth/selector";
import authSlice from "../store/auth/slice";
import { Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import nookies from "nookies";

const LoginButton: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <button id="topLoginButton">
      <FontAwesomeIcon icon={faUser} />
      ログイン
    </button>
  );
};

const Header = ({ pathname, title }) => {
  const dispatch = useDispatch();
  const { logout } = authSlice.actions;
  const { auth } = useAuthState();
  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("dasda");
        nookies.destroy(null, "token"); // cookiesを削除
        nookies.set(null, "token", "", {}); // ユーザーがログアウトしたらcookieを破棄
        dispatch(logout());
      } else {
        const token = await user.getIdToken(); // jwtを取得する
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
        <nav>
          {auth ? (
            <>
              {auth.name}
              <button
                onClick={() => {
                  getAuth().signOut();
                }}
              >
                <FontAwesomeIcon icon={faSignOut} />
              </button>
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
