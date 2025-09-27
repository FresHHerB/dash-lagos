import React from 'react';
import { NewReportData } from '../../types/newReport';
import { Lightbulb, Target, TrendingUp, AlertTriangle, Shield, Zap, Users, Package, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import { MetricCard } from '../UI/MetricCard';

interface InsightsTabProps {
  data: NewReportData;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ data }) => {
  const { strategicInsights } = data;

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
          <Lightbulb className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">{strategicInsights.title}</h1>
      </header>

      {/* Métricas SWOT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Forças"
          value={strategicInsights.swot.strengths.points.length}
          icon={Zap}
          color="green"
        />
        <MetricCard
          title="Fraquezas"
          value={strategicInsights.swot.weaknesses.points.length}
          icon={AlertTriangle}
          color="red"
        />
        <MetricCard
          title="Oportunidades"
          value={strategicInsights.swot.opportunities.points.length}
          icon={TrendingUp}
          color="blue"
        />
        <MetricCard
          title="Ameaças"
          value={strategicInsights.swot.threats.points.length}
          icon={Shield}
          color="yellow"
        />
      </div>
      {/* Análise SWOT */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 glass-card glow-effect">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold gradient-text">{strategicInsights.swot.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forças */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                <span>{strategicInsights.swot.strengths.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.swot.strengths.points.map((forca, index) => (
                  <div key={index} className="glass-card p-4 border border-emerald-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 font-bold text-sm">+</span>
                      </div>
                      <div 
                        className="text-emerald-300 leading-relaxed flex-1"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(forca) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fraquezas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span>{strategicInsights.swot.weaknesses.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.swot.weaknesses.points.map((fraqueza, index) => (
                  <div key={index} className="glass-card p-4 border border-red-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-red-400 font-bold text-sm">-</span>
                      </div>
                      <div 
                        className="text-red-300 leading-relaxed flex-1"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(fraqueza) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Oportunidades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <span>{strategicInsights.swot.opportunities.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.swot.opportunities.points.map((oportunidade, index) => (
                  <div key={index} className="glass-card p-4 border border-blue-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold text-sm">↗</span>
                      </div>
                      <div 
                        className="text-blue-300 leading-relaxed flex-1"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(oportunidade) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ameaças */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <Shield className="w-6 h-6 text-amber-400" />
                <span>{strategicInsights.swot.threats.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.swot.threats.points.map((ameaca, index) => (
                  <div key={index} className="glass-card p-4 border border-amber-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 font-bold text-sm">⚠</span>
                      </div>
                      <div 
                        className="text-amber-300 leading-relaxed flex-1"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(ameaca) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recomendações Estratégicas */}
      <div>
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 glass-card glow-effect">
            <Award className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold gradient-text">{strategicInsights.recommendations.title}</h2>
        </div>

        <div className="space-y-6">
          {/* Para Liderança de Vendas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <span>{strategicInsights.recommendations.salesLeadership.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.recommendations.salesLeadership.points.map((recomendacao, index) => (
                  <div key={index} className="glass-card p-5 border border-emerald-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-400 font-bold">{index + 1}</span>
                      </div>
                      <div 
                        className="text-emerald-300 leading-relaxed flex-1 text-lg"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(recomendacao) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Para Marketing e Produto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <Package className="w-6 h-6 text-amber-400" />
                <span>{strategicInsights.recommendations.marketingProduct.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.recommendations.marketingProduct.points.map((recomendacao, index) => (
                  <div key={index} className="glass-card p-5 border border-amber-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-400 font-bold">{index + 1}</span>
                      </div>
                      <div 
                        className="text-amber-300 leading-relaxed flex-1 text-lg"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(recomendacao) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Para Equipe SDR */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-400" />
                <span>{strategicInsights.recommendations.sdrTeam.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInsights.recommendations.sdrTeam.points.map((recomendacao, index) => (
                  <div key={index} className="glass-card p-5 border border-blue-500/20 hover:glow-effect transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold">{index + 1}</span>
                      </div>
                      <div 
                        className="text-blue-300 leading-relaxed flex-1 text-lg"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownText(recomendacao) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};