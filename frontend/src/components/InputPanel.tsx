import React from 'react';
import { useAnalysisStore } from '../store';

const EXAMPLE_WORKFLOW = {
  "workflow": {
    "name": "CSAT Rappi - Sender",
    "conditions": [
      {
        "field": "Encuesta - MiTienda",
        "operator": "equals",
        "value": false
      }
    ]
  },
  "attributes": {
    "Encuesta - MiTienda": true
  },
  "logs": [
    "Workflow Set External ID - Treble executed",
    "Attribute Encuesta - MiTienda set to true",
    "Workflow CSAT Rappi - Sender evaluated",
    "Workflow condition failed: Encuesta - MiTienda equals false (current: true)"
  ]
};

export const InputPanel: React.FC = () => {
  const { input, setInput } = useAnalysisStore();

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setInput(parsed);
    } catch {
      const incomplete = e.target.value;
      setInput(incomplete as any);
    }
  };

  const loadExample = () => {
    setInput(EXAMPLE_WORKFLOW);
  };

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-6 border border-slate-600">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">📥 Entrada</h2>
        <button
          onClick={loadExample}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500 hover:shadow-lg"
        >
          📋 Usar Ejemplo
        </button>
      </div>

      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Pega tu Workflow en formato JSON
      </label>

      <textarea
        value={typeof input === 'string' ? input : JSON.stringify(input, null, 2)}
        onChange={handleJsonChange}
        placeholder={JSON.stringify(EXAMPLE_WORKFLOW, null, 2)}
        className="w-full h-96 p-4 bg-slate-900 border border-slate-600 rounded-lg font-mono text-sm text-slate-100 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />

      <p className="text-xs text-slate-400 mt-3">
        ✓ Formatos aceptados: workflow, logs (array), attributes
      </p>
    </div>
  );
};
