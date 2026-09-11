import React, { useState, useEffect, useRef } from 'react';
import { 
  History, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  Scan, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  KeyRound
} from 'lucide-react';

interface EventItem {
  id: string;
  type: string;
  actor: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'danger' | 'warning' | 'info';
  icon: React.ReactNode;
}

export const RecentEvents: React.FC = () => {
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'e-1',
      type: 'User Login',
      actor: 'admin',
      ip: '192.168.1.100',
      timestamp: '14:35:21',
      status: 'success',
      icon: <UserCheck className="w-3.5 h-3.5 text-[#00ff66]" />,
    },
    {
      id: 'e-2',
      type: 'Failed Login',
      actor: 'unknown',
      ip: '203.0.115.45',
      timestamp: '14:35:22',
      status: 'danger',
      icon: <UserX className="w-3.5 h-3.5 text-[#ff2a4d]" />,
    },
    {
      id: 'e-3',
      type: 'Threat Blocked',
      actor: 'System',
      ip: '10.0.0.23',
      timestamp: '14:35:24',
      status: 'success',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#00ff66]" />,
    },
    {
      id: 'e-4',
      type: 'Malware Scan',
      actor: 'System',
      ip: '172.16.5.10',
      timestamp: '14:35:25',
      status: 'info',
      icon: <Scan className="w-3.5 h-3.5 text-cyan-400" />,
    },
    {
      id: 'e-5',
      type: 'Compliance Check',
      actor: 'System',
      ip: '192.168.1.1',
      timestamp: '14:35:26',
      status: 'success',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66]" />,
    },
  ]);

  // Auto-scroll when new events arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events]);

  // Stream new live events periodically
  useEffect(() => {
    const templates: Omit<EventItem, 'id' | 'timestamp'>[] = [
      {
        type: 'MFA Token Verified',
        actor: 'sec_ops_01',
        ip: '192.168.1.112',
        status: 'success',
        icon: <KeyRound className="w-3.5 h-3.5 text-[#00ff66]" />,
      },
      {
        type: 'Failed Login',
        actor: 'root_probe',
        ip: '185.220.101.5',
        status: 'danger',
        icon: <UserX className="w-3.5 h-3.5 text-[#ff2a4d]" />,
      },
      {
        type: 'Policy Enforcement',
        actor: 'Kernel eBPF',
        ip: '10.244.0.18',
        status: 'info',
        icon: <Lock className="w-3.5 h-3.5 text-cyan-400" />,
      },
      {
        type: 'Threat Blocked',
        actor: 'WAF Guard',
        ip: '91.240.118.82',
        status: 'success',
        icon: <ShieldAlert className="w-3.5 h-3.5 text-[#00ff66]" />,
      },
      {
        type: 'Session Terminated',
        actor: 'soc_analyst',
        ip: '192.168.1.100',
        status: 'warning',
        icon: <UserCheck className="w-3.5 h-3.5 text-amber-400" />,
      },
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const template = templates[Math.floor(Math.random() * templates.length)];

      setEvents((prev) => [
        ...prev.slice(-25),
        {
          id: `evt-${Date.now()}-${Math.random()}`,
          timestamp: timeStr,
          ...template,
        },
      ]);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#00ff66]" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            RECENT EVENTS
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Pulsating Neon Green LIVE Status Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-[10px] font-mono text-[#00ff66] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-blink-live-green inline-block" />
            <span>LIVE</span>
          </div>

          <button
            onClick={() => setShowAllModal(true)}
            className="text-[11px] font-mono text-slate-400 hover:text-[#00ff66] transition-colors flex items-center gap-1 ml-1"
          >
            <span>VIEW ALL</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Events Table / List with live scroll */}
      <div 
        ref={containerRef}
        className="space-y-1.5 overflow-y-auto max-h-[190px] pr-1 scroll-smooth"
      >
        {events.map((evt) => {
          const isDanger = evt.status === 'danger';

          return (
            <div
              key={evt.id}
              className={`
                p-2 rounded-lg bg-slate-900/40 border border-slate-800/80
                flex items-center justify-between gap-3 text-xs font-mono
                transition-all duration-300 hover:bg-slate-900/90 cursor-pointer
                animate-in fade-in slide-in-from-bottom-2 duration-300
                ${isDanger ? 'hover:border-[#ff2a4d] hover:shadow-[0_0_15px_rgba(255,42,77,0.2)]' : 'hover:border-[#00ff66] hover:shadow-[0_0_15px_rgba(0,255,102,0.2)]'}
              `}
            >
              {/* Type with Icon */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1 rounded bg-slate-950 shrink-0">
                  {evt.icon}
                </div>
                <span className="font-semibold text-slate-200 truncate group-hover:text-white">
                  {evt.type}
                </span>
              </div>

              {/* Actor */}
              <div className="text-slate-400 text-[11px] hidden sm:block">
                {evt.actor}
              </div>

              {/* IP Address */}
              <div className="text-slate-300 text-[11px]">
                {evt.ip}
              </div>

              {/* Timestamp */}
              <div className="text-slate-500 text-[11px] shrink-0">
                {evt.timestamp}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
        <span>Immutable Audit Stream</span>
        <span className="text-[#00ff66] font-semibold">Synced</span>
      </div>

      {/* View All Modal */}
      {showAllModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAllModal(false)}
        >
          <div 
            className="cyber-card rounded-xl p-5 max-w-lg w-full border border-emerald-500/50 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#00ff66]" />
                <h4 className="text-sm font-mono font-bold text-white">
                  All Recent Security Audit Events
                </h4>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono p-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto text-xs font-mono">
              {[...events].reverse().map((item, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-200 font-semibold">{item.type}</span>
                  <span className="text-slate-400">{item.actor}</span>
                  <span className="text-cyan-400">{item.ip}</span>
                  <span className="text-slate-500">{item.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAllModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
