import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

export async function apiKeyMiddleware(c: any, next: any) {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  const user = await prisma.user.findUnique({ where: { apiKey } });
  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  // Store user in context for downstream use
  c.set("user", user);
  return next();
}
