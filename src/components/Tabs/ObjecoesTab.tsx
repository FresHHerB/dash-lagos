import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { MessageSquare, Target, AlertTriangle } from 'lucide-react';

interface ObjecoesTabProps {
  data: IntelligenceReport;
}

export const ObjecoesTab: React.FC<ObjecoesTabProps> = ({ data }) => {
  const { analise_clientes_prospeccao } = data.relatorio_de_inteligencia_de_vendas;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Objeções & Playbooks</h1>
      </div>

      {/* Matriz de Objeções */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Matriz de Objeções e Contra-Argumentos</h3>
        </div>
        
        <div className="space-y-6">
          {analise_clientes_prospeccao.matriz_objecoes_contra_argumentos.tabela_objecoes.map((item, index) => (
            <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-semibold text-amber-400">{item.objecao}</h4>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Contra-Argumentos e Ações:</h5>
                {item.contra_argumento_acao.map((acao, acaoIndex) => (
                  <div key={acaoIndex} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                    <div 
                      className="text-sm text-emerald-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMarkdownText(acao) }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Análises Complementares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Perfil do Cliente Ideal (ICP)</h3>
          </div>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_clientes_prospeccao.perfil_de_cliente_icp.analise) 
            }}
          />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Motivos de Perda</h3>
          </div>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_clientes_prospeccao.motivos_de_perda.analise) 
            }}
          />
        </div>
      </div>
    </div>
  );
};