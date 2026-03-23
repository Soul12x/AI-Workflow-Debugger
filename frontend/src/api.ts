import axios, { AxiosInstance } from 'axios';
import { WorkflowAnalysisRequest, AIAnalysisResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function analyzeWorkflow(request: WorkflowAnalysisRequest): Promise<AIAnalysisResponse> {
  const response = await apiClient.post<AIAnalysisResponse>('/analyze', request);
  return response.data;
}

export async function checkHealth(): Promise<boolean> {
  try {
    await apiClient.get('/health');
    return true;
  } catch {
    return false;
  }
}
