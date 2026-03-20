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
      console.warn("GEMINI_API_KEY is not set. Returning mock data for AI Advisor.");
      // Return mock suggestions if API key is not available
      const mockSuggestions = [
        {
          product: products[0],
          reasoning: "A versatile and elegant choice, Carrara Marble is perfect for creating a classic, high-end look. Its durability makes it suitable for various applications, matching your project needs."
        },
        {
          product: products[2],
          reasoning: "Black Galaxy Granite offers a bold, modern aesthetic. Its reflective specks add a unique character, and its exceptional hardness meets high-traffic functional requirements."
        },
      ].filter(s => s.product); // Ensure mock products exist

      // Simulate a delay to mimic a real API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      return { suggestions: mockSuggestions };
    }

    const result = await getAIStoneAdvice(input);
    
    const populatedSuggestions = result.suggestions.map(suggestion => {
      const product = products.find(p => p.id === suggestion.productId);
      return { product: product!, reasoning: suggestion.reasoning };
    }).filter(s => s.product); // Filter out any suggestions where the product wasn't found

    return { suggestions: populatedSuggestions };

  } catch (e) {
    console.error(e);
    // If the API call fails for other reasons, still provide a fallback.
    return { suggestions: [], error: "An error occurred while getting AI suggestions. Please try again later." };
  }
}
