import React from 'react';
import { useAnalysisStore } from '../store';
import { analyzeWorkflow } from '../api';
import { WorkflowAnalysisRequest } from '../types';
import { validateInput, formatValidationErrors } from '../validation';

export const AnalyzeButton: React.FC = () => {
  const { input, setLoading, setOutput, setError, loading, addToHistory } = useAnalysisStore();

  const handleAnalyze = async () => {
    try {
      const errors = validateInput(input);
      if (errors.length > 0) {
        setError(`Errores en el input:\n${formatValidationErrors(errors)}`);
        return;
      }

      setError(null);
      setLoading(true);

      const response = await analyzeWorkflow(input as WorkflowAnalysisRequest);
      setOutput(response);

      addToHistory({
        id: Date.now().toString(),
        timestamp: Date.now(),
        input: input as WorkflowAnalysisRequest,
        output: response
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      setError(`Error al analizar: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const isValid = validateInput(input).length === 0;

  return (
    <button
      onClick={handleAnalyze}
      disabled={!isValid || loading}
      className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all text-lg ${
        isValid && !loading
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer shadow-xl hover:shadow-2xl border border-blue-500/50 hover:border-blue-400'
          : 'bg-slate-700 cursor-not-allowed border border-slate-600'
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Analizando...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span>🚀</span> Analizar Workflow
        </span>
      )}
    </button>
  );
};
