import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Database, 
  Bug, 
  MailWarning, 
  Radio, 
  AlertTriangle, 
  ExternalLink,
  CheckCircle
} from 'lucide-react';

interface ThreatItem {
  id: string;
  name: string;
  severity: 'High Risk' | 'Medium Risk' | 'Low Risk';
  ip: string;
  timestamp: string;
  vector: string;
  status: 'Blocked' | 'Mitigated' | 'Investigating';
  icon: React.ReactNode;
}

export const TopThreatIntelligence: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<ThreatItem | null>(null);

  const threats: ThreatItem[] = [
    {
      id: 't-1',
      name: 'Brute Force Attack',
      severity: 'High Risk',
      ip: '192.168.1.45',
      timestamp: '14:32:10',
      vector: 'SSH Port 22 / Multi-Threaded Dictionary Probe',
      status: 'Blocked',
      icon: <Terminal className="w-3.5 h-3.5 text-[#ff2a4d]" />,
    },
    {
      id: 't-2',
      name: 'SQL Injection',
      severity: 'High Risk',
      ip: '10.0.0.23',
      timestamp: '14:28:45',
      vector: "WAF Rule 942100 / UNION SELECT '1'-- bypass",
      status: 'Blocked',
      icon: <Database className="w-3.5 h-3.5 text-[#ff2a4d]" />,
    },
    {
      id: 't-3',
      name: 'Malware Detected',
      severity: 'Medium Risk',
      ip: '172.16.5.10',
      timestamp: '14:25:33',
      vector: 'Trojan.Win32.Cobalt / Memory injection hook',
      status: 'Mitigated',
      icon: <Bug className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 't-4',
      name: 'Phishing Attempt',
      severity: 'Medium Risk',
      ip: '192.168.1.78',
      timestamp: '14:22:19',
      vector: 'DKIM Spoofing / Domain Typo-squatting',
      status: 'Blocked',
      icon: <MailWarning className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 't-5',
      name: 'DDoS Attack',
      severity: 'High Risk',
      ip: '203.0.113.5',
      timestamp: '14:18:05',
      vector: 'UDP Reflection 48.2 Gbps peak / BGP Anycast Shunted',
      status: 'Mitigated',
      icon: <Radio className="w-3.5 h-3.5 text-[#ff2a4d]" />,
    },
  ];

  return (
    <div className="cyber-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ff2a4d]" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            TOP THREAT INTELLIGENCE
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">Live IoC Feed</span>
      </div>

      {/* Threats Table / List */}
      <div className="space-y-2 overflow-y-auto max-h-[235px] pr-1">
        {threats.map((threat) => {
          const isHigh = threat.severity === 'High Risk';

          return (
            <div
              key={threat.id}
              onClick={() => setSelectedThreat(threat)}
              className={`
                p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 cursor-pointer
                transition-all duration-300 flex items-center justify-between gap-3 group
                hover:bg-slate-900/90 hover:scale-[1.01]
                ${isHigh ? 'hover:border-[#ff2a4d] hover:shadow-[0_0_18px_rgba(255,42,77,0.3)]' : 'hover:border-amber-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.25)]'}
              `}
            >
              {/* Left: Icon & Threat Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`
                    p-1.5 rounded bg-slate-950 border shrink-0
                    ${isHigh ? 'border-red-900/70 text-[#ff2a4d]' : 'border-amber-900/70 text-amber-400'}
                  `}
                >
                  {threat.icon}
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-mono font-semibold text-slate-200 group-hover:text-white truncate">
                    {threat.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`
                        text-[9px] font-mono font-bold px-1.5 py-0.2 rounded
                        ${isHigh ? 'bg-red-950/80 text-[#ff2a4d] border border-red-800/80' : 'bg-amber-950/80 text-amber-400 border border-amber-800/80'}
                      `}
                    >
                      {threat.severity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Source IP & Timestamp */}
              <div className="text-right shrink-0">
                <div className="text-xs font-mono text-slate-300 font-medium">
                  {threat.ip}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {threat.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Detail popup if selected */}
      {selectedThreat && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedThreat(null)}
        >
          <div 
            className="cyber-card rounded-xl p-5 max-w-md w-full border border-red-500/50 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#ff2a4d]" />
                <h4 className="text-sm font-mono font-bold text-white">
                  {selectedThreat.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedThreat(null)}
                className="text-slate-400 hover:text-white text-xs font-mono p-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Threat Level:</span>
                <span className="text-[#ff2a4d] font-bold">{selectedThreat.severity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Attacker Source IP:</span>
                <span className="text-white font-bold">{selectedThreat.ip}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-300">{selectedThreat.timestamp} GMT+1</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Attack Signature:</span>
                <span className="text-cyan-400 text-right">{selectedThreat.vector}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Defensive Action:</span>
                <span className="text-[#00ff66] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {selectedThreat.status} by eBPF Firewall
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedThreat(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
              >
                Close Forensics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
