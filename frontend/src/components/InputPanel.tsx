import React, { useState } from 'react';
import { useAnalysisStore } from '../store';

const EXAMPLE_WORKFLOW = {
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
};

const EXAMPLE_KUSTOMER_WORKFLOW = {
            "type": "workflow",
            "id": "61b928c394014f001b1f3b0b",
            "attributes": {
                "name": "bot---new-mi-tienda",
                "meta": {
                    "displayName": "Bot - New Mi tienda"
                },
                "description": "",
                "trigger": {
                    "transitions": [
                        {
                            "target": "Kvbo2Fjhm",
                            "condition": {
                                "op": "true",
                                "values": [
                                    true
                                ]
                            }
                        }
                    ],
                    "id": "1",
                    "callable": true,
                    "schema": {
                        "properties": {
                            "conversationId": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "conversationId"
                        ]
                    },
                    "eventName": "kustomer.workflow.61b928c394014f001b1f3b0b.call"
                },
                "response": {
                    "schema": {
                        "properties": {},
                        "required": []
                    }
                },
                "steps": [
                    {
                        "id": "Kvbo2Fjhm",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.find-by-id",
                        "params": {
                            "id": "/#steps.1.conversationId"
                        },
                        "transitions": [
                            {
                                "target": "8dJvVsfGa",
                                "condition": {
                                    "op": "contains",
                                    "values": [
                                        "/#steps.Kvbo2Fjhm.tags",
                                        [
                                            "6092bfa4d97cea6b6f9a0ff6"
                                        ]
                                    ]
                                },
                                "meta": {
                                    "name": "cpgsactiveordens"
                                }
                            },
                            {
                                "target": "h6pqcA4Ih",
                                "condition": {
                                    "op": "contains",
                                    "values": [
                                        "/#steps.Kvbo2Fjhm.tags",
                                        [
                                            "6026c810c6e44b2e383e1dbf"
                                        ]
                                    ]
                                },
                                "meta": {
                                    "name": "mitiendacpgcatalogandproduct"
                                }
                            },
                            {
                                "target": "o-FSRNTfu",
                                "condition": {
                                    "op": "contains",
                                    "values": [
                                        "/#steps.Kvbo2Fjhm.tags",
                                        [
                                            "62309f73ba0adb86aa42622d"
                                        ]
                                    ]
                                },
                                "meta": {
                                    "name": "Sel Onboarding"
                                }
                            },
                            {
                                "target": "2tFpuC3S2",
                                "condition": {
                                    "op": "or",
                                    "values": [
                                        {
                                            "op": "eq",
                                            "values": [
                                                "/#steps.Kvbo2Fjhm.defaultLang",
                                                "pt_br"
                                            ]
                                        },
                                        {
                                            "op": "eq",
                                            "values": [
                                                "/#steps.Kvbo2Fjhm.defaultLang",
                                                "pt"
                                            ]
                                        }
                                    ]
                                },
                                "meta": {
                                    "name": "End conversation"
                                }
                            },
                            {
                                "target": "ekamBrTt2",
                                "condition": {
                                    "op": "exists",
                                    "values": [
                                        "true",
                                        ""
                                    ]
                                }
                            }
                        ],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb4d"
                    },
                    {
                        "id": "ekamBrTt2",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "SS"
                            },
                            "queue": "5fce94b7dc76150019710806",
                            "subStatus": "5e7e6cbb7427c1001a4b3750"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb4e"
                    },
                    {
                        "id": "o-FSRNTfu",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "SS"
                            },
                            "queue": "5d718d3d773704001d488fa0"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb4f"
                    },
                    {
                        "id": "8dJvVsfGa",
                        "transitions": [
                            {
                                "target": "y9Fmgz9kD",
                                "condition": {
                                    "op": "eq",
                                    "values": [
                                        "/#steps.Kvbo2Fjhm.custom.countryMiTiendaStr",
                                        "br"
                                    ]
                                },
                                "meta": {
                                    "name": "BR"
                                }
                            },
                            {
                                "target": "gixKAyud5",
                                "condition": {
                                    "op": "exists",
                                    "values": [
                                        true
                                    ]
                                },
                                "meta": {
                                    "name": "SS"
                                }
                            }
                        ],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb50"
                    },
                    {
                        "id": "gixKAyud5",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "SS"
                            },
                            "queue": "5f3da0527d93220019c112e1",
                            "subStatus": "5e7e6cbb7427c1001a4b3750"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb51"
                    },
                    {
                        "id": "y9Fmgz9kD",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "SS"
                            },
                            "queue": "5e7140649ae78f001322a0c4",
                            "subStatus": "5e7e6cbb7427c1001a4b3750"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb52"
                    },
                    {
                        "id": "h6pqcA4Ih",
                        "transitions": [
                            {
                                "target": "dfb4RYAer",
                                "condition": {
                                    "op": "eq",
                                    "values": [
                                        "/#steps.Kvbo2Fjhm.custom.countryMiTiendaStr",
                                        "br"
                                    ]
                                },
                                "meta": {
                                    "name": "BR"
                                }
                            },
                            {
                                "target": "HspaGtI0w",
                                "condition": {
                                    "op": "exists",
                                    "values": [
                                        true
                                    ]
                                },
                                "meta": {
                                    "name": "SS"
                                }
                            }
                        ],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb53"
                    },
                    {
                        "id": "HspaGtI0w",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "SS"
                            },
                            "queue": "5fce94b7dc76150019710806",
                            "subStatus": "5e7e6cbb7427c1001a4b3750"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb54"
                    },
                    {
                        "id": "dfb4RYAer",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "SS"
                            },
                            "queue": "5fdb6d8ddc23d0001242525a",
                            "subStatus": "5e7e6cbb7427c1001a4b3750"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb55"
                    },
                    {
                        "id": "2tFpuC3S2",
                        "appVersion": "kustomer-^1.10.4",
                        "action": "kustomer.conversation.update",
                        "params": {
                            "id": "/#steps.1.conversationId",
                            "status": "done",
                            "custom": {
                                "operationTeamStr": "BR"
                            },
                            "queue": "5fdb6d8ddc23d0001242525a",
                            "subStatus": "5e7e6cbb7427c1001a4b3750"
                        },
                        "transitions": [],
                        "errorCases": [],
                        "_id": "67a38b117ccb42ffd767eb56"
                    }
                ],
                "appDisabled": false,
                "enabled": true,
                "editable": true,
                "updatedAt": "2025-02-05T16:00:17.984Z",
                "createdAt": "2021-12-14T23:29:07.310Z",
                "modifiedAt": "2025-02-05T16:00:17.984Z",
                "loggingAt": "2022-06-28T13:27:52.376Z",
                "containsVariables": false,
                "schedules": [],
                "rev": 135,
                "systemDisabled": false,
                "dynamicSchedules": false,
                "appSettings": [],
                "objectMapping": {
                    "mappedKlasses": []
                }
            },
            "relationships": {
                "org": {
                    "links": {
                        "self": "/v1/orgs/5d2f98fec7a28e001a2cfe04"
                    },
                    "data": {
                        "type": "org",
                        "id": "5d2f98fec7a28e001a2cfe04"
                    }
                },
                "createdBy": {
                    "links": {
                        "self": "/v1/users/5da632d39180e4001bc5c8a8"
                    },
                    "data": {
                        "type": "user",
                        "id": "5da632d39180e4001bc5c8a8"
                    }
                },
                "modifiedBy": {
                    "links": {
                        "self": "/v1/users/6217d41ec7fbd5d39ff97877"
                    },
                    "data": {
                        "type": "user",
                        "id": "6217d41ec7fbd5d39ff97877"
                    }
                }
            },
            "links": {
                "self": "/v1/workflows/61b928c394014f001b1f3b0b"
            }
        };

