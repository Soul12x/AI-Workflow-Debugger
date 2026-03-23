import React from 'react';
import { useAnalysisStore } from '../store';

export const ResultsPanel: React.FC = () => {
  const { output, error } = useAnalysisStore();

  if (error) {
    return (
      <div className="w-full bg-gradient-to-br from-red-900/40 to-red-800/40 rounded-xl shadow-2xl p-6 border border-red-700/50">
        <h2 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-2">
          <span className="text-2xl">❌</span> Error
        </h2>
        <p className="text-red-200">{error}</p>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-12 text-center border border-slate-600">
        <p className="text-slate-400 text-lg">Los resultados aparecerán aquí...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 rounded-xl shadow-lg p-6 border border-red-700/50">
        <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
          <span className="text-2xl">🔴</span> Causa Raíz
        </h3>
        <p className="text-slate-100 leading-relaxed">{output.root_cause}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl shadow-lg p-6 border border-blue-700/50">
        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
          <span className="text-2xl">📋</span> Explicación
        </h3>
        <p className="text-slate-100 whitespace-pre-wrap leading-relaxed">{output.explanation}</p>
      </div>

      {output.conflicts && output.conflicts.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 rounded-xl shadow-lg p-6 border border-yellow-700/50">
          <h3 className="text-lg font-bold text-yellow-300 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> Conflictos Detectados
          </h3>
          <ul className="space-y-3">
            {output.conflicts.map((conflict, idx) => (
              <li key={idx} className="flex gap-3 text-slate-100">
                <span className="text-yellow-400 font-bold text-xl">•</span>
                <span>{conflict}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {output.suggestions && output.suggestions.length > 0 && (
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl shadow-lg p-6 border border-green-700/50">
          <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> Sugerencias
          </h3>
          <ul className="space-y-3">
            {output.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-3 text-slate-100">
                <span className="bg-green-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {idx + 1}
                </span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
