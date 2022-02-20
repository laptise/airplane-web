import { NextApiHandler } from "next";
import { ServerInstance } from "../../../../components/OnServer";
import { setCookie, destroyCookie, parseCookies } from "nookies";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(404).send("Not Found");
  try {
    const auth = ServerInstance.firebase.auth();

    // Cookieに保存されているセッションIDを取得する
    const sessionId = parseCookies({ req }).__session || "";

    // セッションIDから認証情報を取得する
    const decodedClaims = await auth.verifySessionCookie(sessionId).catch(() => null);

    // 全てのセッションを無効にする
    if (decodedClaims) {
      await auth.revokeRefreshTokens(decodedClaims.sub);
    }
  } catch {
  } finally {
    // Cookieに保存されているセッションIDを削除
    destroyCookie({ res }, "__session", { path: "/" });

    res.send(JSON.stringify({ status: "success" }));
  }
};
export default handler;
