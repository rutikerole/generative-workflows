'use client';

import { useState } from 'react';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { BuildingViewer3D } from './BuildingViewer3D';

export function WorkflowRunner() {
  const {
    prompt,
    isGenerating,
    currentStep,
    buildingData,
    imageUrl,
    metrics,
    error,
    setPrompt,
    startGeneration,
    setStep,
    setResults,
    setError,
    reset,
  } = useWorkflowStore();

  const [examplePrompts] = useState([
    '5-story modern office building, glass facade, 2000 sq meters',
    '10-floor residential tower, contemporary style, 5000 sq meters',
    '3-story mixed-use building, brick exterior, 1500 sq meters',
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    startGeneration();

    try {
      setStep('analyzing');
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      setStep('generating-3d');
      await new Promise(resolve => setTimeout(resolve, 500)); // Visual delay

      setStep('generating-image');
      const data = await response.json();

      if (!data.success) {
        throw new Error('Invalid response format');
      }

      setResults(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const getStepMessage = () => {
    switch (currentStep) {
      case 'analyzing':
        return 'Analyzing building requirements with Claude AI...';
      case 'generating-3d':
        return 'Generating 3D building model...';
      case 'generating-image':
        return 'Creating concept visualization...';
      case 'complete':
        return 'Building generated successfully!';
      case 'error':
        return error || 'An error occurred';
      default:
        return 'Ready to generate';
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              🔥 AI Building Generator
            </h1>
            <p className="text-sm text-gray-600">
              Text → 3D Building → Concept Image (Powered by Claude AI)
            </p>
          </div>
          {currentStep !== 'idle' && (
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full p-6">
          {currentStep === 'idle' || currentStep === 'analyzing' ? (
            // Input Phase
            <div className="h-full flex items-center justify-center">
              <div className="max-w-2xl w-full space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Describe Your Building
                  </h2>
                  <p className="text-gray-600">
                    Enter a description and watch AI generate a 3D concept in seconds
                  </p>
                </div>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 5-story modern office building with glass facade, approximately 2000 square meters..."
                  className="w-full h-32 px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                  disabled={isGenerating}
                />

                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {getStepMessage()}
                    </span>
                  ) : (
                    '🔥 Generate Building'
                  )}
                </button>

                {/* Example Prompts */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Try an example:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(example)}
                        className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Results Phase
            <div className="h-full grid grid-cols-2 gap-6">
              {/* Left: 3D Viewer */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">3D Building Model</h3>
                <div className="h-[600px]">
                  <BuildingViewer3D buildingData={buildingData} />
                </div>
                {metrics && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="text-2xl font-bold">{metrics.totalArea} m²</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Floors</p>
                      <p className="text-2xl font-bold">{metrics.floors}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Height</p>
                      <p className="text-2xl font-bold">{metrics.totalHeight}m</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Details & Image */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Building Details</h3>
                {buildingData && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Type</p>
                      <p className="text-lg capitalize">{buildingData.buildingType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Style</p>
                      <p className="text-lg capitalize">{buildingData.style}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Description</p>
                      <p className="text-sm text-gray-700">{buildingData.description}</p>
                    </div>
                    {buildingData.features && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                          {buildingData.features.map((feature: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                    Download JSON
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                    Export 3D Model
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-900 text-white px-6 py-2 text-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentStep === 'error' ? 'bg-red-400' : isGenerating ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            {getStepMessage()}
          </span>
        </div>
        <span>Powered by Claude AI 🔥</span>
      </div>
    </div>
  );
}
