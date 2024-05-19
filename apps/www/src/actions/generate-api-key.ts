// actions/generate-api-key.js
"use server";

// import { prisma } from "@dingify/db";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import { generateApiKey } from "../lib/crypto";

export async function generateAndSaveApiKey() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  const apiKey = generateApiKey();

  console.log(`Generated API key for user ID: ${userId}. API Key: ${apiKey}`);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { apiKey },
    });
    console.log(`API key saved successfully for user ID: ${userId}.`);
    return { success: true, user: updatedUser, apiKey };
  } catch (error) {
    console.error(`Error saving API key for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
