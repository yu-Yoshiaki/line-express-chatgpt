"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const cors = require("cors");
require("dotenv").config();
const app = (0, express_1.default)();
// 環境変数の確認。なければサーバーを止める。
if (!process.env.LINE_ACCESS_TOKEN) {
    console.error("環境変数LINE_ACCESS_TOKENが設定されていません！");
    process.exit(); // サーバーとめる
}
app.use(cors());
// parse json request body
app.use(express_1.default.json({ limit: "50mb" }));
// set security HTTP headers
app.use((0, helmet_1.default)());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
const router = (0, express_1.Router)();
app.get("/", (req, res) => {
    res.sendStatus(200);
});
// 全てのルートを /api/v1/ 以下にする
app.use("/api/v1", router);
router.use("/webhook", webhook_1.default);
exports.default = app;
