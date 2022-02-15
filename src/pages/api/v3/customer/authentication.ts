import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { NextApiRequest } from "next";
import { Parser } from "../../../../components/alg";
import { ServerInstance } from "../../../../components/OnServer";

export const verifyIdToken = async (token: string): Promise<DecodedIdToken> => {
  return ServerInstance.firebase
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.error(error);
      throw new Error("有効なトークンではありません");
    });
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
