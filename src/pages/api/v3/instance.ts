import admin from "firebase-admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { DocumentData, FirestoreDataConverter } from "firebase/firestore";
import Stripe from "stripe";
import serviceAccount from "../../../../airplane-e018c-firebase-adminsdk-a1qlt-15284639ba.json";
import stripeKey from "../../../../stripeKey.json";
import { userConverter, UserEntity } from "../../../firebase/firestore/user";
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

  static get userColRef() {
    return this.firebase
      .firestore()
      .collection("users")
      .withConverter({
        toFirestore(post: UserEntity): DocumentData {
          return { createdAt: post.createdAt, isPremium: post.isPremium };
        },
        fromFirestore(snapshot: QueryDocumentSnapshot): UserEntity {
          const data = snapshot.data();
          console.log(data.createdAt.toString());
          new Date().toJSON();
          return {
            id: snapshot.id,
            createdAt: data.createdAt?.toDate?.() || null,
            isPremium: data.isPremium,
            lcName: data.lcName,
            name: data.name,
            note: data.note,
            paymentId: data.paymentId,
            updatedAt: data.updatedAt?.toDate?.() || null,
            sei: data.sei,
            mei: data.mei,
            birth: data.birth?.toDate?.() || null,
          };
        },
      });
  }
}
