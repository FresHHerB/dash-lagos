import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { Target, TrendingUp, AlertTriangle, Shield, Zap } from 'lucide-react';

interface SwotTabProps {
  data: IntelligenceReport;
}

export const SwotTab: React.FC<SwotTabProps> = ({ data }) => {
  const { analise_swot } = data.relatorio_de_inteligencia_de_vendas.insights_estrategicos_recomendacoes;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Análise SWOT</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forças */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Forças</h3>
          </div>
          <div className="space-y-3">
            {analise_swot.forcas.map((forca, index) => (
              <div key={index} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                <div 
                  className="text-sm text-emerald-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(forca) }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fraquezas */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Fraquezas</h3>
          </div>
          <div className="space-y-3">
            {analise_swot.fraquezas.map((fraqueza, index) => (
              <div key={index} className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                <div 
                  className="text-sm text-red-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(fraqueza) }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Oportunidades */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Oportunidades</h3>
          </div>
          <div className="space-y-3">
            {analise_swot.oportunidades.map((oportunidade, index) => (
              <div key={index} className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                <div 
                  className="text-sm text-blue-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(oportunidade) }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ameaças */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Ameaças</h3>
          </div>
          <div className="space-y-3">
            {analise_swot.ameacas.map((ameaca, index) => (
              <div key={index} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                <div 
                  className="text-sm text-amber-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(ameaca) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};