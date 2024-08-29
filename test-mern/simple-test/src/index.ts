import express from "express";
import { db } from "./db";
const app = express();

app.use(express.json());
app.post("/sum", async (req, res) => {
  const { a, b } = req.body as { a: number; b: number };
  let result = a + b;
  let data = await db.calculation.create({
    data: {
      a,
      b,
      result,
    },
  });
  return res.json({
    success: true,
    a: true,
    result,
    data,
  });
});

export default app;
