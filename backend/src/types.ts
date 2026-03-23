export interface WorkflowAnalysisRequest {
  workflow: Record<string, any>;
  logs: string[];
  attributes: Record<string, any>;
}

export interface AIAnalysisResponse {
  root_cause: string;
  explanation: string;
  conflicts: string[];
  suggestions: string[];
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
