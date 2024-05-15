// actions/generate-api-key.js
"use server";

import { prisma } from "@dingify/db";

import { getCurrentUser } from "@/lib/session";

import { generateApiKey } from "../lib/crypto";

import { Unkey } from "@unkey/api";

export async function generateAndSaveApiKey() {
	const user = await getCurrentUser();
	const userId = user?.id;

	const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY });

	if (!userId) {
		console.error("No user is currently logged in.");
		return { success: false, error: "User not authenticated" };
	}

	const {
		result: { key: apiKey },
	} = await unkey.keys.create({
		apiId: "api_3PkKmeLT2WeGsbRUVWH1YAZJK886",
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
