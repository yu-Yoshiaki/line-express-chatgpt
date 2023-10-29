"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const https_1 = __importDefault(require("https"));
const getAnswerFromGPT_1 = require("../libs/getAnswerFromGPT");
const router = (0, express_1.Router)();
router
    .route("/")
    .get((_, res) => {
    res.status(200).send("ok");
})
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TOKEN = process.env.LINE_ACCESS_TOKEN;
    res.status(200).send("webhook POST successed");
    if (req.body.events[0].type === "message" && TOKEN) {
        const message = req.body.events[0].message.text; // LINEから送られてきたメッセージ
        const answer = yield (0, getAnswerFromGPT_1.getAnswer)(message);
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
        const request = https_1.default.request(webhookOptions, (res) => {
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
}));
exports.default = router;