export const InputPanel: React.FC = () => {
  const { input, setInput } = useAnalysisStore();
  const [context, setContext] = useState<string>('');

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value);
      const dataToSet = context ? { ...parsed, context } : parsed;
      setInput(dataToSet);
    } catch {
      const incomplete = e.target.value;
      setInput(incomplete as unknown);
    }
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
    if (typeof input === 'object' && input !== null) {
      const updated = { ...input as Record<string, unknown>, context: e.target.value || undefined };
      setInput(updated);
    }
  };

  const loadExample1 = () => {
    setInput(EXAMPLE_WORKFLOW);
    setContext('');
  };

  const loadExample2 = () => {
    setInput(EXAMPLE_KUSTOMER_WORKFLOW);
    setContext('');
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* JSON Input */}
      <div className="flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-6 border border-slate-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">📥 Workflow JSON</h2>
          <div className="flex gap-2">
            <button
              onClick={loadExample1}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500 hover:shadow-lg"
              title="Ejemplo 1: Análisis con logs y attributes"
            >
              Ejemplo 1
            </button>
            <button
              onClick={loadExample2}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-purple-500 hover:shadow-lg"
              title="Ejemplo 2: Workflow Kustomer completo"
            >
              Ejemplo 2
            </button>
          </div>
        </div>

        <label className="block text-sm font-semibold text-slate-300 mb-3">
          Pega tu Workflow en JSON
        </label>

        <textarea
          value={typeof input === 'string' ? input : JSON.stringify(input, null, 2)}
          onChange={handleJsonChange}
          placeholder="Pega aquí: workflow directo, formato actual, o array de workflows..."
          className="w-full h-96 p-4 bg-slate-900 border border-slate-600 rounded-lg font-mono text-sm text-slate-100 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />

        <p className="text-xs text-slate-400 mt-3 flex flex-col gap-1">
          <span>✓ Formatos aceptados:</span>
          <span className="ml-3">• Workflow directo (ej: Kustomer JSON)</span>
          <span className="ml-3">• Objeto con {`{workflow, logs?, attributes?, context?}`}</span>
          <span className="ml-3">• Array de workflows para comparación</span>
        </p>
      </div>

      {/* Context Input */}
      <div className="flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl p-6 border border-slate-600">
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          📝 Contexto Adicional (opcional)
        </label>

        <textarea
          value={context}
          onChange={handleContextChange}
          placeholder="Agrrega notas en lenguaje natural para aclarar qué buscas investigar. Ej: 'Este workflow no debería ejecutarse en Brasil' o 'Compara estas 2 versiones'..."
          className="w-full h-24 p-4 bg-slate-900 border border-slate-600 rounded-lg font-mono text-sm text-slate-100 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />

        <p className="text-xs text-slate-400 mt-2">
          💡 El contexto ayuda a la IA a dar análisis más precisos y personalizados
        </p>
      </div>
    </div>
  );
};
