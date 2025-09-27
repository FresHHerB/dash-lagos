import React from 'react';
import { NewReportData } from '../../types/newReport';
import { Package, TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import { MetricCard } from '../UI/MetricCard';

interface ProdutosNewTabProps {
  data: NewReportData;
}

export const ProdutosNewTab: React.FC<ProdutosNewTabProps> = ({ data }) => {
  const { productAnalysis } = data;

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
          <Package className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">{productAnalysis.title}</h1>
      </header>

      {/* Métricas de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Portfolio Ativo"
          value="100%"
          icon={Package}
          color="blue"
        />
        <MetricCard
          title="Performance"
          value="Otimizada"
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Argumentos"
          value="Eficazes"
          icon={Target}
          color="yellow"
        />
      </div>
      {/* Performance do Portfólio */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <Package className="w-6 h-6 text-emerald-400" />
            <span>{productAnalysis.portfolioPerformance.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="highlight">
            <div 
              className="text-gray-200 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: formatMarkdownText(productAnalysis.portfolioPerformance.analysis) }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Eficácia dos Argumentos de Venda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <Zap className="w-6 h-6 text-blue-400" />
            <span>{productAnalysis.salesArguments.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="highlight">
            <div 
              className="text-gray-200 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: formatMarkdownText(productAnalysis.salesArguments.analysis) }}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};