import React, { useEffect, useRef } from 'react';
import { MetricsCards } from './MetricsCards';
import { ThreatDetectionChart } from './ThreatDetectionChart';
import { ComplianceRing } from './ComplianceRing';
import { LiveAttackMap } from './LiveAttackMap';
import { TopThreatIntelligence } from './TopThreatIntelligence';
import { SovereignSupremacyConsole } from './SovereignSupremacyConsole';
import { SystemLogs } from './SystemLogs';
import { RecentEvents } from './RecentEvents';
import { Filter, X, ShieldAlert, CheckCircle, Globe, History, Server } from 'lucide-react';

interface CyberDashboardProps {
  onCardClick?: (metricId: string) => void;
  activeFilter?: string;
  onClearFilter?: () => void;
}

export const CyberDashboard: React.FC<CyberDashboardProps> = ({ 
  onCardClick, 
  activeFilter = 'dashboard',
  onClearFilter 
}) => {
  const threatsRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeFilter === 'threats' || activeFilter === 'vulnerabilities') {
      threatsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeFilter === 'compliance') {
      complianceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeFilter === 'network' || activeFilter === 'assets') {
      networkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeFilter === 'events' || activeFilter === 'identity') {
      eventsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeFilter]);

  const hasSpecificFilter = activeFilter !== 'dashboard' && activeFilter !== 'war-room';

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Active Sidebar Filter Alert Banner */}
      {hasSpecificFilter && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-700/60 flex items-center justify-between gap-3 text-xs font-mono shadow-lg">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-red-900/60 text-[#ff2a4d]">
              <Filter className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">
              Active Category Focus: <strong className="text-[#ff2a4d] uppercase font-bold">{activeFilter}</strong>
            </span>
          </div>

          <button
            onClick={onClearFilter}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors text-[11px]"
          >
            <X className="w-3 h-3" />
            <span>Reset to All Sections</span>
          </button>
        </div>
      )}

      {/* 1. Top 4 Pulsating Metrics Cards */}
      <section aria-label="Key Performance Indicators">
        <MetricsCards onCardClick={onCardClick} />
      </section>

      {/* 2. Next-Gen Breakthrough Engine: Sovereign AI, eBPF Kernel Shield & Post-Quantum Crypto */}
      <section aria-label="Sovereign Supremacy Engine">
        <SovereignSupremacyConsole />
      </section>

      {/* 3. Middle Row: Threat Detection Line Chart (Left) + Compliance Frameworks (Right) */}
      <section 
        ref={complianceRef} 
        className={`grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch transition-all ${
          activeFilter === 'compliance' ? 'ring-2 ring-emerald-500/80 rounded-2xl p-1 bg-emerald-950/20' : ''
        }`}
      >
        <div className="lg:col-span-6 h-full min-h-[290px]">
          <ThreatDetectionChart />
        </div>
        <div className="lg:col-span-6 h-full min-h-[290px]">
          <ComplianceRing />
        </div>
      </section>

      {/* 4. Live Attack Map (Left) + Top Threat Intelligence (Right) */}
      <section 
        ref={threatsRef}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch transition-all ${
          activeFilter === 'threats' || activeFilter === 'vulnerabilities' ? 'ring-2 ring-red-500/80 rounded-2xl p-1 bg-red-950/20' : ''
        }`}
      >
        <div ref={networkRef} className="lg:col-span-6 h-full min-h-[310px]">
          <LiveAttackMap />
        </div>
        <div className="lg:col-span-6 h-full min-h-[310px]">
          <TopThreatIntelligence />
        </div>
      </section>

      {/* 5. Bottom Row: System Logs (Left) + Recent Events (Right) */}
      <section 
        ref={eventsRef}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch transition-all ${
          activeFilter === 'events' ? 'ring-2 ring-cyan-500/80 rounded-2xl p-1 bg-cyan-950/20' : ''
        }`}
      >
        <div className="lg:col-span-6 h-full min-h-[260px]">
          <SystemLogs />
        </div>
        <div className="lg:col-span-6 h-full min-h-[260px]">
          <RecentEvents />
        </div>
      </section>
    </div>
  );
};
