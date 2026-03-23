# 📋 Ejemplos de Uso

Aquí hay varios ejemplos que puedes copiar y pegar en la aplicación para probar.

## Ejemplo 1: Conflicto de Atributos (Básico)

Este es el ejemplo que carga por defecto al hacer click en "Usar Ejemplo".

```json
{
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
}
```

**Problema**: El atributo cuenta como `true` pero el workflow espera `false`

---

## Ejemplo 2: Múltiples Conflictos

```json
{
  "workflow": {
    "name": "Auto-responder - Premium Users",
    "id": "wf_001",
    "conditions": [
      {
        "field": "plan_type",
        "operator": "equals",
        "value": "premium"
      },
      {
        "field": "support_tier",
        "operator": "greater_than",
        "value": 3
      }
    ],
    "actions": [
      {
        "type": "send_email",
        "template": "premium_response"
      }
    ]
  },
  "attributes": {
    "plan_type": "basic",
    "support_tier": 2,
    "account_status": "active"
  },
  "logs": [
    "Workflow Auto-responder - Premium Users started",
    "Checking condition: plan_type equals premium",
    "Condition failed: plan_type is basic, expected premium",
    "Workflow execution halted",
    "Fallback: Basic response sent instead"
  ]
}
```

**Problema**: Usuario tiene plan "basic" pero workflow espera "premium"

---

## Ejemplo 3: Orden de Ejecución

```json
{
  "workflow": {
    "name": "Update Agent Status",
    "id": "wf_update_agent",
    "conditions": [
      {
        "field": "agent_online",
        "operator": "equals",
        "value": true
      }
    ],
    "priority": 1
  },
  "attributes": {
    "agent_online": false,
    "agent_id": "ag_123",
    "last_activity": "2026-03-20T10:00:00Z",
    "queue_count": 5
  },
  "logs": [
    "[09:50] Workflow Update Agent Status initialized",
    "[09:50] Checking agent_online condition",
    "[09:50] Agent status check: false (not online)",
    "[09:50] Condition failed, workflow skipped",
    "[09:51] Another workflow changed agent status",
    "[09:51] Workflow Update Agent Status did not re-trigger"
  ]
}
```

**Problema**: El agente se desconectó antes de que el workflow se ejecutara

---

## Ejemplo 4: Conflicto de Workflows

```json
{
  "workflow": {
    "name": "Ticket Priority Auto-Escalator",
    "id": "wf_escalate",
    "conditions": [
      {
        "field": "wait_time_minutes",
        "operator": "greater_than",
        "value": 15
      }
    ],
    "actions": [
      {
        "type": "set_priority",
        "value": "high"
      }
    ]
  },
  "attributes": {
    "wait_time_minutes": 20,
    "ticket_priority": "low",
    "assigned_agent": "agent_1",
    "customer_tier": "standard",
    "last_message": "Just waiting for response..."
  },
  "logs": [
    "Workflow Ticket Priority Auto-Escalator evaluated",
    "Condition met: wait_time_minutes (20) > 15",
    "Action: Setting priority to high",
    "Priority changed to high successfully",
    "BUT: Concurrent workflow 'Reset Priority on Response' also triggered",
    "Conflict: Priority reset to normal before escalation took effect"
  ]
}
```

**Problema**: Dos workflows en conflicto modifican el mismo atributo

---

## Ejemplo 5: Condición de Rango

```json
{
  "workflow": {
    "name": "VIP Customer Fast Track",
    "conditions": [
      {
        "field": "customer_score",
        "operator": "between",
        "value": [80, 100]
      }
    ],
    "actions": [
      {
        "type": "assign_to_tier",
        "tier": "vip"
      }
    ]
  },
  "attributes": {
    "customer_score": 75,
    "customer_name": "John Doe",
    "purchases_last_year": 10000,
    "support_tickets": 2
  },
  "logs": [
    "Customer score check: 75",
    "Condition required: between 80-100",
    "Condition failed: 75 < 80",
    "VIP workflow did not trigger",
    "Customer assigned to standard tier instead"
  ]
}
```

**Problema**: El score está cerca pero no cumple el rango exacto

---

## Ejemplo 6: Cambio de Atributo Dinámico

```json
{
  "workflow": {
    "name": "After Hours Auto-Close",
    "id": "wf_after_hours",
    "conditions": [
      {
        "field": "current_hour",
        "operator": "greater_than",
        "value": 18
      },
      {
        "field": "is_business_day",
        "operator": "equals",
        "value": true
      }
    ]
  },
  "attributes": {
    "current_hour": 14,
    "is_business_day": true,
    "timezone": "UTC",
    "ticket_age_hours": 24
  },
  "logs": [
    "[14:00] Workflow After Hours Auto-Close evaluated",
    "[14:00] Checking time condition: current_hour > 18",
    "[14:00] Condition failed: 14 is not > 18",
    "[14:00] Workflow skipped",
    "[18:30] Time changed (server time sync)",
    "[18:30] Workflow was NOT re-evaluated (no re-trigger event)"
  ]
}
```

**Problema**: El atributo cambió después pero el workflow no se re-evaluó

---

## Ejemplo 7: Operador Inválido

```json
{
  "workflow": {
    "name": "Priority Routing",
    "conditions": [
      {
        "field": "message_length",
        "operator": "contains",
        "value": "urgent"
      }
    ]
  },
  "attributes": {
    "message_length": 250,
    "message_content": "This is urgent and needs immediate attention"
  },
  "logs": [
    "Workflow Priority Routing started",
    "Evaluating condition: message_length contains urgent",
    "ERROR: Operator 'contains' not valid for numeric field",
    "Should use operator: text_contains for string fields",
    "Workflow evaluation failed with error"
  ]
}
```

**Problema**: El operador no es apropiado para el tipo de dato

---

## Cómo Usar Estos Ejemplos

1. Copia uno de los JSONs de arriba
2. Pega en el textarea de "Input" en la aplicación
3. Haz click en "Analizar Workflow"
4. Observa el análisis que genera la IA
5. Lee las sugerencias para resolver

---

## Crear Tus Propios Ejemplos

Para analizar tus workflows reales:

1. Exporta el JSON de tu workflow desde tu plataforma
2. Copia los logs de ejecución
3. Include los atributos actuales
4. Pega todo en la estructura requerida:

```json
{
  "workflow": {
    /* Tu workflow aquí */
  },
  "logs": [
    /* Array de logs aquí */
  ],
  "attributes": {
    /* Tus atributos aquí */
  }
}
```

5. ¡Analiza!

---

## Tips

- ✅ Los ejemplos pueden ayudarte a entender el formato
- ✅ Puedes modificar valores para probar diferentes escenarios
- ✅ El historial guarda tus análisis para referencia
- ✅ Usa la opción "Limpiar Todo" para empezar de nuevo

¡Diviértete debuggeando workflows! 🚀
