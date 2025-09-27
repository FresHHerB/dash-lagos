import React from 'react';
import { SDRReport } from '../../types/sdr';
import { AlertTriangle, Clock, CreditCard, FileText, Phone } from 'lucide-react';

interface AlertasTabProps {
  data: SDRReport;
}

export const AlertasTab: React.FC<AlertasTabProps> = ({ data }) => {
  const { alertas_operacionais } = data;

  return (
    <div className="space-y-6">
      {/* Testes Aprovados sem Pedido */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-white">Testes Aprovados sem Pedido</h2>
        </div>
        
        {alertas_operacionais.teste_aprovado_sem_pedido.maior_que_7_dias.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-md font-medium text-amber-400">Mais de 7 dias</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cidade</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Vendedor</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Dias</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Telefone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {alertas_operacionais.teste_aprovado_sem_pedido.maior_que_7_dias.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-750">
                      <td className="px-4 py-2 text-sm font-medium text-white">{item.cliente}</td>
                      <td className="px-4 py-2 text-sm text-slate-300">{item.cidade}</td>
                      <td className="px-4 py-2 text-sm text-slate-300">{item.vendedor}</td>
                      <td className="px-4 py-2 text-sm text-amber-400 font-medium">{item.dias_desde_teste}</td>
                      <td className="px-4 py-2 text-sm text-slate-300">{item.telefone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-sm">Nenhum teste aprovado há mais de 7 dias sem pedido</p>
        )}
      </div>

      {/* Agendamentos Próximos */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Agendamentos Próximos</h2>
        </div>
        
        {alertas_operacionais.agendamentos_proximos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Assunto</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Responsável</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {alertas_operacionais.agendamentos_proximos.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-750">
                    <td className="px-4 py-2 text-sm font-medium text-white">{item.cliente}</td>
                    <td className="px-4 py-2 text-sm text-blue-400">
                      {new Date(item.data_hora).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-300">{item.assunto}</td>
                    <td className="px-4 py-2 text-sm text-slate-300">{item.responsavel_vendedor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-sm">Nenhum agendamento próximo</p>
        )}
      </div>

      {/* Alto Consumo sem Cadastro */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-semibold text-white">Alto Consumo sem Cadastro</h2>
        </div>
        
        {alertas_operacionais.alto_consumo_sem_cadastro.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Indicador Consumo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Ação Sugerida</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Responsável</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {alertas_operacionais.alto_consumo_sem_cadastro.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-750">
                    <td className="px-4 py-2 text-sm font-medium text-white">{item.cliente}</td>
                    <td className="px-4 py-2 text-sm text-green-400">{item.indicador_consumo}</td>
                    <td className="px-4 py-2 text-sm text-slate-300">{item.acao_sugerida}</td>
                    <td className="px-4 py-2 text-sm text-slate-300">{item.responsavel_vendedor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-sm">Nenhum cliente com alto consumo sem cadastro</p>
        )}
      </div>

      {/* Risco de Crédito */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-red-400" />
          <h2 className="text-lg font-semibold text-white">Risco de Crédito</h2>
        </div>
        
        {alertas_operacionais.risco_credito.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Tipo Risco</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Política Sugerida</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Observação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {alertas_operacionais.risco_credito.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-750">
                    <td className="px-4 py-2 text-sm font-medium text-white">{item.cliente}</td>
                    <td className="px-4 py-2 text-sm text-red-400 font-medium">{item.tipo_risco}</td>
                    <td className="px-4 py-2 text-sm text-slate-300">{item.politica_sugerida}</td>
                    <td className="px-4 py-2 text-sm text-slate-400">{item.observacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-sm">Nenhum risco de crédito identificado</p>
        )}
      </div>
    </div>
  );
};