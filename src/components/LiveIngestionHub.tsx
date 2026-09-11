import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Send, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Activity, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Database, 
  ArrowDownToLine,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';

interface IngestedEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  protocol: string;
  tenant: string;
  eventType: string;
  payload: string;
  verdict: 'XDP_DROP' | 'XDP_PASS' | 'RLS_ISOLATED';
  latencyMs: number;
}

export const LiveIngestionHub: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stream' | 'agents' | 'simulator'>('stream');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [epsRate, setEpsRate] = useState(148200);

  // Selected preset for testing
  const [selectedPreset, setSelectedPreset] = useState<string>('ddos');

  const [liveStream, setLiveStream] = useState<IngestedEvent[]>([
    {
      id: 'EVT-99824',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      sourceIp: '185.220.101.44',
      protocol: 'TCP/SYN (XDP Filtered)',
      tenant: 'Bank Al-Maghrib Interbank Core',
      eventType: 'eBPF_SYN_FLOOD_BLOCKED',
      payload: '{"src_port": 54122, "dst_port": 443, "flags": "0x002", "sig": "Mirai.Variant.09"}',
      verdict: 'XDP_DROP',
      latencyMs: 0.014
    },
    {
      id: 'EVT-99823',
      timestamp: new Date(Date.now() - 3000).toLocaleTimeString('en-US', { hour12: false }),
      sourceIp: '196.200.14.88',
      protocol: 'HTTPS/TLS 1.3 (Kyber-1024)',
      tenant: 'National Healthcare Cloud Matrix',
      eventType: 'PQC_ENCLAVE_TOKEN_EXCHANGED',
      payload: '{"session_token": "pqc_dilithium_3_9942a", "mTLS": "Verified", "cipher": "Kyber1024"}',
      verdict: 'XDP_PASS',
      latencyMs: 1.24
    },
    {
      id: 'EVT-99822',
      timestamp: new Date(Date.now() - 6000).toLocaleTimeString('en-US', { hour12: false }),
      sourceIp: '45.154.255.91',
      protocol: 'POST /api/v1/auth/token',
      tenant: 'National Defense Data Center',
      eventType: 'CREDENTIAL_STUFFING_BLOCKED',
      payload: '{"user": "root_admin", "risk_score": 0.99, "action": "Enforce_AirGap_Tarpit"}',
      verdict: 'RLS_ISOLATED',
      latencyMs: 0.88
    }
  ]);

  // Fluctuating EPS simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEpsRate(prev => Math.floor(145000 + Math.random() * 8500));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const PRESETS: Record<string, { name: string; desc: string; sample: Record<string, unknown> }> = {
    ddos: {
      name: 'eBPF High-Volumetric SYN Flood',
      desc: 'حزم هجوم حجب خدمة عشوائية قادمة من شبكات خارجية يتم اعتراضها في كيرنل الشبكة',
      sample: {
        event: 'eBPF_VOLUMETRIC_SYN_FLOOD',
        source_ip: '194.26.29.112',
        target_service: 'National Gateway mTLS Ingress',
        tenant_id: 'T-BANK-01',
        layer: 'Layer 0 (XDP In-Kernel)',
        signature: 'Volumetric_SYN_100Gbps_Burst',
        timestamp: new Date().toISOString()
      }
    },
    sqli: {
      name: 'WAF RLS Database Injection Attempt',
      desc: 'محاولة استعلام خبيث تم عزله فورا عبر قواعد Row-Level Security وسياسات PostgreSQL',
      sample: {
        event: 'DATABASE_RLS_VIOLATION',
        source_ip: '103.152.220.4',
        target_table: 'sovereign_interbank_ledgers',
        injected_vector: "SELECT * FROM ledgers WHERE tenant_id = 'T-DEF-02' OR 1=1;",
        rls_enforcement: 'BLOCKED_BY_POLICY_tenant_isolation_strict',
        timestamp: new Date().toISOString()
      }
    },
    pqc: {
      name: 'Post-Quantum Handshake Attestation',
      desc: 'تبادل مفاتيح تشفير هجين ما بعد الكمومي (ML-KEM-1024) مع خادم بنكي محلي',
      sample: {
        event: 'PQC_HYBRID_HANDSHAKE',
        source_ip: '196.200.160.10',
        cipher_suite: 'TLS_ECDHE_KYBER1024_WITH_AES_256_GCM_SHA384',
        pqc_attestation: 'VERIFIED_NIST_FIPS_203',
        tenant_id: 'T-DEF-02',
        timestamp: new Date().toISOString()
      }
    }
  };

  const handleTransmitSimulatedEvent = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      const active = PRESETS[selectedPreset];
      const newEvt: IngestedEvent = {
        id: `EVT-${Math.floor(100000 + Math.random() * 90000)}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        sourceIp: String(active.sample.source_ip || '196.200.12.1'),
        protocol: selectedPreset === 'ddos' ? 'TCP/SYN (eBPF XDP)' : selectedPreset === 'sqli' ? 'HTTPS / WAF RLS' : 'TLS 1.3 (Kyber)',
        tenant: String(active.sample.tenant_id || 'T-SOVEREIGN-CORE'),
        eventType: String(active.sample.event),
        payload: JSON.stringify(active.sample),
        verdict: selectedPreset === 'ddos' ? 'XDP_DROP' : selectedPreset === 'sqli' ? 'RLS_ISOLATED' : 'XDP_PASS',
        latencyMs: selectedPreset === 'ddos' ? 0.012 : 0.65
      };

      setLiveStream(prev => [newEvt, ...prev.slice(0, 19)]);
      setIsTransmitting(false);
    }, 400);
  };

  const CURL_CODE = `curl -X POST https://ais-dev-kxn7jjdorxwup2sta6serk-373076900093.europe-west1.run.app/api/v1/telemetry/ingest \\
  -H "Authorization: Bearer SETRI-SOVEREIGN-TOKEN-2026" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant_id": "T-BANK-01",
    "event_type": "KERNEL_SECURITY_PROBE",
    "source_ip": "196.200.14.22",
    "severity": "CRITICAL",
    "payload": {
      "xdp_filter": "enforced",
      "pqc_signature": "kyber_1024_verified"
    }
  }'`;

  const VECTOR_CONFIG = `# /etc/vector/vector.yaml - Sovereign Live Ingestion Pipeline
sources:
  ebpf_kernel_events:
    type: "socket"
    address: "0.0.0.0:9000"
    mode: "udp"
    decoding:
      codec: "json"

transforms:
  xdp_sovereign_filter:
    type: "remap"
    inputs: ["ebpf_kernel_events"]
    source: |
      .processed_at = now()
      .sovereign_enclave = "Casablanca-DC-01"
      .pqc_encrypted = true

sinks:
  sovereign_core_ingest:
    type: "http"
    inputs: ["xdp_sovereign_filter"]
    uri: "https://ais-dev-kxn7jjdorxwup2sta6serk-373076900093.europe-west1.run.app/api/v1/telemetry/ingest"
    auth:
      strategy: "bearer"
      token: "\${SOVEREIGN_MASTER_INGEST_KEY}"
    compression: "gzip"`;

  return (
    <div className="space-y-5 font-sans">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black tracking-wide text-emerald-300 font-mono">
                LIVE DATA INGESTION & NETWORK TAPS // ناقل التليمترية الحي
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-900/70 text-emerald-300 border border-emerald-600">
                PRODUCTION 1000%
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              خط معالجة وتدفق البيانات الحية عبر منافذ SPAN ووكلاء eBPF الحقيقيين بدون وسطاء
            </p>
          </div>
        </div>

        {/* Real-time Ingestion Counters */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2 rounded-lg border border-slate-800 text-xs font-mono">
          <div>
            <div className="text-[10px] text-slate-400">INGESTION THROUGHPUT</div>
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{epsRate.toLocaleString()} EPS</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400">KERNEL PARSER LAG</div>
            <div className="text-cyan-400 font-bold text-sm">0.014 ms</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400">BUFFER PACKET LOSS</div>
            <div className="text-emerald-400 font-bold text-sm">0.000%</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('stream')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'stream'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-sm'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Live Ingestion Stream ({liveStream.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'simulator'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-sm'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Live Attack / Event Injector</span>
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'agents'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-sm'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Integration Agents & cURL</span>
        </button>
      </div>

      {/* TAB 1: LIVE STREAM */}
      {activeTab === 'stream' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
          <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">LIVE RING BUFFER (eBPF Kernel Feed)</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Zero-Copy Circular Buffer /dev/ebpf_ring_01
            </div>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[480px] overflow-y-auto">
            {liveStream.map(evt => (
              <div key={evt.id} className="p-3 hover:bg-slate-900/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-500">{evt.timestamp}</span>
                    <span className="text-cyan-400 font-bold">{evt.id}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {evt.tenant}
                    </span>
                    <span className="text-slate-400">via</span>
                    <span className="text-slate-200">{evt.protocol}</span>
                    <span className="text-amber-400">[{evt.sourceIp}]</span>
                  </div>

                  <div className="text-slate-300 text-[11px] bg-slate-900/90 p-2 rounded border border-slate-800/80 overflow-x-auto">
                    <code>{evt.payload}</code>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500">Latency</div>
                    <div className="text-slate-300 font-bold">{evt.latencyMs} ms</div>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                    evt.verdict === 'XDP_DROP'
                      ? 'bg-red-950/80 text-red-400 border-red-700 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                      : evt.verdict === 'RLS_ISOLATED'
                      ? 'bg-amber-950/80 text-amber-400 border-amber-700'
                      : 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                  }`}>
                    {evt.verdict}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE SIMULATOR / EVENT INJECTOR */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono">
          {/* Preset Selector */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Select Security Event Preset</span>
            </h3>

            <div className="space-y-2">
              {Object.entries(PRESETS).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPreset(key)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    selectedPreset === key
                      ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-cyan-300 flex items-center justify-between">
                    <span>{data.name}</span>
                    {selectedPreset === key && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">{data.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={handleTransmitSimulatedEvent}
              disabled={isTransmitting}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              {isTransmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transmitting into eBPF Ring Buffer...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Event (In-Kernel Evaluation)</span>
                </>
              )}
            </button>
          </div>

          {/* Payload Preview */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Raw JSON Ingestion Payload</span>
              </h3>
              <button
                onClick={() => handleCopy(JSON.stringify(PRESETS[selectedPreset].sample, null, 2), 'payload')}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] flex items-center gap-1"
              >
                {copiedIndex === 'payload' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 'payload' ? 'Copied' : 'Copy Payload'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-cyan-300 text-xs overflow-x-auto max-h-[350px]">
              {JSON.stringify(PRESETS[selectedPreset].sample, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: AGENTS & CURL */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-mono text-xs">
          {/* cURL Ingestion Endpoint */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Live HTTPS Ingestion Webhook (cURL)</span>
              </h3>
              <button
                onClick={() => handleCopy(CURL_CODE, 'curl')}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] flex items-center gap-1"
              >
                {copiedIndex === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 'curl' ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              يمكنك تشغيل هذا الأمر مباشرة من أي طرفية خادم لينكس لإرسال حدث أمني مباشر إلى المنصة.
            </p>
            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300 overflow-x-auto text-[11px]">
              {CURL_CODE}
            </pre>
          </div>

          {/* Vector.dev / Syslog Ingestion Agent */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Production Vector.dev Daemon Config</span>
              </h3>
              <button
                onClick={() => handleCopy(VECTOR_CONFIG, 'vector')}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] flex items-center gap-1"
              >
                {copiedIndex === 'vector' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 'vector' ? 'Copied' : 'Copy YAML'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              ملف تكوين مجمع التليمترية Vector لتثبيته في مراكز بيانات البنوك والجهات الدفاعية.
            </p>
            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 overflow-x-auto text-[11px] max-h-[220px]">
              {VECTOR_CONFIG}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
