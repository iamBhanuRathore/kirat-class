import { NextFunction, Request, Response } from "express";
import { Histogram } from "prom-client";

const requestTimeHistogram = new Histogram({
  name: "http_request_duration_ms",
  help: "Duration of https request in ms.",
  labelNames: ["method", "route", "status_code"],
  buckets: [
    1, 5, 10, 20, 50, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000, 3000,
    10000,
  ],
});

export const requestTime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  res.on("close", () => {
    const endTime = Date.now();
    const timeDiff = endTime - startTime;
    requestTimeHistogram.observe(
      {
        method: req.method,
        route: req.path,
        status_code: res.statusCode,
      },
      timeDiff
    );
  });
  next();
};
