import "../styles/index.scss";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "@firebase/app";

export default function App({ Component, pageProps }) {
  initializeApp(firebaseConfig);
  return <Component {...pageProps} />;
}
