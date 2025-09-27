import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { Package, TrendingUp, MessageSquare } from 'lucide-react';

interface ProdutosTabProps {
  data: IntelligenceReport;
}

export const ProdutosTab: React.FC<ProdutosTabProps> = ({ data }) => {
  const { analise_de_produto_vendas } = data.relatorio_de_inteligencia_de_vendas;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Package className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Análise de Produtos & Vendas</h1>
      </div>

      {/* Performance do Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Feedback dos Produtos</h3>
          </div>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_de_produto_vendas.performance_portfolio.feedback_produtos) 
            }}
          />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Cross-Sell</h3>
          </div>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_de_produto_vendas.performance_portfolio.oportunidades_cross_sell) 
            }}
          />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Produtos Mais Testados</h3>
          </div>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_de_produto_vendas.performance_portfolio.produtos_mais_testados) 
            }}
          />
        </div>
      </div>

      {/* Eficácia dos Argumentos de Venda */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Eficácia dos Argumentos de Venda</h3>
        </div>
        <div 
          className="text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: formatMarkdownText(analise_de_produto_vendas.eficacia_argumentos_venda.analise) 
          }}
        />
      </div>
    </div>
  );
};