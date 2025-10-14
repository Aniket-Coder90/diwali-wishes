
"use server";

import { generateDiwaliWish, type DiwaliWishInput } from "@/ai/flows/personalized-diwali-wishes";

export async function createWishAction(input: DiwaliWishInput) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { wish: null, error: "The Google AI API key is not configured. Please add it to your .env file." };
    }
    const result = await generateDiwaliWish(input);
    return { wish: result.wish, error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
      return { wish: null, error: "The provided API key is not valid. Please check your key and try again." };
    }
    return { wish: null, error: "Failed to generate wish. Please try again." };
  }
}
