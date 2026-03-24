import { create } from 'zustand';
import { AIAnalysisResponse, AnalysisHistory } from './types';

interface AnalysisStore {
  // Estado
  input: unknown;
  output: AIAnalysisResponse | null;
  loading: boolean;
  error: string | null;
  history: AnalysisHistory[];

  // Acciones
  setInput: (input: unknown) => void;
  setOutput: (output: AIAnalysisResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: (analysis: AnalysisHistory) => void;
  clearError: () => void;
  reset: () => void;
}

const defaultInput: unknown = {
  workflow: {},
  logs: [],
  attributes: {}
};

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  input: defaultInput,
  output: null,
  loading: false,
  error: null,
  history: [],

  setInput: (input) => set({ input }),
  setOutput: (output) => set({ output }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addToHistory: (analysis) => set((state) => ({
    history: [analysis, ...state.history].slice(0, 20) // Mantener últimos 20
  })),
  clearError: () => set({ error: null }),
  reset: () => set({
    input: defaultInput,
    output: null,
    error: null
  })
}));
