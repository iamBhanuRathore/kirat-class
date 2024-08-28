import { describe, it, expect, vi } from "vitest";
import request from "supertest";
vi.mock("../db");
import app from "..";
describe("POST /sum", () => {
  it("Should return the result 2+2", async () => {
    const res = await request(app).post("/sum").send({
      a: 2,
      b: 2,
    });
    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(4);
  });
});
