import admin from "firebase-admin";
import Stripe from "stripe";
import serviceAccount from "../../../../airplane-e018c-firebase-adminsdk-a1qlt-15284639ba.json";
import stripeKey from "../../../../stripeKey.json";
const isSSR = typeof window === "undefined";
export class ServerInstance {
  static get stripe() {
    console.log("key", stripeKey.secret_key);
    if (!isSSR) throw new Error("server only importable");
    return new Stripe(stripeKey.secret_key, {
      apiVersion: "2020-08-27",
    });
  }
  static get firebase() {
    if (!isSSR) throw new Error("server only importable");
    if (admin.apps.length === 0) {
      return admin.initializeApp({ credential: admin.credential.cert(serviceAccount as any) });
    } else {
      return admin.apps[0];
    }
  }
}
