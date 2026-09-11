import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FrameworkItem {
  id: string;
  name: string;
  score: number;
  status: 'Compliant' | 'Audited';
}

export const ComplianceRing: React.FC = () => {
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const targetScore = 92;

  const frameworks: FrameworkItem[] = [
    { id: 'iso27001', name: 'ISO 27001', score: 93, status: 'Compliant' },
    { id: 'nist', name: 'NIST CSF', score: 91, status: 'Compliant' },
    { id: 'gdpr', name: 'GDPR', score: 94, status: 'Compliant' },
    { id: 'pcidss', name: 'PCI DSS', score: 90, status: 'Compliant' },
    { id: 'soc2', name: 'SOC 2', score: 92, status: 'Compliant' },
  ];

  // Animate arc on load
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // ease-out-cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(ease * targetScore));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  // SVG ring parameters
  const radius = 62;
  const strokeWidth = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="cyber-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            COMPLIANCE FRAMEWORKS
          </h3>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Continuous Audit</span>
        </div>
      </div>

      {/* Main Content: Ring Gauge + Framework List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto py-2">
        {/* Left: Glowing Compliance Ring */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF66" />
                  <stop offset="100%" stopColor="#00E65B" />
                </linearGradient>

                <filter id="greenRingGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth={strokeWidth}
              />

              {/* Animated Glowing Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                filter="url(#greenRingGlow)"
                className="transition-all duration-300"
              />
            </svg>

            {/* Centered Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-3xl font-extrabold font-sans text-[#00ff66] glow-text-green animate-pulse-green">
                {animatedScore}%
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-300 font-semibold uppercase mt-0.5">
                COMPLIANT
              </span>
            </div>
          </div>
        </div>

        {/* Right: Framework List */}
        <div className="md:col-span-7 space-y-2.5">
          {frameworks.map((fw) => {
            const currentFill = Math.min(fw.score, Math.round((animatedScore / targetScore) * fw.score));
            return (
              <div
                key={fw.id}
                className="p-1.5 px-2.5 rounded-lg bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/60 hover:border-[#00ff66] hover:shadow-[0_0_15px_rgba(0,255,102,0.25)] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66] inline-block animate-pulse" />
                    <span className="text-slate-300 font-semibold group-hover:text-white group-hover:glow-text-green transition-colors">
                      {fw.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#00ff66] font-mono group-hover:drop-shadow-[0_0_8px_#00ff66]">
                    {currentFill}%
                  </span>
                </div>

                {/* Progress bar line that animates to fill up */}
                <div className="w-full h-1.5 rounded-full bg-slate-800/90 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-[#00ff66] to-[#00ff66] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,102,0.5)]"
                    style={{ width: `${currentFill}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
        <span>Zero Critical Violations</span>
        <span className="text-emerald-400 font-semibold">Tier 1 SOC Certification</span>
      </div>
    </div>
  );
};
