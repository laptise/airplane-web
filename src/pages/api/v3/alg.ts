import { ServerInstance } from "../../../components/OnServer";

export class Parser {
  static async getStripeUserFromToken(token: string) {
    const [uid, hash] = Buffer.from(token, "base64").toString().split(":");
    const snapshot = await ServerInstance.firebase.firestore().collection("paymentKeyMaps").where("hash", "==", hash).where("uid", "==", uid).get();
    const picked = snapshot.docs.map((x) => x.data());
    return picked[0];
  }
}
