import React from 'react';
import { SDRReport } from '../../types/sdr';
import { ProgressBar } from '../UI/ProgressBar';
import { Users, Star, TrendingUp } from 'lucide-react';

interface VendedoresTabProps {
  data: SDRReport;
}

export const VendedoresTab: React.FC<VendedoresTabProps> = ({ data }) => {
  const { scorecard_vendedores } = data;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Scorecard dos Vendedores</h1>
      </div>

      {scorecard_vendedores.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scorecard_vendedores.map((vendedor, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{vendedor.vendedor}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vendedor.score_total_0a100 >= 80 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : vendedor.score_total_0a100 >= 60
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {vendedor.score_total_0a100.toFixed(0)} pts
                </div>
              </div>

              {/* Métricas Detalhadas */}
              <div className="space-y-3 mb-4">
                <ProgressBar
                  value={vendedor.metricas.atividade}
                  max={100}
                  label={`Atividade (${(vendedor.pesos.atividade * 100).toFixed(0)}%)`}
                  color="blue"
                />
                <ProgressBar
                  value={vendedor.metricas.efetividade}
                  max={100}
                  label={`Efetividade (${(vendedor.pesos.efetividade * 100).toFixed(0)}%)`}
                  color="green"
                />
                <ProgressBar
                  value={vendedor.metricas.velocidade}
                  max={100}
                  label={`Velocidade (${(vendedor.pesos.velocidade * 100).toFixed(0)}%)`}
                  color="yellow"
                />
                <ProgressBar
                  value={vendedor.metricas.estrategia}
                  max={100}
                  label={`Estratégia (${(vendedor.pesos.estrategia * 100).toFixed(0)}%)`}
                  color="red"
                />
                <ProgressBar
                  value={vendedor.metricas.qualidade_dados}
                  max={100}
                  label={`Qualidade Dados (${(vendedor.pesos.qualidade_dados * 100).toFixed(0)}%)`}
                  color="slate"
                />
              </div>

              {/* Destaques */}
              {vendedor.destaques.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Destaques
                  </h4>
                  <ul className="space-y-1">
                    {vendedor.destaques.map((destaque, idx) => (
                      <li key={idx} className="text-sm text-green-300 bg-green-500/5 p-2 rounded">
                        • {destaque}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recomendações */}
              {vendedor.recomendacoes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Recomendações
                  </h4>
                  <ul className="space-y-1">
                    {vendedor.recomendacoes.map((recomendacao, idx) => (
                      <li key={idx} className="text-sm text-amber-300 bg-amber-500/5 p-2 rounded">
                        • {recomendacao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-400 mb-2">Nenhum dado de vendedor disponível</h3>
          <p className="text-sm text-slate-500">Os dados do scorecard serão exibidos assim que estiverem disponíveis.</p>
        </div>
      )}
    </div>
  );
};