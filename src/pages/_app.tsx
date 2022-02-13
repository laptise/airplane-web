import "../styles/index.scss";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "@firebase/app";
import { Provider } from "react-redux";
import createStore from "../store";
import { getAuth } from "firebase/auth";
import nookies from "nookies";

export default function App({ Component, pageProps }) {
  initializeApp(firebaseConfig);

  return (
    <Provider store={createStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
