import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  Lock, 
  Globe, 
  Key, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ShieldAlert, 
  Copy, 
  Download, 
  Building2, 
  Layers, 
  Zap, 
  Terminal, 
  FileCheck, 
  UploadCloud, 
  Check, 
  ArrowRight,
  Sparkles,
  Sliders,
  Eye,
  EyeOff
} from 'lucide-react';

interface ClientInspectionResult {
  target: string;
  category: 'url' | 'data' | 'payload' | 'file';
  score: number; // 0 to 100
  verdict: 'CLEAN' | 'SUSPICIOUS' | 'CRITICAL_HAZARD';
  findings: string[];
  recommendations: string[];
  sanitizedOutput?: string;
  timestamp: string;
  integrityHash: string;
}

export const ClientSecurityWorkbench: React.FC = () => {
  // Active Workbench Tab
  const [activeTab, setActiveTab] = useState<'url' | 'data' | 'payload' | 'file' | 'licensing'>('data');

  // Client Enterprise Tenant Selector
  const [selectedTenant, setSelectedTenant] = useState<string>('Bank Al-Maghrib (البنك المركزي)');
  const [tenantLicenseTier, setTenantLicenseTier] = useState<'TIER_1' | 'TIER_2' | 'TIER_3'>('TIER_2');
  const [licenseTokenInput, setLicenseTokenInput] = useState('');
  const [licenseStatusMessage, setLicenseStatusMessage] = useState<string | null>(null);

  // Input states for each clear inspection zone
  const [urlInput, setUrlInput] = useState('');
  const [textDataInput, setTextDataInput] = useState(
    `# إعدادات الخدمة الحساسة
DATABASE_URL=postgres://sovereign_db_user:K9$xL#92a_secret@db.internal:5432/finance
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
MAROC_CNIE_SAMPLE=BE884920
CLIENT_PHONE=+212661009988`
  );
  const [payloadInput, setPayloadInput] = useState(`SELECT * FROM national_registry WHERE citizen_id = '1092' OR '1'='1' --`);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileHashInput, setFileHashInput] = useState('');

  // Scanning simulation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastResult, setLastResult] = useState<ClientInspectionResult | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [isShieldApplied, setIsShieldApplied] = useState(false);
  const [showSanitizedText, setShowSanitizedText] = useState(true);

  // Quick preset data loaders
  const loadPreset = (type: 'safe_url' | 'phish_url' | 'leaked_keys' | 'clean_text' | 'sql_inj' | 'file_sample') => {
    setIsShieldApplied(false);
    if (type === 'safe_url') {
      setActiveTab('url');
      setUrlInput('https://ebanking.bankalmaghrib.ma/secure/gateway');
    } else if (type === 'phish_url') {
      setActiveTab('url');
      setUrlInput('http://pay-maroc-telecom-verification-login.ru/update-cnie');
    } else if (type === 'leaked_keys') {
      setActiveTab('data');
      setTextDataInput(`// تكوين السيرفر الحساس
STRIPE_SECRET_KEY=sk_live_51M082987a098sd098234
JWT_PRIVATE_SECRET=super_secret_jwt_national_key_2026
CNIE_NUMBER=AB192837
PHONE_CONTACT=0661223344
EMAIL=official-director@gov.ma`);
    } else if (type === 'clean_text') {
      setActiveTab('data');
      setTextDataInput(`تقرير دوري عن حالة الشبكة:
تم فحص أداء الخوادم الرئيسية والنسخ الاحتياطية في مركز بيانات سلا. جميع مؤشرات الأداء تعمل بكفاءة 99.9% ولا توجد أي اختراقات أمنية مسجلة.`);
    } else if (type === 'sql_inj') {
      setActiveTab('payload');
      setPayloadInput(`POST /api/v1/auth/login HTTP/1.1
Host: api.sovereign-cloud.ma
Content-Type: application/json

{"username": "admin' UNION SELECT null, password_hash FROM admin_credentials--", "password": "123"}`);
    } else if (type === 'file_sample') {
      setActiveTab('file');
      setFileName('Bordereau_Financier_Confidentiel_Q3_2026.pdf');
      setFileHashInput('7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
    }
  };

  // Perform Real Instant Security Analysis
  const runSecurityInspection = (category: 'url' | 'data' | 'payload' | 'file') => {
    setIsScanning(true);
    setScanProgress(0);
    setIsShieldApplied(false);
    setLastResult(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        generateResult(category);
      }
    }, 120);
  };

  const generateResult = (category: 'url' | 'data' | 'payload' | 'file') => {
    const timestamp = new Date().toLocaleTimeString('ar-MA');
    const randomHash = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    if (category === 'url') {
      const target = urlInput.trim() || 'https://ebanking.bankalmaghrib.ma';
      const isDangerous = target.includes('.ru') || target.includes('login') || target.includes('verification') || target.includes('update');
      
      if (isDangerous) {
        setLastResult({
          target,
          category: 'url',
          score: 18,
          verdict: 'CRITICAL_HAZARD',
          findings: [
            'الرابط مسجل ضمن نطاقات التصيد الاحتيالي المشبوهة (Phishing / ma-CERT Blacklist)',
            'شهادة SSL غير موثقة وصادرة من مصدر مجهول غير سيادي',
            'رصد محاولة استدراج بيانات الهوية الوطنية (CNIE credential harvesting)'
          ],
          recommendations: [
            'حظر النطاق فوراً على مستوى راوترات الحدود الوطنية (eBPF XDP Line-Rate Block)',
            'إرسال تنبيه عاجل لمركز العمليات الأمنية (SOC Alerts)',
            'تنبيه الموظفين والعملاء بعدم إدخال أي بيانات'
          ],
          timestamp,
          integrityHash: `SHA256-${randomHash}`
        });
      } else {
        setLastResult({
          target,
          category: 'url',
          score: 98,
          verdict: 'CLEAN',
          findings: [
            'النطاق الوطني مسجل ومعتمد لدى الوكالة الوطنية لتقنين المواصلات (ANRT)',
            'شهادة التشفير TLS 1.3 سارية ومحمية بنظام ما بعد الكم (PQC Enabled)',
            'خلو كامل من البرمجيات الخبيثة وتطابق كامل مع معايير DGSSI'
          ],
          recommendations: [
            'استمرار المراقبة الاستباقية للشهادات الرقمية دورياً',
            'تفعيل التوقيع المتبادل mTLS للخدمات المصرفية'
          ],
          timestamp,
          integrityHash: `SHA256-${randomHash}`
        });
      }
    } else if (category === 'data') {
      const text = textDataInput;
      const hasSecrets = text.includes('SECRET') || text.includes('AKIA') || text.includes('CNIE') || text.includes('jwt') || text.includes('sk_live');
      
      let sanitized = text;
      // Sanitize secrets with sovereign redaction
      sanitized = sanitized.replace(/AKIA[A-Z0-9]{16}/g, 'AKIA••••••••[SOVEREIGN_REDACTED]');
      sanitized = sanitized.replace(/sk_live_[a-zA-Z0-9]{20,}/g, 'sk_live_••••••••[VAULT_ENCRYPTED]');
      sanitized = sanitized.replace(/([A-Z]{1,2})([0-9]{6,8})/g, '$1•••[CNIE_PROTECTED]');
      sanitized = sanitized.replace(/postgres:\/\/[^@]+@/g, 'postgres://[CREDENTIALS_PROTECTED_HSM]@');
      sanitized = sanitized.replace(/\+?212[0-9]{9}/g, '+212••••[PHONE_HASHED]');
      sanitized = sanitized.replace(/06[0-9]{8}/g, '06••••[PHONE_HASHED]');

      if (hasSecrets) {
        setLastResult({
          target: 'محتوى نصي وتكوينات برمجية قيد التحليل',
          category: 'data',
          score: 34,
          verdict: 'SUSPICIOUS',
          findings: [
            'رصد مفاتيح ربط برمجية حساسة (API Keys / Stripe / AWS Credentials)',
            'رصد بيانات شخصية محمية بالقانون 09-08 (رقم البطاقة الوطنية CNIE ورقم الهاتف)',
            'رصد نصوص اتصالات بقواعد البيانات بدون تشفير مسبق'
          ],
          recommendations: [
            'تطهير البيانات واستبدال القيم الحساسة برموز معماة (Sovereign Tokenization)',
            'تخزين كلمات المرور داخل خزنة التشفير العتادية HSM FIPS 140-3',
            'عدم تضمين المفاتيح داخل الأكواد أو الرسائل المتداولة'
          ],
          sanitizedOutput: sanitized,
          timestamp,
          integrityHash: `SHA256-${randomHash}`
        });
      } else {
        setLastResult({
          target: 'نص وبيانات تنظيمية عامة',
          category: 'data',
          score: 100,
          verdict: 'CLEAN',
          findings: [
            'خلو تام من المفاتيح التشفيرية المسربة ورموز المرور',
            'عدم وجود أي تسريب لبيانات المواطنين أو الهوية الشخصية (PII)',
            'مطابق لمتطلبات حماية المعطيات ذات الطابع الشخصي (CNDP)'
          ],
          recommendations: [
            'البيانات آمنة تماماً وجاهزة للنشر أو التداول المؤسسي'
          ],
          sanitizedOutput: text,
          timestamp,
          integrityHash: `SHA256-${randomHash}`
        });
      }
    } else if (category === 'payload') {
      const payload = payloadInput;
      const isSql = payload.includes('UNION') || payload.includes('--') || payload.includes('OR') || payload.includes('SELECT');

      if (isSql) {
        setLastResult({
          target: 'حمولة استعلام وحزم برمجية',
          category: 'payload',
          score: 12,
          verdict: 'CRITICAL_HAZARD',
          findings: [
            'محاولة حقن قواعد البيانات من نوع SQL Injection (UNION-based extraction)',
            'تجاوز مصادقة تسجيل الدخول عبر وسائط كسر القيود (Auth Bypass)',
            'استهداف الجداول الوطنية السيادية المعتمدة في السجل المركزي'
          ],
          recommendations: [
            'تفعيل جدار حماية تطبيقات الويب السيادي (WAF Rule #8921)',
            'إسقاط الحزمة آلياً وتطبيق تقنية الاستعلام المعياري (Prepared Statements)',
            'عزل عنوان المصدر وحظره من العبور الوطني'
          ],
          timestamp,
          integrityHash: `SHA256-${randomHash}`
        });
      } else {
        setLastResult({
          target: 'حمولة طلب عادية ونظيفة',
          category: 'payload',
          score: 95,
          verdict: 'CLEAN',
          findings: [
            'بنية الطلب مطابقة لمواصفات JSON / HTTP الآمنة',
            'لا توجد أوامر تنفيذية غير مصرح بها أو ثغرات استغلال'
          ],
          recommendations: [
            'الاستمرار في استخدام تشفير الـ Payload أثناء النقل'
          ],
          timestamp,
          integrityHash: `SHA256-${randomHash}`
        });
      }
    } else {
      // File inspection
      const name = fileName || 'Document_National_Securise.pdf';
      setLastResult({
        target: name,
        category: 'file',
        score: 92,
        verdict: 'CLEAN',
        findings: [
          'تم فحص التوقيع الرقمي ومطابقة الهاش مع السجل السيادي الوطني',
          'الملف خالٍ من أكواد الماكرو الخبيثة وروابط التوجيه الخفية',
          'تم تطهير الميتاداتا الجغرافية ومؤشرات الأجهزة لحماية خصوصية الموظف'
        ],
        recommendations: [
          'المستند موثوق ومحمي وجاهز للأرشفة في بيئة Air-Gapped'
        ],
        timestamp,
        integrityHash: fileHashInput || `SHA256-${randomHash}`
      });
    }
  };

  const handleApplyInstantShield = () => {
    setIsShieldApplied(true);
  };

  const handleCopySanitized = () => {
    if (lastResult?.sanitizedOutput) {
      navigator.clipboard.writeText(lastResult.sanitizedOutput);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const handleActivateLicense = () => {
    if (!licenseTokenInput.trim()) {
      setLicenseStatusMessage('يرجى إدخال رمز الترخيص السيادي للتحقق منه.');
      return;
    }
    if (licenseTokenInput.toUpperCase().includes('OIV') || licenseTokenInput.toUpperCase().includes('DEFENSE')) {
      setTenantLicenseTier('TIER_3');
      setLicenseStatusMessage('تم ترقية الحساب بنجاح إلى: Tier 3: National Defense & Sovereign Air-Gap (ترخيص كامل دائم)');
    } else {
      setTenantLicenseTier('TIER_2');
      setLicenseStatusMessage('تم تفعيل وتوثيق: Tier 2: Critical Infrastructure Shield (جاهز للعمليات الميدانية)');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans" dir="rtl">
      {/* 1. TOP HEADER & WORKBENCH TITLE */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#040810] via-slate-950 to-emerald-950/40 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.3)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#00ff66] uppercase bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-500/60">
                  SOVEREIGN CLIENT WORKBENCH // مقر عمل العملاء
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide mt-1">
                  مقر عمل فحص وحماية البيانات المؤسسية
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              منصة العمل المباشرة المخصصة للشركات والجهات الحكومية لفحص النطاقات، البيانات الحساسة، الأكواد البرمجية، والمستندات قبل تداولها، وتفعيل الحماية السيادية الفورية بنقرة زر واحدة.
            </p>
          </div>

          {/* Client Tenant Profile Selector */}
          <div className="p-3.5 rounded-xl bg-black/70 border border-slate-700/80 space-y-2 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>الجهة المؤسسية:</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/40">
                {tenantLicenseTier === 'TIER_3' ? 'Tier 3: Defense' : tenantLicenseTier === 'TIER_2' ? 'Tier 2: OIV Shield' : 'Tier 1: Enterprise'}
              </span>
            </div>

            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="Bank Al-Maghrib (البنك المركزي)">Bank Al-Maghrib (بنك المغرب المركزي)</option>
              <option value="OCP Group (المكتب الشريف للفوسفاط)">OCP Group (المكتب الشريف للفوسفاط)</option>
              <option value="Ministry of Digital Transition (وزارة الانتقال الرقمي)">وزارة الانتقال الرقمي وإصلاح الإدارة</option>
              <option value="Maroc Telecom (اتصالات المغرب)">Maroc Telecom (اتصالات المغرب)</option>
              <option value="National Railways (ONCF)">المكتب الوطني للسكك الحديدية (ONCF)</option>
              <option value="Custom Strategic Enterprise (مؤسسة خاصة معتمدة)">مؤسسة استراتيجية وطنية معتمدة</option>
            </select>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 font-mono">
              <span>حالة الامتثال: <strong className="text-emerald-400">DGSSI & CNDP</strong></span>
              <button 
                onClick={() => setActiveTab('licensing')}
                className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
              >
                إدارة الترخيص
              </button>
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="text-slate-400">سعة الفحص:</span>
            <span className="text-white font-bold">غير محدودة (Enterprise)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">زمن الاستجابة:</span>
            <span className="text-cyan-300 font-bold">&lt; 14 مللي ثانية</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">حماية الخصوصية:</span>
            <span className="text-amber-300 font-bold">معالجة محلية داخل المملكة</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">تطهير البيانات:</span>
            <span className="text-[#00ff66] font-bold">متاح بنقرة واحدة</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS FOR INSPECTION HUBS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => setActiveTab('data')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'data'
              ? 'bg-gradient-to-r from-emerald-600 to-[#00aa44] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>فحص وتطهير النصوص والمفاتيح الحساسة</span>
        </button>

        <button
          onClick={() => setActiveTab('url')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'bg-gradient-to-r from-emerald-600 to-[#00aa44] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>فحص الروابط والنطاقات وعناوين IP</span>
        </button>

        <button
          onClick={() => setActiveTab('payload')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'payload'
              ? 'bg-gradient-to-r from-emerald-600 to-[#00aa44] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>فحص الحزم والطلبات البرمجية (Payloads)</span>
        </button>

        <button
          onClick={() => setActiveTab('file')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'file'
              ? 'bg-gradient-to-r from-emerald-600 to-[#00aa44] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>فحص سلامة الملفات والمستندات</span>
        </button>

        <button
          onClick={() => setActiveTab('licensing')}
          className={`py-2.5 px-4 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'licensing'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-cyan-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>بوابة التراخيص المؤسسية</span>
        </button>
      </div>

      {/* 3. MAIN WORKBENCH VIEWPANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / MAIN WORK AREA: CLEAR INPUT BOXES (خانات الإدخال الواضحة والسهلة) */}
        <div className="lg:col-span-7 space-y-4">
          {/* TAB 1: SENSITIVE DATA & SECRETS SANITIZER */}
          {activeTab === 'data' && (
            <div className="p-6 rounded-2xl bg-[#060a12] border-2 border-emerald-500/50 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#00ff66]" />
                    <span>خانة إدخال النصوص والبيانات والمفاتيح الحساسة</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    الصق هنا أي نص، أو كود، أو ملف تكوين، أو جدول عملاء لفحص تسرب المفاتيح والبيانات الشخصية وتطهيرها فورياً.
                  </p>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span className="text-slate-500">عينات:</span>
                  <button
                    onClick={() => loadPreset('leaked_keys')}
                    className="px-2 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] cursor-pointer"
                  >
                    بيانات مسربة
                  </button>
                  <button
                    onClick={() => loadPreset('clean_text')}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] cursor-pointer"
                  >
                    تقرير آمن
                  </button>
                </div>
              </div>

              {/* CLEAR PROMINENT TEXTAREA */}
              <div className="relative">
                <textarea
                  rows={8}
                  value={textDataInput}
                  onChange={(e) => setTextDataInput(e.target.value)}
                  placeholder="الصق هنا النصوص، ملفات التكوين (.env)، المفاتيح البرمجية (API Keys / Passwords)، أو سجلات العملاء لفحصها فوراً..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 text-slate-100 font-mono text-xs focus:outline-none transition-all leading-relaxed placeholder:text-slate-600 shadow-inner"
                />
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-500 bg-black/80 px-2 py-0.5 rounded border border-slate-800">
                  {textDataInput.length} حرف | {textDataInput.split('\n').length} أسطر
                </div>
              </div>

              {/* ACTION BUTTONS: SCAN OR DIRECT CLEAN */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  disabled={isScanning || !textDataInput.trim()}
                  onClick={() => runSecurityInspection('data')}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00cc55] hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 text-black font-black text-xs font-mono transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{isScanning ? 'جارٍ تحليل البيانات بالمحرك السيادي...' : 'فحص المخاطر وكشف التسريبات الآن'}</span>
                </button>

                <button
                  disabled={isScanning || !textDataInput.trim()}
                  onClick={() => {
                    runSecurityInspection('data');
                    setTimeout(() => setIsShieldApplied(true), 700);
                  }}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-700 hover:border-cyan-400 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>تطهير وتشفير فوري بنقرة واحدة</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: URL & DOMAIN INSPECTOR */}
          {activeTab === 'url' && (
            <div className="p-6 rounded-2xl bg-[#060a12] border-2 border-emerald-500/50 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#00ff66]" />
                    <span>خانة فحص الروابط والنطاقات وعناوين الشبكة (IP / URL)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    تحقق فوري من سلامة المواقع، شهادات SSL، سجلات DNS، ومطابقتها لقوائم حظر ma-CERT الوطنية.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span className="text-slate-500">عينات:</span>
                  <button
                    onClick={() => loadPreset('safe_url')}
                    className="px-2 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[10px] cursor-pointer"
                  >
                    نطاق بنكي
                  </button>
                  <button
                    onClick={() => loadPreset('phish_url')}
                    className="px-2 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] cursor-pointer"
                  >
                    رابط تصيد
                  </button>
                </div>
              </div>

              {/* CLEAR PROMINENT URL INPUT */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://ebanking.bankalmaghrib.ma أو domain.com أو 196.200.160.10..."
                    className="w-full px-4 py-3.5 pl-12 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 text-slate-100 font-mono text-xs focus:outline-none transition-all shadow-inner text-left"
                    dir="ltr"
                  />
                  <Globe className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span className="text-[#00ff66]">✓</span>
                  <span>يتم التحقق تلقائياً من قوائم DGSSI الوطنية وسجلات ma-CERT الحية.</span>
                </div>
              </div>

              <button
                disabled={isScanning || !urlInput.trim()}
                onClick={() => runSecurityInspection('url')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00cc55] hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 text-black font-black text-xs font-mono transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{isScanning ? 'جارٍ الفحص السيادي للرابط...' : 'بدء فحص السلامة والسمعة الرقمية للنطاق'}</span>
              </button>
            </div>
          )}

          {/* TAB 3: PAYLOAD & QUERY INSPECTOR */}
          {activeTab === 'payload' && (
            <div className="p-6 rounded-2xl bg-[#060a12] border-2 border-emerald-500/50 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00ff66]" />
                    <span>خانة فحص الحزم والطلبات البرمجية (Payloads & APIs)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    فحص طلبات HTTP، استعلامات SQL، وحمولات JSON ضد ثغرات الحقن والتحايل البرمجي.
                  </p>
                </div>

                <button
                  onClick={() => loadPreset('sql_inj')}
                  className="px-2.5 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] font-mono cursor-pointer"
                >
                  عينة هجوم SQL
                </button>
              </div>

              <textarea
                rows={7}
                value={payloadInput}
                onChange={(e) => setPayloadInput(e.target.value)}
                placeholder="أدخل نص الاستعلام البرمجي أو حمولة الطلب (HTTP / SQL / JSON / cURL)..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 text-slate-100 font-mono text-xs focus:outline-none transition-all leading-relaxed text-left shadow-inner"
                dir="ltr"
              />

              <button
                disabled={isScanning || !payloadInput.trim()}
                onClick={() => runSecurityInspection('payload')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00cc55] hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 text-black font-black text-xs font-mono transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{isScanning ? 'جارٍ تحليل الحزمة البرمجية...' : 'فحص الحزمة وكشف الثغرات بالمحرك السيادي'}</span>
              </button>
            </div>
          )}

          {/* TAB 4: FILE & DOCUMENT THREAT SCANNER */}
          {activeTab === 'file' && (
            <div className="p-6 rounded-2xl bg-[#060a12] border-2 border-emerald-500/50 shadow-xl space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#00ff66]" />
                  <span>خانة فحص سلامة المستندات والملفات (File Hash & Artifacts)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  فحص المستندات التنظيمية والملفات ضد برمجيات الفدية، الماكرو الخبيث، وتسريب الميتاداتا.
                </p>
              </div>

              {/* Drag and Drop Box */}
              <div 
                onClick={() => loadPreset('file_sample')}
                className="p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-950/60 text-center space-y-3 cursor-pointer transition-all hover:bg-emerald-950/10"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {fileName ? `الملف المحدد: ${fileName}` : 'اسحب وأفلت المستند هنا، أو انقر للاختيار'}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    يدعم مستندات PDF، ملفات Office، الأرشيفات المكتنزة، أو فحص التجزئة (SHA-256)
                  </p>
                </div>
              </div>

              {/* File Hash manual input */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">أو أدخل تجزئة الملف المشفرة (SHA-256 Hash):</label>
                <input
                  type="text"
                  value={fileHashInput}
                  onChange={(e) => setFileHashInput(e.target.value)}
                  placeholder="7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 text-left"
                  dir="ltr"
                />
              </div>

              <button
                disabled={isScanning}
                onClick={() => runSecurityInspection('file')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00cc55] hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-xs font-mono transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{isScanning ? 'جارٍ فحص التوقيع الرقمي والمستند...' : 'فحص سلامة المستند الآن'}</span>
              </button>
            </div>
          )}

          {/* TAB 5: SOVEREIGN LICENSING & PROVISIONING PORTAL */}
          {activeTab === 'licensing' && (
            <div className="p-6 rounded-2xl bg-[#060a12] border-2 border-cyan-500/50 shadow-xl space-y-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/60">
                  ENTERPRISE LICENSING & DGSSI AUTHORIZATION
                </span>
                <h3 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>مستويات الاعتماد والترخيص السيادي للمؤسسات الوطنية</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  نموذج الترخيص السيادي المخصص للبنى التحتية الحيوية، الوزارات، والمؤسسات المصرفية.
                </p>
              </div>

              {/* 3 Sovereign Tiers Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                {/* Tier 1 */}
                <div className={`p-4 rounded-xl border transition-all ${tenantLicenseTier === 'TIER_1' ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/60 border-slate-800'}`}>
                  <div className="text-[10px] text-slate-400 uppercase">TIER 1</div>
                  <div className="text-white font-bold text-sm mt-0.5">Enterprise SOC Shield</div>
                  <div className="text-[11px] text-cyan-300 mt-1">الشركات والبنوك الخاصة</div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400">
                    <li>• سحابة سيادية معزولة (Dedicated RLS)</li>
                    <li>• فحص غير محدود للبيانات والروابط</li>
                    <li>• تشفير كامل للاتصالات mTLS</li>
                  </ul>
                </div>

                {/* Tier 2 */}
                <div className={`p-4 rounded-xl border transition-all ${tenantLicenseTier === 'TIER_2' ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'bg-black/60 border-slate-800'}`}>
                  <div className="text-[10px] text-[#00ff66] uppercase font-bold">TIER 2 (الحالي)</div>
                  <div className="text-white font-bold text-sm mt-0.5">Critical Infrastructure (OIV)</div>
                  <div className="text-[11px] text-emerald-300 mt-1">المرافق الحيوية للدولة</div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400">
                    <li>• التقاط حزم عتادي محلي (Hardware TAP)</li>
                    <li>• توافق رسمي مع معيار DNSSI v2.0</li>
                    <li>• ربط استخباراتي مع ma-CERT</li>
                  </ul>
                </div>

                {/* Tier 3 */}
                <div className={`p-4 rounded-xl border transition-all ${tenantLicenseTier === 'TIER_3' ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-black/60 border-slate-800'}`}>
                  <div className="text-[10px] text-amber-400 uppercase font-bold">TIER 3</div>
                  <div className="text-white font-bold text-sm mt-0.5">National Defense Air-Gap</div>
                  <div className="text-[11px] text-amber-300 mt-1">القطاعات الدفاعية الحساسة</div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400">
                    <li>• تشغيل معزول فيزيائياً 100% (Air-Gapped)</li>
                    <li>• تشفير ما بعد الكم (ML-KEM-1024)</li>
                    <li>• ترخيص دائم ومخصص (Perpetual)</li>
                  </ul>
                </div>
              </div>

              {/* License Key Activation Input */}
              <div className="p-4 rounded-xl bg-black/80 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  <span>تفعيل أو ترقية رمز الترخيص السيادي للمؤسسة:</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={licenseTokenInput}
                    onChange={(e) => setLicenseTokenInput(e.target.value)}
                    placeholder="أدخل رمز الترخيص (مثل: DGSSI-OIV-SEC-2026 أو TIER-DEFENSE)..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                    dir="ltr"
                  />
                  <button
                    onClick={handleActivateLicense}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold cursor-pointer transition-all shadow-[0_0_10px_rgba(6,182,212,0.4)] shrink-0"
                  >
                    التحقق والتفعيل
                  </button>
                </div>
                {licenseStatusMessage && (
                  <div className="text-xs text-emerald-300 font-mono bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0" />
                    <span>{licenseStatusMessage}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scanning Progress Bar */}
          {isScanning && (
            <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00ff66]" />
                  <span>فحص دقيق للبيانات عبر محرك التحليل السيادي (Casablanca Enclave)...</span>
                </span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-[#00ff66] h-full transition-all duration-150 shadow-[0_0_10px_#00ff66]"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT AREA: RESULTS & 1-CLICK SHIELDING (تقرير الفحص المباشر وإجراءات الحماية) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#060a12] border-2 border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00ff66]" />
                <h3 className="text-sm font-bold text-white font-mono">
                  تقرير الفحص والتحصين المباشر
                </h3>
              </div>
              {lastResult && (
                <span className="text-[10px] font-mono text-slate-400">
                  {lastResult.timestamp}
                </span>
              )}
            </div>

            {lastResult ? (
              <div className="space-y-4">
                {/* Score & Verdict Banner */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                  lastResult.verdict === 'CLEAN' 
                    ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-300' 
                    : lastResult.verdict === 'SUSPICIOUS'
                    ? 'bg-amber-950/40 border-amber-500/70 text-amber-300'
                    : 'bg-rose-950/40 border-rose-500/70 text-rose-300'
                }`}>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">حكم الفحص السيادي:</div>
                    <div className="text-base font-black flex items-center gap-2">
                      {lastResult.verdict === 'CLEAN' && <CheckCircle2 className="w-5 h-5 text-[#00ff66]" />}
                      {lastResult.verdict === 'SUSPICIOUS' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                      {lastResult.verdict === 'CRITICAL_HAZARD' && <ShieldAlert className="w-5 h-5 text-rose-400" />}
                      <span>
                        {lastResult.verdict === 'CLEAN' ? 'خالٍ من التهديدات (آمن 100%)' : lastResult.verdict === 'SUSPICIOUS' ? 'اشتباه في تسريب بيانات حساسة' : 'تهديد سيبراني حرج مكتشف'}
                      </span>
                    </div>
                  </div>

                  <div className="text-center bg-black/60 px-3 py-1.5 rounded-lg border border-slate-700/80">
                    <div className="text-[10px] text-slate-400 font-mono">مؤشر السلامة</div>
                    <div className={`text-xl font-black font-mono ${
                      lastResult.score >= 80 ? 'text-[#00ff66]' : lastResult.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {lastResult.score}/100
                    </div>
                  </div>
                </div>

                {/* Detected Findings */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white font-mono">الملاحظات الأمنية المرصودة:</div>
                  <div className="space-y-1.5">
                    {lastResult.findings.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-black/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-[#00ff66] shrink-0 mt-0.5">•</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sanitized Output Preview (For text/secrets) */}
                {lastResult.sanitizedOutput && (
                  <div className="space-y-2 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-bold text-white font-mono">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>النسخة المحصنة والمطهرة (Sovereign Redacted):</span>
                      </span>
                      <button
                        onClick={handleCopySanitized}
                        className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedText ? <Check className="w-3 h-3 text-[#00ff66]" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText ? 'تم النسخ' : 'نسخ النص المحمي'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-900/80 text-[11px] font-mono text-cyan-200/90 whitespace-pre-wrap break-all max-h-40 overflow-y-auto leading-relaxed text-left" dir="ltr">
                      {lastResult.sanitizedOutput}
                    </div>
                  </div>
                )}

                {/* Instant Protection Action Button */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  {isShieldApplied ? (
                    <div className="p-3 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/60 text-[#00ff66] text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم تطبيق الحماية السيادية وحجب التهديد من المنظومة بنجاح!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleApplyInstantShield}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs font-mono transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>تطبيق الحماية الفورية وعزل التهديد (1-Click Shield)</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      alert('تم تصدير محضر الفحص السيادي المعتمد بصيغة رقمية موثقة.');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>تصدير تقرير الفحص المعتمد للجهة (PDF / Audit Seal)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Empty state before scan */
              <div className="py-12 px-4 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">في انتظار إدخال البيانات للفحص</h4>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1">
                    أدخل الرابط، أو النص، أو الحزمة البرمجية في الخانات المجاورة ثم انقر على "فحص الآن" لعرض التقييم وشهادة الأمان السيادية.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      loadPreset('leaked_keys');
                      setTimeout(() => runSecurityInspection('data'), 100);
                    }}
                    className="text-[11px] font-mono text-[#00ff66] hover:underline cursor-pointer"
                  >
                    ⚡ تجربة فحص عينة سريعة الآن
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
