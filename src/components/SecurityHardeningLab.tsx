import React, { useState } from 'react';
import { SECURITY_HEADERS, OWASP_DEFENSES } from '../data/blueprintData';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Sliders, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Terminal, 
  RefreshCw,
  Server,
  Zap,
  Radio,
  FileCheck,
  Code2,
  Copy,
  Check
} from 'lucide-react';

export const SecurityHardeningLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'headers' | 'owasp' | 'ssrf-sim'>('headers');

  // Headers Calculator State with all 7 headers
  const [headersState, setHeadersState] = useState<Record<string, boolean>>({
    csp: true,
    hsts: true,
    xfo: true,
    xcto: true,
    referrer: true,
    permissions: true,
    coop: true
  });

  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  // Simulator State
  const [targetInput, setTargetInput] = useState<string>('https://app.target-domain.com');
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simSteps, setSimSteps] = useState<Array<{
    title: string;
    status: 'pending' | 'success' | 'blocked' | 'running';
    detail: string;
  }>>([]);

  // Calculate Security Score accurately
  const calculateScore = () => {
    let score = 0;
    if (headersState.csp) score += 25;
    if (headersState.hsts) score += 20;
    if (headersState.xfo) score += 15;
    if (headersState.xcto) score += 10;
    if (headersState.referrer) score += 10;
    if (headersState.permissions) score += 10;
    if (headersState.coop) score += 10;
    return score;
  };

  const score = calculateScore();

  const getScoreGrade = () => {
    if (score >= 95) return { grade: 'A+', color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/20' };
    if (score >= 80) return { grade: 'A', color: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-950/20' };
    if (score >= 60) return { grade: 'B', color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-950/20' };
    return { grade: 'F', color: 'text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-950/20' };
  };

  const scoreGrade = getScoreGrade();

  const toggleHeader = (key: string) => {
    setHeadersState(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Run SSRF & Scan Simulator
  const handleRunSimulation = (overrideTarget?: string) => {
    const target = overrideTarget || targetInput;
    if (overrideTarget) setTargetInput(overrideTarget);

    setSimRunning(true);
    setSimSteps([
      { title: '1. API Gateway Ingress & Token Verification', status: 'running', detail: 'Verifying asymmetric RS256 JWT signature & checking rate limit quota...' }
    ]);

    setTimeout(() => {
      setSimSteps(prev => [
        { ...prev[0], status: 'success', detail: 'JWT verified: Tenant ID: 4d2e-8a1c (Role: SecOpsAnalyst). Rate limit: 1/30 req/s.' },
        { title: '2. SSRF Pre-flight & DNS Boundary Validation', status: 'running', detail: `Resolving target '${target}' and inspecting against RFC 1918 & Cloud Metadata filters...` }
      ]);

      setTimeout(() => {
        // Check if target is suspicious/SSRF
        const isSsrf = target.includes('169.254') || target.includes('192.168') || target.includes('10.') || target.includes('127.0.0.1') || target.includes('localhost') || target.includes('metadata');

        if (isSsrf) {
          setSimSteps(prev => [
            prev[0],
            { 
              title: '2. SSRF Pre-flight & DNS Boundary Validation', 
              status: 'blocked', 
              detail: `CRITICAL ALERT: Target '${target}' resolves to blocked private address space. Egress socket was severed before transmission. Incident logged to SIEM with sub-18ms containment.` 
            }
          ]);
          setSimRunning(false);
        } else {
          setSimSteps(prev => [
            prev[0],
            { ...prev[1], status: 'success', detail: `Target verified public IP (93.184.216.34). Zero private/link-local address overlap.` },
            { title: '3. Enqueueing Task in Redis Cluster', status: 'running', detail: 'Writing scan job payload to Redis Celery broker with TLS encryption...' }
          ]);

          setTimeout(() => {
            setSimSteps(prev => [
              prev[0],
              prev[1],
              { ...prev[2], status: 'success', detail: 'Job #scan-9941 enqueued in Redis stream [celery_tasks_high_priority].' },
              { title: '4. Worker Sandbox Execution & Probe', status: 'running', detail: 'Celery worker pod spawned in ephemeral container sandbox. Executing SSLScan & TLS 1.3 audit...' }
            ]);

            setTimeout(() => {
              setSimSteps(prev => [
                prev[0],
                prev[1],
                prev[2],
                { ...prev[3], status: 'success', detail: 'Audit finished. Found: TLS 1.3 enabled, 0 weak ciphers, HSTS present (max-age=63072000).' },
                { title: '5. Encrypted PostgreSQL Commit & Evidence Storage', status: 'success', detail: 'Findings written with Row-Level Security (RLS) under Tenant 4d2e-8a1c. Raw JSON saved to S3 bucket with AES-256.' }
              ]);
              setSimRunning(false);
            }, 600);
          }, 500);
        }
      }, 500);
    }, 450);
  };

  const nginxSnippet = `# Generated Security Header Profile (Nginx)
${headersState.hsts ? 'add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;\n' : ''}${headersState.xfo ? 'add_header X-Frame-Options "DENY" always;\n' : ''}${headersState.xcto ? 'add_header X-Content-Type-Options "nosniff" always;\n' : ''}${headersState.referrer ? 'add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n' : ''}${headersState.csp ? 'add_header Content-Security-Policy "default-src \'self\'; object-src \'none\';" always;\n' : ''}${headersState.permissions ? 'add_header Permissions-Policy "camera=(), microphone=()" always;\n' : ''}${headersState.coop ? 'add_header Cross-Origin-Opener-Policy "same-origin" always;' : ''}`;

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('headers')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'headers'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Zero-Trust Headers Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('owasp')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'owasp'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OWASP Top 10 Defenses</span>
          </button>

          <button
            onClick={() => setActiveTab('ssrf-sim')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ssrf-sim'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>SSRF Simulator</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-950 border border-slate-800 hidden sm:block">
          Interactive Hardening Sandbox
        </div>
      </div>

      {/* TAB 1: ZERO-TRUST HEADERS EVALUATOR */}
      {activeTab === 'headers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Header Controls (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  HTTP Security Response Headers Configuration
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tap any header row to toggle enforcement and evaluate the live defense posture.
                </p>
              </div>

              <button
                onClick={() => {
                  const allOn = Object.values(headersState).every(Boolean);
                  const newVal = !allOn;
                  setHeadersState({
                    csp: newVal,
                    hsts: newVal,
                    xfo: newVal,
                    xcto: newVal,
                    referrer: newVal,
                    permissions: newVal,
                    coop: newVal
                  });
                }}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0"
              >
                Toggle All
              </button>
            </div>

            <div className="space-y-3">
              {SECURITY_HEADERS.map(header => {
                let key = 'csp';
                if (header.name.includes('Strict-Transport')) key = 'hsts';
                else if (header.name.includes('X-Frame-Options')) key = 'xfo';
                else if (header.name.includes('X-Content-Type')) key = 'xcto';
                else if (header.name.includes('Referrer-Policy')) key = 'referrer';
                else if (header.name.includes('Permissions-Policy')) key = 'permissions';
                else if (header.name.includes('Cross-Origin-Opener') || header.name.includes('COOP')) key = 'coop';

                const isEnabled = headersState[key] ?? true;

                return (
                  <div
                    key={header.name}
                    onClick={() => toggleHeader(key)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer select-none ${
                      isEnabled
                        ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-700/60 shadow-sm'
                        : 'bg-rose-950/20 border-rose-900/60 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${isEnabled ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'}`} />
                        <span className="text-xs font-mono font-bold text-white truncate">{header.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                          header.impactScore === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {header.impactScore}
                        </span>
                      </div>

                      {/* Interactive Toggle Switch */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[11px] font-mono font-bold ${isEnabled ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isEnabled ? 'ENFORCED' : 'DISABLED'}
                        </span>
                        <div className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${isEnabled ? 'bg-emerald-600' : 'bg-slate-800 border border-slate-700'}`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-5 shadow-[0_0_8px_#ffffff]' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-2">{header.description}</p>
                    <div className="mt-2 text-[11px] font-mono text-cyan-400 bg-slate-900/90 p-2 rounded border border-slate-800/80 overflow-x-auto">
                      {header.recommendedValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Scorecard (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`border ${scoreGrade.border} ${scoreGrade.bg} rounded-xl p-6 text-center space-y-3 transition-all duration-300`}>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Calculated Security Posture Score
              </span>
              <div className={`text-5xl font-black font-mono ${scoreGrade.color} transition-all`}>
                {score} / 100
              </div>
              <div className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold bg-slate-900 border border-slate-700 text-white">
                Grade: {scoreGrade.grade} Enterprise Hardened
              </div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                {score === 100 
                  ? 'All 7 critical browser mitigation headers are active. XSS, Clickjacking, MIME confusion, and SSL downgrade vectors are fully neutralized.'
                  : score >= 80
                  ? 'Adequate baseline, but some vectors (e.g. framing or MIME sniffing) remain exposed.'
                  : 'Warning: Multiple headers disabled. High risk of Cross-Site Scripting (XSS), framing/clickjacking, or cleartext interception.'}
              </p>
            </div>

            {/* Generated Nginx Snippet */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                  Live Generated Nginx Directives:
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(nginxSnippet);
                    setCopiedSnippet(true);
                    setTimeout(() => setCopiedSnippet(false), 2000);
                  }}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-3 rounded border border-slate-800/80 overflow-x-auto leading-relaxed">
                {nginxSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OWASP TOP 10 DEFENSE MATRIX */}
      {activeTab === 'owasp' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              OWASP Top 10 Enterprise Engineering Mitigations
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Every vulnerability category is neutralized through strict architectural constraints and automated code defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OWASP_DEFENSES.map((owasp) => (
              <div
                key={owasp.code}
                className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between hover:border-cyan-700/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                      {owasp.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                      {owasp.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">{owasp.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{owasp.riskSummary}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="text-xs text-slate-300">
                    <strong className="text-cyan-400 font-mono text-[11px] block mb-1">
                      Architectural Defense:
                    </strong>
                    {owasp.engineeringDefense}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Hardened Code Snippet:
                    </span>
                    <pre className="text-[10px] font-mono text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800 overflow-x-auto max-h-36">
                      <code>{owasp.sampleCodeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE SCAN PIPELINE & SSRF GUARD SIMULATOR */}
      {activeTab === 'ssrf-sim' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Target Input & Test Vectors (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Vulnerability Scan Dispatcher
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter a target domain or test attack payloads against the platform's pre-flight SSRF firewall.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-slate-400 block font-medium">
                Target Hostname or IP Address:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="e.g. https://api.example.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => handleRunSimulation()}
                  disabled={simRunning || !targetInput}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Dispatch</span>
                </button>
              </div>
            </div>

            {/* Test Payloads */}
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
                One-Click Attack & Validation Scenarios:
              </span>
              <div className="space-y-1.5">
                <button
                  onClick={() => handleRunSimulation('https://app.target-domain.com')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300 transition-colors cursor-pointer"
                >
                  <span>Legitimate Public Target</span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">Pass (Public IP)</span>
                </button>
                <button
                  onClick={() => handleRunSimulation('http://169.254.169.254/latest/meta-data/')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-700/60 text-xs font-mono flex items-center justify-between text-slate-300 transition-colors cursor-pointer"
                >
                  <span>AWS Metadata SSRF Probe (169.254.169.254)</span>
                  <span className="text-[10px] text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-950 border border-rose-800">SSRF Block</span>
                </button>
                <button
                  onClick={() => handleRunSimulation('http://192.168.1.1:8080/admin')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-700/60 text-xs font-mono flex items-center justify-between text-slate-300 transition-colors cursor-pointer"
                >
                  <span>Internal RFC 1918 Intranet (192.168.1.1)</span>
                  <span className="text-[10px] text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-950 border border-rose-800">SSRF Block</span>
                </button>
                <button
                  onClick={() => handleRunSimulation('http://127.0.0.1:5432/internal_db')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-700/60 text-xs font-mono flex items-center justify-between text-slate-300 transition-colors cursor-pointer"
                >
                  <span>Loopback Localhost Probe (127.0.0.1)</span>
                  <span className="text-[10px] text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-950 border border-rose-800">SSRF Block</span>
                </button>
              </div>
            </div>
          </div>

          {/* Telemetry Output & Pipeline Trace (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-mono font-semibold text-white">
                  Distributed Scan Pipeline Execution Trace
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {simRunning ? 'Status: IN FLIGHT' : 'Status: IDLE'}
              </span>
            </div>

            {simSteps.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs font-mono space-y-2">
                <p>Select a scenario above to test the sovereign pre-flight firewall.</p>
                <button
                  onClick={() => handleRunSimulation('http://169.254.169.254/latest/meta-data/')}
                  className="px-3 py-1.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 text-xs font-mono hover:bg-rose-900 transition-colors"
                >
                  🚀 Test Blocked SSRF Exploit Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {simSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-lg border text-xs font-mono transition-all ${
                      step.status === 'success'
                        ? 'bg-slate-900 border-slate-800 text-slate-300'
                        : step.status === 'blocked'
                        ? 'bg-rose-950/30 border-rose-800/80 text-rose-200'
                        : 'bg-cyan-950/30 border-cyan-800/60 text-cyan-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{step.title}</span>
                      {step.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {step.status === 'blocked' && <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />}
                      {step.status === 'running' && <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />}
                    </div>
                    <p className="text-[11px] opacity-90 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
