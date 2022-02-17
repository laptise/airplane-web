import { getAuth } from "@firebase/auth";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import Users from "./firestore/user";

export async function tokenLogin(email: string, password: string) {
  const user = await signInWithEmailAndPassword(getAuth(), email, password);
  const idToken = await user.user.getIdToken();
  return await axios.post("/api/v1/customer/sessionLogin", { idToken });
}

export async function tokenLogout() {
  await axios.post("/api/v1/customer/sessionLogout");
}
