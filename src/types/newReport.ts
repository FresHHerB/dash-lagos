export interface NewReportData {
  reportTitle: string;
  executiveSummary: {
    title: string;
    summary: string;
    principais_insights?: string[];
    recomendacoes_urgentes?: string[];
  };
  performanceAnalysis: {
    title: string;
    bySalesRep: {
      title: string;
      table: {
        headers: string[];
        rows: Array<{
          Vendedor: string;
          "Volume Total de Atividades": number;
          "Mix de Atividades (% Prospect / Reativação / Teste)": string;
          "Taxa de Sucesso em Testes": string;
        }>;
      };
      qualitativeAnalysis: string;
    };
    geographicPerformance: {
      title: string;
      topCities: {
        title: string;
        cities: string[];
      };
      analysis: string;
    };
  };
  competitiveAnalysis: {
    title: string;
    competitorMapping: {
      title: string;
      allCompetitors: string;
      top5: {
        title: string;
        competitors: string[];
      };
    };
    pricingIntelligence: {
      title: string;
      table: {
        headers: string[];
        rows: Array<{
          Concorrente: string;
          "Produto/Diluição": string;
          "Preço Mencionado": string;
          Volume: string;
        }>;
      };
      analysis: string;
    };
    competitorStrategies: {
      title: string;
      strategies: string;
      weaknesses: string;
    };
  };
  clientAnalysis: {
    title: string;
    icp: {
      title: string;
      analysis: string;
    };
    objectionMatrix: {
      title: string;
      table: {
        headers: string[];
        rows: Array<{
          "Objeção Comum": string;
          "Contra-Argumento / Ação do Vendedor": string;
        }>;
      };
    };
    lossReasons: {
      title: string;
      analysis: string;
    };
  };
  productAnalysis: {
    title: string;
    portfolioPerformance: {
      title: string;
      analysis: string;
    };
    salesArguments: {
      title: string;
      analysis: string;
    };
  };
  strategicInsights: {
    title: string;
    swot: {
      title: string;
      strengths: {
        title: string;
        points: string[];
      };
      weaknesses: {
        title: string;
        points: string[];
      };
      opportunities: {
        title: string;
        points: string[];
      };
      threats: {
        title: string;
        points: string[];
      };
    };
    recommendations: {
      title: string;
      salesLeadership: {
        title: string;
        points: string[];
      };
      marketingProduct: {
        title: string;
        points: string[];
      };
      sdrTeam: {
        title: string;
        points: string[];
      };
    };
  };
}

export interface NewApiResponse {
  status: string;
  message: string;
  dados_recebidos: NewReportData;
}