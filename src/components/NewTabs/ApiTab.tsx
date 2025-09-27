import React, { useState, useEffect } from 'react';
import { Database, Globe, Copy, CheckCircle, Server, Zap, Terminal, Code } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import { MetricCard } from '../UI/MetricCard';

interface ApiTabProps {
  // Não depende mais dos dados do relatório
}

export const ApiTab: React.FC<ApiTabProps> = () => {
  const [ngrokUrl, setNgrokUrl] = useState<string>('');
  const [tunnelUrl, setTunnelUrl] = useState<string>('https://9e6d995863ff.ngrok-free.app');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string>('');

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(() => {
      checkServerStatus();
    }, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('https://9e6d995863ff.ngrok-free.app/api/status', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.ok) {
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }
    } catch (error) {
      setServerStatus('offline');
    }
  };

  const copyToClipboard = async (text: string, endpoint: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpoint);
      setTimeout(() => setCopiedEndpoint(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/teste',
      description: 'Enviar dados de relatório',
      color: 'bg-green-900/30 border-green-500/30 text-green-400'
    },
    {
      method: 'GET',
      path: '/api/relatorios',
      description: 'Obter todos os relatórios',
      color: 'bg-blue-900/30 border-blue-500/30 text-blue-400'
    },
    {
      method: 'GET',
      path: '/api/status',
      description: 'Status do servidor',
      color: 'bg-purple-900/30 border-purple-500/30 text-purple-400'
    },
    {
      method: 'DELETE',
      path: '/api/relatorios',
      description: 'Limpar todos os relatórios',
      color: 'bg-red-900/30 border-red-500/30 text-red-400'
    }
  ];

  // URL base para exibir (ngrok se disponível, senão localhost com aviso)
  const baseUrl = tunnelUrl;
  const isProduction = true;

  return (
    <section className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header Ultra-Moderno */}
      <header className="flex items-center space-x-4 mb-8">
        <div className="p-3 glass-card glow-effect">
          <Database className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="title-text">API & Endpoints</h1>
      </header>

      {/* Métricas da API */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Status"
          value={serverStatus === 'online' ? 'Online' : 'Offline'}
          icon={Server}
          color={serverStatus === 'online' ? 'green' : 'red'}
        />
        <MetricCard
          title="Endpoints"
          value={endpoints.length}
          icon={Terminal}
          color="blue"
        />
        <MetricCard
          title="Ambiente"
          value={isProduction ? 'Produção' : 'Dev'}
          icon={Globe}
          color={isProduction ? 'green' : 'yellow'}
        />
        <MetricCard
          title="Porta"
          value="8000"
          icon={Zap}
          color="blue"
        />
      </div>
      {/* Server Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-blue-400" />
            <span>Status do Servidor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 px-4 py-3 glass-card ${
              serverStatus === 'online' 
                ? 'border-green-500/30' 
                : serverStatus === 'offline'
                ? 'border-red-500/30'
                : 'border-amber-500/30'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                serverStatus === 'online' ? 'bg-green-400' : 
                serverStatus === 'offline' ? 'bg-red-400' : 'bg-amber-400'
              } ${serverStatus === 'checking' ? 'animate-pulse' : ''}`} />
              <span className={`font-bold ${
                serverStatus === 'online' ? 'text-green-400' : 
                serverStatus === 'offline' ? 'text-red-400' : 'text-amber-400'
              }`}>
                {serverStatus === 'online' ? 'Online' : 
                 serverStatus === 'offline' ? 'Offline' : 'Verificando...'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <Server className="w-4 h-4" />
                <span className="text-sm font-medium">Porta: 8000</span>
              </div>
              {tunnelUrl && (
                <span className="text-green-400 text-sm font-medium">✓ Túnel Ativo</span>
              )}
              {isProduction && (
                <span className="text-blue-400 text-sm font-medium">✓ Produção</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ngrok URL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-green-400" />
            <span>URL do Servidor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="glass-card p-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="label-text text-orange-400 mb-2">URL BASE:</div>
                  <div className="font-mono text-green-400 break-all text-lg font-bold">
                    {baseUrl}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(baseUrl, 'base')}
                  disabled={serverStatus !== 'online'}
                  className="ml-4 p-3 glass-card hover:glow-effect rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copiedEndpoint === 'base' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-orange-400" />
                  )}
                </button>
              </div>
            </div>
            
            {!isProduction ? (
              <div className="glass-card p-4 border border-amber-500/30">
                <div className="flex items-center space-x-3 text-amber-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Ambiente de desenvolvimento - use proxy do Vite</span>
                </div>
              </div>
            ) : (
              <div className="glass-card p-4 border border-green-500/30">
                <div className="flex items-center space-x-3 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">✅ Servidor público ativo - acessível de qualquer lugar!</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span>Endpoints Disponíveis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => {
              const fullUrl = `${baseUrl}${endpoint.path}`;
              return (
                <div key={index} className="glass-card p-6 hover:glow-effect transition-all duration-300 border border-orange-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-2 rounded-lg text-sm font-bold glass-card ${endpoint.color.replace('text-', 'border-').replace('-400', '-500/30')}`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-white font-bold text-lg">{endpoint.path}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(fullUrl, endpoint.path)}
                      className="p-2 glass-card hover:glow-effect rounded-lg transition-all duration-300"
                    >
                      {copiedEndpoint === endpoint.path ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-orange-400" />
                      )}
                    </button>
                  </div>
                  <div className="text-slate-300 mb-3 font-medium">{endpoint.description}</div>
                  <div className={`font-mono text-sm p-3 rounded-lg break-all glass-card ${
                    !isProduction 
                      ? 'text-blue-300 border border-blue-500/30' 
                      : 'text-slate-300 border border-slate-500/30'
                  }`}>
                    {fullUrl}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Exemplos de Uso</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="glass-card p-6 border border-green-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="font-bold text-green-400">Enviar dados via cURL:</span>
              </div>
              <pre className="text-sm text-green-300 glass-card p-4 rounded-lg overflow-x-auto font-mono border border-green-500/30">
{`curl -X POST ${baseUrl}/api/teste \\
  -H "Content-Type: application/json" \\
  -d '{"reportTitle": "Teste", "data": "exemplo"}'`}
              </pre>
            </div>
            
            <div className="glass-card p-6 border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-blue-400">Consultar relatórios:</span>
              </div>
              <pre className="text-sm text-blue-300 glass-card p-4 rounded-lg overflow-x-auto font-mono border border-blue-500/30">
{`curl ${baseUrl}/api/relatorios`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};