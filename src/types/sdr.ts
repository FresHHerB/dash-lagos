export interface SDRReport {
  metadata: {
    report_name: string;
    generated_at: string;
    timezone: string;
    reference_date: string;
    data_coverage: {
      rows_total: number;
      period_start: string;
      period_end: string;
    };
    filters_used: {
      vendedores: string[];
      regioes: string[];
      cidades: string[];
      segmentos: string[];
      periodo: {
        start: string;
        end: string;
      };
    };
    source_info: {
      file_name: string;
      hash: string;
      schema_version: string;
    };
  };
  higienizacao_normalizacao: {
    regras_aplicadas: {
      datas_iso: boolean;
      padronizacao_cidade_regiao: boolean;
      telefone_e164: boolean;
      normalizacao_diluicao_embalagem: boolean;
      dicionario_concorrentes: boolean;
      deduplicacao_cliente_cidade_mesmo_dia: boolean;
    };
    indicadores_limpeza: {
      telefones_invalidos: number;
      enderecos_residenciais: number;
      nao_encontrado_local: number;
      sem_decisor_identificado: number;
      registros_deduplicados: number;
    };
  };
  funil_conversoes: {
    global: {
      volumes: {
        prospects: number;
        testes_deixados: number;
        testes_aprovados: number;
        cadastros_enviados: number;
        pedidos: number;
        recompras: number;
        reativacoes: number;
        reativacoes_com_pedido: number;
      };
      conversoes: {
        prospect_para_teste: number;
        teste_para_aprovado: number;
        aprovado_para_pedido: number;
        reativacao_para_pedido: number;
      };
      tempos_medios_dias: {
        prospect_para_teste: number;
        teste_para_pedido: number;
        reativacao_para_pedido: number;
        percentis: {
          p50_teste_para_pedido: number;
          p75_teste_para_pedido: number;
        };
      };
      qualidade_contato: {
        pct_telefone_valido: number;
        pct_decisor_identificado: number;
        pct_dados_invalidos: number;
      };
    };
    por_dimensao: {
      vendedor: any[];
      regiao: any[];
      cidade: any[];
      segmento: any[];
    };
  };
  scorecard_vendedores: Array<{
    vendedor: string;
    metricas: {
      atividade: number;
      efetividade: number;
      velocidade: number;
      estrategia: number;
      qualidade_dados: number;
    };
    pesos: {
      atividade: number;
      efetividade: number;
      velocidade: number;
      estrategia: number;
      qualidade_dados: number;
    };
    score_total_0a100: number;
    destaques: string[];
    recomendacoes: string[];
  }>;
  mapa_regiao_cidade: Array<{
    cidade: string;
    regiao: string;
    volume_prospects: number;
    win_rate_teste_para_pedido: number;
    tempo_medio_teste_para_pedido_dias: number;
    concorrentes_principais: string[];
    observacoes: string;
  }>;
  oportunidades_prioritarias: {
    criterios_scoring: {
      peso_potencial_consumo: number;
      peso_teste_aprovado: number;
      peso_gap_preco_favoravel: number;
      peso_decisor_identificado: number;
      penalidade_objeções_rigidas: number;
    };
    lista_top: Array<{
      cliente: string;
      cidade: string;
      regiao: string;
      segmento: string;
      estagio_funil: string;
      proxima_acao: string;
      data_proxima_acao: string;
      concorrente_preco_bruto: {
        concorrente: string;
        item: string;
        preco_bomba_50L: number;
        diluicao: string;
      };
      normalizacao_preco: {
        rs_por_litro_concentrado: number;
        rs_por_litro_pronto: number;
      };
      produtos_sugeridos: string[];
      argumento_valor: string;
      probabilidade_fechamento: number;
      responsavel_vendedor: string;
      roteiro_followup: string;
    }>;
  };
  competicao_preco: {
    tabela_concorrentes_normalizada: Array<{
      concorrente: string;
      item: string;
      preco_bomba_50L: number;
      diluicao: string;
      rs_por_litro_concentrado: number;
      rs_por_litro_pronto: number;
      observacao: string;
    }>;
    comparativo_nossa_linha: Array<{
      categoria: string;
      nosso_produto: string;
      diluicao_recomendada: string;
      rs_por_litro_concentrado: number;
      rs_por_litro_pronto: number;
      diferenciais: string[];
    }>;
  };
  produto_pmf: {
    aprovacao_teste_por_produto: Array<{
      produto: string;
      aprovacoes: number;
      testes: number;
      taxa_aprovacao: number;
    }>;
    aprovacao_por_segmento: Array<{
      segmento: string;
      taxa_aprovacao: number;
      produtos_ancora: string[];
    }>;
    combos_vencedores: Array<{
      combo: string[];
      segmento_alvo: string;
      uplift_conversao_pp: number;
    }>;
    cross_sell_itens_correlatos: Array<{
      item: string;
      efeito_ticket_medio: number;
      segmento: string;
    }>;
  };
  objeções_playbooks: {
    top_objeções: Array<{
      objeção: string;
      frequencia: number;
      taxa_superacao: number;
      playbook: {
        resumo_acao: string;
        roteiro_mensagem: string;
        provas_suporte: string[];
        proxima_etapa: string;
      };
    }>;
  };
  alertas_operacionais: {
    teste_aprovado_sem_pedido: {
      maior_que_7_dias: Array<{
        cliente: string;
        cidade: string;
        vendedor: string;
        data_teste: string;
        dias_desde_teste: number;
        telefone: string;
        mensagem_sugerida: string;
      }>;
      maior_que_14_dias: any[];
    };
    agendamentos_proximos: Array<{
      cliente: string;
      cidade: string;
      data_hora: string;
      assunto: string;
      responsavel_vendedor: string;
    }>;
    alto_consumo_sem_cadastro: Array<{
      cliente: string;
      indicador_consumo: string;
      acao_sugerida: string;
      responsavel_vendedor: string;
    }>;
    risco_credito: Array<{
      cliente: string;
      tipo_risco: string;
      politica_sugerida: string;
      observacao: string;
    }>;
  };
  qualidade_dados: {
    indicadores: {
      pct_telefones_invalidos: number;
      pct_endereco_residencial: number;
      pct_nao_encontrado: number;
      pct_sem_decisor: number;
      campos_faltantes_criticos: string[];
    };
    plano_melhoria_30_dias: Array<{
      acao: string;
      owner: string;
      meta: string;
      prazo: string;
    }>;
  };
  metodologia_notas: {
    parsing_extracao: Record<string, boolean>;
    formulas: Record<string, string>;
    assumptions: string[];
    limitacoes: string[];
  };
  resumo_executivo: {
    ganhos: string[];
    gargalos: string[];
    acoes_imediatas: string[];
  };
  dashboards_tabelas: Record<string, any[]>;
  next_best_actions: Array<{
    vendedor: string;
    acoes: Array<{
      cliente: string;
      motivo_priorizacao: string;
      produto_recomendado: string;
      roteiro_2a3_frases: string;
      data_sugerida: string;
      dependencias: string[];
    }>;
  }>;
}