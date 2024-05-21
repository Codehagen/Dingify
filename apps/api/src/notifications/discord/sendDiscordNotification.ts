// Function to send a message to Discord
export async function sendDiscordNotification(message: string) {
  try {
    const response = await fetch(
      "https://discord.com/api/webhooks/1230980816327151636/bSR8-qI0u0e4l8b03sEKtT6435dl04hkwTcZA4ab5WAeYOCF3xOjQOW7vwEgAX_QICI4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      }
    );
    if (!response.ok) {
      console.error("Failed to send Discord notification");
    }
  } catch (error) {
    console.error("Error sending notification to Discord:", error);
  }
}
