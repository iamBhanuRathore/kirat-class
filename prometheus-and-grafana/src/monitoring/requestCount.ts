// Defining a counter
import { NextFunction, Request, Response } from "express";
import { Counter } from "prom-client";

const requestCounter = new Counter({
  name: "request_count",
  help: "Total request count",
  labelNames: ["method", "route", "status_code"],
});

// Middleware to count the number of requests
export const requestCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Start time of the request
  const startTime = Date.now();
  res.on("close", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}msS`);
    requestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });
  next();
};
