import { env } from "process";
import ngrok from "@ngrok/ngrok";

type ExpressServer = any;
export const setupIngress = async (app: ExpressServer) => {
  // create session
  const session = await new ngrok.SessionBuilder()
    .authtokenFromEnv() // env.NGROK_AUTHTOKEN
    .connect();

  // create listener
  const listener = await session
    .httpEndpoint()
    .domain(env.OAUTH_DOMAIN!) // https://ngrok.com/blog-post/free-static-domains-ngrok-users
    .oauth(env.OAUTH_PROVIDER ?? "google")
    .listen();
  console.log(listener.url());

  // link listener to app
  return ngrok.listen(app, listener);
};
