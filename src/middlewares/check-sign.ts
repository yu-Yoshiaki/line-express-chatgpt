import { NextFunction, Request, Response } from "express";
const crypto = require("crypto");

const channelSecret = process.env.LINE_SECRET; // Channel secret string

// リクエストがLINEプラットフォームから送られたことを確認するために、
// ボットサーバーでリクエストヘッダーのx-line-signatureに含まれる署名を検証します。
export const checkSignature = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const signature = req.headers["x-line-signature"];

  if (!signature) {
    next(new Error("署名が見つかりません。"));
  }

  try {
    const hash = crypto
      .createHmac("sha256", channelSecret)
      .update(JSON.stringify(req.body), "utf8")
      .digest("base64");

    if (signature !== hash) {
      next(new Error("署名が一致しません。"));
    }

    next();
  } catch (e: any) {
    next(new Error(e));
  }
};
