// app.tsと分けたのは、テストをしやすいから。
import { NextFunction, Request, Response } from "express";
require("dotenv").config();
import app from "./app";

const port = 5000;

const errorMiddleware = (
  _: any,
  __: Request,
  res: Response,
  ___: NextFunction
) => {
  res.status(500).send("Error");
};

// エラーハンドリングミドルウェアの実装
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Application listening at ${port}`);
});
