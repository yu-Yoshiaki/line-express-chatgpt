import { Router } from "express";
import https from "https";
const TOKEN = process.env.LINE_ACCESS_TOKEN;

const router = Router();

router.get("/", (_, res) => {
  res.status(200).send("ok");
});

router.post("/", (req, res) => {
  res.status(200).send("webhook POST successed");
  if (req.body.events[0].type === "message") {
    const dataString = JSON.stringify({
      // 応答トークンを定義
      replyToken: req.body.events[0].replyToken,
      // 返信するメッセージを定義
      messages: [
        {
          type: "text",
          text: "Hello, user",
        },
      ],
    });

    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: dataString,
    };

    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // エラーをハンドリング
    // request.onは、APIサーバーへのリクエスト送信時に
    // エラーが発生した場合にコールバックされる関数です。
    request.on("error", (err) => {
      console.error(err);
    });

    // 最後に、定義したリクエストを送信
    request.write(dataString);
    request.end();
  }
});

export default router;
