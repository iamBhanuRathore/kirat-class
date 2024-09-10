// Defining a counter
import { NextFunction, Request, Response } from "express";
import { Gauge } from "prom-client";

// Because we want to monitor the number of active requests on all of the routes
const activeUserGuage = new Gauge({
  name: "active_user_gauge",
  help: "Total active user",
  // labelNames: ["method", "route"], // If we do this, we can't monitor the number of active requests on all of the routes
});

// Middleware to count the number of requests
export const activeRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  activeUserGuage.inc();
  console.log("Increase" + req.path);
  // Ensure we only decrement once, regardless of which event fires first
  const decrementActiveUsers = () => {
    console.log("Decrease" + req.path);
    activeUserGuage.dec();
  };

  // Listen to either finish or close, but not both
  //   res.on("finish", () => {
  //     console.log("Decrease: ", req.path, "Finish");
  //     activeUserGuage.dec();
  //   });
  res.on("close", () => {
    console.log("Decrease: ", req.path, "close");
    activeUserGuage.dec();
  });
  //   res.on("error", () => {
  //     console.log("Decrease: ", req.path, "error");
  //     activeUserGuage.dec();
  //   });
  next();
};
