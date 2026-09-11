import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Pause, Play, Trash2 } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ALERT';
  message: string;
}

export const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '14:35:21', level: 'INFO', message: 'User admin logged in from 192.168.1.100' },
    { id: '2', timestamp: '14:35:22', level: 'WARN', message: 'Failed login attempt from 203.0.115.45' },
    { id: '3', timestamp: '14:35:23', level: 'ALERT', message: 'Multiple failed logins detected from 203.0.112.45' },
    { id: '4', timestamp: '14:35:24', level: 'INFO', message: 'Threat detected: SQL Injection attempt blocked' },
    { id: '5', timestamp: '14:35:25', level: 'INFO', message: 'Malware signature updated' },
    { id: '6', timestamp: '14:35:26', level: 'INFO', message: 'Compliance check completed: All systems operational' },
    { id: '7', timestamp: '14:35:27', level: 'WARN', message: 'Unusual traffic detected from 100.51.100.23' },
    { id: '8', timestamp: '14:35:28', level: 'ALERT', message: 'DDoS attack detected and mitigated' },
    { id: '9', timestamp: '14:35:29', level: 'INFO', message: 'Backup completed successfully' },
    { id: '10', timestamp: '14:35:30', level: 'INFO', message: 'System scan completed: No threats found' },
  ]);

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when new logs arrive if not paused
  useEffect(() => {
    if (!isPaused && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  // Stream new logs dynamically
  useEffect(() => {
    if (isPaused) return;

    const streamTemplates: { level: 'INFO' | 'WARN' | 'ALERT'; msg: string }[] = [
      { level: 'INFO', msg: 'Zero-Trust mTLS token verified for worker pod-04' },
      { level: 'WARN', msg: 'SSL/TLS handshake latency spike on port 443' },
      { level: 'ALERT', msg: 'Cross-Site Scripting attempt blocked by CSP nonces' },
      { level: 'INFO', msg: 'PostgreSQL RLS tenant context switched to tenant_498' },
      { level: 'ALERT', msg: 'SSRF target 169.254.169.254 blocked by egress firewall' },
      { level: 'INFO', msg: 'NIST CSF continuous audit pass verified: 91%' },
      { level: 'WARN', msg: 'High entropy string detected in HTTP body: filtered' },
      { level: 'INFO', msg: 'Argon2id password verification completed in 62ms' },
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const template = streamTemplates[Math.floor(Math.random() * streamTemplates.length)];

      setLogs((prev) => [
        ...prev.slice(-40),
        {
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: timeStr,
          level: template.level,
          message: template.msg,
        },
      ]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="cyber-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00ff66]" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            SYSTEM LOGS
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title={isPaused ? 'Resume stream' : 'Pause stream'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setLogs([])}
            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors"
            title="Clear console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/60 border border-red-800/80 text-[10px] font-mono text-[#ff2a4d] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a4d] animate-blink-live inline-block" />
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div
        ref={logContainerRef}
        className="h-[175px] sm:h-[190px] overflow-y-auto font-mono text-xs space-y-1.5 p-2 rounded bg-black/70 border border-slate-800/80"
      >
        {logs.length === 0 ? (
          <div className="text-slate-500 text-center py-6">Logs buffer cleared. Waiting for incoming stream...</div>
        ) : (
          logs.map((log) => {
            let levelColor = 'text-[#00ff66]';
            if (log.level === 'WARN') levelColor = 'text-amber-400';
            if (log.level === 'ALERT') levelColor = 'text-[#ff2a4d]';

            return (
              <div
                key={log.id}
                className="flex items-baseline gap-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <span className="text-slate-500 shrink-0 text-[11px]">{log.timestamp}</span>
                <span className={`font-bold shrink-0 text-[11px] ${levelColor}`}>
                  [{log.level}]
                </span>
                <span className="text-slate-300 text-[11px] break-all">{log.message}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
        <span>Log retention: WORM Encrypted</span>
        <span>Auto-ingest: 2.4k EPS</span>
      </div>
    </div>
  );
};
