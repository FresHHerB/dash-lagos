export const defaultReportData = {
  "reportTitle": "Relatório de Inteligência de Vendas - Análise de Atividades SDR",
  "executiveSummary": {
    "title": "Sumário Executivo",
    "summary": "A análise das atividades de SDR revela um cenário competitivo acirrado, marcado pela forte presença de concorrentes com estratégias de comodato (Start, Teixeira Pinto) e uma base pulverizada de players informais com preços agressivos. Nossos principais insights indicam que: 1) A performance da equipe é heterogênea, com vendedores como Kennedy e Wanderson demonstrando alta taxa de sucesso em testes, enquanto outros focam em volume; 2) Nosso portfólio possui produtos de alta performance, como a linha 'Super' e o 'Ativado 1000 Minério', que vencem em testes técnicos, mas também apresenta fragilidades em produtos-chave como o 'L100' e o 'Biorange'; 3) Existe uma oportunidade estratégica clara na expansão para o segmento de Revendas e no cross-sell de linhas complementares (domissanitária, predial). As recomendações mais urgentes são: 1) Para a Liderança: Resolver imediatamente os conflitos de carteira entre vendedores para evitar canibalização; 2) Para Marketing/Produto: Desenvolver e lançar um produto '4 em 1' competitivo para neutralizar ofertas rivais; 3) Para Treinamento: Implementar um treinamento focado em Venda de Valor vs. Preço, munindo a equipe com uma calculadora de Custo Total de Operação (TCO) para comprovar nossa vantagem econômica.",
    "principais_insights": [
      "Performance heterogênea da equipe com vendedores especialistas",
      "Produtos de alta performance vencem testes técnicos",
      "Oportunidade estratégica em Revendas e cross-sell"
    ],
    "recomendacoes_urgentes": [
      "Resolver conflitos de carteira entre vendedores",
      "Desenvolver produto '4 em 1' competitivo",
      "Implementar treinamento de Venda de Valor vs. Preço"
    ]
  },
  "performanceAnalysis": {
    "title": "1. Análise de Desempenho (Performance & KPI's)",
    "bySalesRep": {
      "title": "1.1. Desempenho por Vendedor",
      "table": {
        "headers": ["Vendedor", "Volume Total de Atividades", "Mix de Atividades (% Prospect / Reativação / Teste)", "Taxa de Sucesso em Testes"],
        "rows": [
          {
            "Vendedor": "Flavio",
            "Volume Total de Atividades": 51,
            "Mix de Atividades (% Prospect / Reativação / Teste)": "47% / 25% / 27%",
            "Taxa de Sucesso em Testes": "~42%"
          },
          {
            "Vendedor": "Wanderson",
            "Volume Total de Atividades": 82,
            "Mix de Atividades (% Prospect / Reativação / Teste)": "55% / 18% / 27%",
            "Taxa de Sucesso em Testes": "~64%"
          },
          {
            "Vendedor": "Kennedy",
            "Volume Total de Atividades": 64,
            "Mix de Atividades (% Prospect / Reativação / Teste)": "48% / 16% / 36%",
            "Taxa de Sucesso em Testes": "~65%"
          }
        ]
      },
      "qualitativeAnalysis": "A análise do perfil dos vendedores revela diferentes especializações: Flavio demonstra um alto volume de atividades, com um foco equilibrado e uma estratégia agressiva de deixar amostras. Wanderson e Kennedy se destacam pela alta atividade e, crucialmente, por uma elevada taxa de sucesso em testes."
    },
    "geographicPerformance": {
      "title": "1.2. Desempenho Geográfico",
      "topCities": {
        "title": "Top 10 Cidades por Volume de Atividades:",
        "cities": ["Conselheiro Lafaiete", "Barbacena", "Guaxupé", "São João del Rei", "Arcos", "Passos", "Leopoldina", "Muriaé", "Ouro Branco", "São Paulo"]
      },
      "analysis": "A análise geográfica aponta para 'territórios de ouro' onde a combinação de alto volume de atividades e alta taxa de sucesso em testes é evidente. Arcos (Kennedy), Guaxupé (Emilio), e a região de São João del Rei/Barroso (Wanderson) são exemplos claros de áreas com alta receptividade e performance."
    }
  },
  "competitiveAnalysis": {
    "title": "2. Análise Competitiva (Inteligência de Mercado)",
    "competitorMapping": {
      "title": "2.1. Mapeamento de Concorrentes",
      "allCompetitors": "Itaquímica, Start, Bugatti, Teixeira Pinto, São Vicente, Real Química, Multicar, Gmol, Magno, Cleaner, Vonix, Quimio, Protelim, Sandet, Ferrari Química, Plolimp, Rodol, Lumax, HFX, e diversos players locais/informais ('fundo de quintal').",
      "top5": {
        "title": "Top 5 Concorrentes Mais Citados:",
        "competitors": ["1. Itaquímica", "2. Start", "3. Bugatti", "4. Teixeira Pinto", "5. São Vicente / Players informais (Quimio, etc.)"]
      }
    },
    "pricingIntelligence": {
      "title": "2.2. Inteligência de Preços e Produtos Concorrentes",
      "table": {
        "headers": ["Concorrente", "Produto/Diluição", "Preço Mencionado", "Volume"],
        "rows": [
          {
            "Concorrente": "Itaquímica",
            "Produto/Diluição": "Ativado 1/100",
            "Preço Mencionado": "R$ 475,00",
            "Volume": "BB 200L"
          },
          {
            "Concorrente": "Bugatti",
            "Produto/Diluição": "Ativado + Solupan 1/40 (casal)",
            "Preço Mencionado": "R$ 470,00",
            "Volume": "BB 50L"
          }
        ]
      },
      "analysis": "A principal estratégia de precificação dos rivais varia. Itaquímica e Bugatti se posicionam com preços mais elevados em produtos de alta concentração."
    },
    "competitorStrategies": {
      "title": "2.3. Estratégias e Pontos Fracos da Concorrência",
      "strategies": "A estratégia mais impactante é o comodato de máquinas e diluidores (Start, Teixeira Pinto), que gera alta fidelização.",
      "weaknesses": "Qualidade do Produto: 'Suspeita de diluição incorreta' (Bugatti), 'produto muito agressivo à pele', 'produto muito fraco'."
    }
  },
  "clientAnalysis": {
    "title": "3. Análise de Clientes e Prospecção",
    "icp": {
      "title": "3.1. Perfil de Cliente (ICP)",
      "analysis": "A prospecção é fortemente concentrada em Lava-Jatos de todos os portes, que representam o maior volume de atividades. Em seguida, destacam-se as Transportadoras e Concreteiras."
    },
    "objectionMatrix": {
      "title": "3.2. Matriz de Objeções e Contra-Argumentos",
      "table": {
        "headers": ["Objeção Comum", "Contra-Argumento / Ação do Vendedor"],
        "rows": [
          {
            "Objeção Comum": "Preço Alto / Concorrente mais barato",
            "Contra-Argumento / Ação do Vendedor": "Realizar teste comparativo para provar a superioridade e o maior rendimento do nosso produto."
          },
          {
            "Objeção Comum": "Estoque Cheio",
            "Contra-Argumento / Ação do Vendedor": "Deixar amostras para teste futuro. Manter a cadência de visitas."
          }
        ]
      }
    },
    "lossReasons": {
      "title": "3.3. Motivos de Perda",
      "analysis": "A análise dos registros aponta para três categorias principais de perda: Lead Desqualificado, Barreiras Competitivas e Questões de Crédito/Fit."
    }
  },
  "productAnalysis": {
    "title": "4. Análise de Produto e Vendas",
    "portfolioPerformance": {
      "title": "4.1. Performance do Nosso Portfólio",
      "analysis": "O 'casal super' (Ativado Super e Bio Super) é o carro-chefe nos testes, seguido pelo Ativado 1000 Minério para sujeira pesada."
    },
    "salesArguments": {
      "title": "4.2. Eficácia dos Argumentos de Venda",
      "analysis": "Os argumentos de venda mais eficazes são baseados em demonstração prática e educação do cliente."
    }
  },
  "strategicInsights": {
    "title": "5. Insights Estratégicos e Recomendações Acionáveis",
    "swot": {
      "title": "Análise SWOT Resumida",
      "strengths": {
        "title": "Forças",
        "points": [
          "Portfólio com produtos de alta performance",
          "Equipe de vendas com alta capacidade técnica",
          "Capacidade de oferecer soluções de valor agregado",
          "Boa capilaridade geográfica em regiões estratégicas"
        ]
      },
      "weaknesses": {
        "title": "Fraquezas",
        "points": [
          "Conflito de carteira entre vendedores",
          "Inconsistência na performance de alguns produtos",
          "Falta de um produto '4 em 1' competitivo",
          "Qualidade inconsistente dos dados no CRM"
        ]
      },
      "opportunities": {
        "title": "Oportunidades",
        "points": [
          "Explorar os altos preços de concorrentes",
          "Capitalizar sobre as fraquezas dos concorrentes",
          "Segmento de Revenda pouco explorado",
          "Aumentar o ticket médio através do cross-sell"
        ]
      },
      "threats": {
        "title": "Ameaças",
        "points": [
          "Estratégia agressiva de comodato de máquinas",
          "Concorrência predatória de players informais",
          "Forte lealdade de clientes a concorrentes estabelecidos",
          "Aumento da popularidade de produtos 'tudo em um'"
        ]
      }
    },
    "recommendations": {
      "title": "Recomendações Estratégicas",
      "salesLeadership": {
        "title": "Para a Liderança de Vendas:",
        "points": [
          "Revisão e Alinhamento de Carteiras",
          "Implementar Treinamento de Venda de Valor",
          "Programa de Incentivo para Revendas"
        ]
      },
      "marketingProduct": {
        "title": "Para a Equipe de Marketing e Produto:",
        "points": [
          "Desenvolvimento de Produto '4 em 1'",
          "Criação de 'Battle Cards' Competitivos",
          "Revisão do Portfólio"
        ]
      },
      "sdrTeam": {
        "title": "Para a Equipe de SDR (Treinamento):",
        "points": [
          "Padronização do Registro de Informações",
          "Sessões de Compartilhamento de Boas Práticas",
          "Foco em Cross-Sell"
        ]
      }
    }
  }
};