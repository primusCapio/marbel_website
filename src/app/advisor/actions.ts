'use server';

import { aiStoneAdvisor, type AiStoneAdvisorInput, type AiStoneAdvisorOutput } from '@/ai/flows/ai-stone-advisor-flow';

export async function getStoneAdvice(input: AiStoneAdvisorInput): Promise<AiStoneAdvisorOutput | { error: string }> {
  try {
    const result = await aiStoneAdvisor(input);
    return result;
  } catch (e) {
    console.error('AI Stone Advisor Error:', e);
    return { error: 'An unexpected error occurred while generating advice. Please try again later.' };
  }
}
