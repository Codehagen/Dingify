// projects.ts
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
// import { CreateProjectRequest } from "../validators";

const prisma = new PrismaClient();
const projects = new Hono();

projects.post("/", async (c) => {
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

  const result = await c.req.json();

  if (!result.success) {
    return c.json(
      {
        ok: false,
        message: "Invalid project data",
        errors: result.error.issues,
      },
      400
    );
  }

  const { name } = result.data;

  const projectExists = await prisma.project.findFirst({
    where: {
      name,
      userId: user.id,
    },
  });

  if (projectExists) {
    return c.json(
      { ok: false, message: "Project with this name already exists" },
      409
    );
  }

  const project = await prisma.project.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return c.json({ ok: true, message: "Project created", project });
});

projects.get("/", async (c) => {
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

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!projects || projects.length === 0) {
    return c.json({ ok: false, message: "No projects found" }, 404);
  }

  return c.json({ ok: true, projects });
});

export default projects;
