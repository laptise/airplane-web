import { NextApiHandler } from "next";
import { ServerInstance } from "../../../../components/OnServer";
import { setCookie } from "nookies";

const handler: NextApiHandler = async (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();
  console.log("idToekn", idToken);
  //   const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  //   if (csrfToken !== req.cookies.csrfToken) {
  //     res.status(401).send("UNAUTHORIZED REQUEST!");
  //     return;
  //   }
  // Set session expiration to 5 days.
  const expiresIn = 1000 * 60 * 60 * 24 * 5;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  await ServerInstance.firebase
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
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
      },
      (error) => {
        console.error("going crazy");
        res.status(401).send("UNAUTHORIZED REQUEST!");
        return;
      }
    )
    .catch((e) => {
      console.error(e);
    });
};
export default handler;
