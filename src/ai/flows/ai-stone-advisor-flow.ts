'use server';
/**
 * @fileoverview AI-powered stone advisor flow.
 */

import {ai} from '@/ai/genkit';
import {products} from '@/lib/data';
import {Product} from '@/lib/types';
import {z} from 'zod';

const StoneAdvisorInputSchema = z.object({
  projectType: z.string().describe('Type of project (e.g., kitchen countertop, hotel lobby flooring)'),
  desiredAesthetic: z.string().describe('Desired look and feel (e.g., modern, rustic, luxurious)'),
  functionalRequirements: z.string().describe('Functional needs (e.g., high durability, low maintenance, heat resistant)'),
});

export type StoneAdvisorInput = z.infer<typeof StoneAdvisorInputSchema>;

const StoneSuggestionSchema = z.object({
  productId: z.string().describe('The ID of the suggested product.'),
  reasoning: z.string().describe('The reason why this stone is a good fit for the project.'),
});

const StoneAdvisorOutputSchema = z.object({
    suggestions: z.array(StoneSuggestionSchema).describe('A list of up to 3 suggested stones.'),
});

export type StoneAdvisorOutput = z.infer<typeof StoneAdvisorOutputSchema>;


const stoneAdvisorPrompt = ai.definePrompt({
    name: 'stoneAdvisorPrompt',
    input: { schema: StoneAdvisorInputSchema },
    output: { schema: StoneAdvisorOutputSchema },
    prompt: `You are an expert stone consultant for Saalim Stone.
Your goal is to provide personalized stone recommendations to architects and designers based on their project needs.

Analyze the user's requirements below and suggest up to 3 suitable stones from the available product list. For each suggestion, provide a clear and concise reasoning that connects the stone's properties to the user's needs.

**Available Products:**
\`\`\`json
${JSON.stringify(products.map(p => ({id: p.id, name: p.name, category: p.category, color: p.color, finish: p.finish, description: p.description, pricePerSqFt: p.pricePerSqFt})))}
\`\`\`

**User Requirements:**
- Project Type: {{projectType}}
- Desired Aesthetic: {{desiredAesthetic}}
- Functional Requirements: {{functionalRequirements}}

Provide your suggestions in the specified JSON format.
`,
});


const stoneAdvisorFlow = ai.defineFlow(
    {
        name: 'stoneAdvisorFlow',
        inputSchema: StoneAdvisorInputSchema,
        outputSchema: StoneAdvisorOutputSchema,
    },
    async (input) => {
        const {output} = await stoneAdvisorPrompt(input);
        return output!;
    }
);

export async function getAIStoneAdvice(input: StoneAdvisorInput): Promise<StoneAdvisorOutput> {
    return await stoneAdvisorFlow(input);
}
