import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  console.log("test");
  res.status(200).send("ok");
});

export default router;
