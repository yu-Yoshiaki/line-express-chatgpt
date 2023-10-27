import express, { Router } from "express";
import helmet from "helmet";
import gptRoute from "./routes/gpt";
require("dotenv").config();
const app = express();

// 環境変数の確認。なければサーバーを止める。
if (!process.env.LINE_ACCESS_TOKEN) {
  console.error("環境変数LINE_ACCESS_TOKENが設定されていません！");
  process.exit(); // サーバーとめる
}

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
