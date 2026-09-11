import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Database, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Terminal, 
  Building2, 
  Globe, 
  Cpu, 
  EyeOff
} from 'lucide-react';

interface ThreatRecord {
  id: string;
  query: string;
  type: 'IP' | 'DOMAIN' | 'HASH' | 'ASSET';
  verdict: 'MALICIOUS' | 'SUSPICIOUS' | 'CLEAN' | 'INTERNAL_ISOLATED';
  riskScore: number;
  tenantScope: string;
  mitreTag: string;
  firstSeen: string;
  details: string;
  quarantined: boolean;
}

const SAMPLE_THREATS: ThreatRecord[] = [
  {
    id: 'IOC-9921',
    query: '185.220.101.5',
    type: 'IP',
    verdict: 'MALICIOUS',
    riskScore: 98,
    tenantScope: 'Private Tenant (Ministry of Digital Transition)',
    mitreTag: 'T1071.001 - Web Protocols (C2 Traffic)',
    firstSeen: '3 mins ago',
    details: 'Flagged by National eBPF Sensor as active Command-and-Control (C2) beacon with encrypted tunneling attempts.',
    quarantined: true,
  },
  {
    id: 'IOC-8842',
    query: 'secure-banking-portal-auth.xyz',
    type: 'DOMAIN',
    verdict: 'MALICIOUS',
    riskScore: 94,
    tenantScope: 'Private Tenant (Critical Infrastructure)',
    mitreTag: 'T1566.002 - Spearphishing Link',
    firstSeen: '18 mins ago',
    details: 'Newly registered domain attempting credential harvesting impersonating government portal.',
    quarantined: true,
  },
  {
    id: 'IOC-7719',
    query: '192.168.1.105',
    type: 'ASSET',
    verdict: 'INTERNAL_ISOLATED',
    riskScore: 42,
    tenantScope: 'Private Tenant (Local Subnet)',
    mitreTag: 'T1046 - Network Service Discovery',
    firstSeen: '1 hour ago',
    details: 'Internal host exhibiting port-scanning activity. Local Row-Level Security policy enforced.',
    quarantined: false,
  },
  {
    id: 'IOC-6603',
    query: 'd41d8cd98f00b204e9800998ecf8427e',
    type: 'HASH',
    verdict: 'SUSPICIOUS',
    riskScore: 78,
    tenantScope: 'Private Tenant (Protected Endpoints)',
    mitreTag: 'T1059.004 - Unix Shell Script Execution',
    firstSeen: '2 hours ago',
    details: 'Unsigned binary attempting privilege escalation inside container sandbox.',
    quarantined: true,
  }
];

