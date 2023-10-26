// app.tsと分けたのは、テストをしやすいから。
import { NextFunction, Request, Response } from "express";
import app from "./app";

const port = 5000;

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error");
  // throw new Error("From middleware");
  res.status(500).send("Error");
};

// エラーハンドリングミドルウェアの実装
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Application listening at ${port}`);
});
