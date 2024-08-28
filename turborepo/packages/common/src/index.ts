import { z } from "zod";

export const myType = z.object({
  name: z.string(),
  age: z.number(),
});

export const theString = "Hello Guyzz";
