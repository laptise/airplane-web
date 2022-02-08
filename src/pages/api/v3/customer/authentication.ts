import { NextApiRequest } from "next";
import { Parser } from "../alg";

export async function getStripeInfoFromToken(req: NextApiRequest) {
  try {
    const token = req.headers["a-payments"] as string;
    const picked = await Parser.getStripeUserFromToken(token);
    return picked as { stripeId: string; uid: string; hash: string };
  } catch {
    return null;
  }
}
