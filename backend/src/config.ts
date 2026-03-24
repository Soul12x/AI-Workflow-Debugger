import dotenv from 'dotenv';

dotenv.config();

// Orígenes permitidos según el entorno
const getCorOrigins = (): string[] => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const customOrigin = process.env.CORS_ORIGIN;

  if (nodeEnv === 'production') {
    // En producción, usar el origen configurado en variables de entorno
    return customOrigin ? [customOrigin] : ['https://ai-workflow-debugger.web.app'];
  }

  // En desarrollo, permitir localhost + cualquier origen personalizado
  const origins = ['http://localhost:5173', 'http://localhost:3000'];
  if (customOrigin && !origins.includes(customOrigin)) {
    origins.push(customOrigin);
  }
  return origins;
};

export const config = {
  port: process.env.PORT || 3001,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: getCorOrigins()
};
