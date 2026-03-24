import Anthropic from '@anthropic-ai/sdk';
import { config } from './config.js';
import { WorkflowAnalysisRequest, ComparisonRequest, AIAnalysisResponse } from './types.js';

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

export async function compareWorkflows(request: ComparisonRequest): Promise<AIAnalysisResponse> {
  const prompt = buildComparisonPrompt(request);

  const message = await client.messages.create({
    model: 'claude-opus-4-1-20250805',
    max_tokens: 2048,
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
  const contextSection = request.context ? `\n**CONTEXTO ADICIONAL DEL USUARIO:**\n${request.context}\n` : '';

  // Si no hay logs/attributes, es un workflow directo sin ejecución
  if (!request.logs || request.logs.length === 0) {
    return `Eres un experto en workflows de automatización de soporte al cliente.

Analiza el siguiente workflow para entender su propósito, flujos de decisión y posibles mejoras.

**WORKFLOW:**
${JSON.stringify(request.workflow, null, 2)}${contextSection}

---

Analiza:
1. ¿Cuál es el propósito principal de este workflow?
2. ¿Cuáles son los flujos de decisión principales?
3. ¿En qué puntos podría fallar este workflow?
4. ¿Qué recomendaciones tienes para mejorarlo?

Responde ÚNICAMENTE en JSON válido con esta estructura (sin explicación adicional antes o después):
{
  "explanation": "Descripción del propósito y funcionamiento del workflow en detalle",
  "conflicts": ["punto_riesgo_1", "punto_riesgo_2"],
  "suggestions": ["mejora_1", "mejora_2", "mejora_3"]
}`;
  }

  // Si hay logs y attributes, es análisis de ejecución
  return `Eres un experto en workflows de automatización de soporte al cliente. 

Analiza el siguiente workflow, logs y atributos para identificar por qué el workflow no se ejecutó o se detuvo.

**WORKFLOW:**
${JSON.stringify(request.workflow, null, 2)}

**ATRIBUTOS ACTUALES:**
${JSON.stringify(request.attributes, null, 2)}

**LOGS DE EJECUCIÓN:**
${request.logs.map((log, i) => `${i + 1}. ${log}`).join('\n')}${contextSection}

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

function buildComparisonPrompt(request: ComparisonRequest): string {
  const contextSection = request.context ? `\n**CONTEXTO ADICIONAL DEL USUARIO:**\n${request.context}\n` : '';

  return `Eres un experto en workflows de automatización de soporte al cliente.

Compara los siguientes ${request.workflows.length} workflows para identificar diferencias, similitudes y posibles conflictos.

${request.workflows
  .map(
    (workflow, i) =>
      `**WORKFLOW ${i + 1}:**
${JSON.stringify(workflow, null, 2)}`
  )
  .join('\n\n')}${contextSection}

---

Compara:
1. ¿Cuáles son las diferencias clave entre estos workflows?
2. ¿Podrían estos workflows ejecutarse simultáneamente sin conflicto?
3. ¿Hay redundancias entre ellos?
4. ¿Cuál es el mejor orden de ejecución?
5. ¿Qué mejoras se podrían hacer para sincronizarlos mejor?

Responde ÚNICAMENTE en JSON válido con esta estructura (sin explicación adicional antes o después):
{
  "explanation": "Análisis detallado de las diferencias, similitudes y relaciones entre los workflows",
  "comparison": "Tabla o análisis estructurado de cómo se relacionan estos workflows",
  "conflicts": ["conflicto_potencial_1", "conflicto_potencial_2"],
  "suggestions": ["recomendación_1", "recomendación_2", "recomendación_3"]
}`;
}
