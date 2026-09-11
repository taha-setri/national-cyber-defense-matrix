import React, { useState } from 'react';
import { ARCHITECTURE_PILLARS } from '../data/blueprintData';
import { ArchitecturePillar, PillarId } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  Code2, 
  Layers, 
  Database,
  Lock,
  Cpu,
  GitBranch
} from 'lucide-react';

interface PillarsViewProps {
  onSelectCodeArtifact?: (artifactId: string) => void;
}

export const PillarsView: React.FC<PillarsViewProps> = () => {
  const [activePillarId, setActivePillarId] = useState<PillarId>('microservices');

  const currentPillar = ARCHITECTURE_PILLARS.find(p => p.id === activePillarId) || ARCHITECTURE_PILLARS[0];

  const getPillarIcon = (id: PillarId) => {
    switch (id) {
      case 'microservices':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'data-layers':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'zero-trust':
        return <Lock className="w-4 h-4 text-rose-400" />;
      case 'scalability':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'cicd':
        return <GitBranch className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pillar Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {ARCHITECTURE_PILLARS.map(pillar => {
          const active = pillar.id === activePillarId;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillarId(pillar.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                active
                  ? 'border-cyan-500/60 bg-gradient-to-b from-cyan-950/40 to-slate-900 text-white shadow-lg shadow-cyan-950/40'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 font-semibold">
                  PILLAR 0{pillar.number}
                </span>
                {getPillarIcon(pillar.id)}
              </div>
              <div className="text-xs font-semibold line-clamp-1 font-mono">{pillar.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Full Architectural Blueprint */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Header and Executive Summary */}
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 font-bold">
              PILLAR {currentPillar.number} ARCHITECTURAL SPECIFICATION
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">{currentPillar.tagline}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
            {currentPillar.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mt-3 max-w-4xl">
            {currentPillar.executiveSummary}
          </p>
        </div>

        {/* Section 1: Core Architectural Principles */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Core Engineering Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentPillar.corePrinciples.map((principle, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
              >
                <div className="h-5 w-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Architectural Components & Protocols */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Detailed Component Specifications & Communication Protocols
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPillar.keyComponents.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-white font-mono">{comp.name}</h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {comp.role}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500">Protocols:</span>{' '}
                    <span className="text-cyan-300">{comp.protocols}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Hardening Controls:
                    </span>
                    <ul className="space-y-1">
                      {comp.securityControls.map((sec, sIdx) => (
                        <li key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Engineering Trade-Off Decisions */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            Architectural Trade-Offs & Decision Log
          </h3>
          <div className="space-y-3">
            {currentPillar.tradeoffAnalysis.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
              >
                <div className="text-xs font-mono font-bold text-amber-300">
                  Architecture Decision: {item.decision}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block mb-1">
                      Advantages (Pros):
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {item.pros.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30">
                    <span className="text-[11px] font-mono text-rose-400 font-semibold block mb-1">
                      Complexity & Risks (Cons):
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {item.cons.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-mono text-cyan-400 font-semibold">Engineering Mitigation: </span>
                  {item.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Standards Compliance & Direct Code Jumps */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
              Compliance & Benchmark Alignment:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentPillar.standardsCompliance.map((std, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-cyan-400" />
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
