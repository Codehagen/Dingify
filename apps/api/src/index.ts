import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";

import channels from "./routes/channels";
import events from "./routes/events";
import projects from "./routes/projects";
import users from "./routes/users";

const prisma = new PrismaClient();
const app = new Hono();

app.use("/api/*", async (c, next) => {
  // Skip API key check for user registration endpoint
  if (c.req.path === "/api/users" && c.req.method === "POST") {
    return next();
  }

  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  const user = await prisma.user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  return next();
});

// Routes //
app.route("/api/users", users);
app.route("/api/projects", projects);
app.route("/api/channels", channels);
app.route("/api/events", events);

export default app;
