import { Router } from "express";
import https from "https";
import { getAnswer } from "../libs/getAnswerFromGPT";

const router = Router();

router
  .route("/")
  .get((_, res) => {
    res.status(200).send("ok");
  })
  .post(async (req, res) => {
    const TOKEN = process.env.LINE_ACCESS_TOKEN;
    res.status(200).send("webhook POST successed");

    if (req.body.events[0].type === "message" && TOKEN) {
      const message = req.body.events[0].message.text; // LINEから送られてきたメッセージ
      const answer = await getAnswer(message);

      let dataString = JSON.stringify({
        // 応答トークンを定義
        replyToken: req.body.events[0].replyToken,
        // 返信するメッセージを定義
        messages: [
          {
            type: "text",
            text: answer,
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

      // エラーハンドリング
      // request.onは、APIサーバーへのリクエスト送信時に
      // エラーが発生した場合にコールバックされる関数です。
      request.on("error", (err) => {
        console.error("ERROR: ", err);
      });

      // 最後に、定義したリクエストを送信
      request.write(dataString);
      request.end();
    }
  });

export default router;
