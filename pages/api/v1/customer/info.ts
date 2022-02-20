import { NextApiHandler } from "next";
import HttpStatusCode from "../../../../httpCodes";
import { ServerInstance } from "../../../../components/OnServer";
import { getStripeInfoFromToken } from "./authentication";

const getInfo: NextApiHandler = async (req, res) => {
  const stripe = await getStripeInfoFromToken(req);
  if (stripe) {
    const customer = await ServerInstance.stripe.customers.retrieve(stripe.stripeId);
    res.status(200).json(customer);
    return;
  } else {
    res.status(HttpStatusCode.NO_CONTENT).end();
    return;
  }
};

const update: NextApiHandler = async (req, res) => {
  const stripe = await getStripeInfoFromToken(req);
  if (stripe) {
    const customer = await ServerInstance.stripe.customers.retrieve(stripe.stripeId);
    res.status(200).end();
    return;
  } else {
    res.status(HttpStatusCode.NO_CONTENT).end();
    return;
  }
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getInfo(req, res);
      break;
    case "POST":
      await update(req, res);
      break;
    default:
      res.status(HttpStatusCode.BAD_REQUEST).end();
      break;
  }
};

export default handler;
