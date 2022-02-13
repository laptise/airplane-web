import { GetServerSidePropsContext } from "next";
import nookies from "nookies";

const isSSR = typeof window === "undefined";
export default class OnServer {
  static async getClientFromToken(ctx: GetServerSidePropsContext) {
    try {
      if (!isSSR) throw null;
      const cookies = nookies.get(ctx); // ブラウザ側で設定したCookieを取得
      if (!cookies?.["token"]) throw "no Cookie";
      const { verifyIdToken } = await import("../pages/api/v3/customer/authentication");
      const { uid } = await verifyIdToken(cookies["token"]); // CookieからJWTを取得し検証する
      const { ServerInstance } = await import("../pages/api/v3/instance");
      const user = await ServerInstance.userColRef
        .doc(uid)
        .get()
        .then((doc) => doc.data());
      return user;
    } catch {
      return null;
    }
  }
}
