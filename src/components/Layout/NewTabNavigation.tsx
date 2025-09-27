import React from 'react';
import { 
  BarChart3,
  TrendingUp,
  Users, 
  Shield, 
  Target, 
  Package,
  MessageSquare,
  Lightbulb,
  Database
} from 'lucide-react';

export interface NewTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const newTabs: NewTab[] = [
  { id: 'resumo', label: 'Sumário Executivo', icon: BarChart3 },
  { id: 'performance', label: 'Análise de Performance', icon: TrendingUp },
  { id: 'concorrencia', label: 'Análise Competitiva', icon: Shield },
  { id: 'clientes', label: 'Análise de Clientes', icon: Users },
  { id: 'produtos', label: 'Análise de Produtos', icon: Package },
  { id: 'insights', label: 'Insights Estratégicos', icon: Lightbulb },
  { id: 'api', label: 'API & Endpoints', icon: Database },
  { id: 'dados', label: 'Dados Brutos', icon: Database }
];

interface NewTabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const NewTabNavigation: React.FC<NewTabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="tab-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {newTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm
                  transition-all duration-300 whitespace-nowrap relative group
                  ${isActive 
                    ? 'border-orange-500 text-orange-400 tab-active' 
                    : 'border-transparent text-gray-400 hover:text-orange-300 hover:border-orange-500/50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-orange-400' : 'group-hover:text-orange-300'}`} />
                <span className="font-semibold">{tab.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
                )}
                
                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-orange-500/10' 
                    : 'bg-transparent group-hover:bg-orange-500/5'
                }`}></div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};