import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "..";

describe("POST /sum", () => {
  it("should return 2 + 1 equals 3", async () => {
    const response = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    // console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.ans).toBe(3);
  });
});
