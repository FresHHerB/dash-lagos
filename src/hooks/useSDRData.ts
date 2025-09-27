import { useState, useEffect, useCallback } from 'react';
import { SDRReport } from '../types/sdr';

// Dados de fallback caso a API não retorne no formato esperado
const FALLBACK_DATA: SDRReport = {
  metadata: {
    report_name: "Relatório CRM - Lagos Química",
    generated_at: new Date().toISOString(),
    timezone: "America/Sao_Paulo",
    reference_date: new Date().toISOString().split('T')[0],
    data_coverage: {
      rows_total: 0,
      period_start: new Date().toISOString().split('T')[0],
      period_end: new Date().toISOString().split('T')[0]
    },
    filters_used: {
      vendedores: [],
      regioes: [],
      cidades: [],
      segmentos: [],
      periodo: {
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      }
    },
    source_info: {
      file_name: "dados_api.json",
      hash: "api_data",
      schema_version: "1.0.0"
    }
  },
  higienizacao_normalizacao: {
    regras_aplicadas: {
      datas_iso: true,
      padronizacao_cidade_regiao: true,
      telefone_e164: true,
      normalizacao_diluicao_embalagem: true,
      dicionario_concorrentes: true,
      deduplicacao_cliente_cidade_mesmo_dia: true
    },
    indicadores_limpeza: {
      telefones_invalidos: 0,
      enderecos_residenciais: 0,
      nao_encontrado_local: 0,
      sem_decisor_identificado: 0,
      registros_deduplicados: 0
    }
  },
  funil_conversoes: {
    global: {
      volumes: {
        prospects: 0,
        testes_deixados: 0,
        testes_aprovados: 0,
        cadastros_enviados: 0,
        pedidos: 0,
        recompras: 0,
        reativacoes: 0,
        reativacoes_com_pedido: 0
      },
      conversoes: {
        prospect_para_teste: 0,
        teste_para_aprovado: 0,
        aprovado_para_pedido: 0,
        reativacao_para_pedido: 0
      },
      tempos_medios_dias: {
        prospect_para_teste: 0,
        teste_para_pedido: 0,
        reativacao_para_pedido: 0,
        percentis: {
          p50_teste_para_pedido: 0,
          p75_teste_para_pedido: 0
        }
      },
      qualidade_contato: {
        pct_telefone_valido: 0,
        pct_decisor_identificado: 0,
        pct_dados_invalidos: 0
      }
    },
    por_dimensao: {
      vendedor: [],
      regiao: [],
      cidade: [],
      segmento: []
    }
  },
  scorecard_vendedores: [],
  mapa_regiao_cidade: [],
  oportunidades_prioritarias: {
    criterios_scoring: {
      peso_potencial_consumo: 0,
      peso_teste_aprovado: 0,
      peso_gap_preco_favoravel: 0,
      peso_decisor_identificado: 0,
      penalidade_objeções_rigidas: 0
    },
    lista_top: []
  },
  competicao_preco: {
    tabela_concorrentes_normalizada: [],
    comparativo_nossa_linha: []
  },
  produto_pmf: {
    aprovacao_teste_por_produto: [],
    aprovacao_por_segmento: [],
    combos_vencedores: [],
    cross_sell_itens_correlatos: []
  },
  objeções_playbooks: {
    top_objeções: []
  },
  alertas_operacionais: {
    teste_aprovado_sem_pedido: {
      maior_que_7_dias: [],
      maior_que_14_dias: []
    },
    agendamentos_proximos: [],
    alto_consumo_sem_cadastro: [],
    risco_credito: []
  },
  qualidade_dados: {
    indicadores: {
      pct_telefones_invalidos: 0,
      pct_endereco_residencial: 0,
      pct_nao_encontrado: 0,
      pct_sem_decisor: 0,
      campos_faltantes_criticos: []
    },
    plano_melhoria_30_dias: []
  },
  metodologia_notas: {
    parsing_extracao: {},
    formulas: {},
    assumptions: [],
    limitacoes: []
  },
  resumo_executivo: {
    ganhos: [],
    gargalos: [],
    acoes_imediatas: []
  },
  dashboards_tabelas: {},
  next_best_actions: []
};

export const useSDRData = (apiUrl: string) => {
  const [data, setData] = useState<SDRReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [rawApiData, setRawApiData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    if (!apiUrl) {
      setError('URL da API não configurada');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fazendo requisição para:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta da API:', result);
      
      // Armazena os dados brutos da API
      setRawApiData(result);
      
      // Verifica se a resposta tem o formato esperado do SDR
      if (result && typeof result === 'object') {
        // Se a resposta contém dados no formato SDR esperado, usa eles
        if (result.metadata || result.funil_conversoes || result.scorecard_vendedores) {
          setData(result as SDRReport);
        } else {
          // Se não está no formato esperado, usa dados de fallback mas mostra que recebeu dados
          console.log('API retornou dados em formato diferente, usando fallback');
          const fallbackWithApiInfo = {
            ...FALLBACK_DATA,
            metadata: {
              ...FALLBACK_DATA.metadata,
              report_name: "Dados recebidos da API - Formato não padrão",
              source_info: {
                ...FALLBACK_DATA.metadata.source_info,
                file_name: "api_response.json"
              }
            }
          };
          setData(fallbackWithApiInfo);
        }
      } else {
        throw new Error('Resposta da API inválida');
      }
      
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      
      // Em caso de erro, ainda mostra a interface com dados de fallback
      setData(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    rawApiData
  };
};