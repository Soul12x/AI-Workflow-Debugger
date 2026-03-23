import React from 'react';
import { useAnalysisStore } from '../store';
import { AnalysisHistory } from '../types';

export const HistoryPanel: React.FC = () => {
  const { history, setInput, setOutput } = useAnalysisStore();

  if (history.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-12 text-center border border-slate-600">
        <p className="text-slate-400 text-lg">📚 El historial de análisis aparecerá aquí...</p>
      </div>
    );
  }

  const handleLoadAnalysis = (item: AnalysisHistory) => {
    setInput(item.input);
    setOutput(item.output);
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-6 border border-slate-600">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">📚</span> Historial de Análisis
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleLoadAnalysis(item)}
            className="p-4 bg-slate-600/50 hover:bg-blue-600/30 rounded-lg cursor-pointer transition border border-slate-600 hover:border-blue-500/50 group"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <p className="font-semibold text-white group-hover:text-blue-300 transition">
                  {idx + 1}. {item.input.workflow.name || 'Workflow sin nombre'}
                </p>
                <p className="text-sm text-slate-400">
                  {new Date(item.timestamp).toLocaleString('es-ES')}
                </p>
              </div>
              <span className="inline-block px-3 py-1 bg-blue-600/80 text-white rounded-full text-xs font-semibold group-hover:bg-blue-500 transition">
                Cargar
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
