// actions/generate-api-key.js
"use server";

import { revalidatePath } from "next/cache";
import { createProjectAndChannel } from "@/actions/create-project-and-channel"; // Import the function

import { Unkey } from "@unkey/api";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import { generateApiKey } from "../lib/crypto";

export async function generateAndSaveApiKey() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!process.env.UNKEY_ROOT_KEY) {
    console.error("UNKEY_ROOT_KEY environment variable is not set.");
    return {
      success: false,
      error: "UNKEY_ROOT_KEY environment variable is not set.",
    };
  }

  const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY });

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  const { result } = await unkey.keys.create({
    apiId: "api_3Sw97gepmEHFKTepgM5GaFxy8cWG",
    prefix: "ding",
    ownerId: userId,
    ratelimit: {
      type: "fast",
      limit: 10,
      refillRate: 1,
      refillInterval: 1000,
    },
    enabled: true,
  });

  if (!result) {
    console.error("Error creating API key.");
    return { success: false, error: "Error creating API key." };
  }

  const apiKey = result.key;

  console.log(`Generated API key for user ID: ${userId}. API Key: ${apiKey}`);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { apiKey },
    });
    console.log(`API key saved successfully for user ID: ${userId}.`);

    // Create a new project and channel
    const projectResponse = await createProjectAndChannel("Project1");
    if (!projectResponse.success) {
      throw new Error(projectResponse.error);
    }

    console.log(
      `Project and channel created successfully for user ID: ${userId}.`,
    );

    revalidatePath("/dashboard");

    return {
      success: true,
      user: updatedUser,
      apiKey,
      project: projectResponse.project,
      channel: projectResponse.channel,
    };
  } catch (error) {
    console.error(`Error saving API key for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
