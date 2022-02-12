import { createHash } from "crypto";
import { Timestamp } from "firebase/firestore";
import { NextApiHandler } from "next";
import { ServerInstance } from "../instance";

interface FlatParams {
  [key: string]: string;
}
const handler: NextApiHandler = async (req, res) => {
  console.log(req.body);
  if (req.method === "GET") {
    res.status(500).end();
    return;
  }
  const { email, password, name, mei, sei, birth } = req.body as FlatParams;
  if (!email || !password) {
    res.status(500).end();
    return;
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
    birth,
    mei,
    sei,
    name,
    lcName: name.toLowerCase(),
    note: "",
  });

  res.status(200).send(hashed);
  return;
};

export default handler;
