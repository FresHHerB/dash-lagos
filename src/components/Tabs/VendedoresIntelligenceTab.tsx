import React from 'react';
import { IntelligenceReport } from '../../types/intelligence';
import { Users, BarChart3, MapPin } from 'lucide-react';
import { ProgressBar } from '../UI/ProgressBar';

interface VendedoresIntelligenceTabProps {
  data: IntelligenceReport;
}

export const VendedoresIntelligenceTab: React.FC<VendedoresIntelligenceTabProps> = ({ data }) => {
  const { analise_de_desempenho } = data.relatorio_de_inteligencia_de_vendas;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');
  };

  const parsePercentage = (percentage: string) => {
    return parseInt(percentage.replace('%', ''));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Performance dos Vendedores</h1>
      </div>

      {/* Tabela de Vendedores */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Desempenho Individual</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {analise_de_desempenho.desempenho_por_vendedor.tabela_vendedores.map((vendedor, index) => (
            <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{vendedor.vendedor}</h4>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Volume Total</div>
                  <div className="text-xl font-bold text-blue-400">{vendedor.volume_total}</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <ProgressBar
                  value={parsePercentage(vendedor.mix_atividades.Prospect)}
                  label="Prospecção"
                  color="blue"
                />
                <ProgressBar
                  value={parsePercentage(vendedor.mix_atividades.Reativacao)}
                  label="Reativação"
                  color="green"
                />
                <ProgressBar
                  value={parsePercentage(vendedor.mix_atividades.Teste)}
                  label="Testes"
                  color="yellow"
                />
              </div>

              <div className="bg-slate-600 rounded-lg p-3">
                <div className="text-sm text-slate-400">Taxa de Sucesso em Testes</div>
                <div className={`text-lg font-bold ${
                  parsePercentage(vendedor.taxa_sucesso_testes) >= 60 
                    ? 'text-green-400' 
                    : parsePercentage(vendedor.taxa_sucesso_testes) >= 40
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}>
                  {vendedor.taxa_sucesso_testes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Análise Qualitativa */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Análise Qualitativa</h3>
        </div>
        <div 
          className="text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: formatMarkdownText(analise_de_desempenho.desempenho_por_vendedor.analise_qualitativa) 
          }}
        />
      </div>

      {/* Desempenho Geográfico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Top 10 Cidades</h3>
          </div>
          <div className="space-y-2">
            {analise_de_desempenho.desempenho_geografico.top_10_cidades.map((cidade, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-slate-700 rounded">
                <span className="text-slate-300">{cidade}</span>
                <span className="text-blue-400 font-medium">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Análise Geográfica</h3>
          </div>
          <div 
            className="text-sm text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatMarkdownText(analise_de_desempenho.desempenho_geografico.analise_geografica) 
            }}
          />
        </div>
      </div>
    </div>
  );
};