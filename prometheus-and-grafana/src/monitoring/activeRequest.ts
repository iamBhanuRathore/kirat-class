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
  res.on("finish", () => {
    activeUserGuage.dec();
  });
  next();
};
