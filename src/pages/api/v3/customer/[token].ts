import { NextApiHandler } from "next";
import HttpStatusCode from "../../../../httpCodes";
import { Parser } from "../alg";
import { ServerInstance } from "../instance";
interface FlatParams {
  [key: string]: string;
}
const handler: NextApiHandler = async (req, res) => {
  try {
    const token = req.headers["a-payments"] as string;
    const picked = await Parser.getStripeUserFromToken(token);
    res.status(200).json(picked);
  } catch {
    res.status(HttpStatusCode.UNAUTHORIZED).end();
  }
};

export default handler;
