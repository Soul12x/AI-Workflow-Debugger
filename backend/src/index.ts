import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { analyzeWorkflow, compareWorkflows } from './ai-service.js';
import { WorkflowAnalysisRequest, ComparisonRequest, ErrorResponse, AIAnalysisResponse } from './types.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: config.corsOrigins, credentials: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

/** Detecta si un objeto es un workflow directo estilo Kustomer */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDirectWorkflow(data: any): boolean {
  return (
    data &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    (data.type === 'workflow' ||
      data.id ||
      (data.attributes && typeof data.attributes === 'object'))
  );
}

// Endpoint principal de análisis
app.post('/analyze', async (req: Request, res: Response<AIAnalysisResponse | ErrorResponse>) => {
  try {
    const { workflows, context } = req.body;

    // Si el body es un array, es comparación de múltiples workflows
    if (Array.isArray(workflows)) {
      if (workflows.length < 2) {
        return res.status(400).json({
          error: 'Se requieren al menos 2 workflows para comparar',
          details: 'Envía un array con 2 o más workflows'
        });
      }

      const comparisonRequest: ComparisonRequest = {
        workflows,
        context
      };

      const analysis = await compareWorkflows(comparisonRequest);
      return res.json(analysis);
    }

    // Si no hay workflows, intentar interpretar req.body como workflow directo o formato actual
    let request: WorkflowAnalysisRequest;

    if (isDirectWorkflow(req.body)) {
      // Es un workflow directo (Kustomer format o similar)
      request = {
        workflow: req.body,
        logs: [],
        attributes: {},
        context
      };
    } else if (req.body.workflow) {
      // Es el formato actual {workflow, logs?, attributes?, context?}
      const { workflow, logs, attributes } = req.body;

      if (!workflow) {
        return res.status(400).json({
          error: 'Faltan campos requeridos',
          details: 'Se requiere: workflow'
        });
      }

      request = {
        workflow,
        logs: logs || [],
        attributes: attributes || {},
        context
      };
    } else {
      return res.status(400).json({
        error: 'Formato no reconocido',
        details:
          'Envía un workflow directo, un objeto con {workflow, logs?, attributes?, context?}, o un array de workflows para comparar'
      });
    }

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
  console.warn(`✅ Server ejecutándose en puerto ${config.port}`);
  console.warn(`Entorno: ${config.nodeEnv}`);
});
