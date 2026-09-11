import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Menu, 
  FileText, 
  Volume2, 
  VolumeX, 
  Zap, 
  ZapOff 
} from 'lucide-react';

interface CyberHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenCodeModal?: () => void;
  onOpenBlueprintModal: () => void;
  isGlitchActive: boolean;
  onToggleGlitch: () => void;
  isWarRoom?: boolean;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  onToggleMobileMenu,
  onOpenBlueprintModal,
  isGlitchActive,
  onToggleGlitch,
  isWarRoom = false,
}) => {
  const [timeString, setTimeString] = useState<string>('14:35:42');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  // Live GMT+1 Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to GMT+1 or standard clock
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio synthetic cyber chirp when enabled
  const playCyberPing = () => {
    if (!isAudioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
      {/* Left: Title & Subtitle + Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-baseline gap-2">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight font-sans ${isWarRoom ? 'text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'text-white glow-text-red'}`}>
              {isWarRoom ? 'Founder War Room' : 'Dashboard'}
            </h1>
            <span className={`text-xs font-mono font-bold ${isWarRoom ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'text-[#00ff66] glow-text-green'}`}>
              {isWarRoom ? 'Supreme Cockpit (Tier 0)' : 'Real-time Overview'}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
            {isWarRoom 
              ? 'Out-of-Band Sovereign Governance, Master Key Access & Infrastructure Quarantine • Founder: Taha Setri' 
              : 'Autonomous SOC Defense Matrix & Sovereign Cyber Hub • Founder & Chief Architect: Taha Setri'}
          </p>
        </div>
      </div>

      {/* Right: Telemetry Hub & Actions */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* System Status Pill */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/90 border ${
          isWarRoom
            ? 'border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
            : 'border-emerald-500/50 shadow-[0_0_15px_rgba(0,255,102,0.25)]'
        }`}>
          <ShieldCheck className={`w-4 h-4 animate-pulse ${isWarRoom ? 'text-amber-400' : 'text-[#00ff66]'}`} />
          <div className="leading-tight">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              {isWarRoom ? 'GOVERNANCE LEVEL' : 'SYSTEM STATUS'}
            </div>
            <div className={`text-xs font-mono font-black ${
              isWarRoom 
                ? 'text-amber-400' 
                : 'text-[#00ff66] glow-text-green animate-blink-live-green'
            }`}>
              {isWarRoom ? 'GOD-MODE ATTESTED' : 'SECURE'}
            </div>
          </div>
        </div>

        {/* Live Digital Clock */}
        <div className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800/80 font-mono text-right">
          <div className="text-xs sm:text-sm font-bold text-white tracking-widest">
            {timeString}
          </div>
          <div className="text-[9px] text-slate-400">GMT +1</div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Glitch Toggle */}
          <button
            onClick={onToggleGlitch}
            title={isGlitchActive ? 'Disable Intermittent Glitch' : 'Enable Intermittent Glitch'}
            className={`p-2 rounded-lg text-xs font-mono transition-colors border ${
              isGlitchActive
                ? 'bg-red-950/80 text-[#ff2a4d] border-red-800'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isGlitchActive ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
          </button>

          {/* Audio Synth Toggle */}
          <button
            onClick={() => {
              setIsAudioEnabled(!isAudioEnabled);
              if (!isAudioEnabled) playCyberPing();
            }}
            title={isAudioEnabled ? 'Mute Cyber Audio Feedback' : 'Enable Cyber Audio Feedback'}
            className={`p-2 rounded-lg text-xs font-mono transition-colors border ${
              isAudioEnabled
                ? 'bg-emerald-950/80 text-[#00ff66] border-emerald-800'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Blueprint Document Button */}
          <button
            onClick={onOpenBlueprintModal}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="View 5-Pillar Architectural Blueprint"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Blueprint Spec</span>
          </button>
        </div>
      </div>
    </header>
  );
};
