import { NextApiHandler } from "next";
import { ServerInstance } from "../../../../components/OnServer";
import HttpStatusCode from "../../../../httpCodes";
import { checkAuth } from "../customer/authentication";

const getPremiumUser: NextApiHandler = async (req, res) => {
  const { q } = req.query as { q: string };
  await checkAuth(req, res);
  const snapshot = await ServerInstance.firebase
    .firestore()
    .collection("users")
    .where("isPremium", "==", true)
    .where("lcName", "==", q.toLowerCase())
    .get();
  const data = snapshot.docs.map((x) => x.data());
  res.status(HttpStatusCode.OK).json(data);
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPremiumUser(req, res);
      break;
    default:
      res.status(HttpStatusCode.BAD_REQUEST).end();
      break;
  }
};

export default handler;
