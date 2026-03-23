import Anthropic from '@anthropic-ai/sdk';
import { config } from './config.js';
import { WorkflowAnalysisRequest, AIAnalysisResponse } from './types.js';

const client = new Anthropic({
  apiKey: config.anthropicApiKey
});

export async function analyzeWorkflow(request: WorkflowAnalysisRequest): Promise<AIAnalysisResponse> {
  const prompt = buildAnalysisPrompt(request);

  const message = await client.messages.create({
    model: 'claude-opus-4-1-20250805',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

  // Extraer JSON de la respuesta
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No se pudo parsear la respuesta de la IA');
  }

  const analysis: AIAnalysisResponse = JSON.parse(jsonMatch[0]);
  return analysis;
}

function buildAnalysisPrompt(request: WorkflowAnalysisRequest): string {
  return `Eres un experto en workflows de automatización de soporte al cliente. 

Analiza el siguiente workflow, logs y atributos para identificar por qué el workflow no se ejecutó o se detuvo.

**WORKFLOW:**
${JSON.stringify(request.workflow, null, 2)}

**ATRIBUTOS ACTUALES:**
${JSON.stringify(request.attributes, null, 2)}

**LOGS DE EJECUCIÓN:**
${request.logs.map((log, i) => `${i + 1}. ${log}`).join('\n')}

---

Analiza:
1. ¿Se cumplen las condiciones del workflow con los atributos actuales?
2. ¿Hay conflictos entre múltiples workflows o condiciones?
3. ¿Por qué se detuvo la ejecución?
4. ¿Qué cambios de atributos causaron que el workflow no se ejecutara?

Responde ÚNICAMENTE en JSON válido con esta estructura (sin explicación adicional antes o después):
{
  "root_cause": "La causa raíz del problema en 1-2 oraciones",
  "explanation": "Explicación detallada de qué sucedió paso a paso",
  "conflicts": ["conflicto 1", "conflicto 2"],
  "suggestions": ["sugerencia 1", "sugerencia 2", "sugerencia 3"]
}`;
}