export const TenantSearchPortal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'IP' | 'DOMAIN' | 'HASH'>('ALL');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [threatsList, setThreatsList] = useState<ThreatRecord[]>(SAMPLE_THREATS);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const handleSearch = (overrideQuery?: string) => {
    const q = (overrideQuery !== undefined ? overrideQuery : searchQuery).trim();
    if (!q) {
      setThreatsList(SAMPLE_THREATS);
      setSearchFeedback(null);
      return;
    }

    setIsSearching(true);
    setSearchFeedback(`Sanitizing query via Zero-Trust Gateway & applying tenant isolation filter (tenant_id: tenant_gov_cni_01)...`);

    setTimeout(() => {
      const filtered = SAMPLE_THREATS.filter(item => 
        item.query.toLowerCase().includes(q.toLowerCase()) || 
        item.details.toLowerCase().includes(q.toLowerCase()) ||
        item.mitreTag.toLowerCase().includes(q.toLowerCase())
      );

      if (filtered.length > 0) {
        setThreatsList(filtered);
        setSearchFeedback(`Found ${filtered.length} matched record(s) strictly isolated within your organization.`);
      } else {
        // Generate on-the-fly safe simulated result
        const isMalicious = q.includes('c2') || q.includes('hack') || q.includes('bad') || q.includes('185.') || q.includes('exploit');
        const newRecord: ThreatRecord = {
          id: `IOC-${Math.floor(1000 + Math.random() * 9000)}`,
          query: q,
          type: q.includes('.') && !isNaN(Number(q[0])) ? 'IP' : (q.includes('.') ? 'DOMAIN' : 'HASH'),
          verdict: isMalicious ? 'MALICIOUS' : 'CLEAN',
          riskScore: isMalicious ? 92 : 12,
          tenantScope: 'Private Tenant (Enforced RLS Boundary)',
          mitreTag: isMalicious ? 'T1071 - Application Layer Protocol' : 'Verified Benign Entity',
          firstSeen: 'Just now (Live Query)',
          details: isMalicious 
            ? `National Threat Feed matched indicator with known threat actor campaign. Automatic SOAR containment recommended.`
            : `Entity verified clean across National and Global Threat Feeds. No malicious telemetry detected.`,
          quarantined: isMalicious
        };
        setThreatsList([newRecord, ...SAMPLE_THREATS]);
        setSearchFeedback(`Query analyzed dynamically by Air-Gapped Local Inference Engine (sub-18ms).`);
      }
      setIsSearching(false);
    }, 450);
  };

  const quickSamples = [
    { label: 'C2 IP: 185.220.101.5', val: '185.220.101.5' },
    { label: 'Phishing Domain', val: 'secure-banking-portal-auth.xyz' },
    { label: 'Internal Asset: 192.168.1.105', val: '192.168.1.105' },
    { label: 'SHA-256 Hash', val: 'd41d8cd98f00b204e9800998ecf8427e' }
  ];

  return (
    <div className="space-y-6">
      {/* Enterprise CISO Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/80 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-mono">
                  ENTERPRISE TENANT PORTAL & THREAT SEARCH
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  RLS ISOLATION ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Encrypted Omni-Search Bar for Domains, IPs, and Hashes with Strict Tenant Boundaries & Anonymized Feeds
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-slate-950/90 px-3 py-2 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tenant: <strong className="text-emerald-400 font-mono">GOV-CNI-SECTOR-01</strong></span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <EyeOff className="w-3.5 h-3.5" />
            <span>Zero-Leakage Guarantee</span>
          </div>
        </div>
      </div>

      {/* Main Omni-Search Bar */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Sovereign Threat Investigation Query (IOC / IP / Domain / Hash):</span>
          </label>

          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. 185.220.101.5, bad-domain.com, SHA256, or mitre:T1071..."
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-sm font-mono px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setThreatsList(SAMPLE_THREATS);
                    setSearchFeedback(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isSearching ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Execute Query</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Sample Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Quick IOCs:
          </span>
          {quickSamples.map((sample) => (
            <button
              key={sample.label}
              onClick={() => {
                setSearchQuery(sample.val);
                handleSearch(sample.val);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Live Feedback Banner */}
        {searchFeedback && (
          <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-xs font-mono text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{searchFeedback}</span>
          </div>
        )}
      </div>

      {/* Query Results & Threat Investigation Pivot */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2 font-bold">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Isolated Threat Telemetry Results ({threatsList.length})</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            PostgreSQL RLS Active | Tenant Scoped
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {threatsList.map((record) => {
            const isMalicious = record.verdict === 'MALICIOUS';
            const isIsolated = record.verdict === 'INTERNAL_ISOLATED';
            const isClean = record.verdict === 'CLEAN';

            return (
              <div
                key={record.id}
                className={`p-4 rounded-xl border transition-all ${
                  isMalicious
                    ? 'bg-red-950/20 border-red-900/50 hover:border-red-500/60 shadow-[0_4px_20px_rgba(255,42,77,0.08)]'
                    : isIsolated
                    ? 'bg-amber-950/20 border-amber-900/50 hover:border-amber-500/60'
                    : 'bg-emerald-950/20 border-emerald-900/50 hover:border-emerald-500/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{record.id}</span>
                    <span className="text-sm font-mono font-bold text-white tracking-wide">
                      {record.query}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                      {record.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${
                      isMalicious
                        ? 'bg-red-950 text-[#ff2a4d] border border-red-800'
                        : isIsolated
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-[#00ff66] border border-emerald-800'
                    }`}>
                      {record.verdict} (Risk: {record.riskScore}/100)
                    </span>

                    {record.quarantined && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/80 text-rose-300 border border-red-800 animate-pulse">
                        QUARANTINED
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">ORGANIZATIONAL SCOPE:</span>
                    <span className="text-slate-300 font-semibold">{record.tenantScope}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">MITRE ATT&CK:</span>
                    <span className="text-cyan-400 font-semibold">{record.mitreTag}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">FIRST OBSERVED:</span>
                    <span className="text-slate-400">{record.firstSeen}</span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  {record.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
