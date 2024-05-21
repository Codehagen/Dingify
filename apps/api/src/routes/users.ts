// users.ts
import { Hono } from "hono";

import { generateApiKey } from "../lib/generateApiKey";
import { parsePrismaError } from "../lib/parsePrismaError";
import { UserSchema } from "../zod";
import { Env } from "../env";
import { prisma } from "../lib/db";

const users = new Hono<{
  Bindings: Env;
}>();

// POST - Create User
users.post("/", async (c) => {
  const inputData = UserSchema.omit({
    id: true,
    events: true,
  }).parse(await c.req.json());
  const { email, name, plan } = inputData as Partial<User>;

  if (!email) {
    return c.json({ ok: false, message: "Missing required field: email" }, 400);
  }

  const apiKey = generateApiKey();

  try {
    const user = await prisma(c.env).user.upsert({
      where: { email },
      update: { name, plan },
      create: { email, name: name || "", plan: plan || "", apiKey },
    });
    return c.json({ ok: true, message: "User created", user });
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to create or update user",
        error: parsePrismaError(error),
      },
      500,
    );
  }
});

// GET - List all users
users.get("/", async (c) => {
  try {
    const users = await prisma(c.env).user.findMany();
    return c.json({ ok: true, users });
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to retrieve users",
        error: error.message || "Unknown error",
      },
      500,
    );
  }
});

export default users;
