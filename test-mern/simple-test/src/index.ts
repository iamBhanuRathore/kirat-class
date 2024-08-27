import express from "express";
const app = express();
app.use(express.json());
app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  let ans = a + b;
  res.json({
    success: true,
    ans,
  });
});

export default app;
