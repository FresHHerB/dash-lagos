import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { Lightbulb, Users, TrendingUp, Package } from 'lucide-react';

interface EstrategiasTabProps {
  data: IntelligenceReport;
}

export const EstrategiasTab: React.FC<EstrategiasTabProps> = ({ data }) => {
  const { recomendacoes_estrategicas } = data.relatorio_de_inteligencia_de_vendas.insights_estrategicos_recomendacoes;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Recomendações Estratégicas</h1>
      </div>

      {/* Para Equipe SDR */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Para Equipe SDR</h3>
        </div>
        <div className="space-y-4">
          {recomendacoes_estrategicas.para_equipe_sdr.map((recomendacao, index) => (
            <div key={index} className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
              <div 
                className="text-sm text-blue-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdownText(recomendacao) }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Para Liderança de Vendas */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Para Liderança de Vendas</h3>
        </div>
        <div className="space-y-4">
          {recomendacoes_estrategicas.para_lideranca_vendas.map((recomendacao, index) => (
            <div key={index} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
              <div 
                className="text-sm text-emerald-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMarkdownText(recomendacao) }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Para Marketing e Produto */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Package className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Para Marketing e Produto</h3>
        </div>
        <div className="space-y-4">
          {recomendacoes_estrategicas.para_marketing_produto.map((recomendacao, index) => (
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
  );
};