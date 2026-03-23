import { WorkflowAnalysisRequest } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateInput(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validar que es un objeto
  if (!data || typeof data !== 'object') {
    errors.push({
      field: 'root',
      message: 'El input debe ser un objeto JSON'
    });
    return errors;
  }

  // Validar workflow
  if (!data.workflow || typeof data.workflow !== 'object') {
    errors.push({
      field: 'workflow',
      message: 'workflow es requerido y debe ser un objeto'
    });
  } else {
    if (!data.workflow.name && !data.workflow.conditions && !data.workflow.id) {
      errors.push({
        field: 'workflow',
        message: 'workflow debe contener al menos: name, conditions o id'
      });
    }
  }

  // Validar logs
  if (!Array.isArray(data.logs)) {
    errors.push({
      field: 'logs',
      message: 'logs debe ser un array'
    });
  } else if (data.logs.length === 0) {
    errors.push({
      field: 'logs',
      message: 'logs no puede estar vacío'
    });
  } else {
    const invalidLogs = data.logs.filter((log: any) => typeof log !== 'string');
    if (invalidLogs.length > 0) {
      errors.push({
        field: 'logs',
        message: 'Todos los logs deben ser strings'
      });
    }
  }

  // Validar attributes
  if (!data.attributes || typeof data.attributes !== 'object') {
    errors.push({
      field: 'attributes',
      message: 'attributes es requerido y debe ser un objeto'
    });
  }

  return errors;
}

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map(e => `${e.field}: ${e.message}`).join('\n');
}

export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
