export interface WorkflowAnalysisRequest {
  workflow?: Record<string, unknown>;
  logs?: string[];
  attributes?: Record<string, unknown>;
  context?: string;
  workflows?: Record<string, unknown>[]; // Para comparación
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
