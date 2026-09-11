import React from 'react';
import { ShieldAlert, Server, CheckCircle2, Flame, ArrowUpRight } from 'lucide-react';

interface MetricItem {
  id: string;
  title: string;
  value: string;
  change: string;
  comparison: string;
  isThreat: boolean; // true = red, false = green
  icon: React.ReactNode;
}

interface MetricsCardsProps {
  onCardClick?: (metricId: string) => void;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ onCardClick }) => {
  const metrics: MetricItem[] = [
    {
      id: 'total-threats',
      title: 'TOTAL THREATS',
      value: '128',
      change: '+12%',
      comparison: 'vs last 24h',
      isThreat: true,
      icon: <ShieldAlert className="w-4 h-4 text-[#ff2a4d]" />,
    },
    {
      id: 'assets-monitored',
      title: 'ASSETS MONITORED',
      value: '1,982',
      change: '+8%',
      comparison: 'vs last 24h',
      isThreat: false,
      icon: <Server className="w-4 h-4 text-[#00ff66]" />,
    },
    {
      id: 'compliance-score',
      title: 'COMPLIANCE SCORE',
      value: '92%',
      change: '+5%',
      comparison: 'vs last 24h',
      isThreat: false,
      icon: <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />,
    },
    {
      id: 'critical-alerts',
      title: 'CRITICAL ALERTS',
      value: '7',
      change: '+3',
      comparison: 'vs last 24h',
      isThreat: true,
      icon: <Flame className="w-4 h-4 text-[#ff2a4d]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const isRed = metric.isThreat;

        return (
          <div
            key={metric.id}
            onClick={() => onCardClick?.(metric.id)}
            className={`
              cyber-card ${isRed ? 'hover:border-[#ff2a4d] hover:shadow-[0_0_25px_rgba(255,42,77,0.35)]' : 'cyber-card-green hover:border-[#00ff66] hover:shadow-[0_0_25px_rgba(0,255,102,0.35)]'}
              rounded-xl p-4.5 cursor-pointer relative overflow-hidden group
              transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.015]
              border border-slate-800/80
            `}
          >
            {/* Ambient Background Corner Glow */}
            <div
              className={`
                absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300
                ${isRed ? 'bg-red-600/20 group-hover:bg-red-600/40' : 'bg-emerald-500/20 group-hover:bg-emerald-500/40'}
              `}
            />

            {/* Top Row: Label & Icon */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                {metric.title}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                {metric.icon}
              </div>
            </div>

            {/* Big Pulsating Metric Value */}
            <div className="flex items-baseline gap-3 my-1">
              <span
                className={`
                  text-3xl sm:text-4xl font-extrabold tracking-tight font-sans
                  ${isRed ? 'text-[#ff2a4d] glow-text-red animate-pulse-red' : 'text-[#00ff66] glow-text-green animate-pulse-green'}
                `}
              >
                {metric.value}
              </span>
            </div>

            {/* Comparison Subtitle with Soft Pulsing */}
            <div className="flex items-center gap-1.5 text-xs font-mono mt-1 animate-pulse-soft">
              <span
                className={`
                  inline-flex items-center font-bold
                  ${isRed ? 'text-[#ff2a4d]' : 'text-[#00ff66]'}
                `}
              >
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {metric.change}
              </span>
              <span className="text-slate-400 text-[11px]">
                {metric.comparison}
              </span>
            </div>

            {/* Bottom Cyber Line Accent */}
            <div
              className={`
                absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300
                ${isRed 
                  ? 'bg-gradient-to-r from-transparent via-red-500/30 to-transparent group-hover:via-red-500/80' 
                  : 'bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent group-hover:via-emerald-500/80'
                }
              `}
            />
          </div>
        );
      })}
    </div>
  );
};
