import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  label, 
  color = 'blue',
  showPercentage = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-gradient-to-r from-orange-500 to-orange-400',
    green: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    yellow: 'bg-gradient-to-r from-amber-500 to-amber-400',
    red: 'bg-gradient-to-r from-red-500 to-red-400'
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="label-text">{label}</span>
          {showPercentage && (
            <span className="text-sm text-orange-400 font-bold">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className="progress-bar h-3">
        <div
          className={`progress-fill ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};