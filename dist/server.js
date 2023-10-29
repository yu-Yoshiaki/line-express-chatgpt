"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = __importDefault(require("./app"));
const port = 5000;
const errorMiddleware = (_, __, res, ___) => {
    res.status(500).send("Error");
};
// エラーハンドリングミドルウェアの実装
app_1.default.use(errorMiddleware);
app_1.default.listen(port, () => {
    console.log(`Application listening at ${port}`);
});
