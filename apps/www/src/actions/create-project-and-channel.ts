"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function createProjectAndChannel(projectName) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    // Create the new project
    const newProject = await prisma.project.create({
      data: {
        name: projectName,
        userId: userId,
      },
    });

    // Create a new channel with a default name
    const newChannel = await prisma.channel.create({
      data: {
        name: "new-channel-name",
        projectId: newProject.id,
      },
    });

    console.log(
      `Project and channel created successfully for user ID: ${userId}.`,
    );
    return { success: true, project: newProject, channel: newChannel };
  } catch (error) {
    console.error(
      `Error creating project and channel for user ID: ${userId}`,
      error,
    );
    return { success: false, error: error.message };
  }
}
