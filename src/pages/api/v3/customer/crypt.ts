import { NextApiHandler } from "next";
import { ServerInstance } from "../instance";
import { createHash } from "crypto";

interface FlatParams {
  [key: string]: string;
}
const handler: NextApiHandler = async (req, res) => {
  const { uid } = req.query as FlatParams;
  const credential = await ServerInstance.stripe.customers.create({ description: uid });
  const stripeId = credential.id;
  const hash = createHash("sha256");
  hash.update(credential.id);
  const hashed = hash.digest("hex");
  await ServerInstance.firebase.firestore().collection("paymentKeyMaps").add({ uid, stripeId, hash: hashed });
  await ServerInstance.firebase.firestore().collection("users").doc(uid).update({ paymentId: hashed });
  res.status(200).send(hash.digest("hex"));
};

export default handler;
