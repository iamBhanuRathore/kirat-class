import { PrismaClient } from "@prisma/client";
// import {} from "vitest";

import { mockDeep } from "vitest-mock-extended";

export const db = mockDeep<PrismaClient>();
