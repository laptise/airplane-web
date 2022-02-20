import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Stripe from "stripe";
import admin, { initializeApp } from "firebase-admin";
import { DocumentData } from "firebase/firestore";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { Utl } from "./utils";

const isSSR = typeof window === "undefined";

/**サーバーサイドインスタンス */
export class ServerInstance {
  /**ストライプインスタンス */
  static get stripe() {
    if (!isSSR) throw new Error("server only importable");
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });
  }

  /**ファイアベースインスタンス */
  static get firebase() {
    if (!isSSR) throw new Error("server only importable");
    if (admin.apps.length === 0) {
      const serviceAccount: admin.ServiceAccount = {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      };
      const option: admin.AppOptions = {
        projectId: "airplane-e018c",
        credential: admin.credential.cert(serviceAccount),
      };
      const app = admin.initializeApp(option);
      return app;
    } else {
      return admin.apps[0];
    }
  }

  /**ユーザーコレクションレファレンス (Server side) */
  static get userColRef() {
    return this.firebase
      .firestore()
      .collection("users")
      .withConverter({
        toFirestore(post: UserCol): DocumentData {
          return { createdAt: post.createdAt, isPremium: post.isPremium };
        },
        fromFirestore(snapshot: QueryDocumentSnapshot): UserCol {
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

/**サーバーサイドだけで呼べる処理 */
export class OnServer {
  /**トークンから利用者を取得 */
  static async getClientFromToken(ctx: GetServerSidePropsContext) {
    try {
      if (!isSSR) throw "is Not SSR";
      const cookies = nookies.get(ctx); // ブラウザ側で設定したCookieを取得
      const session = cookies.__session?.toString?.() || "";
      if (!session) throw "empty cookie";
      const userCrenetial = await ServerInstance.firebase
        .auth()
        .verifySessionCookie(session, true)
        .catch((e) => {
          console.log(e);
          throw "Verify failed";
        });
      console.log("real?");
      console.log(userCrenetial);
      const { uid } = userCrenetial;
      if (!uid) throw "Verify failed";
      const user = await ServerInstance.userColRef
        .doc(uid)
        .get()
        .then((doc) => doc.data())
        .catch(() => {
          throw "No User";
        });
      return { ...user, ...userCrenetial };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

/**SSRチェックテンプレート */
export class ServerSideProps {
  /**訪問者だけが見れるページ(未ログイン時にだけ見れる) */
  static CustomerOnly: GetServerSideProps = async (ctx) => {
    const user = await OnServer.getClientFromToken(ctx);
    return user ? { props: {}, redirect: { destination: "/user/" } } : { props: {} };
  };

  /**会員だけのコンテンツ (ログインユーザーのみ) */
  static UserOnly: GetServerSideProps = async (ctx) => {
    const user = await OnServer.getClientFromToken(ctx);
    return user ? { props: { user: Utl.JSONParse(user) } } : { props: {}, redirect: { permanent: true, destination: "/login/" } };
  };
}

export class Parser {
  static async getStripeUserFromToken(token: string) {
    const [uid, hash] = Buffer.from(token, "base64").toString().split(":");
    const snapshot = await ServerInstance.firebase.firestore().collection("paymentKeyMaps").where("hash", "==", hash).where("uid", "==", uid).get();
    const picked = snapshot.docs.map((x) => x.data());
    return picked[0];
  }
}
