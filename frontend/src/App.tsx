import React, { useEffect, useState } from 'react';
import { InputPanel, AnalyzeButton, ResultsPanel, HistoryPanel } from './components';
import { useAnalysisStore } from './store';
import { checkHealth } from './api';

function App() {
  const { reset } = useAnalysisStore();
  const [apiHealth, setApiHealth] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar que el backend está disponible
    const checkAPI = async () => {
      const isHealthy = await checkHealth();
      setApiHealth(isHealthy);
    };

    checkAPI();
    const interval = setInterval(checkAPI, 30000); // Verificar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex items-center justify-center gap-8 relative">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Workflow Debugger
          </h1>
          <div className="absolute right-0">
            <img 
              src="/assets/rappi-removebg-preview.png" 
              alt="Workflow Debugger Logo"
              className="h-24 w-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Input */}
          <div>
            <InputPanel />
            <div className="mt-6">
              <AnalyzeButton />
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            <ResultsPanel />
          </div>
        </div>

        {/* History and Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HistoryPanel />
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={reset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all border border-slate-600 hover:border-slate-500 shadow-lg"
            >
              🔄 Limpiar Todo
            </button>

            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-xl p-6 border border-slate-600">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-lg">ℹ️</span> Guía Rápida
              </h3>
              <ul className="text-sm text-slate-300 space-y-3">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">1</span>
                  <span>Pega tu JSON de workflow</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">2</span>
                  <span>Incluye logs y atributos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">3</span>
                  <span>Haz clic en Analizar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">4</span>
                  <span>Revisa causa raíz y sugerencias</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p className="text-sm">
            Powered by Claude AI • Built with React & TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
