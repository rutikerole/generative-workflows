import { create } from 'zustand';

export interface WorkflowState {
  prompt: string;
  isGenerating: boolean;
  currentStep: 'idle' | 'analyzing' | 'generating-3d' | 'generating-image' | 'complete' | 'error';
  buildingData: any | null;
  imageUrl: string | null;
  metrics: any | null;
  error: string | null;
}

interface WorkflowActions {
  setPrompt: (prompt: string) => void;
  startGeneration: () => void;
  setStep: (step: WorkflowState['currentStep']) => void;
  setResults: (data: { buildingData: any; imageUrl: string; metrics: any }) => void;
  setError: (error: string) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState & WorkflowActions>((set) => ({
  // State
  prompt: '',
  isGenerating: false,
  currentStep: 'idle',
  buildingData: null,
  imageUrl: null,
  metrics: null,
  error: null,

  // Actions
  setPrompt: (prompt) => set({ prompt }),
  
  startGeneration: () => set({ 
    isGenerating: true, 
    currentStep: 'analyzing',
    error: null 
  }),
  
  setStep: (currentStep) => set({ currentStep }),
  
  setResults: (data) => set({ 
    buildingData: data.buildingData,
    imageUrl: data.imageUrl,
    metrics: data.metrics,
    currentStep: 'complete',
    isGenerating: false,
  }),
  
  setError: (error) => set({ 
    error, 
    currentStep: 'error',
    isGenerating: false 
  }),
  
  reset: () => set({ 
    prompt: '',
    isGenerating: false,
    currentStep: 'idle',
    buildingData: null,
    imageUrl: null,
    metrics: null,
    error: null,
  }),
}));
