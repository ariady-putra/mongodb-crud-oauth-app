require("dotenv").config();

//#region Init Configs
import { env } from "process";

const port = env.HOSTED ? parseInt(env.PORT!) : 60884;

// static frontend files
const frontendDir = env.FRONTEND_DIR ?? "../..";
const frontendBuildDir = env.FRONTEND_BUILD_DIR ?? "dist";
const frontendBuildHTMLfile = env.FRONTEND_BUILD_HTML_FILE ?? "index.html";
//#endregion

//#region SettingUp Server
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
//#endregion

//#region Serving static frontend files
import path from "path";

const frontendBuildPath = path.join(__dirname, frontendDir, frontendBuildDir);
const frontendHTMLpath = path.join(frontendBuildPath, frontendBuildHTMLfile);

// Serve static files from the frontend
app.use(express.static(frontendBuildPath));
//#endregion

//#region StartingUp Server
import { Listener } from "@ngrok/ngrok";
import { setupIngress } from "./oauth";

let ngrokListener: Listener;
const socket = app.listen(port, () => {
  if (!env.HOSTED) console.log(`http://localhost:${port}`);
  console.log({ express: socket.address() });

  // OAuth 2.0
  setupIngress(app).then((listener) => (ngrokListener = listener));
});
//#endregion

//#region Handle API requests
import * as api from "./handler";

const serveFrontend = (req: Request, rsp: Response) => rsp.sendFile(frontendHTMLpath);
const notAllowed = (req: Request, rsp: Response) =>
  rsp
    .status(405)
    .appendHeader("Allow", "GET")
    .json({ status: 405, error: `${req.method} ${req.path} not allowed` });

app.get("/api/vinyl-records", api.getAllVinylRecords);

app.get("/api/vinyl-record/:id", api.getVinylRecordByID);
app.post("/api/vinyl-record", api.postVinylRecord);
app.put("/api/vinyl-record/:id", api.putVinylRecordByID);
app.delete("/api/vinyl-record/:id", api.deleteVinylRecordByID);

app.get("*", serveFrontend);
app.all("*", notAllowed);
//#endregion

//#region Graceful ShutDown
const attempt = (action: () => void) => {
  try {
    action();
  } catch (error) {
    console.log({ error });
  }
};

import mongoose from "mongoose";
import ngrok from "@ngrok/ngrok";

process.on("SIGINT", () => {
  attempt(() => mongoose.disconnect());

  attempt(() => ngrokListener.close());
  attempt(() => ngrok.disconnect());

  process.exit();
});
//#endregion
