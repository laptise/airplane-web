import { NextApiHandler } from "next";
import { ServerInstance } from "../../../../components/OnServer";
import { setCookie } from "nookies";
import HttpStatusCode from "../../../../httpCodes";

const handler: NextApiHandler = async (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.cookies.__session;
  //   const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  //   if (csrfToken !== req.cookies.csrfToken) {
  //     res.status(401).send("UNAUTHORIZED REQUEST!");
  //     return;
  //   }
  // Set session expiration to 5 days.
  const auth = ServerInstance.firebase.auth();
  const uid = await auth.verifySessionCookie(idToken, true).then((v) => v.uid);
  const user = await ServerInstance.userColRef.doc(uid).get();
  const userData = user.data();
  if (!userData) throw "no user data";
  await auth.setCustomUserClaims(uid, userData);
  // const claim = await auth.verifyIdToken(idToken);
  res.status(200).json(user.data());
  return;
};
export default handler;
