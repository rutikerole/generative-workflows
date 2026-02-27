import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert architect assistant. Extract building requirements from user prompts and return structured data.
          
Always respond with valid JSON only, no additional text.

Required fields:
- buildingType: string (e.g., "residential", "office", "mixed-use")
- floors: number (total number of floors)
- totalArea: number (in square meters)
- style: string (architectural style, e.g., "modern", "contemporary", "minimalist")
- features: string[] (key features/requirements)
- description: string (clear, professional description of the building)
- floorHeight: number (typical floor height in meters, usually 3-4m)
- footprint: { width: number, length: number } (building footprint in meters)

If information is missing, make reasonable architectural assumptions.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const data = JSON.parse(content) as BuildingDescription;
    
    // Validate required fields
    if (!data.buildingType || !data.floors || !data.totalArea) {
      throw new Error('Invalid building data structure');
    }

    return data;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate building description');
  }
}

export async function generateConceptImage(
  buildingDescription: string,
  style: string
): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Architectural concept rendering of ${buildingDescription}. 
      Style: ${style}. 
      Professional architectural visualization, exterior view, photorealistic, high quality, detailed.
      Modern architectural photography style.`,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error('DALL-E API Error:', error);
    throw new Error('Failed to generate concept image');
  }
}
