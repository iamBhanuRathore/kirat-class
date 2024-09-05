import { describe, it, expect, vi } from "vitest";
import request from "supertest";
// We do this to mock some other functionality which we are not testing
vi.mock("../db");
import app from "..";
import { db } from "../__mocks__/db";
describe("POST /sum", () => {
  it("Should return the result 2+2", async () => {
    // If we dont do this then we cant get the value which is recieved from the mocked function
    db.calculation.create.mockResolvedValue({
      id: 1,
      a: 2,
      b: 2,
      result: 4,
    });
    // If will put a listener on the thing which we are doing in the mocking step
    vi.spyOn(db.calculation, "create");
    const res = await request(app).post("/sum").send({
      a: 2,
      b: 2,
    });
    // Check the main function is called with the correct inputs
    expect(db.calculation.create).toHaveBeenCalledWith({
      data: {
        a: 2,
        b: 2,
        result: 4,
      },
    });
    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBe(4);
  });
});
