// actions/create-event.js
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function createEvent(data) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { channel, name, user_id, icon, notify } = data;

  if (!channel || !name || !user_id || !icon) {
    throw new Error("All fields are required");
  }

  // Ensure that the projectId is the user's ID or obtain it appropriately
  const project = await prisma.project.findFirst({
    where: { userId: user.id },
  });

  if (!project) {
    throw new Error("Project not found for the authenticated user");
  }

  // Ensure the channel is unique within the project
  const upsertChannel = await prisma.channel.upsert({
    where: {
      projectId_name: {
        projectId: project.id,
        name: channel,
      },
    },
    update: {},
    create: {
      name: channel,
      projectId: project.id,
    },
  });

  const newEvent = await prisma.event.create({
    data: {
      name,
      userId: user_id,
      icon,
      notify,
      tags: {}, // Provide an empty object or handle this according to your schema
      channelId: upsertChannel.id,
    },
  });

  return { success: true, event: newEvent };
}
