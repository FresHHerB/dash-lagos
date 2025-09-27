import React from 'react';
import { SDRReport } from '../../types/sdr';
import { MetricCard } from '../UI/MetricCard';
import { ProgressBar } from '../UI/ProgressBar';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface OverviewTabProps {
  data: SDRReport;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  const { metadata, funil_conversoes, higienizacao_normalizacao } = data;

  return (
    <div className="space-y-6">
      {/* Informações do Relatório */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Informações do Relatório</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-400">Nome do Relatório</p>
            <p className="text-white font-medium">{metadata.report_name}</p>
          </div>
          <div>
            <p className="text-slate-400">Período</p>
            <p className="text-white font-medium">
              {new Date(metadata.data_coverage.period_start).toLocaleDateString('pt-BR')} - 
              {new Date(metadata.data_coverage.period_end).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Total de Registros</p>
            <p className="text-white font-medium">{metadata.data_coverage.rows_total.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Prospects Total"
          value={funil_conversoes.global.volumes.prospects.toLocaleString('pt-BR')}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Taxa Teste → Pedido"
          value={`${(funil_conversoes.global.conversoes.aprovado_para_pedido * 100).toFixed(1)}%`}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Testes Aprovados"
          value={funil_conversoes.global.volumes.testes_aprovados.toLocaleString('pt-BR')}
          icon={CheckCircle}
          color="emerald"
        />
        <MetricCard
          title="Pedidos Fechados"
          value={funil_conversoes.global.volumes.pedidos.toLocaleString('pt-BR')}
          icon={Target}
          color="blue"
        />
      </div>

      {/* Funil de Conversão */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Funil de Conversão</h2>
        <div className="space-y-4">
          <ProgressBar
            value={funil_conversoes.global.conversoes.prospect_para_teste * 100}
            label="Prospect → Teste"
            color="blue"
          />
          <ProgressBar
            value={funil_conversoes.global.conversoes.teste_para_aprovado * 100}
            label="Teste → Aprovado"
            color="green"
          />
          <ProgressBar
            value={funil_conversoes.global.conversoes.aprovado_para_pedido * 100}
            label="Aprovado → Pedido"
            color="yellow"
          />
          <ProgressBar
            value={funil_conversoes.global.conversoes.reativacao_para_pedido * 100}
            label="Reativação → Pedido"
            color="red"
          />
        </div>
      </div>

      {/* Qualidade dos Dados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Qualidade dos Contatos</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Telefones Válidos</span>
              <span className="text-sm font-medium text-green-400">
                {(funil_conversoes.global.qualidade_contato.pct_telefone_valido * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Decisor Identificado</span>
              <span className="text-sm font-medium text-green-400">
                {(funil_conversoes.global.qualidade_contato.pct_decisor_identificado * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Dados Inválidos</span>
              <span className="text-sm font-medium text-red-400">
                {(funil_conversoes.global.qualidade_contato.pct_dados_invalidos * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Higienização Aplicada</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Telefones Inválidos</span>
              <span className="text-sm font-medium text-orange-400">
                {higienizacao_normalizacao.indicadores_limpeza.telefones_invalidos}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Endereços Residenciais</span>
              <span className="text-sm font-medium text-orange-400">
                {higienizacao_normalizacao.indicadores_limpeza.enderecos_residenciais}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Registros Deduplicados</span>
              <span className="text-sm font-medium text-blue-400">
                {higienizacao_normalizacao.indicadores_limpeza.registros_deduplicados}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tempos Médios */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Tempos Médios (dias)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Prospect → Teste"
            value={funil_conversoes.global.tempos_medios_dias.prospect_para_teste.toFixed(1)}
            subtitle="dias"
            icon={Clock}
            color="blue"
          />
          <MetricCard
            title="Teste → Pedido"
            value={funil_conversoes.global.tempos_medios_dias.teste_para_pedido.toFixed(1)}
            subtitle="dias"
            icon={Clock}
            color="green"
          />
          <MetricCard
            title="Reativação → Pedido"
            value={funil_conversoes.global.tempos_medios_dias.reativacao_para_pedido.toFixed(1)}
            subtitle="dias"
            icon={Clock}
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
};