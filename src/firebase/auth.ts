import { getAuth } from "@firebase/auth";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import Users from "./firestore/user";

export async function tokenLogin(email: string, password: string) {
  await signInWithEmailAndPassword(getAuth(), email, password).then((user) =>
    user.user.getIdToken().then((idToken) => {
      return axios.post("/api/v3/customer/sessionLogin", { idToken });
    })
  );
}

export async function tokenLogout() {
  await axios.post("/api/v3/customer/sessionLogout");
}
