import express from "express";
import { requestCount } from "./monitoring/requestCount";
import { register } from "prom-client";
const app = express();

app.use(express.json());
app.use(requestCount);
app.get("/post", (req, res) => {
  res.json({
    name: "bhanu",
  });
});
app.get("metrics", async (req, res) => {
  const metrics = await register.metrics();
  res.set("Content-Type", register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  console.log("Server is running");
});
