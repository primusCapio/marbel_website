'use server';
/**
 * @fileOverview An AI Stone Advisor that provides personalized recommendations for marble, granite, or Kota stone based on user inputs.
 *
 * - aiStoneAdvisor - A function that handles the stone recommendation process.
 * - AiStoneAdvisorInput - The input type for the aiStoneAdvisor function.
 * - AiStoneAdvisorOutput - The return type for the aiStoneAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStoneAdvisorInputSchema = z.object({
  projectType: z
    .string()
    .describe(
      'The type of project (e.g., kitchen countertop, bathroom flooring, outdoor patio, wall cladding).'
    ),
  desiredAesthetic: z
    .string()
    .describe(
      'The desired aesthetic or style (e.g., modern minimalist, classic elegant, rustic, industrial, luxurious).'
    ),
  functionalRequirements: z
    .array(z.string())
    .describe(
      'A list of functional requirements (e.g., high durability, stain resistance, heat resistance, slip resistance, low maintenance, light reflection, scratch resistance).'
    ),
  additionalNotes: z
    .string()
    .optional()
    .describe('Any additional notes or specific preferences the user might have.'),
});
export type AiStoneAdvisorInput = z.infer<typeof AiStoneAdvisorInputSchema>;

const AiStoneAdvisorOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        stoneName: z
          .string()
          .describe(
            'The common name of the recommended stone (e.g., Carrara Marble, Black Galaxy Granite, Brown Kota Stone).'
          ),
        stoneCategory: z
          .enum(['Marble', 'Granite', 'Kota Stone'])
          .describe('The category of the recommended stone.'),
        reasoning: z
          .string()
          .describe(
            "A detailed explanation of why this stone is recommended based on the user's input, highlighting how it meets the project type, aesthetic, and functional requirements."
          ),
        keyProperties: z
          .array(z.string())
          .describe(
            "List of key properties or benefits of this stone relevant to the user's needs."
          ),
        considerations: z
          .array(z.string())
          .describe(
            'List of important considerations or potential drawbacks for this stone.'
          ),
      })
    )
    .describe('An array of recommended stone types with detailed information.'),
});
export type AiStoneAdvisorOutput = z.infer<typeof AiStoneAdvisorOutputSchema>;

export async function aiStoneAdvisor(
  input: AiStoneAdvisorInput
): Promise<AiStoneAdvisorOutput> {
  return aiStoneAdvisorFlow(input);
}

const aiStoneAdvisorPrompt = ai.definePrompt({
  name: 'aiStoneAdvisorPrompt',
  input: {schema: AiStoneAdvisorInputSchema},
  output: {schema: AiStoneAdvisorOutputSchema},
  prompt: `You are an expert AI Stone Advisor specialized in marble, granite, and Kota stone. Your task is to provide personalized recommendations for optimal stone types based on a user's project details, desired aesthetic, and functional requirements.

Analyze the provided information and suggest up to 3 stone types from Marble, Granite, or Kota Stone that best suit the user's needs. For each recommendation, provide a detailed reasoning, list key properties, and important considerations/drawbacks.

Ensure your recommendations are practical, considering both aesthetic appeal and functional performance for the specified project.

User Input:
Project Type: {{{projectType}}}
Desired Aesthetic: {{{desiredAesthetic}}}
Functional Requirements: {{{functionalRequirements}}}
{{#if additionalNotes}}Additional Notes: {{{additionalNotes}}}{{/if}}

Please provide your recommendations in a structured JSON format as described in the output schema.`,
});

const aiStoneAdvisorFlow = ai.defineFlow(
  {
    name: 'aiStoneAdvisorFlow',
    inputSchema: AiStoneAdvisorInputSchema,
    outputSchema: AiStoneAdvisorOutputSchema,
  },
  async input => {
    const {output} = await aiStoneAdvisorPrompt(input);
    return output!;
  }
);
