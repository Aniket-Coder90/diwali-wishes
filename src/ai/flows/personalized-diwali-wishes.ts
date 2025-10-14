
// src/ai/flows/personalized-diwali-wishes.ts
'use server';

/**
 * @fileOverview Generates personalized Diwali wishes in Gujarati using an AI tool.
 *
 * - generateDiwaliWish - A function that generates personalized Diwali wishes.
 * - DiwaliWishInput - The input type for the generateDiwaliWish function.
 * - DiwaliWishOutput - The return type for the generateDiwaliWish function.
 */

import { ai } from '@/ai/genkit';
import { z } from "zod";

const DiwaliWishInputSchema = z.object({
  name: z.string().describe('The name of the person sending the Diwali wish.'),
  relationship: z.string().describe('The relationship between the sender and recipient (e.g., friend, family member).'),
  customMessage: z.string().optional().describe('Any custom message or details to include in the wish.'),
});

export type DiwaliWishInput = z.infer<typeof DiwaliWishInputSchema>;

const DiwaliWishOutputSchema = z.object({
  wish: z.string().describe('The personalized Diwali wish message in Gujarati.'),
});

export type DiwaliWishOutput = z.infer<typeof DiwaliWishOutputSchema>;

const diwaliWishPrompt = ai.definePrompt({
  name: 'diwaliWishPrompt',
  input: { schema: DiwaliWishInputSchema },
  output: { schema: DiwaliWishOutputSchema },
  prompt: `You are an AI assistant specializing in creating personalized Diwali wishes in the GUJARATI language.

    Your task is to craft a heartfelt and creative Diwali wish in GUJARATI from {{name}}. This wish is meant to be shareable with many people.
    
    The wish must be:
    - In the GUJARATI language.
    - No more than 100 words.
    - Warm, festive, and unique.
    - Creative and not generic.
    - Include a creative reference to the festival of lights (e.g., "દીવાની જેમ," "ફટાકડાના ધડાકા કરતાં પણ વધુ તેજસ્વી").
    - Wish good health, wealth, and prosperity in a non-generic way.
    - If a custom message is provided, subtly weave it into the wish: {{{customMessage}}}
    
    Here are some examples of creative wishes in Gujarati:
    - "આ દિવાળીએ તમારું જીવન દીવાની જ્યોતની જેમ તેજસ્વી, રંગોળીની જેમ રંગીન બને અને આવનારા દરેક દિવસ સુખ અને સમૃદ્ધિથી ઝળહળી ઉઠે. પ્રકાશના આ પર્વની ખૂબ ખૂબ શુભેચ્છાઓ!"
    - "આશા છે કે આ દિવાળીએ પ્રગટાવેલો દરેક દીવો તમારા માટે સફળતા અને ખુશીનો નવો માર્ગ ખોલે. દિવાળીની ઝળહળતી શુભેચ્છાઓ!"
    - "તમે પ્રગટાવેલો દરેક દીવો તમારા ચહેરા પર ખુશીની ચમક લાવે અને તમારી આત્માને પ્રકાશિત કરે. દિવાળીની શુભકામનાઓ!"

    Now, create a new, general wish in GUJARATI. Be creative and avoid simple greetings.`,
});

const generateDiwaliWishFlow = ai.defineFlow(
  {
    name: 'generateDiwaliWishFlow',
    inputSchema: DiwaliWishInputSchema,
    outputSchema: DiwaliWishOutputSchema,
  },
  async (flowInput) => {
    const { output } = await diwaliWishPrompt(flowInput);
    return output!;
  },
);

export async function generateDiwaliWish(
  input: DiwaliWishInput,
): Promise<DiwaliWishOutput> {
  return generateDiwaliWishFlow(input);
}
