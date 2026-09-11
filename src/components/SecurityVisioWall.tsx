import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Radio, 
  Cpu, 
  Zap, 
  Lock, 
  Sparkles, 
  Award, 
  Crown,
  Activity,
  HardDrive
} from 'lucide-react';

interface VisioBroadcastItem {
  id: string;
  category: 'LINUX_KERNEL' | 'SOVEREIGN_DOCTRINE' | 'PQC_ENCLAVE' | 'ZERO_TRUST';
  titleArabic: string;
  titleEnglish: string;
  mottoArabic: string;
  mottoEnglish: string;
  classification: string;
  accentColor: 'emerald' | 'cyan' | 'red' | 'amber';
  linuxSubsystem: string;
  linuxModule: string;
  fullDoctrineText: string;
  standards: string[];
}

export const SecurityVisioWall: React.FC = () => {
  // Collection of Sovereign National Doctrines & Linux Defense Manifestos
  const visioItems: VisioBroadcastItem[] = [
    {
      id: 'sov-ebpf-kernel',
      category: 'LINUX_KERNEL',
      titleArabic: 'عقيدة درع النواة وسرعة الاستجابة الخاطفة eBPF في نظام لينكس',
      titleEnglish: 'Linux In-Kernel eBPF / XDP Sub-18ms Line-Rate Severance',
      mottoArabic: '« حراسة الطبقة الصفرية داخل كيرنل لينكس - استجابة دون 18 مللي ثانية »',
      mottoEnglish: 'Autonomous Zero-Context-Switch Mitigation at Linux Socket Layer',
      classification: 'TIER 0 // LINUX KERNEL DEFENSE',
      accentColor: 'emerald',
      linuxSubsystem: '/sys/fs/bpf/sovereign_filter',
      linuxModule: 'bpf_prog_type_xdp.ko (Hardened JIT)',
      fullDoctrineText: 'السيادة الرقمية تبدأ من أدنى طبقات العتاد ونواة لينكس 6.8+. تعمل برامج eBPF السيادية مباشرة داخل كيرنل النظام (Zero Context-Switch) لفحص حزم البيانات عند بطاقة الشبكة وعزل الهجمات الموجهة للبنى التحتية الوطنية للمملكة المغربية في زمن قياسي يقل عن 18 مللي ثانية قبل وصولها لأي خدمة أو معالج.',
      standards: ['Linux Kernel 6.8+ LTS', 'XDP Direct Socket Line-Rate', 'SELinux Enforcing', 'AppArmor Strict Profile']
    },
    {
      id: 'sov-data-residency',
      category: 'SOVEREIGN_DOCTRINE',
      titleArabic: 'مبدأ السيادة الإقليمية والتوطين الجغرافي المطلق للبيانات بالمملكة',
      titleEnglish: 'Absolute National Data Residency & Tier 4 Autonomy Doctrine',
      mottoArabic: '« لا خروج لأي بايت أو سجل سيادي خارج مراكز البيانات الوطنية »',
      mottoEnglish: 'Perpetual Sovereign Data Confinement - Law 09-08 & DGSSI Mandate',
      classification: 'TOP SECRET // MOROCCO SOVEREIGN SHIELD',
      accentColor: 'red',
      linuxSubsystem: '/dev/mapper/luks_sovereign_vault',
      linuxModule: 'dm-crypt / AES-256-XTS AMD SEV-SNP',
      fullDoctrineText: 'تخضع كافة السجلات الحكومية، المعاملات المصرفية، وبيانات المواطنين للتوطين الكامل داخل الحدود الجغرافية للمملكة المغربية. يُحظر قانونياً وتقنياً استخدام السحب العامة الأجنبية دون حواجز تشفير سيادية عتادية غير قابلة للكسر ومطابقة لتوجيهات المديرية العامة لأمن نظم المعلومات (DGSSI).',
      standards: ['DGSSI DNSSI v2.0', 'Law 09-08 (CNDP)', 'ISO 27001 Sovereign', 'Tier IV Datacenter SL']
    },
    {
      id: 'sov-pqc-lattice',
      category: 'PQC_ENCLAVE',
      titleArabic: 'قلعة التشفير المنيع ما بعد الكمومي (Post-Quantum Cryptography)',
      titleEnglish: 'Post-Quantum Lattice-Based Shield: ML-KEM-1024 & Dilithium',
      mottoArabic: '« تشفير اليوم يحمي أسرار الغد ضد أعتى الحواسيب الكمومية »',
      mottoEnglish: 'Quantum-Immune Cryptographic Fortress - NIST FIPS 203 & 204',
      classification: 'QUANTUM-PROOF // TIER 1',
      accentColor: 'cyan',
      linuxSubsystem: '/dev/tpmrm0 / PCR-7 Enclave',
      linuxModule: 'crypto_pqc_mlkem.ko (FIPS 140-3 HSM)',
      fullDoctrineText: 'تحصين الاتصالات الحيوية بخوارزميات ما بعد الكم المعيارية (ML-KEM-1024 و ML-DSA-87) لإحباط استراتيجيات الاعتراض والتخزين بهدف فك التشفير مستقبلاً (Harvest-Now-Decrypt-Later)، مع إحكام إدارة المفاتيح عبر وحدات تشفير عتادية HSM معزولة.',
      standards: ['NIST FIPS 203 (ML-KEM)', 'NIST FIPS 204 (ML-DSA)', 'TPM 2.0 Hardened', 'RFC 8446 mTLS 1.3']
    },
    {
      id: 'sov-zero-trust-founder',
      category: 'ZERO_TRUST',
      titleArabic: 'ميثاق انعدام الثقة المطلقة والرقابة السيادية لمؤسس المنظومة',
      titleEnglish: 'Continuous Zero-Trust RLS Matrix & Founder Supreme Dual-Custody',
      mottoArabic: '« التحقق الدائم، العزل الصارم، وانعدام الثقة المسبقة لأي طرف »',
      mottoEnglish: 'Never Trust, Always Verify - Founder Clearance Level 0',
      classification: 'GOD-MODE LEVEL 0 // TAHA SETRI',
      accentColor: 'amber',
      linuxSubsystem: '/sys/kernel/security/integrity/ima',
      linuxModule: 'sovereign_tenant_rls.ko (Kernel Enforced)',
      fullDoctrineText: 'إلزام كافة المستأجرين والخدمات المؤسسية بالعزل الصارم عبر تقنية RLS، مع التحقق المزدوج بالمفاتيح العتادية المشفرة، وإخضاع كافة العمليات الحساسة لرقابة ومصادقة المشرف العام والمؤسس Taha Setri عبر قمرة القيادة السيادية الحصينة.',
      standards: ['NIST SP 800-207 Zero-Trust', 'PostgreSQL Strict RLS', 'POSIX Capability Stripping', 'WORM Immutable Audit']
    }
  ];

  // Automated State Management (No user buttons needed)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [autoTimerProgress, setAutoTimerProgress] = useState<number>(0);
  const [linuxUptime, setLinuxUptime] = useState<number>(142980);
  const [activeKernelEvents, setActiveKernelEvents] = useState<string[]>([]);

  const currentItem = visioItems[currentIndex];
  const typingSpeedRef = useRef<number>(24); // ms per character

  // 1. Linux Kernel Uptime & Telemetry Engine
  useEffect(() => {
    const uptimeTimer = setInterval(() => {
      setLinuxUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(uptimeTimer);
  }, []);

  // 2. Automated Typewriter Effect
  useEffect(() => {
    setTypedText('');
    setIsTyping(true);
    setAutoTimerProgress(0);

    const fullText = currentItem.fullDoctrineText;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, typingSpeedRef.current);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // 3. Automated Progression to Next Item (Self-Cycling Stream)
  useEffect(() => {
    if (isTyping) return;

    // Once typing is done, wait 6 seconds while updating the progress bar, then switch automatically
    const duration = 6000;
    const intervalTime = 100;
    const step = (intervalTime / duration) * 100;

    const progressInterval = setInterval(() => {
      setAutoTimerProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCurrentIndex(idx => (idx + 1) % visioItems.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [isTyping, currentIndex, visioItems.length]);

  // 4. Automated Linux Kernel Telemetry Log Generation
  useEffect(() => {
    const linuxLogs = [
      `[KERNEL] eBPF XDP: Attached to eth0 (100 Gbps). Dropped 0 bad pkts. Filter: clean.`,
      `[SYSFS] /sys/kernel/security/tpm0: PCR-7 hardware integrity verified by Taha Setri.`,
      `[DM-CRYPT] /dev/mapper/sovereign_vault: AES-256-XTS sector encryption active.`,
      `[RLS-DAEMON] Multi-tenant isolation verified: Bank Al-Maghrib, OCP, Gov.ma isolated.`,
      `[SYSTEMD] sovereign-soc.service: Status=ACTIVE (Running under Linux 6.8.0-sovereign).`,
      `[mTLS] ML-KEM-1024 post-quantum key exchange initialized for all inter-pod tunnels.`,
      `[AUDIT] DGSSI Compliance Seal: DNSSI v2.0 validated at ${new Date().toISOString()}.`
    ];

    const logInterval = setInterval(() => {
      const randomLog = linuxLogs[Math.floor(Math.random() * linuxLogs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setActiveKernelEvents(prev => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 4)]);
    }, 2800);

    return () => clearInterval(logInterval);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-6 font-mono selection:bg-[#00ff66]/30 selection:text-[#00ff66]" dir="rtl">
      {/* 1. TOP LINUX OS & AUTONOMOUS STATUS HEADER */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#03070d] via-slate-950 to-emerald-950/40 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-950/90 border border-emerald-500/80 text-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.4)]">
                <Terminal className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-widest text-[#00ff66] uppercase bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/70 font-bold">
                    LINUX 6.8.0 SOVEREIGN ARCHITECTURE // شاشة العرض الآلية
                  </span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800">
                    AUTONOMOUS BROADCAST (100% تلقائي)
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide mt-1">
                  شاشة العرض المرئي السيادي وبث العقائد الدفاعية المؤتمتة
                </h1>
              </div>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed font-sans">
              شاشة عرض ديناميكية مؤتمتة بالكامل ومصممة لبيئات لينكس السيادية. تقوم بطباعة وبث كافة المواثيق والعقائد الأمنية، وتفاصيل النواة (eBPF)، والتوجيهات الوطنية تلقائياً دون الحاجة لأي تدخل يدوي.
            </p>
          </div>

          {/* Linux Sovereign Environment Badge */}
          <div className="p-3.5 rounded-xl bg-black/80 border border-slate-800 space-y-1.5 min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>نواة لينكس:</span>
              </span>
              <span className="text-[#00ff66] font-bold text-[11px]">Linux 6.8.0-sovereign-ma</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>وقت تشغيل الخادم (Uptime):</span>
              </span>
              <span className="text-cyan-300 text-[11px]">{formatUptime(linuxUptime)}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>المؤسس والمشرف العام:</span>
              </span>
              <span className="text-amber-400 font-bold text-[11px]">Taha Setri 🇲🇦</span>
            </div>
          </div>
        </div>

        {/* Real-time automated status ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
            <span>البث التلقائي:</span>
            <strong className="text-[#00ff66]">نشط (Active Stream)</strong>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>نظام الحزم eBPF:</span>
            <strong className="text-cyan-300">XDP Line-Rate</strong>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-3.5 h-3.5 text-amber-400" />
            <span>تشفير التخزين:</span>
            <strong className="text-amber-300">LUKS2 / AES-256-XTS</strong>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>الامتثال الوطني:</span>
            <strong className="text-emerald-400">DGSSI & CNDP</strong>
          </div>
        </div>
      </div>

      {/* 2. AUTOMATIC CYCLE TIMELINE PROGRESS BAR */}
      <div className="p-3 rounded-xl bg-black/90 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-[#00ff66] animate-pulse" />
            <span>
              العقيدة المعروضة حالياً: <strong className="text-white">{currentIndex + 1} من {visioItems.length}</strong> ({currentItem.category})
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>{isTyping ? 'جارٍ الكتابة التلقائية الحية...' : 'الانتقال التلقائي التالي:'}</span>
            <span className="text-[#00ff66] font-bold">{Math.round(autoTimerProgress)}%</span>
          </div>
        </div>

        {/* Visual Progress Track */}
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-[#00ff66] to-cyan-400 transition-all duration-100 shadow-[0_0_12px_#00ff66]"
            style={{ width: `${isTyping ? 100 : autoTimerProgress}%` }}
          />
        </div>
      </div>

      {/* 3. MAIN AUTOMATED VISIO SCREEN & TERMINAL DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: THE HOLOGRAPHIC CRT VISIO SCREEN (الكتابة التلقائية) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-black border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,255,102,0.2)]">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
            
            {/* Top Terminal Status Line */}
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] font-mono text-emerald-400 mr-2">tty1@morocco-sovereign-kernel:~$</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-[#00ff66] border border-emerald-700/80">
                {currentItem.classification}
              </span>
            </div>

            {/* Main Holographic Body */}
            <div className="my-6 space-y-5">
              {/* Category & Title */}
              <div>
                <div className="text-xs text-cyan-400 font-mono tracking-widest uppercase">
                  {currentItem.titleEnglish}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
                  {currentItem.titleArabic}
                </h2>
              </div>

              {/* Motto Banner */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-800/80 text-base sm:text-lg font-bold text-amber-300 leading-relaxed shadow-lg">
                {currentItem.mottoArabic}
                <div className="text-xs text-slate-400 font-normal mt-1">
                  {currentItem.mottoEnglish}
                </div>
              </div>

              {/* REAL-TIME TYPEWRITER OUTPUT BOX (الكتابة الأوتوماتيكية حرفاً بحرف) */}
              <div className="p-5 rounded-xl bg-[#03060a] border border-slate-800 text-sm sm:text-base text-slate-100 leading-relaxed relative min-h-[140px] shadow-inner font-sans">
                <span>{typedText}</span>
                {/* Blinking Linux Terminal Cursor */}
                <span className="inline-block w-2.5 h-5 bg-[#00ff66] mr-1 align-middle animate-pulse shadow-[0_0_8px_#00ff66]" />
              </div>

              {/* Linux Module Specs for Current Item */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">مسار نظام ملفات لينكس (Sysfs Path):</span>
                  <span className="text-cyan-300 font-mono text-[11px]">{currentItem.linuxSubsystem}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">موديول كيرنل لينكس المحصن (Kernel Module):</span>
                  <span className="text-[#00ff66] font-mono text-[11px]">{currentItem.linuxModule}</span>
                </div>
              </div>

              {/* Standards Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-900">
                {currentItem.standards.map((std, i) => (
                  <span 
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded bg-black/80 text-emerald-300 border border-emerald-900/60"
                  >
                    ✓ {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Seal */}
            <div className="pt-4 border-t border-emerald-950/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Crown className="w-3.5 h-3.5" />
                <span>الختم السيادي المعتمد: Taha Setri (Supreme Commander)</span>
              </div>
              <span className="text-slate-500">Autonomous Streaming Mode // 0 User Inputs Required</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE LINUX KERNEL LOGS & SOVEREIGN ENCLAVE TELEMETRY */}
        <div className="lg:col-span-4 space-y-4">
          {/* Linux Kernel Dmesg Live Feed */}
          <div className="p-5 rounded-2xl bg-[#040810] border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>سجل أحداث كيرنل لينكس (dmesg / eBPF)</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div className="space-y-2 text-[11px] font-mono leading-relaxed text-slate-300 max-h-60 overflow-y-auto">
              {activeKernelEvents.map((evt, idx) => (
                <div key={idx} className="p-2 rounded bg-black/60 border border-slate-900 text-left text-cyan-300/90" dir="ltr">
                  {evt}
                </div>
              ))}
            </div>
          </div>

          {/* Linux Sovereign Environmental Matrix */}
          <div className="p-5 rounded-2xl bg-[#040810] border border-slate-800 space-y-3 shadow-xl text-xs">
            <div className="flex items-center gap-2 font-bold text-white border-b border-slate-800 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
              <span>مواصفات بيئة لينكس الدفاعية</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-black/50 border border-slate-800">
                <span className="text-slate-400">Linux Distribution:</span>
                <span className="text-white font-bold">Debian 12 / Sovereign Hardened</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/50 border border-slate-800">
                <span className="text-slate-400">Security Profile:</span>
                <span className="text-[#00ff66] font-bold">SELinux Enforcing & AppArmor</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/50 border border-slate-800">
                <span className="text-slate-400">eBPF JIT Hardening:</span>
                <span className="text-cyan-300 font-bold">bpf_jit_harden = 2 (Strict)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/50 border border-slate-800">
                <span className="text-slate-400">Kernel ASLR & KASLR:</span>
                <span className="text-emerald-400 font-bold">FULL ACTIVE // 64-bit entropy</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/50 border border-slate-800">
                <span className="text-slate-400">Core Isolation (cgroups v2):</span>
                <span className="text-amber-300 font-bold">Dedicated CPUs for SOC Engine</span>
              </div>
            </div>
          </div>

          {/* Morocco National Cyber Command Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 to-black border border-red-800/60 text-center space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
              <span>🇲🇦 المملكة المغربية - قيادة الدفاع السيبراني الوطني</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              منظومة ذاتية التشغيل ومحصنة لخدمة السيادة والاستقلال الرقمي التام.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
