"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const https_1 = __importDefault(require("https"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get((_, res) => {
    res.status(200).send("ok");
})
    .post((req, res) => {
    const TOKEN = process.env.LINE_ACCESS_TOKEN;
    res.status(200).send("webhook POST successed");
    if (req.body.events[0].type === "message" && TOKEN) {
        let replyMessage = "Hello, user";
        if (req.body.events[0].message.text === "こんにちは") {
            replyMessage = "こんにちは、ユーザーさん";
        }
        if (req.body.events[0].message.text.includes("おは")) {
            replyMessage = "おはよう、ユーザーさん";
        }
        // TODO: cahtgptに投げて、返ってきたメッセージを返す
        let dataString = JSON.stringify({
            // 応答トークンを定義
            replyToken: req.body.events[0].replyToken,
            // 返信するメッセージを定義
            messages: [
                {
                    type: "text",
                    text: replyMessage, // chatgptからの返答を入れる
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
        const request = https_1.default.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d);
            });
        });
        // エラーをハンドリング
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
exports.default = router;
