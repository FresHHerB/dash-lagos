import React from 'react';
import { RefreshCw, BarChart3, Settings, Zap } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
  lastUpdated: Date | null;
  onConfigClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, loading, lastUpdated, onConfigClick }) => {
  return (
    <header className="sidebar border-b border-orange-500/20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 glass-card p-2 glow-effect">
              <BarChart3 className="w-7 h-7 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Lagos Química</h1>
              <p className="text-sm text-orange-300/80 font-medium">Dashboard CRM Ultra</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-2 glass-card">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">ONLINE</span>
            </div>
            
            {lastUpdated && (
              <div className="text-sm text-orange-300/70 font-mono">
                <span className="text-orange-400/60">Last sync:</span> {lastUpdated.toLocaleTimeString('pt-BR')}
              </div>
            )}
            
            <button
              onClick={onConfigClick}
              className="flex items-center space-x-2 px-4 py-2 glass-card hover:glow-effect transition-all duration-300 group"
            >
              <Settings className="w-4 h-4 text-orange-400 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`premium-button flex items-center space-x-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <Zap className="w-4 h-4 animate-pulse" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span className="font-semibold">{loading ? 'Sincronizando...' : 'Sync Data'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};