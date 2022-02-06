import { NextApiHandler } from "next";
import { ServerInstance } from "../instance";

interface FlatParams {
  [key: string]: string;
}
const handler: NextApiHandler = async (req, res) => {
  const { uid, name, email } = req.query as FlatParams;
  if (!uid || !name || !email) {
    res.status(500).end();
  }

  const credential = await ServerInstance.stripe.customers.create({ email, description: name });
  await ServerInstance.firebase.firestore().collection("users").doc(uid).update({ paymentId: credential.id });
  res.status(200).send(credential.id);
};

export default handler;
