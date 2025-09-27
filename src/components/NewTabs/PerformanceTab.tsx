import React from 'react';
import { NewReportData } from '../../types/newReport';
import { TrendingUp, Users, MapPin, Zap, Target, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import { MetricCard } from '../UI/MetricCard';

interface PerformanceTabProps {
  data: NewReportData;
}

export const PerformanceTab: React.FC<PerformanceTabProps> = ({ data }) => {
  const { performanceAnalysis } = data;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
      .replace(/\n/g, '<br />');
  };

  const parseSuccessRate = (rate: string) => {
    const match = rate.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  const getSuccessRateColor = (rate: string) => {
    const percentage = parseSuccessRate(rate);
    if (percentage >= 70) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header Ultra-Moderno */}
      <header className="flex items-center space-x-4 mb-8">
        <div className="p-3 glass-card glow-effect">
          <TrendingUp className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">{performanceAnalysis.title}</h1>
      </header>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total de Vendedores"
          value={performanceAnalysis.bySalesRep.table.rows.length}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Volume Médio"
          value={Math.round(performanceAnalysis.bySalesRep.table.rows.reduce((acc, row) => acc + row["Volume Total de Atividades"], 0) / performanceAnalysis.bySalesRep.table.rows.length)}
          icon={Zap}
          color="green"
        />
        <MetricCard
          title="Top Performer"
          value={performanceAnalysis.bySalesRep.table.rows.reduce((prev, current) => 
            (prev["Volume Total de Atividades"] > current["Volume Total de Atividades"]) ? prev : current
          ).Vendedor}
          icon={Award}
          color="yellow"
        />
      </div>

      {/* Tabela de Vendedores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <Users className="w-6 h-6 text-orange-400" />
            <span>{performanceAnalysis.bySalesRep.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="modern-table w-full">
              <thead>
                <tr>
                  {performanceAnalysis.bySalesRep.table.headers.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left label-text text-orange-400">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {performanceAnalysis.bySalesRep.table.rows.map((row, index) => (
                  <tr key={index} className="group hover:bg-orange-500/5 transition-all duration-300">
                    <td className="px-6 py-4 text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>{row.Vendedor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-400">{row["Volume Total de Atividades"]}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{row["Mix de Atividades (% Prospect / Reativação / Teste)"]}</td>
                    <td className={`px-6 py-4 text-sm font-bold ${getSuccessRateColor(row["Taxa de Sucesso em Testes"])}`}>
                      {row["Taxa de Sucesso em Testes"]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Análise Qualitativa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <Target className="w-6 h-6 text-emerald-400" />
            <span>Análise Qualitativa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="highlight">
            <div 
              className="text-gray-200 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: formatMarkdownText(performanceAnalysis.bySalesRep.qualitativeAnalysis) }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Desempenho Geográfico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-400" />
              <span>{performanceAnalysis.geographicPerformance.topCities.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {performanceAnalysis.geographicPerformance.topCities.cities.map((cidade, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4 glass-card hover:glow-effect transition-all duration-300 group">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      index === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      index === 2 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-white font-medium group-hover:text-orange-300 transition-colors">{cidade}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <span>Análise Geográfica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="highlight">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdownText(performanceAnalysis.geographicPerformance.analysis) }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};