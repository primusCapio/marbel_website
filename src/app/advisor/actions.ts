'use server';

import { getAIStoneAdvice, StoneAdvisorInput } from "@/ai/flows/ai-stone-advisor-flow";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";

export interface AIResponse {
  suggestions: {
    product: Product;
    reasoning: string;
  }[];
  error?: string;
}

export async function runAIStoneAdvisor(
  input: StoneAdvisorInput
): Promise<AIResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set.");
      return { suggestions: [], error: "The AI Advisor is not configured. Please contact support." };
    }

    const result = await getAIStoneAdvice(input);
    
    const populatedSuggestions = result.suggestions.map(suggestion => {
      const product = products.find(p => p.id === suggestion.productId);
      return { product: product!, reasoning: suggestion.reasoning };
    }).filter(s => s.product); // Filter out any suggestions where the product wasn't found

    return { suggestions: populatedSuggestions };

  } catch (e) {
    console.error(e);
    return { suggestions: [], error: "An error occurred while getting AI suggestions." };
  }
}
