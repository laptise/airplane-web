import "../styles/index.scss";
import { firebaseConfig, getFirebase } from "../firebase/index";
import { initializeApp } from "@firebase/app";
import { Provider } from "react-redux";
import createStore from "../store";
import { getAuth, Persistence } from "firebase/auth";
import nookies from "nookies";
import { AppProps } from "next/dist/shared/lib/router/router";

export default function App({ Component, pageProps }: AppProps) {
  getFirebase();
  return (
    <Provider store={createStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
