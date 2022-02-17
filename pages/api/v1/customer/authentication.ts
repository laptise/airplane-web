import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { NextApiHandler, NextApiRequest } from "next";
import { ServerInstance, Parser } from "../../../../components/OnServer";
import HttpStatusCode from "../../../../httpCodes";

export const verifyIdToken = async (token: string): Promise<DecodedIdToken> => {
  return ServerInstance.firebase
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.error(error);
      throw new Error("有効なトークンではありません");
    });
};

export const checkAuth: NextApiHandler = async (req, res) => {
  let signed = false;
  if (req.cookies?.__session === process.env.TEST_DEV_KEY) signed = true;
  else {
    try {
      const userCrenetial = await ServerInstance.firebase.auth().verifySessionCookie(req.cookies?.__session, true);
      signed = !!userCrenetial;
    } catch {
      signed = false;
    }
  }
  if (!signed) {
    res.status(HttpStatusCode.UNAUTHORIZED).send("unsigned");
    throw "unsigned user Accessed to api";
  }
};

export async function getStripeInfoFromToken(req: NextApiRequest) {
  try {
    const token = req.headers["a-payments"] as string;
    const picked = await Parser.getStripeUserFromToken(token);
    return picked as { stripeId: string; uid: string; hash: string };
  } catch {
    return null;
  }
}
