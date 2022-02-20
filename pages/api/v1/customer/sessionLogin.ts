import { NextApiHandler } from "next";
import { ServerInstance } from "../../../../components/OnServer";
import { setCookie } from "nookies";
import HttpStatusCode from "../../../../httpCodes";

const handler: NextApiHandler = async (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();

  //   const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  //   if (csrfToken !== req.cookies.csrfToken) {
  //     res.status(401).send("UNAUTHORIZED REQUEST!");
  //     return;
  //   }
  // Set session expiration to 5 days.
  const expiresIn = 1000 * 60 * 60 * 24 * 5;
  const auth = ServerInstance.firebase.auth();
  const uid = await auth.verifyIdToken(idToken).then((v) => v.uid);
  const user = await ServerInstance.userColRef.doc(uid).get();
  await auth.setCustomUserClaims(uid, { isPremium: user.data().isPremium });
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn }).catch((e) => {
    res.status(HttpStatusCode.UNAUTHORIZED).send("UNAUTHORIZED REQUEST!");
    throw "cookie generation failed";
  });
  // Set cookie policy for session cookie.
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    domain: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_DOMAIN : "",
    expiresIn: expiresIn / 1000,
  };
  setCookie({ res }, "__session", sessionCookie, options);
  res.status(200).send({ status: "success" });
  return;
};
export default handler;
