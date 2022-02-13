import { getAuth } from "@firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";
import Users, { UserEntity } from "./firestore/user";

export async function signinWithEmail(email: string, password: string): Promise<UserEntity> {
  const auth = getAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const snapshot = await Users.getFromUid(credential.user.uid);
  const authInfo = snapshot.data() as any;
  return authInfo;
}
