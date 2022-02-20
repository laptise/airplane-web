import { getAuth } from "@firebase/auth";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import Users from "./firestore/user";

export async function tokenLogin(email: string, password: string) {
  const user = await signInWithEmailAndPassword(getAuth(), email, password);
  const idToken = await user.user.getIdToken();
  return await axios.post<UserCol>("/api/v1/customer/sessionLogin", { idToken }).then((res) => res.data);
}

export async function tokenCheck() {
  return await axios.get<UserCol>("/api/v1/customer/sessionCheck").then((res) => res.data);
}

export async function tokenLogout() {
  await axios.post("/api/v1/customer/sessionLogout");
}
