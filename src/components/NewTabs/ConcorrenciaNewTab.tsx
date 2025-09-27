import React from 'react';
import { NewReportData } from '../../types/newReport';
import { Shield, DollarSign, TrendingDown, Target, Users, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import { MetricCard } from '../UI/MetricCard';

interface ConcorrenciaNewTabProps {
  data: NewReportData;
}

export const ConcorrenciaNewTab: React.FC<ConcorrenciaNewTabProps> = ({ data }) => {
  const { competitiveAnalysis } = data;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <section className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header Ultra-Moderno */}
      <header className="flex items-center space-x-4 mb-8">
        <div className="p-3 glass-card glow-effect">
          <Shield className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">{competitiveAnalysis.title}</h1>
      </header>

      {/* Métricas de Competição */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Top Concorrentes"
          value={competitiveAnalysis.competitorMapping.top5.competitors.length}
          icon={Shield}
          color="red"
        />
        <MetricCard
          title="Preços Mapeados"
          value={competitiveAnalysis.pricingIntelligence.table.rows.length}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Intel Coletada"
          value="100%"
          icon={Target}
          color="blue"
        />
      </div>
      {/* Mapeamento de Concorrentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <Shield className="w-6 h-6 text-red-400" />
              <span>{competitiveAnalysis.competitorMapping.top5.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitiveAnalysis.competitorMapping.top5.competitors.map((concorrente, index) => (
                <div key={index} className="flex items-center justify-between py-4 px-5 glass-card hover:glow-effect transition-all duration-300 group border border-red-500/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <span className="text-red-400 font-bold text-lg">#{index + 1}</span>
                    </div>
                    <span className="text-red-300 font-bold text-lg group-hover:text-red-200 transition-colors">{concorrente}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm font-medium">ATIVO</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <Users className="w-6 h-6 text-slate-400" />
              <span>Todos os Concorrentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="highlight">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdownText(competitiveAnalysis.competitorMapping.allCompetitors) }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inteligência de Preços */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-green-400" />
            <span>{competitiveAnalysis.pricingIntelligence.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mb-6">
            <table className="modern-table w-full">
              <thead>
                <tr>
                  {competitiveAnalysis.pricingIntelligence.table.headers.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left label-text text-orange-400">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitiveAnalysis.pricingIntelligence.table.rows.map((item, index) => (
                  <tr key={index} className="group hover:bg-orange-500/5 transition-all duration-300">
                    <td className="px-6 py-4 text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span>{item.Concorrente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{item["Produto/Diluição"]}</td>
                    <td className="px-6 py-4 text-sm text-green-400 font-bold">{item["Preço Mencionado"]}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{item.Volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="highlight">
            <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Análise da Estratégia de Precificação</span>
            </h4>
            <div 
              className="text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMarkdownText(competitiveAnalysis.pricingIntelligence.analysis) }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Estratégias e Pontos Fracos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <TrendingDown className="w-6 h-6 text-amber-400" />
              <span>Táticas dos Concorrentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="highlight border-l-4 border-amber-400">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdownText(competitiveAnalysis.competitorStrategies.strategies) }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span>Pontos Fracos dos Concorrentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="highlight border-l-4 border-emerald-400">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdownText(competitiveAnalysis.competitorStrategies.weaknesses) }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};