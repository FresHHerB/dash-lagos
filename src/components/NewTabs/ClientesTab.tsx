import React from 'react';
import { NewReportData } from '../../types/newReport';
import { Users, Target, AlertTriangle, MessageSquare, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import { MetricCard } from '../UI/MetricCard';

interface ClientesTabProps {
  data: NewReportData;
}

export const ClientesTab: React.FC<ClientesTabProps> = ({ data }) => {
  const { clientAnalysis } = data;

  const formatMarkdownText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <section className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header Ultra-Moderno */}
      <header className="flex items-center space-x-4 mb-8">
        <div className="p-3 glass-card glow-effect">
          <Users className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">{clientAnalysis.title}</h1>
      </header>

      {/* Métricas de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Objeções Mapeadas"
          value={clientAnalysis.objectionMatrix.table.rows.length}
          icon={MessageSquare}
          color="red"
        />
        <MetricCard
          title="ICP Definido"
          value="100%"
          icon={Target}
          color="blue"
        />
        <MetricCard
          title="Playbooks Ativos"
          value={clientAnalysis.objectionMatrix.table.rows.length}
          icon={Zap}
          color="green"
        />
      </div>
      {/* Perfil de Cliente (ICP) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-400" />
            <span>{clientAnalysis.icp.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="highlight">
            <div 
              className="text-gray-200 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: formatMarkdownText(clientAnalysis.icp.analysis) }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Matriz de Objeções */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span>{clientAnalysis.objectionMatrix.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {clientAnalysis.objectionMatrix.table.rows.map((item, index) => (
              <div key={index} className="glass-card p-6 hover:glow-effect transition-all duration-300 border border-amber-500/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-xl font-bold text-amber-400">{item["Objeção Comum"]}</h4>
                </div>
                
                <div className="highlight border-l-4 border-emerald-400">
                  <h5 className="label-text text-emerald-400 mb-3">CONTRA-ARGUMENTO / AÇÃO:</h5>
                  <div 
                    className="text-gray-200 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: formatMarkdownText(item["Contra-Argumento / Ação do Vendedor"]) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivos de Perda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span>{clientAnalysis.lossReasons.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="highlight border-l-4 border-red-400">
            <div 
              className="text-gray-200 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: formatMarkdownText(clientAnalysis.lossReasons.analysis) }}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};