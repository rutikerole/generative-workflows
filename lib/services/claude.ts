import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface BuildingRequirements {
  buildingType: string;
  floors: number;
  totalArea: number;
  style: string;
  features: string[];
  constraints?: {
    maxHeight?: number;
    footprint?: { width: number; length: number };
  };
}

export interface BuildingDescription extends BuildingRequirements {
  description: string;
  floorHeight: number;
  footprint: { width: number; length: number };
}

export async function generateBuildingDescription(
  prompt: string
): Promise<BuildingDescription> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `You are an expert architect. Extract building requirements from this prompt and return ONLY valid JSON (no other text).

User Prompt: "${prompt}"

Return JSON with these exact fields:
{
  "buildingType": "string (e.g., residential, office, mixed-use)",
  "floors": number,
  "totalArea": number (in square meters),
  "style": "string (modern, contemporary, minimalist, etc.)",
  "features": ["array", "of", "key", "features"],
  "description": "clear professional description of the building",
  "floorHeight": number (typical floor height in meters, 3-4m),
  "footprint": {
    "width": number (in meters),
    "length": number (in meters)
  }
}

If information is missing, make reasonable architectural assumptions. Respond with ONLY the JSON object.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Extract JSON from response (Claude might wrap it in markdown)
    let jsonText = content.text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }

    const data = JSON.parse(jsonText) as BuildingDescription;

    // Validate required fields
    if (!data.buildingType || !data.floors || !data.totalArea) {
      throw new Error('Invalid building data structure');
    }

    return data;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('Failed to generate building description');
  }
}

export async function generateConceptImagePrompt(
  buildingDescription: string,
  style: string
): Promise<string> {
  // For now, return an optimized prompt for Stable Diffusion
  // We'll integrate actual image generation in next iteration
  return `Professional architectural rendering of ${buildingDescription}. 
${style} architecture style. 
Exterior view, photorealistic, high quality, detailed, modern architectural photography.
Clean lines, professional lighting, contextual environment.
4K, award-winning architectural visualization.`;
}

export async function generatePlaceholderImage(
  buildingDescription: string
): Promise<string> {
  // Return a placeholder for now
  // We'll add Stable Diffusion API in next iteration
  const encoded = encodeURIComponent(buildingDescription.substring(0, 100));
  return `https://placehold.co/1024x1024/6366f1/white?text=${encoded}`;
}
