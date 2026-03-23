import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { analyzeWorkflow } from './ai-service.js';
import { WorkflowAnalysisRequest, ErrorResponse, AIAnalysisResponse } from './types.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: config.corsOrigin }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Endpoint principal de análisis
app.post('/analyze', async (req: Request, res: Response<AIAnalysisResponse | ErrorResponse>) => {
  try {
    // Validar que los campos requeridos estén presentes
    const { workflow, logs, attributes } = req.body;

    if (!workflow || !logs || !attributes) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        details: 'Se requieren: workflow, logs, attributes'
      });
    }

    if (!Array.isArray(logs)) {
      return res.status(400).json({
        error: 'Formato inválido',
        details: 'logs debe ser un array de strings'
      });
    }

    const request: WorkflowAnalysisRequest = {
      workflow,
      logs,
      attributes
    };

    const analysis = await analyzeWorkflow(request);
    res.json(analysis);
  } catch (error) {
    console.error('Error en análisis:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    if (errorMessage.includes('API key')) {
      return res.status(500).json({
        error: 'Configuración incompleta',
        details: 'Falta la clave de API de Anthropic'
      });
    }

    res.status(500).json({
      error: 'Error al analizar el workflow',
      details: errorMessage
    });
  }
});

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`✅ Server ejecutándose en puerto ${config.port}`);
  console.log(`Entorno: ${config.nodeEnv}`);
});
