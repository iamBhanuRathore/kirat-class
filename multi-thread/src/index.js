import express from "express";
import cluster from "cluster";
import os from "os";

const totalCpus = os.cpus().length;

const port = 3000;

// If its the main thread then this thread is only used for the running the other thread
if (cluster.isPrimary) {
  console.log("Primary thread, id: ", process.pid);
  console.log({ totalCpus });

  // fork workers
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
  // If any forked cluster is stopped / exited then we have to create a new fork
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker} died with code: ${code} signal: ${signal}}`);
    cluster.fork();
  });
} else {
  //   if its not the main thread then we have to run our node js project
  const app = express();
  app.get("/", (req, res) => {
    return res.json({
      success: true,
      thredId: process.pid,
    });
  });
  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n) || 10000000;
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }
    res.send(`Final count is ${count} ${process.pid}`);
  });
  app.listen(port, () => {
    console.log("Server is Running thred Id: " + process.pid);
  });
}
