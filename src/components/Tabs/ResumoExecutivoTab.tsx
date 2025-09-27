import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';

interface ResumoExecutivoTabProps {
  data: IntelligenceReport;
}

export const ResumoExecutivoTab: React.FC<ResumoExecutivoTabProps> = ({ data }) => {
  const { sumario_executivo } = data.relatorio_de_inteligencia_de_vendas;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  return (
    <div className="space-y-6">
      {/* Resumo Principal */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Resumo Executivo</h2>
        </div>
        <div 
          className="text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatMarkdownText(sumario_executivo.resumo) }}
        />
      </div>

      {/* Grid de Insights e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Principais Insights */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Principais Insights</h3>
          </div>
          <div className="space-y-4">
            {sumario_executivo.principais_insights.map((insight, index) => (
              <div key={index} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                <div 
                  className="text-sm text-emerald-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(insight) }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recomendações Urgentes */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Recomendações Urgentes</h3>
          </div>
          <div className="space-y-4">
            {sumario_executivo.recomendacoes_urgentes.map((recomendacao, index) => (
              <div key={index} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                <div 
                  className="text-sm text-amber-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(recomendacao) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};