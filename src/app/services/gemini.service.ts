import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: The API key is sourced from process.env.API_KEY as per the instructions.
    // This assumes the execution environment has this variable properly configured.
    if (!process.env.API_KEY) {
      console.error('API_KEY environment variable not set!');
      throw new Error('API_KEY environment variable not set!');
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateHeadlines(
    industry: string,
    audience: string,
    benefit: string
  ): Promise<string[]> {
    const prompt = `
      You are a world-class marketing copywriter specializing in creating high-converting headlines. Your task is to generate 5 catchy, scroll-stopping headlines based on the user's business details.

      The user provides:
      - Industry/Niche: ${industry}
      - Target Audience: ${audience}
      - Main Benefit: ${benefit}

      Generate headlines that are:
      - Clear and concise.
      - Benefit-oriented.
      - Intriguing and create curiosity.
      - Tailored to the specified audience.
    `;
    
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        headlines: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "A catchy marketing headline."
          },
          description: "An array of 5 generated headlines."
        },
      },
      required: ['headlines']
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        }
      });
      
      const jsonStr = response.text.trim();
      const parsed = JSON.parse(jsonStr);

      if (parsed.headlines && Array.isArray(parsed.headlines)) {
        return parsed.headlines;
      } else {
        throw new Error('Invalid JSON response format from Gemini API.');
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to generate headlines. Please check your inputs or try again later.');
    }
  }
}