export interface IntelligenceReport {
  relatorio_de_inteligencia_de_vendas: {
    analise_de_produto_vendas: {
      performance_portfolio: {
        feedback_produtos: string;
        oportunidades_cross_sell: string;
        produtos_mais_testados: string;
      };
      eficacia_argumentos_venda: {
        analise: string;
      };
    };
    insights_estrategicos_recomendacoes: {
      recomendacoes_estrategicas: {
        para_equipe_sdr: string[];
        para_lideranca_vendas: string[];
        para_marketing_produto: string[];
      };
      analise_swot: {
        ameacas: string[];
        forcas: string[];
        fraquezas: string[];
        oportunidades: string[];
      };
    };
    analise_clientes_prospeccao: {
      matriz_objecoes_contra_argumentos: {
        tabela_objecoes: Array<{
          objecao: string;
          contra_argumento_acao: string[];
        }>;
      };
      perfil_de_cliente_icp: {
        analise: string;
      };
      motivos_de_perda: {
        analise: string;
      };
    };
    analise_competitiva: {
      mapeamento_concorrentes: {
        outros_concorrentes: string[];
        ranking_concorrentes: string[];
      };
      estrategias_pontos_fracos_concorrencia: {
        taticas_venda_concorrentes: string[];
        pontos_fracos_concorrentes: string[];
      };
      inteligencia_precos_produtos: {
        tabela_precos_concorrentes: Array<{
          concorrente: string;
          preco_mencionado: string;
          produto_diluicao: string;
          volume: string;
        }>;
        analise_estrategia_precificacao: string;
      };
    };
    sumario_executivo: {
      resumo: string;
      principais_insights: string[];
      recomendacoes_urgentes: string[];
    };
    analise_de_desempenho: {
      desempenho_por_vendedor: {
        tabela_vendedores: Array<{
          vendedor: string;
          mix_atividades: {
            Prospect: string;
            Reativacao: string;
            Teste: string;
          };
          volume_total: number;
          taxa_sucesso_testes: string;
        }>;
        analise_qualitativa: string;
      };
      desempenho_geografico: {
        top_10_cidades: string[];
        analise_geografica: string;
      };
    };
  };
}

export interface ApiResponse {
  status: string;
  message: string;
  dados_recebidos: IntelligenceReport;
}