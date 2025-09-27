import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { NewTabNavigation, newTabs } from './components/Layout/NewTabNavigation';
import { ConfigModal } from './components/UI/ConfigModal';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { ResumoTab } from './components/NewTabs/ResumoTab';
import { PerformanceTab } from './components/NewTabs/PerformanceTab';
import { ConcorrenciaNewTab } from './components/NewTabs/ConcorrenciaNewTab';
import { ClientesTab } from './components/NewTabs/ClientesTab';
import { ProdutosNewTab } from './components/NewTabs/ProdutosNewTab';
import { InsightsTab } from './components/NewTabs/InsightsTab';
import { ApiTab } from './components/NewTabs/ApiTab';
import { useNewReportData } from './hooks/useNewReportData';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<string>('resumo');
  const [apiUrl, setApiUrl] = useState<string>('https://0f55f04d7bb2.ngrok-free.app/api/relatorios');
  const [showConfig, setShowConfig] = useState(false);

  const { data: report, rawApiData, loading, error, lastUpdated, refresh } = useNewReportData(apiUrl);

  const renderTabContent = () => {
    if (!report) return null;

    switch (activeTab) {
      case 'resumo':
        return <ResumoTab data={report} />;
      case 'performance':
        return <PerformanceTab data={report} />;
      case 'concorrencia':
        return <ConcorrenciaNewTab data={report} />;
      case 'clientes':
        return <ClientesTab data={report} />;
      case 'produtos':
        return <ProdutosNewTab data={report} />;
      case 'insights':
        return <InsightsTab data={report} />;
      case 'api':
        return <ApiTab />;
      case 'dados':
        return (
          <div className="space-y-6">
            {/* Dados Brutos: exibimos o array inteiro */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Dados Brutos da API</h2>
              {rawApiData && rawApiData.length > 0 ? (
                <div className="bg-slate-900 p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                    {JSON.stringify(rawApiData, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-slate-400">Nenhum dado recebido da API ainda.</p>
              )}
            </div>
            {/* Status da Conexão */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Status da Conexão</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">URL da API:</span>
                  <span className="text-slate-300 font-mono text-sm">{apiUrl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className={`font-medium ${error ? 'text-red-400' : 'text-green-400'}`}>
                    {error ? 'Erro' : 'Conectado'}
                  </span>
                </div>
                {error && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Erro:</span>
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}
                {lastUpdated && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Última atualização:</span>
                    <span className="text-slate-300 text-sm">
                      {lastUpdated.toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Seção em Desenvolvimento</h3>
              <p className="text-sm">Esta seção está sendo implementada e estará disponível em breve.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Header 
        onRefresh={refresh} 
        loading={loading} 
        lastUpdated={lastUpdated}
        onConfigClick={() => setShowConfig(true)}
      />
      <NewTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <ConfigModal
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        currentUrl={apiUrl}
        onUrlChange={setApiUrl}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {loading && !report ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" message="Carregando dados do relatório..." />
          </div>
        ) : error && !report ? (
          <div className="text-center py-12">
            <div className="glass-card p-8 max-w-md mx-auto">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-red-400 mb-4">Erro ao carregar dados</h3>
              <p className="text-sm text-red-300 mb-6 leading-relaxed">{error}</p>
              <button
                onClick={refresh}
                className="premium-button"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : (
          <div>
            {error && (
              <div className="mb-6 glass-card p-4 max-w-4xl mx-auto border-amber-500/30">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-400 font-bold">Aviso:</span>
                  <span className="text-amber-300 text-sm font-medium">
                    Conectado com sucesso! Exibindo dados recebidos da API.
                  </span>
                </div>
              </div>
            )}
            {renderTabContent()}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
