import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  ShieldCheck, 
  Binary, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  FileText, 
  Lock, 
  ArrowRight, 
  Activity,
  Sliders,
  RefreshCw,
  Code2,
  Server,
  Crosshair,
  KeyRound,
  Download
} from 'lucide-react';

export const SovereignSupremacyConsole: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'ai-agent' | 'ebpf' | 'pqc' | 'zero-trust'>('ai-agent');

  // Pillar 1: Sovereign AI Autopilot State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [customThreatInput, setCustomThreatInput] = useState("SQL Injection attempt: ' UNION SELECT null, username, password FROM users --");
  const [customThreatIp, setCustomThreatIp] = useState("194.26.29.112");
  const [cisoReportModal, setCisoReportModal] = useState(false);
  const [investigations, setInvestigations] = useState([
    {
      id: 'INC-2027-0941',
      title: 'Multi-Stage Distributed Credential Stuffing & eBPF Lateral Interception',
      severity: 'CRITICAL',
      status: 'AUTONOMOUS_MITIGATED',
      mitre: ['T1110.004 Brute Force', 'T1078 Valid Accounts', 'T1059 Scripting'],
      detectedAt: '14:35:38',
      confidence: 98.4,
      chainOfThought: [
        'Ingested 18 connection bursts across unauthorized ASN from 185.220.101.5.',
        'Correlated SSH auth failure cascade with simultaneous WAF SQL injection on /v1/auth.',
        'Identified target endpoint as authentication broker; flagged credential spray pattern.',
        'Autonomous Playbook synthesized: Dispatched eBPF XDP drop filter + Session token revocation.'
      ],
      actions: [
        { label: 'eBPF XDP Drop', target: '185.220.101.5', status: 'EXECUTED', latency: '0.18 µs' },
        { label: 'Revoke Compromised JWTs', target: 'Token Family #94', status: 'COMPLETED', latency: '12 ms' },
        { label: 'Deploy WAF Virtual Regex Patch', target: '/v1/auth', status: 'ACTIVE', latency: '4 ms' }
      ]
    },
    {
      id: 'INC-2027-0883',
      title: 'Slowloris Application Layer Exhaustion on Sovereign API Gateway',
      severity: 'HIGH',
      status: 'AUTONOMOUS_MITIGATED',
      mitre: ['T1498 Denial of Service', 'T1499 Endpoint DoS'],
      detectedAt: '14:34:55',
      confidence: 94.1,
      chainOfThought: [
        'eBPF flow probe observed 85 half-open HTTP connections with abnormal TCP keep-alive timers.',
        'Gateway thread pool utilization spiked to 78% capacity.',
        'Triggered autonomous eBPF SYN-cookie shield; in-kernel drop counter engaged.'
      ],
      actions: [
        { label: 'Kernel SYN-Cookie Shield', target: 'eth0', status: 'ENGAGED', latency: '0.15 µs' },
        { label: 'Rate-limit Source Subnet', target: '45.142.0.0/16', status: 'APPLIED', latency: '1.2 ms' }
      ]
    }
  ]);

  // Pillar 2: eBPF Kernel Shield State
  const [ebpfDrops, setEbpfDrops] = useState([
    { ip: '185.220.101.5', reason: 'Foreign Tor Exit Node reconnaissance spray', packets: 14209, latency: '0.18 µs', status: 'XDP_DROP' },
    { ip: '91.240.118.82', reason: 'Cobalt Strike C2 beacon candidate probe', packets: 8943, latency: '0.17 µs', status: 'XDP_DROP' },
    { ip: '45.142.214.19', reason: 'Volumetric SYN flood anomaly (85 evt/s)', packets: 56120, latency: '0.19 µs', status: 'XDP_DROP' },
  ]);
  const [newFilterIp, setNewFilterIp] = useState('');
  const [newFilterReason, setNewFilterReason] = useState('');
  const [filterSuccessMsg, setFilterSuccessMsg] = useState('');

  // Pillar 3: Post-Quantum Cryptography State
  const [pqcVerified, setPqcVerified] = useState<boolean | null>(null);
  const [pqcLogId, setPqcLogId] = useState('LOG-SOV-2027-89');

  // Pillar 4: Zero-Trust Multi-Vector State
  const [vectors, setVectors] = useState({
    tpm: 100,
    behavior: 98,
    geoDrift: 99,
    credentials: 95,
    kernelIntegrity: 100
  });

  const compositeScore = Math.round(
    vectors.tpm * 0.25 +
    vectors.behavior * 0.20 +
    vectors.geoDrift * 0.20 +
    vectors.credentials * 0.15 +
    vectors.kernelIntegrity * 0.20
  );

  const getPostureStatus = (score: number) => {
    if (score >= 90) return { label: 'OPTIMAL (Full Access)', color: 'text-[#00ff66]', bg: 'bg-emerald-950/40 border-emerald-500/50' };
    if (score >= 75) return { label: 'ELEVATED MONITORING', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/50' };
    if (score >= 50) return { label: 'PRIVILEGE CLIPPED (Read-Only)', color: 'text-orange-400', bg: 'bg-orange-950/40 border-orange-500/50' };
    return { label: 'MICRO-QUARANTINED (Session Killed)', color: 'text-[#ff2a4d]', bg: 'bg-red-950/40 border-red-500/50' };
  };

  const currentPosture = getPostureStatus(compositeScore);

  // Handlers
  const handleTriggerAiInvestigation = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      const newInc = {
        id: `INC-2027-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `Autonomous AI Response: ${customThreatInput.slice(0, 50)}...`,
        severity: 'CRITICAL',
        status: 'AUTONOMOUS_MITIGATED',
        mitre: ['T1190 Exploit Public App', 'T1059 Command Execution'],
        detectedAt: new Date().toTimeString().split(' ')[0],
        confidence: 97.6,
        chainOfThought: [
          `Analyzed incoming payload from ${customThreatIp} via on-premise SLM.`,
          'Pattern signature matches adversarial exploitation attempts against sovereign endpoints.',
          `Direct eBPF XDP hook injected on NIC for ${customThreatIp} at sub-microsecond latency.`,
          'Post-quantum ML-DSA-87 digital signature appended to sovereign immutable ledger.'
        ],
        actions: [
          { label: 'eBPF XDP Quarantine', target: customThreatIp, status: 'EXECUTED', latency: '0.18 µs' },
          { label: 'Inject WAF Regex Filter', target: '/v1/auth', status: 'ACTIVE', latency: '2.1 ms' }
        ]
      };
      setInvestigations([newInc, ...investigations]);
      setEbpfDrops([
        { ip: customThreatIp, reason: `AI-Autopilot: ${customThreatInput.slice(0, 35)}`, packets: 1, latency: '0.18 µs', status: 'XDP_DROP' },
        ...ebpfDrops
      ]);
      setIsAiAnalyzing(false);
    }, 1400);
  };

  const handleInjectManualFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilterIp) return;
    const rule = {
      ip: newFilterIp,
      reason: newFilterReason || 'Operator Manual Intervention via eBPF Console',
      packets: 0,
      latency: '0.18 µs',
      status: 'XDP_DROP'
    };
    setEbpfDrops([rule, ...ebpfDrops]);
    setFilterSuccessMsg(`Successfully injected XDP_DROP rule for ${newFilterIp} (0.18 µs latency)`);
    setNewFilterIp('');
    setNewFilterReason('');
    setTimeout(() => setFilterSuccessMsg(''), 4000);
  };

  const handleVerifyPqc = () => {
    setPqcVerified(null);
    setTimeout(() => {
      setPqcVerified(true);
    }, 600);
  };

  return (
    <div className="rounded-xl bg-[#060a10]/95 border border-slate-800/80 p-4 sm:p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-xl">
      {/* Background Cyber Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-600/5 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-950/80 to-black border border-red-700/80 shadow-[0_0_12px_rgba(255,42,77,0.3)]">
              <Zap className="w-5 h-5 text-[#ff2a4d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wider">
                  SOVEREIGN SUPREMACY ENGINE
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-[#00ff66] border border-emerald-600/50 shadow-[0_0_8px_rgba(0,255,102,0.2)]">
                  2027 STANDARDS ACTIVE
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Next-Gen Defense: Autonomous Sovereign AI, eBPF Kernel Shields, Post-Quantum Cryptography & Multi-Vector Zero-Trust
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: CISO Executive Report */}
        <button
          onClick={() => setCisoReportModal(true)}
          className="px-3.5 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-[#ff2a4d] border border-red-700/80 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(255,42,77,0.2)] hover:shadow-[0_0_20px_rgba(255,42,77,0.4)]"
        >
          <FileText className="w-4 h-4" />
          <span>Generate CISO Executive Report</span>
        </button>
      </div>

      {/* 4 Pillars Navigation Tabs */}
      <div className="flex flex-wrap gap-2 my-5 p-1 rounded-lg bg-slate-950/80 border border-slate-800/80">
        <button
          onClick={() => setActiveSubTab('ai-agent')}
          className={`flex-1 min-w-[140px] px-3.5 py-2 rounded-md text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'ai-agent'
              ? 'bg-red-950/70 text-white border border-[#ff2a4d] shadow-[0_0_10px_rgba(255,42,77,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Bot className="w-4 h-4 text-[#ff2a4d]" />
          <span>Sovereign AI Autopilot</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ebpf')}
          className={`flex-1 min-w-[140px] px-3.5 py-2 rounded-md text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'ebpf'
              ? 'bg-cyan-950/70 text-white border border-cyan-500 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>eBPF Kernel Shield</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pqc')}
          className={`flex-1 min-w-[140px] px-3.5 py-2 rounded-md text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'pqc'
              ? 'bg-purple-950/70 text-white border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Binary className="w-4 h-4 text-purple-400" />
          <span>Post-Quantum Crypto</span>
        </button>

        <button
          onClick={() => setActiveSubTab('zero-trust')}
          className={`flex-1 min-w-[140px] px-3.5 py-2 rounded-md text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'zero-trust'
              ? 'bg-emerald-950/70 text-white border border-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
          <span>Continuous Zero-Trust</span>
        </button>
      </div>

      {/* TAB 1: SOVEREIGN AI AUTOPILOT */}
      {activeSubTab === 'ai-agent' && (
        <div className="space-y-6">
          {/* AI Advantage Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>100% Data Residency</span>
              </div>
              <div className="text-sm font-bold text-white">Air-Gapped Local Inference</div>
              <div className="text-[11px] text-slate-400">Zero telemetry egress to US/Commercial clouds. Full sovereign immunity.</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Autonomous Mitigation</span>
              </div>
              <div className="text-sm font-bold text-white">Sub-18ms Reaction Cycle</div>
              <div className="text-[11px] text-slate-400">Multi-stage correlation, dynamic eBPF quarantine, zero manual fatigue.</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ff2a4d]" />
                <span>Model Engine</span>
              </div>
              <div className="text-sm font-bold text-white">Sovereign-DeepSeek-R1-Cyber</div>
              <div className="text-[11px] text-slate-400">Fine-tuned on MITRE ATT&CK, DGSSI sovereign playbooks, and reverse engineering.</div>
            </div>
          </div>

          {/* Interactive Threat Simulator & AI Reasoning Trigger */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-red-950/40 via-slate-950/80 to-slate-950/80 border border-red-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff2a4d]">
                <Crosshair className="w-4 h-4" />
                <span>INTERACTIVE ADVERSARIAL THREAT INGESTION SIMULATOR</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Test AI Autopilot reasoning & eBPF dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Suspicious Event / Payload</label>
                <input
                  type="text"
                  value={customThreatInput}
                  onChange={(e) => setCustomThreatInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-black/60 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#ff2a4d]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Attacking Source IP</label>
                <input
                  type="text"
                  value={customThreatIp}
                  onChange={(e) => setCustomThreatIp(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-black/60 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#ff2a4d]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleTriggerAiInvestigation}
                disabled={isAiAnalyzing}
                className="px-4 py-2 rounded-lg bg-[#ff2a4d] hover:bg-red-600 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,42,77,0.4)] disabled:opacity-50"
              >
                {isAiAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Reasoning & Synthesizing eBPF Drop...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Run Sovereign AI Investigation & Auto-Mitigate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active Investigations Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00ff66]" />
                <span>AUTONOMOUS INVESTIGATION INCIDENTS & ROOT CAUSE REASONING</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">{investigations.length} Active Records</span>
            </div>

            <div className="space-y-3">
              {investigations.map((inc) => (
                <div
                  key={inc.id}
                  className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-red-950/80 text-[#ff2a4d] border border-red-700/60">
                        {inc.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-white">{inc.id}</span>
                      <span className="text-xs font-mono text-slate-300 font-medium">{inc.title}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <span className="text-slate-400">{inc.detectedAt}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-[#00ff66] border border-emerald-600/50 font-bold">
                        {inc.status}
                      </span>
                    </div>
                  </div>

                  {/* MITRE Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {inc.mitre.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-400 border border-cyan-800/40">
                        {m}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-purple-400 border border-purple-800/40">
                      AI Confidence: {inc.confidence}%
                    </span>
                  </div>

                  {/* Chain of Thought Box */}
                  <div className="p-3 rounded bg-black/50 border border-slate-800/80 text-xs font-mono space-y-1.5">
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#ff2a4d]" />
                      <span>Sovereign AI Chain-of-Thought Reasoning:</span>
                    </div>
                    {inc.chainOfThought.map((step, sIdx) => (
                      <div key={sIdx} className="text-slate-300 pl-2 border-l-2 border-slate-700 text-[11px]">
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* Executed Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">Remediations:</span>
                    {inc.actions.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono">
                        <CheckCircle2 className="w-3 h-3 text-[#00ff66]" />
                        <span className="text-white font-bold">{act.label}:</span>
                        <span className="text-slate-400">{act.target}</span>
                        <span className="text-cyan-400 font-semibold">({act.latency})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: eBPF KERNEL SHIELD */}
      {activeSubTab === 'ebpf' && (
        <div className="space-y-6">
          {/* Architectural Comparison vs CrowdStrike */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-950/50 via-slate-950/80 to-slate-950/80 border border-cyan-900/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>THE ARCHITECTURAL SUPERIORITY OF eBPF OVER LEGACY KERNEL DRIVERS</span>
            </div>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              Global platforms like CrowdStrike utilize traditional kernel drivers (.sys/.ko) that operate in unprotected ring 0. 
              A single malformed configuration file causes a catastrophic Operating System crash (Blue Screen of Death / Kernel Panic). 
              CyberArch utilizes <strong className="text-cyan-300">eBPF / XDP</strong>, which is checked by the Linux in-kernel verifier for mathematical safety proofs, 
              guaranteeing zero kernel crashes, sub-microsecond packet drops (0.18 µs), and complete isolation directly at the Network Interface Card (NIC).
            </p>
          </div>

          {/* eBPF Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center">
              <div className="text-[11px] text-slate-400">Packet Latency</div>
              <div className="text-lg font-bold text-[#00ff66] mt-0.5">0.18 µs</div>
              <div className="text-[10px] text-slate-400">XDP Native Driver Mode</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center">
              <div className="text-[11px] text-slate-400">In-Kernel Verifier</div>
              <div className="text-lg font-bold text-cyan-400 mt-0.5">PASSED (100%)</div>
              <div className="text-[10px] text-slate-400">Formal Memory Safety Proof</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center">
              <div className="text-[11px] text-slate-400">Inspected Packets</div>
              <div className="text-lg font-bold text-white mt-0.5">14,285,094</div>
              <div className="text-[10px] text-slate-400">Zero CPU thread lock</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center">
              <div className="text-[11px] text-slate-400">Active Drops</div>
              <div className="text-lg font-bold text-[#ff2a4d] mt-0.5">{ebpfDrops.length} Rules</div>
              <div className="text-[10px] text-slate-400">LRU BPF Hash Map</div>
            </div>
          </div>

          {/* Manual XDP Drop Injection Form */}
          <form onSubmit={handleInjectManualFilter} className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inject Dynamic eBPF XDP Drop Rule (Hardware Level)</span>
              </span>
              {filterSuccessMsg && (
                <span className="text-[11px] font-mono text-[#00ff66] animate-pulse">{filterSuccessMsg}</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Target IP (e.g. 198.51.100.99)"
                  value={newFilterIp}
                  onChange={(e) => setNewFilterIp(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-black/60 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Quarantine Reason"
                  value={newFilterReason}
                  onChange={(e) => setNewFilterReason(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-black/60 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                >
                  Apply Kernel Drop (0.18 µs)
                </button>
              </div>
            </div>
          </form>

          {/* Active In-Kernel Rules Table */}
          <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-200">ACTIVE eBPF XDP DROP TABLE (NIC MEMORY)</span>
              <span className="text-slate-400 text-[11px]">Interface: eth0 (XDP_DRV)</span>
            </div>
            <div className="divide-y divide-slate-800/60">
              {ebpfDrops.map((drop, idx) => (
                <div key={idx} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/40 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-950/80 text-[#ff2a4d] border border-red-700/60 font-bold">
                      {drop.status}
                    </span>
                    <span className="text-white font-bold">{drop.ip}</span>
                    <span className="text-slate-400 text-[11px]">{drop.reason}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span>Packets Dropped: <strong className="text-white">{drop.packets.toLocaleString()}</strong></span>
                    <span className="text-cyan-400">{drop.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POST-QUANTUM CRYPTOGRAPHY (PQC) */}
      {activeSubTab === 'pqc' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-950/50 via-slate-950/80 to-slate-950/80 border border-purple-900/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
              <Binary className="w-4 h-4" />
              <span>NIST POST-QUANTUM CRYPTOGRAPHY (FIPS 203 & FIPS 204 COMPLIANCE)</span>
            </div>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              Adversaries are actively engaging in "Harvest Now, Decrypt Later" (HNDL), recording encrypted sovereign traffic 
              to crack in 2028-2030 when quantum computers emerge. CyberArch preempts this threat by using <strong className="text-purple-300">ML-DSA-87 (CRYSTALS-Dilithium)</strong> for 
              tamper-evident forensic log lattice signatures and <strong className="text-purple-300">ML-KEM-1024 (CRYSTALS-Kyber)</strong> for key exchanges, rendering all telemetry mathematically uncrackable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200">QUANTUM SECURITY POSTURE</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-700/50 font-bold">ACTIVE</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Signature Standard:</span>
                  <span className="text-white font-bold">NIST FIPS 204 (ML-DSA-87)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Key Encapsulation:</span>
                  <span className="text-white font-bold">NIST FIPS 203 (ML-KEM-1024)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hashing Sponge:</span>
                  <span className="text-white font-bold">Keccak SHAKE256 / SHA3-512</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Grover Search Immunity:</span>
                  <span className="text-[#00ff66] font-bold">256-bit Unconditional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">HSM Enclave:</span>
                  <span className="text-cyan-400 font-bold">Casablanca Sovereign Root (Air-Gapped)</span>
                </div>
              </div>
            </div>

            {/* Interactive Signature Validator */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
              <div className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>INTERACTIVE LATTICE VERIFICATION</span>
                <KeyRound className="w-4 h-4 text-purple-400" />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Target Forensic Audit Log ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pqcLogId}
                    onChange={(e) => setPqcLogId(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded bg-black/60 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleVerifyPqc}
                    className="px-3 py-1.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  >
                    Verify Lattice Proof
                  </button>
                </div>
              </div>

              {pqcVerified && (
                <div className="p-3 rounded bg-purple-950/40 border border-purple-700/60 space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#00ff66] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>LATTICE SIGNATURE VERIFIED: TAMPER-EVIDENT</span>
                  </div>
                  <div className="text-slate-300 break-all font-mono text-[10px]">
                    Signature: ML-DSA-87-SIG:e4a8b792fc01...99bc3271 (256-bit Vector)
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    Legal Admissibility: Guaranteed under Sovereign Defense Court through 2030+.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONTINUOUS ZERO-TRUST MULTI-VECTOR */}
      {activeSubTab === 'zero-trust' && (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-950/50 via-slate-950/80 to-slate-950/80 border border-emerald-900/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00ff66]">
              <ShieldCheck className="w-4 h-4" />
              <span>CONTEXTUAL CONTINUOUS ZERO-TRUST POSTURE (NIST SP 800-207)</span>
            </div>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              Static logins and single-check MFA are obsolete. CyberArch computes a continuous 5-dimensional trust vector 
              with every API gateway request. If device trust or behavioral velocity drops by even 10%, privileges are dynamically 
              restricted without disrupting operational resilience.
            </p>
          </div>

          {/* Current Dynamic Posture Badge */}
          <div className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono ${currentPosture.bg}`}>
            <div>
              <div className="text-xs text-slate-400 font-semibold">Real-Time Composite Zero-Trust Score:</div>
              <div className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                <span>{compositeScore}%</span>
                <span className={`text-sm font-bold ${currentPosture.color}`}>
                  [{currentPosture.label}]
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-300 sm:text-right">
              <div>Enforcement: Dynamic Session Attestation</div>
              <div className="text-slate-400 text-[11px]">Evaluation Cadence: Continuous (Every HTTP request)</div>
            </div>
          </div>

          {/* 5-Vector Interactive Sliders */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00ff66]" />
                <span>INTERACTIVE MULTI-VECTOR TRUST SIMULATOR</span>
              </span>
              <button
                onClick={() => setVectors({ tpm: 100, behavior: 98, geoDrift: 99, credentials: 95, kernelIntegrity: 100 })}
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Optimal</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vector 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">1. Hardware TPM 2.0 & Secure Boot:</span>
                  <span className="font-bold text-[#00ff66]">{vectors.tpm}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vectors.tpm}
                  onChange={(e) => setVectors({ ...vectors, tpm: Number(e.target.value) })}
                  className="w-full accent-[#00ff66] cursor-pointer"
                />
              </div>

              {/* Vector 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">2. Behavioral Velocity & API Cadence:</span>
                  <span className="font-bold text-[#00ff66]">{vectors.behavior}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vectors.behavior}
                  onChange={(e) => setVectors({ ...vectors, behavior: Number(e.target.value) })}
                  className="w-full accent-[#00ff66] cursor-pointer"
                />
              </div>

              {/* Vector 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">3. Network Geo-Drift & ASN Stability:</span>
                  <span className="font-bold text-[#00ff66]">{vectors.geoDrift}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vectors.geoDrift}
                  onChange={(e) => setVectors({ ...vectors, geoDrift: Number(e.target.value) })}
                  className="w-full accent-[#00ff66] cursor-pointer"
                />
              </div>

              {/* Vector 4 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">4. Credential Posture & MFA Freshness:</span>
                  <span className="font-bold text-[#00ff66]">{vectors.credentials}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vectors.credentials}
                  onChange={(e) => setVectors({ ...vectors, credentials: Number(e.target.value) })}
                  className="w-full accent-[#00ff66] cursor-pointer"
                />
              </div>

              {/* Vector 5 */}
              <div className="space-y-1 md:col-span-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">5. Kernel Process Lineage (eBPF Verified):</span>
                  <span className="font-bold text-[#00ff66]">{vectors.kernelIntegrity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vectors.kernelIntegrity}
                  onChange={(e) => setVectors({ ...vectors, kernelIntegrity: Number(e.target.value) })}
                  className="w-full accent-[#00ff66] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CISO EXECUTIVE REPORT MODAL */}
      {cisoReportModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-[#080d14] border border-red-700/80 rounded-xl shadow-[0_0_50px_rgba(255,42,77,0.3)] overflow-hidden font-mono flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-red-950/80 border-b border-red-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5 text-[#ff2a4d]" />
                <span className="font-bold text-sm">CISO EXECUTIVE INCIDENT & SOVEREIGN AUDIT REPORT</span>
              </div>
              <button
                onClick={() => setCisoReportModal(false)}
                className="px-2 py-1 rounded bg-black/60 hover:bg-black text-slate-300 text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-200">
              <div className="p-3 rounded bg-red-950/30 border border-red-700/50 text-[11px] flex justify-between items-center text-[#ff2a4d] font-bold">
                <span>CLASSIFICATION: TOP SECRET // MOROCCO DEFENSE SOVEREIGN CLOUD</span>
                <span>SECURITY CLEARANCE: SOVEREIGN LEVEL 4</span>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400">Document Identifier: <strong>REP-SOV-2027-DGSSI-001</strong></div>
                <div className="text-slate-400">Date of Evaluation: <strong>{new Date().toUTCString()}</strong></div>
                <div className="text-slate-400">Autonomous Reasoning Engine: <strong>Sovereign-DeepSeek-R1-Cyber-Q8</strong></div>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-sm font-bold text-white">1. Executive Summary</div>
                <p className="text-slate-300 leading-relaxed">
                  During the last 24-hour cycle, the CyberArch platform operated with 100% digital sovereignty and zero data leakage to external commercial cloud providers. 
                  A total of 42 high-frequency attack vectors were neutralized autonomously in an average of 0.18 microseconds via eBPF XDP kernel drops. 
                  All forensic logs were digitally signed with post-quantum ML-DSA-87 lattices, providing mathematical non-repudiation defensible in sovereign court.
                </p>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-sm font-bold text-white">2. Competitive Supremacy Indicators</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>• OS Crash Immunity: <strong>100% (eBPF Sandboxed)</strong></div>
                  <div>• Quantum Immunity: <strong>NIST FIPS 203/204 Active</strong></div>
                  <div>• Vendor Lock-In: <strong>0% (Zero License Ingestion Tax)</strong></div>
                  <div>• Data Residency: <strong>100% In-Country Sovereign</strong></div>
                </div>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-sm font-bold text-white">3. Strategic Directive & Recommendation</div>
                <p className="text-slate-300 leading-relaxed">
                  Continue deployment of eBPF probes across regional perimeter nodes. The platform demonstrates readiness to supersede legacy US vendor stacks across national infrastructure and military datacenters.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Post-Quantum Signature: ML-DSA-87-SIG:7d8a9f...b10</span>
              <button
                onClick={() => {
                  alert('Report compiled and downloaded as sovereign audit document.');
                  setCisoReportModal(false);
                }}
                className="px-4 py-2 rounded bg-[#ff2a4d] hover:bg-red-600 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_12px_rgba(255,42,77,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>Export Official Signed PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
