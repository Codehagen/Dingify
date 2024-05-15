// events.ts
import { Hono } from "hono";
import { sendDiscordNotification } from "../notifications/discord/sendDiscordNotification";
import { parsePrismaError } from "../lib/parsePrismaError";
import { EventSchema } from "../validators";
import { Env } from "../env";
import { prisma } from "../lib/db";

const events = new Hono<{
  Bindings: Env;
}>();

events.post("/", async (c) => {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  // Find user by API key
  const user = await prisma(c.env).user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  try {
    const eventData = EventSchema.parse(await c.req.json());

    // Destructure validated data
    const { channel, name, icon, notify, tags } = eventData;

    // Find the channel by name instead of ID
    const project = await prisma(c.env).project.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!project) {
      return c.json(
        {
          message:
            "No projects found for this user. Ensure the user has projects created.",
        },
        404,
      );
    }

    const channelExists = await prisma(c.env).channel.findFirst({
      where: {
        name: channel,
        projectId: project.id,
      },
    });

    if (!channelExists) {
      return c.json(
        {
          message:
            "No channel found with the provided channel name. You need to add it on the website",
        },
        404,
      );
    }

    if (!channelExists) {
      return c.json(
        {
          message:
            "No channel found with the provided channel name. You need to add it on the website",
        },
        404,
      );
    }

    // Create the event
    const savedEvent = await prisma(c.env).event.create({
      data: {
        name: name || "",
        channelId: channelExists.id,
        userId: user.id,
        icon: icon || "",
        notify,
        tags: tags || {},
      },
    });

    await sendDiscordNotification(`New event logged: ${name}`);

    return c.json({ ok: true, message: "Event logged!", event: savedEvent });
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to log event",
        error: parsePrismaError(error),
      },
      400,
    );
  }
});

events.get("/", async (c) => {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  const user = await prisma(c.env).user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  try {
    const events = await prisma(c.env).event.findMany({
      where: {
        userId: user.id,
      },
    });
    return c.json({ ok: true, events });
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to retrieve events",
        error: error.message || "Unknown error",
      },
      500,
    ); // Sending a 500 Internal Server Error status code
  }
});

export default events;
