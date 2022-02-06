import { createHash } from "crypto";
import { Timestamp } from "firebase/firestore";
import { NextApiHandler } from "next";
import { ServerInstance } from "../instance";

interface FlatParams {
  [key: string]: string;
}
const handler: NextApiHandler = async (req, res) => {
  const { email, password, name, note } = req.body as FlatParams;
  if (!email || !password) {
    res.status(500).end();
  }
  const user = await ServerInstance.firebase.auth().createUser({
    email: email,
    emailVerified: false,
    // phoneNumber: "+11234567890",
    password: password,
    displayName: name,
    // photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
  });
  const credential = await ServerInstance.stripe.customers.create({ email, description: user.uid });
  const stripeId = credential.id;
  const hash = createHash("sha256");
  hash.update(credential.id);
  const hashed = hash.digest("hex");
  await ServerInstance.firebase.firestore().collection("paymentKeyMaps").add({ uid: user.uid, stripeId, hash: hashed });
  await ServerInstance.firebase.firestore().collection("users").doc(user.uid).set({
    paymentId: hashed,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    name,
    lcName: name.toLowerCase(),
    note,
  });
  res.status(200).send(hashed);
};

export default handler;
