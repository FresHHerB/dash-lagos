import React from 'react';
import { NewReportData } from '../../types/newReport';
import { BarChart3, TrendingUp, Target, AlertTriangle, CheckCircle, Users, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';

interface ResumoTabProps {
  data: NewReportData;
}

export const ResumoTab: React.FC<ResumoTabProps> = ({ data }) => {
  const formatMarkdownText = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
      .replace(/\n/g, '<br />');

  if (!data || !data.executiveSummary) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400">
          <BarChart3 className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Dados não disponíveis</h3>
          <p className="text-sm">Aguardando dados do relatório...</p>
        </div>
      </div>
    );
  }

  // Extrair insights principais do texto do sumário
  const extractInsights = (summary: string) => {
    // Procurar por padrões de insights numerados no texto
    const insightPattern = /(\d+\))\s*([^;]+)/g;
    const insights = [];
    let match;
    
    while ((match = insightPattern.exec(summary)) !== null) {
      insights.push({
        number: match[1],
        text: match[2].trim()
      });
    }
    
    return insights;
  };

  // Extrair recomendações do texto
  const extractRecommendations = (summary: string) => {
    const recPattern = /recomendações mais urgentes são:\s*(.+?)(?=\s*$|\s*[A-Z])/s;
    const match = summary.match(recPattern);
    
    if (match) {
      const recText = match[1];
      const recommendations = [];
      
      // Procurar por padrões de recomendações numeradas
      const recItemPattern = /(\d+\))\s*Para\s+([^:]+):\s*([^;]+)/g;
      let recMatch;
      
      while ((recMatch = recItemPattern.exec(recText)) !== null) {
        recommendations.push({
          number: recMatch[1],
          area: recMatch[2].trim(),
          action: recMatch[3].trim()
        });
      }
      
      return recommendations;
    }
    
    return [];
  };

  const insights = extractInsights(data.executiveSummary.summary);
  const recommendations = extractRecommendations(data.executiveSummary.summary);

  return (
    <section className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <header className="flex items-center space-x-4 mb-8">
        <div className="p-3 glass-card glow-effect">
          <BarChart3 className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">{data.executiveSummary.title}</h1>
      </header>

      {/* Visão Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            <span>Visão Geral do Mercado</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="highlight">
            <p className="text-gray-200 leading-relaxed text-lg">
              A análise das atividades de SDR revela um <strong className="text-blue-400">cenário competitivo acirrado</strong>, 
              marcado pela forte presença de concorrentes com estratégias de comodato (Start, Teixeira Pinto) e uma base 
              pulverizada de players informais com preços agressivos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Principais Insights */}
      {insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <Target className="w-6 h-6 text-emerald-400" />
              <span>Principais Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight, index) => {
                const icons = [Users, Award, TrendingUp];
                const colors = ['bg-orange-500/10 border-orange-500/30', 'bg-emerald-500/10 border-emerald-500/30', 'bg-blue-500/10 border-blue-500/30'];
                const iconColors = ['text-orange-400', 'text-emerald-400', 'text-blue-400'];
                
                const Icon = icons[index] || CheckCircle;
                const cardColor = colors[index] || 'bg-slate-500/10 border-slate-500/30';
                const iconColor = iconColors[index] || 'text-slate-400';
                
                return (
                  <div key={index} className={`p-6 rounded-xl border ${cardColor} glass-card hover:glow-effect transition-all duration-300`}>
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl glass-card`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`label-text ${iconColor}`}>
                            Insight {insight.number.replace(')', '')}
                          </span>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                          {insight.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendações Estratégicas */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <span>Recomendações Urgentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const priorities = ['high', 'medium', 'low'];
                const priorityColors = {
                  high: 'bg-red-500/10 border-red-500/30 text-red-400',
                  medium: 'bg-amber-500/10 border-amber-500/30 text-amber-400', 
                  low: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                };
                const priority = priorities[index] || 'medium';
                const colorClasses = priorityColors[priority];
                
                return (
                  <div key={index} className={`p-6 rounded-xl border ${colorClasses.replace('text-', 'border-').replace('-400', '-500/30')} glass-card hover:glow-effect transition-all duration-300`}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full ${colorClasses.split(' ')[0]} flex items-center justify-center border ${colorClasses.replace('bg-', 'border-').replace('/10', '/30')}`}>
                          <span className={`text-lg font-bold ${colorClasses.split(' ')[2]}`}>
                            {rec.number.replace(')', '')}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`font-bold text-lg ${colorClasses.split(' ')[2]}`}>
                            {rec.area}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${colorClasses} border ${colorClasses.replace('bg-', 'border-').replace('/10', '/30')}`}>
                            {priority === 'high' ? 'Alta Prioridade' : priority === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'}
                          </span>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                          {rec.action}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próximos Passos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <span>Próximos Passos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-red-500/10 rounded-xl border border-red-500/30 text-center glass-card hover:glow-effect transition-all duration-300">
              <div className="text-red-400 font-bold mb-3 text-lg">Imediato (1-2 semanas)</div>
              <p className="text-gray-200 text-sm leading-relaxed">Resolver conflitos de carteira e implementar treinamento TCO</p>
            </div>
            
            <div className="p-6 bg-amber-500/10 rounded-xl border border-amber-500/30 text-center glass-card hover:glow-effect transition-all duration-300">
              <div className="text-amber-400 font-bold mb-3 text-lg">Curto Prazo (1-3 meses)</div>
              <p className="text-gray-200 text-sm leading-relaxed">Desenvolver produto '4 em 1' e battle cards competitivos</p>
            </div>
            
            <div className="p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-center glass-card hover:glow-effect transition-all duration-300">
              <div className="text-emerald-400 font-bold mb-3 text-lg">Médio Prazo (3-6 meses)</div>
              <p className="text-gray-200 text-sm leading-relaxed">Expandir para revendas e implementar programa de cross-sell</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};