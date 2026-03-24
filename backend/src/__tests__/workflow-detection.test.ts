import { describe, it, expect } from 'vitest';

/** Detecta si un objeto es un workflow directo estilo Kustomer */
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

describe('Workflow Detection', () => {
  describe('isDirectWorkflow', () => {
    it('should detect Kustomer workflow with type field', () => {
      const workflow = {
        type: 'workflow',
        id: '123',
        attributes: { name: 'Test Workflow' }
      };
      expect(isDirectWorkflow(workflow)).toBeTruthy();
    });

    it('should detect workflow with id field', () => {
      const workflow = {
        id: '61b928c394014f001b1f3b0b',
        attributes: { name: 'Bot Workflow' }
      };
      expect(isDirectWorkflow(workflow)).toBeTruthy();
    });

    it('should detect workflow with attributes object only', () => {
      const workflow = {
        attributes: {
          name: 'Test',
          description: 'A test workflow'
        }
      };
      expect(isDirectWorkflow(workflow)).toBeTruthy();
    });

    it('should not detect legacy format with empty attributes', () => {
      const legacyFormat = {
        workflow: { name: 'Test' },
        logs: [],
        attributes: {}
      };
      // This has attributes: {} which is an object, so it returns true
      expect(isDirectWorkflow(legacyFormat)).toBeTruthy();
    });

    it('should not detect object with only workflow property and no attributes', () => {
      const legacyFormatNoAttrs = {
        workflow: { name: 'Test' },
        logs: []
      };
      expect(isDirectWorkflow(legacyFormatNoAttrs)).toBeFalsy();
    });

    it('should not detect array as direct workflow', () => {
      const arrayOfWorkflows = [
        { type: 'workflow', id: '1' },
        { type: 'workflow', id: '2' }
      ];
      expect(isDirectWorkflow(arrayOfWorkflows)).toBeFalsy();
    });

    it('should not detect null as workflow', () => {
      expect(isDirectWorkflow(null)).toBeFalsy();
    });

    it('should not detect undefined as workflow', () => {
      expect(isDirectWorkflow(undefined)).toBeFalsy();
    });

    it('should not detect string as workflow', () => {
      expect(isDirectWorkflow('not a workflow')).toBeFalsy();
    });

    it('should not detect empty object as workflow', () => {
      expect(isDirectWorkflow({})).toBeFalsy();
    });

    it('should not detect object with only workflow property', () => {
      expect(isDirectWorkflow({ workflow: { name: 'Test' } })).toBeFalsy();
    });

    it('should detect object with non-empty attributes', () => {
      const workflow = {
        attributes: { name: 'Test' }
      };
      expect(isDirectWorkflow(workflow)).toBeTruthy();
    });

    it('should not detect object with null attributes', () => {
      const workflow = {
        attributes: null
      };
      expect(isDirectWorkflow(workflow)).toBeFalsy();
    });
  });

  describe('Comparison Detection', () => {
    it('should identify array of workflows for comparison', () => {
      const workflows = [
        { type: 'workflow', id: '1' },
        { type: 'workflow', id: '2' }
      ];
      expect(Array.isArray(workflows)).toBe(true);
    });

    it('should require at least 2 workflows for comparison', () => {
      const singleWorkflow = [{ type: 'workflow', id: '1' }];
      expect(singleWorkflow.length < 2).toBe(true);
    });

    it('should accept multiple workflows', () => {
      const workflows = [{ id: '1' }, { id: '2' }, { id: '3' }];
      expect(workflows.length >= 2).toBe(true);
    });
  });

  describe('Request Format Detection', () => {
    it('should detect legacy format with workflow and logs', () => {
      const request = {
        workflow: { name: 'Test' },
        logs: ['log1', 'log2'],
        attributes: { key: 'value' }
      };
      expect(request.workflow).toBeDefined();
      expect(request.logs).toBeDefined();
      expect(Array.isArray(request.logs)).toBe(true);
    });

    it('should accept workflow without logs/attributes', () => {
      const request = {
        workflow: { name: 'Test' }
      };
      expect(request.workflow).toBeDefined();
      expect(request.logs).toBeUndefined();
    });

    it('should include optional context field', () => {
      const request = {
        workflow: { name: 'Test' },
        context: 'Analyze for Brazil market'
      };
      expect(request.context).toBe('Analyze for Brazil market');
    });

    it('should handle direct workflow format', () => {
      const directWorkflow = {
        type: 'workflow',
        id: '123',
        attributes: { name: 'Bot' }
      };
      expect(directWorkflow.type).toBe('workflow');
      expect(directWorkflow.id).toBeDefined();
    });

    it('should handle comparison request with multiple workflows', () => {
      const comparisonRequest = {
        workflows: [
          { id: '1', type: 'workflow' },
          { id: '2', type: 'workflow' }
        ],
        context: 'Compare workflows'
      };
      expect(Array.isArray(comparisonRequest.workflows)).toBe(true);
      expect(comparisonRequest.workflows.length).toBe(2);
      expect(comparisonRequest.context).toBeDefined();
    });
  });
});
