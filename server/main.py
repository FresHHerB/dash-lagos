# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
import uvicorn
import asyncio
import json
from datetime import datetime

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dados de exemplo para o relatório CRM
SAMPLE_DATA = {
    "metadata": {
        "report_name": "Analise_SDR_Mercado_Limpeza",
        "generated_at": datetime.now().isoformat(),
        "timezone": "America/Sao_Paulo",
        "reference_date": "2024-01-15",
        "data_coverage": {
            "rows_total": 1250,
            "period_start": "2024-01-01",
            "period_end": "2024-01-15"
        },
        "filters_used": {
            "vendedores": ["João Silva", "Maria Santos", "Pedro Costa"],
            "regioes": ["Sul", "Sudeste"],
            "cidades": ["São Paulo", "Rio de Janeiro", "Curitiba"],
            "segmentos": ["Lava-Jato", "Posto de Combustível", "Transportadora"],
            "periodo": {
                "start": "2024-01-01",
                "end": "2024-01-15"
            }
        },
        "source_info": {
            "file_name": "dados_sdr_jan2024.xlsx",
            "hash": "abc123def456",
            "schema_version": "1.0.0"
        }
    },
    "higienizacao_normalizacao": {
        "regras_aplicadas": {
            "datas_iso": True,
            "padronizacao_cidade_regiao": True,
            "telefone_e164": True,
            "normalizacao_diluicao_embalagem": True,
            "dicionario_concorrentes": True,
            "deduplicacao_cliente_cidade_mesmo_dia": True
        },
        "indicadores_limpeza": {
            "telefones_invalidos": 45,
            "enderecos_residenciais": 23,
            "nao_encontrado_local": 12,
            "sem_decisor_identificado": 67,
            "registros_deduplicados": 89
        }
    },
    "funil_conversoes": {
        "global": {
            "volumes": {
                "prospects": 1250,
                "testes_deixados": 456,
                "testes_aprovados": 234,
                "cadastros_enviados": 189,
                "pedidos": 123,
                "recompras": 45,
                "reativacoes": 67,
                "reativacoes_com_pedido": 34
            },
            "conversoes": {
                "prospect_para_teste": 0.365,
                "teste_para_aprovado": 0.513,
                "aprovado_para_pedido": 0.526,
                "reativacao_para_pedido": 0.507
            },
            "tempos_medios_dias": {
                "prospect_para_teste": 3.2,
                "teste_para_pedido": 7.8,
                "reativacao_para_pedido": 5.4,
                "percentis": {
                    "p50_teste_para_pedido": 6.0,
                    "p75_teste_para_pedido": 10.0
                }
            },
            "qualidade_contato": {
                "pct_telefone_valido": 0.89,
                "pct_decisor_identificado": 0.76,
                "pct_dados_invalidos": 0.11
            }
        },
        "por_dimensao": {
            "vendedor": [],
            "regiao": [],
            "cidade": [],
            "segmento": []
        }
    },
    "scorecard_vendedores": [
        {
            "vendedor": "João Silva",
            "metricas": {
                "atividade": 85.0,
                "efetividade": 78.0,
                "velocidade": 92.0,
                "estrategia": 76.0,
                "qualidade_dados": 88.0
            },
            "pesos": {
                "atividade": 0.20,
                "efetividade": 0.30,
                "velocidade": 0.20,
                "estrategia": 0.20,
                "qualidade_dados": 0.10
            },
            "score_total_0a100": 81.4,
            "destaques": [
                "Melhor velocidade de resposta da equipe",
                "Excelente qualidade nos dados coletados",
                "Alta atividade de prospecção"
            ],
            "recomendacoes": [
                "Focar em melhorar a efetividade das abordagens",
                "Desenvolver estratégias de follow-up mais assertivas"
            ]
        },
        {
            "vendedor": "Maria Santos",
            "metricas": {
                "atividade": 72.0,
                "efetividade": 89.0,
                "velocidade": 68.0,
                "estrategia": 84.0,
                "qualidade_dados": 91.0
            },
            "pesos": {
                "atividade": 0.20,
                "efetividade": 0.30,
                "velocidade": 0.20,
                "estrategia": 0.20,
                "qualidade_dados": 0.10
            },
            "score_total_0a100": 79.8,
            "destaques": [
                "Maior taxa de conversão da equipe",
                "Estratégias bem estruturadas",
                "Dados sempre completos e precisos"
            ],
            "recomendacoes": [
                "Aumentar volume de atividades diárias",
                "Melhorar tempo de resposta aos leads"
            ]
        },
        {
            "vendedor": "Pedro Costa",
            "metricas": {
                "atividade": 91.0,
                "efetividade": 65.0,
                "velocidade": 74.0,
                "estrategia": 69.0,
                "qualidade_dados": 82.0
            },
            "pesos": {
                "atividade": 0.20,
                "efetividade": 0.30,
                "velocidade": 0.20,
                "estrategia": 0.20,
                "qualidade_dados": 0.10
            },
            "score_total_0a100": 72.6,
            "destaques": [
                "Maior volume de atividades da equipe",
                "Boa qualidade nos dados coletados"
            ],
            "recomendacoes": [
                "Focar em qualificar melhor os leads antes da abordagem",
                "Desenvolver argumentação mais persuasiva",
                "Melhorar estratégias de objeção"
            ]
        }
    ],
    "mapa_regiao_cidade": [],
    "oportunidades_prioritarias": {
        "criterios_scoring": {
            "peso_potencial_consumo": 0.3,
            "peso_teste_aprovado": 0.25,
            "peso_gap_preco_favoravel": 0.2,
            "peso_decisor_identificado": 0.15,
            "penalidade_objeções_rigidas": 0.1
        },
        "lista_top": []
    },
    "competicao_preco": {
        "tabela_concorrentes_normalizada": [],
        "comparativo_nossa_linha": []
    },
    "produto_pmf": {
        "aprovacao_teste_por_produto": [],
        "aprovacao_por_segmento": [],
        "combos_vencedores": [],
        "cross_sell_itens_correlatos": []
    },
    "objeções_playbooks": {
        "top_objeções": []
    },
    "alertas_operacionais": {
        "teste_aprovado_sem_pedido": {
            "maior_que_7_dias": [
                {
                    "cliente": "Auto Center Silva",
                    "cidade": "São Paulo",
                    "vendedor": "João Silva",
                    "data_teste": "2024-01-05",
                    "dias_desde_teste": 10,
                    "telefone": "+55 11 99999-1234",
                    "mensagem_sugerida": "Olá! Como foi o teste do nosso produto? Gostaria de saber sua opinião e ajudar com o pedido."
                },
                {
                    "cliente": "Lava Jato Express",
                    "cidade": "Rio de Janeiro",
                    "vendedor": "Maria Santos",
                    "data_teste": "2024-01-03",
                    "dias_desde_teste": 12,
                    "telefone": "+55 21 98888-5678",
                    "mensagem_sugerida": "Oi! Notei que testaram nosso produto há alguns dias. Posso ajudar com alguma dúvida sobre o pedido?"
                }
            ],
            "maior_que_14_dias": []
        },
        "agendamentos_proximos": [
            {
                "cliente": "Transportadora Rápida",
                "cidade": "Curitiba",
                "data_hora": "2024-01-16T14:00:00-03:00",
                "assunto": "Apresentação linha completa",
                "responsavel_vendedor": "Pedro Costa"
            },
            {
                "cliente": "Posto Estrela",
                "cidade": "São Paulo",
                "data_hora": "2024-01-17T09:30:00-03:00",
                "assunto": "Follow-up teste aprovado",
                "responsavel_vendedor": "João Silva"
            }
        ],
        "alto_consumo_sem_cadastro": [
            {
                "cliente": "Lava Car Premium",
                "indicador_consumo": "2 bombonas/semana",
                "acao_sugerida": "enviar_ficha_cadastro",
                "responsavel_vendedor": "Maria Santos"
            }
        ],
        "risco_credito": [
            {
                "cliente": "Auto Wash Center",
                "tipo_risco": "nome_sujo",
                "politica_sugerida": "avista",
                "observacao": "Cliente com histórico de inadimplência, sugerir pagamento à vista"
            }
        ]
    },
    "qualidade_dados": {
        "indicadores": {
            "pct_telefones_invalidos": 0.036,
            "pct_endereco_residencial": 0.018,
            "pct_nao_encontrado": 0.010,
            "pct_sem_decisor": 0.054,
            "campos_faltantes_criticos": ["email", "cnpj"]
        },
        "plano_melhoria_30_dias": []
    },
    "metodologia_notas": {
        "parsing_extracao": {
            "etapa_funil_inferida": True,
            "proxima_acao_data": True,
            "concorrente_citado": True,
            "precos_diluicoes": True,
            "produtos_citados": True,
            "segmento_cliente": True,
            "consumo_estimado": True,
            "decisor_matriz_terceirizado": True,
            "risco_credito": True,
            "interesse_especial": True,
            "objeção": True,
            "origem_lead": True
        },
        "formulas": {
            "rs_por_litro_concentrado": "preco_bomba / litros_embalagem",
            "litros_prontos": "litros_embalagem * (parte_agua + 1)",
            "rs_por_litro_pronto": "preco_bomba / litros_prontos"
        },
        "assumptions": [
            "Mapeamento 3x1 -> proporcao 1:3 (total 4 partes)",
            "Datas relativas convertidas com base em 'reference_date'",
            "Concorrentes com grafias distintas unificados via dicionario"
        ],
        "limitacoes": []
    },
    "resumo_executivo": {
        "ganhos": [
            "Taxa de conversão teste→pedido acima da média do setor (52.6%)",
            "Tempo médio de conversão dentro do esperado (7.8 dias)",
            "Boa qualidade dos dados coletados (89% telefones válidos)"
        ],
        "gargalos": [
            "Taxa de conversão prospect→teste pode melhorar (36.5%)",
            "Alguns vendedores com baixa efetividade",
            "Testes aprovados sem follow-up adequado"
        ],
        "acoes_imediatas": [
            "Fazer follow-up dos testes aprovados há mais de 7 dias",
            "Treinar equipe em técnicas de qualificação de leads",
            "Implementar processo de follow-up estruturado"
        ]
    },
    "dashboards_tabelas": {},
    "next_best_actions": []
}


@app.post("/api/teste")
async def processar_dados(request: Request = None):
    """
    Endpoint para retornar dados do relatório CRM.
    """
    try:
        # Se houver dados no request, você pode processá-los aqui
        if request:
            try:
                data = await request.json()
                print("Dados recebidos:", data)
            except:
                pass  # Ignora se não houver JSON no body
        
        # Retorna os dados de exemplo
        return SAMPLE_DATA
        
    except Exception as e:
        return {"status": "error", "message": str(e)}


async def main():
    # Obtém a porta do servidor Uvicorn (pode ser configurada)
    port = 8000

    # Inicia o Ngrok para expor a porta 8000 publicamente
    public_url = ngrok.connect(port).public_url
    print(f"URL pública do Ngrok: {public_url}")
    print(f"URL do endpoint: {public_url}/api/teste")

    # Inicia o servidor Uvicorn para rodar a API
    config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="info")
    server = uvicorn.Server(config)

    # Roda o servidor Uvicorn no mesmo loop de eventos do Ngrok
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())