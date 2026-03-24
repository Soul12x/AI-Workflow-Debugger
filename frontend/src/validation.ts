export interface ValidationError {
  field: string;
  message: string;
}

/** Detecta si un objeto es un workflow directo (Kustomer style) */
function _isDirectWorkflow(obj: Record<string, unknown>): boolean {
  return (
    obj['type'] === 'workflow' ||
    !!obj['id'] ||
    !!(obj['attributes'] && typeof obj['attributes'] === 'object')
  );
}

/** Detecta si un objeto es el formato actual (workflow + logs + attributes) */
function _isLegacyFormat(obj: Record<string, unknown>): boolean {
  return !!(obj['workflow'] && typeof obj['workflow'] === 'object');
}

export function validateInput(data: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validación MUY flexible: permitir prácticamente cualquier input válido
  // Dejar que el backend sea el que valide realmente

  // Solo rechazar si es completamente vacío o inválido
  if (data === null || data === undefined) {
    errors.push({
      field: 'root',
      message: 'El campo está vacío'
    });
    return errors;
  }

  // Si es un string, permitir (el backend parseará)
  if (typeof data === 'string') {
    if (data.trim().length === 0) {
      errors.push({
        field: 'root',
        message: 'El campo está vacío'
      });
    }
    return errors;
  }

  // Si es un objeto o array, permitir (el backend lo validará)
  if (typeof data === 'object') {
    return errors;
  }

  // Cualquier otro tipo, rechazar
  errors.push({
    field: 'root',
    message: 'El input debe ser JSON válido o texto'
  });

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
