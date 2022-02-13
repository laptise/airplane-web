import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Stripe from "stripe";
import stripeKey from "../../stripeKey.json";
import admin from "firebase-admin";
import serviceAccount from "../../airplane-e018c-firebase-adminsdk-a1qlt-15284639ba.json";
import { DocumentData } from "firebase/firestore";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { verifyIdToken } from "../pages/api/v3/customer/authentication";
import { Utl } from "./utils";

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

export class OnServer {
  static async getClientFromToken(ctx: GetServerSidePropsContext) {
    try {
      if (!isSSR) throw null;
      const cookies = nookies.get(ctx); // ブラウザ側で設定したCookieを取得
      if (!cookies?.["token"]) throw "no Cookie";
      const { uid } = await verifyIdToken(cookies["token"]); // CookieからJWTを取得し検証する
      const user = await ServerInstance.userColRef
        .doc(uid)
        .get()
        .then((doc) => doc.data());
      console.log(user);
      return user;
    } catch {
      return null;
    }
  }
}

export class ServerSideProps {
  static CustomerOnly: GetServerSideProps = async (ctx) => {
    const user = await OnServer.getClientFromToken(ctx);
    return user ? { props: {}, redirect: { destination: "/user/" } } : { props: {} };
  };

  static UserOnly: GetServerSideProps = async (ctx) => {
    const user = await OnServer.getClientFromToken(ctx);
    return user ? { props: { user: Utl.JSONParse(user) } } : { props: {}, redirect: { permanent: true, destination: "/login/" } };
  };
}
