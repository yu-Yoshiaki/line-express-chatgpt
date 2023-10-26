import express, { Router } from "express";
import helmet from "helmet";
import gptRoute from "./routes/gpt";
require("dotenv").config();
const app = express();

const cors = require("cors");

app.use(cors());

// parse json request body
app.use(express.json({ limit: "50mb" }));
// set security HTTP headers
app.use(helmet());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const router = Router();
app.get("/", (req, res) => {
  res.sendStatus(200);
});

// 全てのルートを /api/v1/ 以下にする
app.use("/api/v1", router);

router.use("/webhook", gptRoute);

export default app;
