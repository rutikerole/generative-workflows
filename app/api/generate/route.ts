import { NextResponse } from 'next/server';
import {
  generateBuildingDescription,
  generatePlaceholderImage,
} from '@/lib/services/claude';

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Step 1: Generate building description with Claude
    const buildingData = await generateBuildingDescription(prompt);

    // Step 2: Generate placeholder image (will add real generation later)
    const imageUrl = await generatePlaceholderImage(buildingData.description);

    // Step 3: Generate building metrics
    const metrics = {
      totalArea: buildingData.totalArea,
      floors: buildingData.floors,
      floorHeight: buildingData.floorHeight,
      totalHeight: buildingData.floors * buildingData.floorHeight,
      footprint: buildingData.footprint,
      footprintArea:
        buildingData.footprint.width * buildingData.footprint.length,
      buildingType: buildingData.buildingType,
      style: buildingData.style,
    };

    return NextResponse.json({
      success: true,
      data: {
        buildingData,
        imageUrl,
        metrics,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to generate building',
      },
      { status: 500 }
    );
  }
}
