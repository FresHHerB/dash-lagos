import React from 'react';
import { 
  BarChart3,
  TrendingUp,
  Users, 
  MapPin, 
  Target, 
  Package,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  Shield,
  Zap,
  Trophy,
  Database
} from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const tabs: Tab[] = [
  { id: 'resumo', label: 'Resumo Executivo', icon: BarChart3 },
  { id: 'produtos', label: 'Análise de Produtos', icon: Package },
  { id: 'vendedores', label: 'Performance Vendedores', icon: Users },
  { id: 'concorrencia', label: 'Inteligência Competitiva', icon: Shield },
  { id: 'objecoes', label: 'Objeções & Playbooks', icon: MessageSquare },
  { id: 'estrategias', label: 'Recomendações', icon: Lightbulb },
  { id: 'swot', label: 'Análise SWOT', icon: Target },
  { id: 'territorios', label: 'Análise Geográfica', icon: MapPin },
  { id: 'dados', label: 'Qualidade Dados', icon: Database }
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm
                  transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};