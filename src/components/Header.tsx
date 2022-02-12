import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Head from "next/head";

const LoginButton: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <button id="topLoginButton">
      <FontAwesomeIcon icon={faUser} />
      ログイン
    </button>
  );
};

const Header = ({ pathname, title }) => (
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
        <Link href="/login">ログイン</Link>
      </nav>
    </header>
  </>
);

export default Header;
