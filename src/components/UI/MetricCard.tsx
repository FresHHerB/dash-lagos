import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'slate';
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    yellow: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    slate: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
  };

  const iconColorClasses = {
    blue: 'text-orange-400',
    green: 'text-emerald-400',
    yellow: 'text-amber-400',
    red: 'text-red-400',
    slate: 'text-slate-400',
    emerald: 'text-emerald-400'
  };

  return (
    <div className="glass-card p-6 group floating">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="label-text text-orange-300/70">{title}</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <p className="metric-value">{value}</p>
            {trend && (
              <span className={`text-xs font-medium ${
                trend.isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-orange-300/50 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${iconColorClasses[color]} group-hover:rotate-12 transition-transform duration-300`} />
          </div>
        )}
      </div>
    </div>
  );
};