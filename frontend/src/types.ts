export interface WorkflowAnalysisRequest {
  workflow?: Record<string, any>;
  logs?: string[];
  attributes?: Record<string, any>;
  context?: string;
  workflows?: Record<string, any>[]; // Para comparación
}

export interface AIAnalysisResponse {
  root_cause?: string;
  explanation: string;
  conflicts?: string[];
  suggestions: string[];
  comparison?: string;
}

export interface AnalysisHistory {
  id: string;
  timestamp: number;
  input: unknown;
  output: AIAnalysisResponse;
}
