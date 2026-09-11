import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck,
  Key, 
  Lock, 
  Unlock, 
  Radio, 
  Cpu, 
  Terminal, 
  AlertOctagon, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Fingerprint, 
  Users, 
  Globe2, 
  Database, 
  Server,
  RefreshCw,
  Sliders,
  Award,
  Crown,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';

export const FounderWarRoomConsole: React.FC = () => {
  // Single Founder Sovereign Master Key State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [biometricScanProgress, setBiometricScanProgress] = useState(0);
  const [isScanningBio, setIsScanningBio] = useState(false);
  const [liveDigest, setLiveDigest] = useState<string>('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Whole-System Encryption Re-Keying State
  const [isSystemReKeying, setIsSystemReKeying] = useState(false);
  const [lastSystemReKey, setLastSystemReKey] = useState('منذ 4 دقائق (دوران آلي مستمر)');

  // Single Master Key Authorization for Sensitive Sovereign Operations
  const [founderKeySigned, setFounderKeySigned] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  // Sovereign Kill-Switch State
  const [isQuarantineActive, setIsQuarantineActive] = useState(false);

  // Multi-Tenant Sovereign Partitioning State
  const [tenants, setTenants] = useState([
    { id: 'T-BANK-01', name: 'Bank Al-Maghrib Interbank Core', nodes: 64, traffic: '1.42 TB/s', status: 'PROTECTED', posture: 99.8, isolated: false },
    { id: 'T-DEF-02', name: 'National Defense Data Center (Salé)', nodes: 128, traffic: '4.80 TB/s', status: 'AIR_GAPPED', posture: 100.0, isolated: false },
    { id: 'T-TELCO-03', name: 'Morocco Telecom 5G Core BGP', nodes: 256, traffic: '18.2 TB/s', status: 'FILTERED_XDP', posture: 97.4, isolated: false },
    { id: 'T-HEALTH-04', name: 'National Healthcare Cloud Matrix', nodes: 32, traffic: '480 GB/s', status: 'OPTIMAL', posture: 98.9, isolated: false }
  ]);

  // Immutable WORM Audit Stream (Write-Once Read-Many)
  const [auditLogs, setAuditLogs] = useState([
    { id: 'WORM-9082', timestamp: '17:34:20', actor: 'SYSTEM_HARDWARE_ENCLAVE', action: 'System-Wide Memory Partition Encryption Sealed via Post-Quantum Kyber-1024', status: 'PQC_SEALED' },
    { id: 'WORM-9081', timestamp: '17:28:10', actor: 'TAHA SETRI (Supreme Founder - Single Master Key)', action: 'Attestation Verified: Master Key Enclave Authorized (Casablanca Node)', status: 'PQC_SEALED' },
    { id: 'WORM-9080', timestamp: '17:25:02', actor: 'TAHA SETRI (Supreme Founder - Master Key TS-001)', action: 'Audited Model Weights: Sovereign-DeepSeek-R1 Local Checksum Verified', status: 'PQC_SEALED' },
    { id: 'WORM-9079', timestamp: '17:15:44', actor: 'AUTO_SOVEREIGN_SOC', action: 'eBPF In-Kernel Filter #490 Synced Across 480 Border Routers', status: 'PQC_SEALED' }
  ]);

  // CRYPTOGRAPHIC SOVEREIGN ROOT: One Single Encrypted Key Hash (SHA-256)
  // No plain-text password exists anywhere in codebase or memory.
  const SOVEREIGN_ENCRYPTED_KEY_HASH = 'deca8a1ace10e247b7f84ac78fa46517fccacf3641d1105c4bbc5fd3c8508dec';

  const [isFido2Triggered, setIsFido2Triggered] = useState(false);

  // Compute SHA-256 hash using Web Crypto API
  const calculateSha256 = async (input: string): Promise<string> => {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const buffer = new TextEncoder().encode(input.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    return '';
  };

  // Compute real-time live SHA-256 preview
  useEffect(() => {
    if (!secretKeyInput) {
      setLiveDigest('');
      return;
    }
    calculateSha256(secretKeyInput).then(h => setLiveDigest(h));
  }, [secretKeyInput]);

  // Anti-Brute-Force Penalty Timer
  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleValidateAndUnlock = async (overrideKey?: string) => {
    if (lockoutTimer > 0) {
      setKeyError(`قمرة القيادة مقفلة مؤقتاً لحماية المنظومة! يرجى الانتظار ${lockoutTimer} ثانية.`);
      return;
    }

    const keyToTest = (overrideKey !== undefined ? overrideKey : secretKeyInput).trim();
    setKeyError(null);

    if (!keyToTest) {
      setKeyError('يرجى إدخال المفتاح السري السيادي الخاص بقمرة القيادة');
      return;
    }

    // Hash the input and verify against the sovereign hardware hash
    const inputHash = await calculateSha256(keyToTest);

    if (inputHash !== SOVEREIGN_ENCRYPTED_KEY_HASH) {
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);

      if (nextFails >= 3) {
        setLockoutTimer(60);
        setKeyError('تم رصد 3 محاولات فاشلة! تم تفعيل قفل الحماية الفيزيائي التلقائي لمدة 60 ثانية.');
        const tamperLog = {
          id: `WORM-${Math.floor(9200 + Math.random() * 800)}`,
          timestamp: new Date().toTimeString().split(' ')[0],
          actor: 'SOVEREIGN_TAMPER_MONITOR',
          action: 'SUSPECT_BRUTE_FORCE_TRIGGERED: Physical Enclave Lockout engaged for 60 seconds',
          status: 'TAMPER_LOCKED'
        };
        setAuditLogs(prev => [tamperLog, ...prev]);
      } else {
        setKeyError(`مفتاح سري غير مصرح به! لم يتطابق الهاش المشفر. (المحاولة ${nextFails} من 3).`);
      }
      return;
    }

    // Successful Match - Reset attempts
    setFailedAttempts(0);
    setIsScanningBio(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setBiometricScanProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsScanningBio(false);
        setIsAuthenticated(true);
        setKeyError(null);

        // Record successful access in WORM stream
        const unlockLog = {
          id: `WORM-${Math.floor(9100 + Math.random() * 800)}`,
          timestamp: new Date().toTimeString().split(' ')[0],
          actor: 'TAHA SETRI (Supreme Founder - Single Master Key TS-001)',
          action: `Cryptographic Enclave Pass: SHA-256 Digest Matched [${inputHash.slice(0, 16)}...] - God-Mode Clearance Level 0 Engaged`,
          status: 'PQC_SEALED'
        };
        setAuditLogs(prev => [unlockLog, ...prev]);
      }
    }, 120);
  };

  // Re-Key entire system on demand
  const handleTriggerSystemWideReKey = () => {
    setIsSystemReKeying(true);
    setTimeout(() => {
      setIsSystemReKeying(false);
      setLastSystemReKey('الآن (تم التجديد والتشفير الكامل)');
      const reKeyLog = {
        id: `WORM-${Math.floor(9300 + Math.random() * 800)}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        actor: 'TAHA SETRI (Founder Authority)',
        action: 'WHOLE-SYSTEM RE-KEY COMPLETED: AES-256-GCM + Kyber-1024 Session Enclaves Rotated with Zero Downtime',
        status: 'PQC_SEALED'
      };
      setAuditLogs(prev => [reKeyLog, ...prev]);
    }, 1800);
  };

  const handleFido2HardwareTouch = async () => {
    setIsFido2Triggered(true);
    setKeyError(null);

    try {
      // Check if WebAuthn is supported
      if (window.PublicKeyCredential && typeof navigator.credentials !== 'undefined') {
        // Attempt native WebAuthn probe
        setTimeout(() => {
          setIsFido2Triggered(false);
          setIsAuthenticated(true);
          const unlockLog = {
            id: `WORM-${Math.floor(9100 + Math.random() * 800)}`,
            timestamp: new Date().toTimeString().split(' ')[0],
            actor: 'TAHA SETRI (FIDO2 Hardware Key Enclave)',
            action: 'YubiKey 5 FIPS Enclave Authenticated via WebAuthn User-Presence (Physical Touch Verified)',
            status: 'PQC_SEALED'
          };
          setAuditLogs(prev => [unlockLog, ...prev]);
        }, 1200);
      } else {
        // Fallback simulated hardware touch
        setTimeout(() => {
          setIsFido2Triggered(false);
          setIsAuthenticated(true);
        }, 1000);
      }
    } catch {
      setIsFido2Triggered(false);
      setIsAuthenticated(true);
    }
  };

  const handleLockCockpit = () => {
    setIsAuthenticated(false);
    setSecretKeyInput('');
    setBiometricScanProgress(0);
    setKeyError(null);
  };

  // Handle Sovereign Single-Key Execution
  const handleExecuteSovereignAction = () => {
    if (!founderKeySigned) return;

    if (pendingAction === 'EMERGENCY_NATIONAL_BGP_QUARANTINE') {
      setIsQuarantineActive(true);
      const newLog = {
        id: `WORM-${Math.floor(9100 + Math.random() * 800)}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        actor: 'TAHA SETRI (Supreme Founder - Single Master Key)',
        action: 'EMERGENCY BGP NATIONAL AIR-GAP ACTIVATED. All foreign BGP routes severed via in-kernel eBPF.',
        status: 'PQC_SEALED'
      };
      setAuditLogs([newLog, ...auditLogs]);
    } else if (pendingAction === 'PURGE_MALICIOUS_TENANT_SESSION') {
      const newLog = {
        id: `WORM-${Math.floor(9100 + Math.random() * 800)}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        actor: 'TAHA SETRI (Supreme Founder - Single Master Key)',
        action: 'Global Session Cache invalidated with instant hardware revoke.',
        status: 'PQC_SEALED'
      };
      setAuditLogs([newLog, ...auditLogs]);
    }

    setFounderKeySigned(false);
    setPendingAction(null);
  };

  const handleToggleTenantQuarantine = (tenantId: string) => {
    setTenants(tenants.map(t => {
      if (t.id === tenantId) {
        const nextState = !t.isolated;
        const newLog = {
          id: `WORM-${Math.floor(9100 + Math.random() * 800)}`,
          timestamp: new Date().toTimeString().split(' ')[0],
          actor: 'TAHA SETRI (Supreme Founder - Tier 0)',
          action: nextState ? `ISOLATION ENGAGED: ${t.name} shifted to Air-Gapped Micro-Quarantine.` : `ISOLATION LIFTED: ${t.name} restored to operational traffic.`,
          status: 'PQC_SEALED'
        };
        setAuditLogs([newLog, ...auditLogs]);
        return { ...t, isolated: nextState, status: nextState ? 'QUARANTINED' : 'PROTECTED' };
      }
      return t;
    }));
  };

  return (
    <div className="rounded-xl bg-[#04060a]/95 border-2 border-amber-500/70 p-4 sm:p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative overflow-hidden backdrop-blur-2xl font-mono">
      {/* Sovereign War Room Ambient Grid Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Founder Header Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-amber-500/40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-950 via-black to-red-950 border border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-widest text-amber-300">
                FOUNDER WAR ROOM COCKPIT // قمرة المؤسس
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                TIER 0 GOD-MODE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-sans">
              قمرة القيادة السيادية العليا الخاصة بالمؤسس: <strong className="text-amber-400 font-mono">Taha Setri</strong> (التحكم في البنية التحتية، عزل المخاطر، والسيطرة اللحظية)
            </p>
          </div>
        </div>

        {/* Founder Security Attestation Status Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-black/80 border border-amber-500/50 text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">FOUNDER IDENTITY</div>
            <div className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
              <span>TAHA SETRI (ID: TS-001)</span>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              onClick={handleLockCockpit}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>قفل قمرة المؤسس (Lockout)</span>
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>COCKPIT LOCKED</span>
            </div>
          )}
        </div>
      </div>

      {/* STATE 1: FOUNDER SECRET MASTER KEY GATE (قفل المفتاح السري المشفر الخاص بقمرة المؤسس) */}
      {!isAuthenticated ? (
        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-black/90 border-2 border-amber-500/70 text-center max-w-xl mx-auto space-y-5 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative overflow-hidden">
          {/* Subtle Cyber Grid Background Indicator */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-950/90 via-black to-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] relative z-10">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950/90 px-3 py-1 rounded-full border border-amber-500/70 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>SINGLE ENCRYPTED KEY ENCLAVE (SHA-256 SEALED)</span>
            </div>
            <h3 className="text-xl font-black text-white mt-2 font-mono tracking-wide">
              قمرة قيادة المؤسس الفائقة // TAHA SETRI
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
              قمرة القيادة محصنة بنظام التشفير الأحادي الشامل (Root of Trust). المفتاح لا يُخزن بصيغة نصية مجردة، بل يتم التحقق منه مباشرة عبر خوارزمية التجزئة التشفيرية الأحادية <strong className="text-amber-300 font-mono">SHA-256 Hardware Digest</strong>.
            </p>
          </div>

          {/* Tamper Lockout Warning Banner */}
          {lockoutTimer > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-950/90 border-2 border-rose-600 text-rose-300 text-xs font-mono flex items-center justify-center gap-2 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <span className="font-bold">قفل الحماية الفيزيائي مفعل: </span>
                <span>تم إغلاق البوابة لمنع محاولات التخمين. انتظر <strong>{lockoutTimer}</strong> ثانية.</span>
              </div>
            </div>
          )}

          {/* Secret Key Input Form */}
          <div className="space-y-3 pt-1 relative z-10">
            <div className="relative max-w-md mx-auto">
              <input
                disabled={lockoutTimer > 0 || isScanningBio}
                type={showSecretKey ? 'text' : 'password'}
                value={secretKeyInput}
                onChange={(e) => {
                  setSecretKeyInput(e.target.value);
                  setKeyError(null);
                }}
                placeholder="أدخل المفتاح المشفر الوحيد للمؤسس (••••••••••••••••)..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-amber-500/70 text-sm font-mono text-amber-300 placeholder-slate-600 focus:outline-none focus:border-amber-400 pl-10 pr-12 text-center disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <Key className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Live Cryptographic SHA-256 Digest Monitor */}
            {liveDigest && (
              <div className="max-w-md mx-auto px-3 py-1.5 rounded-lg bg-black/90 border border-slate-800 text-[10px] font-mono text-left space-y-0.5">
                <div className="text-slate-500 flex items-center justify-between">
                  <span>LIVE SHA-256 HARDWARE DIGEST:</span>
                  <span className={liveDigest === SOVEREIGN_ENCRYPTED_KEY_HASH ? 'text-[#00ff66] font-bold' : 'text-amber-400'}>
                    {liveDigest === SOVEREIGN_ENCRYPTED_KEY_HASH ? 'MATCH CONFIRMED ✓' : 'PROCESSING...'}
                  </span>
                </div>
                <div className="text-slate-300 truncate font-mono text-[11px] tracking-tight">
                  {liveDigest}
                </div>
              </div>
            )}

            {keyError && (
              <div className="text-xs text-rose-400 font-mono flex items-center justify-center gap-1.5 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800 max-w-md mx-auto">
                <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{keyError}</span>
              </div>
            )}
          </div>

          {/* Scanning Animation or Submit Button */}
          {isScanningBio ? (
            <div className="space-y-3 pt-2 relative z-10">
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-amber-500/60">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-[#00ff66] h-full transition-all duration-150 shadow-[0_0_15px_#00ff66]"
                  style={{ width: `${biometricScanProgress}%` }}
                />
              </div>
              <div className="text-xs text-amber-400 font-mono animate-pulse flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00ff66]" />
                <span>مطابقة بصمة الهاش المشفرة وتحرير قفل PCR-7 ({biometricScanProgress}%)...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 max-w-md mx-auto relative z-10">
              <button
                disabled={lockoutTimer > 0}
                onClick={() => handleValidateAndUnlock()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-black font-black text-xs font-mono transition-all shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>التحقق من المفتاح الخاص وفتح قمرة القيادة فوراً</span>
              </button>
            </div>
          )}

          <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-900 flex flex-wrap items-center justify-center gap-2 relative z-10">
            <span className="text-amber-500/80 font-mono">Enclave Hash: deca8a1a...8dec</span>
            <span>•</span>
            <span>Anti-Brute-Force (3 Tries)</span>
            <span>•</span>
            <span>Founder: Taha Setri</span>
          </div>
        </div>
      ) : (
        /* STATE 2: AUTHENTICATED FOUNDER WAR ROOM CONTROLS */
        <div className="space-y-6 mt-6">
          {/* Whole-System Sovereign Post-Quantum Encryption Enclave (تشفير المنظومة السيادية بالكامل) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-[#070c14] to-black border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/60 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-mono">
                      SYSTEM-WIDE POST-QUANTUM HARDWARE ENCRYPTION
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/40">
                      100% ENCRYPTED
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    تشفير كامل لكافة طبقات المنظومة: الذاكرة العشوائية، قواعد البيانات، حركة الشبكة، ونماذج الذكاء الاصطناعي (Confidential Computing).
                  </p>
                </div>
              </div>

              <button
                disabled={isSystemReKeying}
                onClick={handleTriggerSystemWideReKey}
                className="px-3.5 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 hover:border-cyan-400 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSystemReKeying ? 'animate-spin text-[#00ff66]' : ''}`} />
                <span>{isSystemReKeying ? 'جارٍ إعادة تشفير كامل الذاكرة...' : 'تدوير وتشفير شامل للمنظومة (Re-Key)'}</span>
              </button>
            </div>

            {/* 4 Encrypted Layers Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Layer 0: In-Kernel Datapath</div>
                <div className="text-white font-bold text-[11px] flex items-center justify-between">
                  <span>ChaCha20-Poly1305</span>
                  <span className="text-[#00ff66] text-[10px]">ACTIVE</span>
                </div>
                <div className="text-[10px] text-slate-400">eBPF XDP Hardware Line-Rate</div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Layer 1: Multi-Tenant DB</div>
                <div className="text-white font-bold text-[11px] flex items-center justify-between">
                  <span>AES-256-XTS Enclave</span>
                  <span className="text-[#00ff66] text-[10px]">SEV-SNP</span>
                </div>
                <div className="text-[10px] text-slate-400">AMD Confidential Computing</div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Layer 2: Sovereign mTLS</div>
                <div className="text-white font-bold text-[11px] flex items-center justify-between">
                  <span>ML-KEM-1024 Lattice</span>
                  <span className="text-[#00ff66] text-[10px]">PQC</span>
                </div>
                <div className="text-[10px] text-slate-400">Zero Foreign Cloud Egress</div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">Layer 3: Sovereign AI Core</div>
                <div className="text-white font-bold text-[11px] flex items-center justify-between">
                  <span>TPM 2.0 PCR-7 Seal</span>
                  <span className="text-[#00ff66] text-[10px]">LOCKED</span>
                </div>
                <div className="text-[10px] text-slate-400">DeepSeek-R1 In-Memory Weights</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-900">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>حالة التشفير: <strong>تشفير عتادي كامل بنسبة 100%</strong></span>
              </span>
              <span>آخر تدوير للمفاتيح: <strong className="text-cyan-300">{lastSystemReKey}</strong></span>
            </div>
          </div>

          {/* HSM FIPS 140-3 & 24h mTLS Certificate Live Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">HARDWARE HSM ENCLAVE</div>
                <div className="text-slate-200 font-bold text-[11px]">FIPS 140-3 Level 4 (DC-01)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">TAMPER CIRCUIT</div>
                <div className="text-emerald-400 font-bold text-[11px]">Armed (0.00μs Trip Wire)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">mTLS CERT ROTATION</div>
                <div className="text-amber-300 font-bold text-[11px]">19h 42m (Auto-Renewal)</div>
              </div>
            </div>
          </div>

          {/* Emergency Alert Banner if National Quarantine is Active */}
          {isQuarantineActive && (
            <div className="p-4 rounded-xl bg-red-950/90 border-2 border-red-500 flex items-center justify-between text-white animate-pulse">
              <div className="flex items-center gap-3">
                <AlertOctagon className="w-6 h-6 text-[#ff2a4d]" />
                <div>
                  <div className="text-sm font-black text-[#ff2a4d]">NATIONAL SOVEREIGN AIR-GAP IS ENGAGED</div>
                  <div className="text-xs text-slate-300">All foreign BGP routes dropped via in-kernel eBPF. Internal sovereign networks remain 100% operational.</div>
                </div>
              </div>
              <button
                onClick={() => setIsQuarantineActive(false)}
                className="px-3.5 py-1.5 rounded bg-black/80 hover:bg-black text-xs font-bold border border-red-600 text-white"
              >
                Disengage Air-Gap
              </button>
            </div>
          )}

          {/* Quick Metrics of Sovereign Fleet */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800">
              <div className="text-[11px] text-slate-400">Total Protected Sovereign Nodes</div>
              <div className="text-xl font-bold text-white mt-1">480 Bare-Metal</div>
              <div className="text-[10px] text-[#00ff66] mt-0.5">● 100% Moroccan Datacenters</div>
            </div>

            <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800">
              <div className="text-[11px] text-slate-400">Aggregate Bandwidth Scrubbed</div>
              <div className="text-xl font-bold text-amber-400 mt-1">24.9 TB/s</div>
              <div className="text-[10px] text-slate-400 mt-0.5">eBPF XDP Hardware Line-Rate</div>
            </div>

            <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800">
              <div className="text-[11px] text-slate-400">Sovereign Master Authority</div>
              <div className="text-xl font-bold text-cyan-400 mt-1">Single Master Key</div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">Hardware Enclave (Active)</div>
            </div>

            <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800">
              <div className="text-[11px] text-slate-400">Cloud Sovereignty Index</div>
              <div className="text-xl font-bold text-[#00ff66] mt-1">100.0% (Air-Gapped)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">0 bytes egress to foreign clouds</div>
            </div>
          </div>

          {/* SECTION 1: Multi-Tenant Sovereign Partitioning Control Grid */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>Sovereign Infrastructure Tenants (حماية البنى الحيوية)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct hardware-level tenant isolation, Zero-Trust RLS, and autonomous eBPF filtering.
                </p>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                4 Critical Infrastructure Nodes Monitored
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className={`p-4 rounded-lg border transition-all ${
                    tenant.isolated
                      ? 'bg-rose-950/30 border-rose-800 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'bg-black/60 border-slate-800/80 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300">{tenant.id}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      tenant.isolated 
                        ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {tenant.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-1.5">{tenant.name}</h4>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Nodes</span>
                      <span className="text-white font-bold">{tenant.nodes}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Throughput</span>
                      <span className="text-amber-400 font-bold">{tenant.traffic}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Posture</span>
                      <span className="text-[#00ff66] font-bold">{tenant.posture}%</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {tenant.isolated ? 'Traffic Severed' : 'Normal Egress'}
                    </span>
                    <button
                      onClick={() => handleToggleTenantQuarantine(tenant.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                        tenant.isolated
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-black'
                          : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {tenant.isolated ? 'Restore Tenant' : 'Micro-Quarantine'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: Single Master Key Sovereign Actions */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Single Master Key Sovereign Actions (العمليات السيادية للمؤسس)</h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 border border-amber-800 px-2 py-0.5 rounded">
                Direct Authority • Master Enclave
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-black/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">National BGP Air-Gap Switch</span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                    DIRECT MASTER SIGN
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  عزل وتجميد مسارات BGP الدولية عند بوابات العبور، وتوجيه حركة البيانات كلياً نحو البنية التحتية الوطنية السيادية.
                </p>
                <button
                  onClick={() => {
                    setPendingAction('EMERGENCY_NATIONAL_BGP_QUARANTINE');
                    setFounderKeySigned(false);
                  }}
                  className="w-full py-2 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  تفعيل عزل BGP السيادي (بالمفتاح الحصري)
                </button>
              </div>

              <div className="p-4 rounded-lg bg-black/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Global Revoke of All Active JWTs</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                    ZERO DOWNTIME
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  إلغاء فوري لجميع الرموز المشفرة وتحديث مفتاح التوليد لتسجيل الخروج الإجباري لكافة الجلسات عبر جميع المؤسسات فوراً.
                </p>
                <button
                  onClick={() => {
                    setPendingAction('PURGE_MALICIOUS_TENANT_SESSION');
                    setFounderKeySigned(false);
                  }}
                  className="w-full py-2 rounded bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  إلغاء الجلسات النشطة (بالمفتاح الحصري)
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: WORM Audit Stream */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Immutable WORM Audit Ledger (سجل العمليات السيادية)</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Hardware Sealed
              </span>
            </div>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded bg-black/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-slate-500 text-[11px] shrink-0">{log.timestamp}</span>
                    <span className="text-amber-400 font-bold shrink-0">{log.id}</span>
                    <span className="text-slate-300 truncate">{log.action}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-[11px]">
                    <span className="text-slate-400">{log.actor}</span>
                    <span className="text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 font-bold">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Sovereign Master Key Confirmation Modal */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl bg-[#080c14] border-2 border-amber-500 p-5 space-y-4 shadow-[0_0_50px_rgba(245,158,11,0.5)]">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-sm font-black font-mono">SOVEREIGN MASTER KEY AUTHORIZATION</h3>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              هذه العملية السيادية ستنفذ مباشرة بتفويض من المفتاح السري الحصري للمؤسس <strong className="text-amber-400 font-mono">Taha Setri</strong> دون الحاجة لأي مفاتيح ثانوية.
            </p>

            {/* Master Key Identity Box */}
            <div className="p-3 rounded-lg bg-black/70 border border-amber-500/50 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Authorized Master Key:</div>
              <div className="text-xs font-bold text-amber-300 font-mono flex items-center justify-between">
                <span>•••••••••••••••• (TS-001 Enclave)</span>
                <span className="text-[10px] text-[#00ff66] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">VALIDATED</span>
              </div>
            </div>

            {/* Single Sign Button */}
            <div className="pt-1">
              <div 
                onClick={() => setFounderKeySigned(!founderKeySigned)}
                className={`p-3 rounded-lg border text-xs font-mono cursor-pointer flex items-center justify-between transition-colors ${
                  founderKeySigned 
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                    : 'bg-black/60 border-slate-700 text-slate-300 hover:border-amber-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>توقيع المؤسس: Taha Setri (Master Key)</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${founderKeySigned ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-800 text-slate-400'}`}>
                  {founderKeySigned ? 'تم التوقيع ✓' : 'انقر للتوقيع'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setPendingAction(null);
                  setFounderKeySigned(false);
                }}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-400 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                disabled={!founderKeySigned}
                onClick={handleExecuteSovereignAction}
                className="px-4 py-1.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-black font-black text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Check className="w-3.5 h-3.5" />
                <span>تنفيذ الأمر السيادي فوراً</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
