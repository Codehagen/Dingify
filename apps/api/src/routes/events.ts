import { Hono } from "hono";

import { Env } from "../env";
import { prisma } from "../lib/db";
import { parsePrismaError } from "../lib/parsePrismaError";
import { sendDiscordNotification } from "../notifications/discord/sendDiscordNotification";
import { EventSchema } from "../validators";

const events = new Hono<{
  Bindings: Env;
}>();

// POST - Create Event
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
    const { channel, name, icon, notify, tags, user_id } = eventData;

    // Find the user's project
    const project = await prisma(c.env).project.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!project) {
      return c.json(
        {
          ok: false,
          message:
            "No projects found for this user. Ensure the user has projects created.",
        },
        404,
      );
    }

    // Find the channel by name
    const channelExists = await prisma(c.env).channel.findFirst({
      where: {
        name: channel,
        projectId: project.id,
      },
    });

    if (!channelExists) {
      const availableChannels = await prisma(c.env).channel.findMany({
        where: { projectId: project.id },
        select: { name: true },
      });

      const channelNames = availableChannels.map((ch) => ch.name).join(", ");

      return c.json(
        {
          ok: false,
          message: `No channel found with the provided channel name. You need to add it on the website. These are your available channels: ${channelNames}`,
          availableChannels: availableChannels.map((ch) => ch.name),
        },
        404,
      );
    }

    // Create the event
    const savedEvent = await prisma(c.env).event.create({
      data: {
        name: name || "",
        channelId: channelExists.id,
        userId: user_id,
        icon: icon || "",
        notify,
        tags: tags || {},
      },
    });

    await sendDiscordNotification(`New event logged: ${name}`);

    return c.json(
      { ok: true, message: "Event logged!", event: savedEvent },
      201,
    ); // Return 201 status code
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

// GET - Retrieve Events
events.get("/", async (c) => {
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
    console.log("User ID for event retrieval:", user.id); // Log the user ID

    // Find projects for the user
    const projects = await prisma(c.env).project.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (projects.length === 0) {
      return c.json(
        {
          ok: false,
          message: "No projects found for this user.",
        },
        404,
      );
    }

    const projectIds = projects.map((project) => project.id);

    // Find channels in those projects
    const channels = await prisma(c.env).channel.findMany({
      where: {
        projectId: { in: projectIds },
      },
      select: {
        id: true,
      },
    });

    if (channels.length === 0) {
      return c.json(
        {
          ok: false,
          message: "No channels found in the user's projects.",
        },
        404,
      );
    }

    const channelIds = channels.map((channel) => channel.id);

    // Retrieve events for those channels
    const events = await prisma(c.env).event.findMany({
      where: {
        channelId: { in: channelIds },
      },
    });

    console.log("Retrieved events:", events); // Log the retrieved events

    return c.json({ ok: true, events });
  } catch (error: any) {
    console.error("Failed to retrieve events:", error);
    return c.json(
      {
        ok: false,
        message: "Failed to retrieve events",
        error: error.message || "Unknown error",
      },
      500,
    );
  }
});

export default events;
