import express, { Router } from "express";
import helmet from "helmet";
import webhookRoute from "./routes/webhook";
import { checkSignature } from "./middlewares/check-sign";
const cors = require("cors");

const app = express();

// 環境変数の確認。なければサーバーを止める。
if (
  !process.env.LINE_ACCESS_TOKEN ||
  !process.env.OPENAI_API_KEY ||
  !process.env.LINE_SECRET
) {
  console.error("環境変数が設定されていません！");
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
// check signature from LINE or not
app.use("/api/v1", checkSignature, router);

router.use("/webhook", webhookRoute);

export default app;
