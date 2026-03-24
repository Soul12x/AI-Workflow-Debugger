export interface WorkflowAnalysisRequest {
  workflow: Record<string, any>;
  logs?: string[];
  attributes?: Record<string, any>;
  context?: string;
}

export interface ComparisonRequest {
  workflows: Record<string, any>[];
  context?: string;
}

export interface AIAnalysisResponse {
  root_cause?: string;
  explanation: string;
  conflicts?: string[];
  suggestions: string[];
  comparison?: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
