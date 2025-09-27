import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { Shield, TrendingDown, DollarSign, Users } from 'lucide-react';

interface ConcorrenciaTabProps {
  data: IntelligenceReport;
}

export const ConcorrenciaTab: React.FC<ConcorrenciaTabProps> = ({ data }) => {
  const { analise_competitiva } = data.relatorio_de_inteligencia_de_vendas;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Inteligência Competitiva</h1>
      </div>

      {/* Mapeamento de Concorrentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Ranking de Concorrentes</h3>
          </div>
          <div className="space-y-3">
            {analise_competitiva.mapeamento_concorrentes.ranking_concorrentes.map((concorrente, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-red-500/10 border border-red-500/20 rounded">
                <span className="text-red-300 font-medium">{concorrente}</span>
                <span className="text-red-400 text-sm">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-slate-400" />
            <h3 className="text-lg font-semibold text-white">Outros Concorrentes</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {analise_competitiva.mapeamento_concorrentes.outros_concorrentes.map((concorrente, index) => (
              <div key={index} className="py-1 px-2 bg-slate-700 rounded text-sm text-slate-300">
                {concorrente}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estratégias e Pontos Fracos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Táticas dos Concorrentes</h3>
          </div>
          <div className="space-y-3">
            {analise_competitiva.estrategias_pontos_fracos_concorrencia.taticas_venda_concorrentes.map((tatica, index) => (
              <div key={index} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                <div 
                  className="text-sm text-amber-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(tatica) }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Pontos Fracos dos Concorrentes</h3>
          </div>
          <div className="space-y-3">
            {analise_competitiva.estrategias_pontos_fracos_concorrencia.pontos_fracos_concorrentes.map((ponto, index) => (
              <div key={index} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                <div 
                  className="text-sm text-emerald-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownText(ponto) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inteligência de Preços */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Inteligência de Preços</h3>
        </div>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-slate-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Concorrente</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Produto/Diluição</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Volume</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {analise_competitiva.inteligencia_precos_produtos.tabela_precos_concorrentes.map((item, index) => (
                <tr key={index} className="hover:bg-slate-750">
                  <td className="px-4 py-2 text-sm font-medium text-white">{item.concorrente}</td>
                  <td className="px-4 py-2 text-sm text-slate-300">{item.produto_diluicao}</td>
                  <td className="px-4 py-2 text-sm text-slate-300">{item.volume}</td>
                  <td className="px-4 py-2 text-sm text-green-400 font-medium">{item.preco_mencionado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">Análise da Estratégia de Precificação</h4>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_competitiva.inteligencia_precos_produtos.analise_estrategia_precificacao) 
            }}
          />
        </div>
      </div>
    </div>
  );
};