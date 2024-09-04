// define a counter
import { NextFunction, Request, Response } from "express";
import { Counter } from "prom-client";

const requestCounter = new Counter({
  name: "request_count",
  help: "Total request count",
  labelNames: ["method", "route", "status_code"],
});

export const requestCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}msS`);
    requestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: req.statusCode,
    });
  });
  next();
};
