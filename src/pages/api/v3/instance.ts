import admin from "firebase-admin";
import Stripe from "stripe";
import serviceAccount from "../../../../airplane-e018c-firebase-adminsdk-a1qlt-15284639ba.json";
const isSSR = typeof window === "undefined";
export class ServerInstance {
  static get stripe() {
    if (!isSSR) throw new Error("server only importable");
    return new Stripe(process.env.STRIPE_SK, {
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
