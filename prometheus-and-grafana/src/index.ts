import express from "express";
import { requestCount } from "./monitoring/requestCount";
import { register } from "prom-client";
import { activeRequest } from "./monitoring/activeRequest";
import { requestTime } from "./monitoring/requestTime";
const app = express();

app.use(express.json());
app.use(requestCount);
app.use(activeRequest);
app.use(requestTime);
app.get("/post", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.json({
    name: "bhanu",
  });
});

app.get("/metrics", async (req, res) => {
  const metrics = await register.metrics();
  res.set("Content-Type", register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  console.log("Server is running");
});
/*
    Command to run docker
    - docker run -p 9090:9090 -v /prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
*/
