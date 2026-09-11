import React, { useState } from 'react';
import { CODE_ARTIFACTS } from '../data/blueprintData';
import { CodeArtifact } from '../types';
import { 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  ShieldAlert, 
  ShieldCheck, 
  Download,
  Terminal
} from 'lucide-react';

interface CodeArtifactsViewProps {
  initialArtifactId?: string;
}

export const CodeArtifactsView: React.FC<CodeArtifactsViewProps> = ({ initialArtifactId }) => {
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(
    initialArtifactId || CODE_ARTIFACTS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);

  const currentArtifact = CODE_ARTIFACTS.find(a => a.id === selectedArtifactId) || CODE_ARTIFACTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentArtifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentArtifact.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentArtifact.filename.split('/').pop() || 'config.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* File Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 overflow-x-auto flex items-center gap-2">
        {CODE_ARTIFACTS.map(artifact => {
          const active = artifact.id === selectedArtifactId;
          return (
            <button
              key={artifact.id}
              onClick={() => setSelectedArtifactId(artifact.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                active
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>{artifact.filename.split('/').pop()}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                {artifact.language}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor Panel (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xl">
          {/* Top Code Bar */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-slate-300 font-semibold">
                {currentArtifact.filename}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 uppercase">
                {currentArtifact.language}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                title="Download file"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>

          {/* Code Text with Line Numbers */}
          <div className="p-4 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed max-h-[640px] overflow-y-auto bg-slate-950 selection:bg-cyan-500/30">
            <pre className="relative">
              <code>{currentArtifact.code}</code>
            </pre>
          </div>
        </div>

        {/* Security Rationale & Engineering Details (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 sticky top-24">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                Security Engineering Specification
              </span>
              <h3 className="text-sm font-semibold text-white font-mono mt-2">
                {currentArtifact.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {currentArtifact.description}
              </p>
            </div>

            {/* Security Rationale Card */}
            <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Security Rationale & Threat Mitigations</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentArtifact.securityRationale}
              </p>
            </div>

            {/* Implementation Checklist */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Production Checklist for this Module
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Secrets sourced exclusively via environment/Vault, never hardcoded</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strict parameter bounds and zero raw shell or string SQL concatenation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Bounded timeouts and memory limits prevent denial of service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
