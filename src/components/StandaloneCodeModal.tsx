import React, { useState } from 'react';
import {
  STANDALONE_HTML,
  STANDALONE_CSS,
  STANDALONE_JS,
  STANDALONE_FASTAPI_MAIN,
  STANDALONE_DATABASE,
  STANDALONE_MODELS,
  STANDALONE_SCHEMAS,
  STANDALONE_SOAR_ENGINE,
  STANDALONE_EBPF_ENGINE,
  STANDALONE_AI_AGENT,
  STANDALONE_PQC_CRYPTO,
  STANDALONE_ZERO_TRUST,
  STANDALONE_PROJECT_STRUCTURE,
  STANDALONE_REQUIREMENTS
} from '../data/standaloneSourceCode';
import { X, Copy, Check, Download, Code2, Server, Globe, Database, FileText, Zap, Cpu, Bot, Binary, ShieldCheck } from 'lucide-react';

interface StandaloneCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType =
  | 'structure'
  | 'main'
  | 'ebpf'
  | 'ai'
  | 'pqc'
  | 'zerotrust'
  | 'database'
  | 'models'
  | 'schemas'
  | 'soar'
  | 'html'
  | 'css'
  | 'js'
  | 'requirements';

export const StandaloneCodeModal: React.FC<StandaloneCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('main');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const getCode = () => {
    switch (activeTab) {
      case 'structure': return STANDALONE_PROJECT_STRUCTURE;
      case 'main': return STANDALONE_FASTAPI_MAIN;
      case 'ebpf': return STANDALONE_EBPF_ENGINE;
      case 'ai': return STANDALONE_AI_AGENT;
      case 'pqc': return STANDALONE_PQC_CRYPTO;
      case 'zerotrust': return STANDALONE_ZERO_TRUST;
      case 'database': return STANDALONE_DATABASE;
      case 'models': return STANDALONE_MODELS;
      case 'schemas': return STANDALONE_SCHEMAS;
      case 'soar': return STANDALONE_SOAR_ENGINE;
      case 'html': return STANDALONE_HTML;
      case 'css': return STANDALONE_CSS;
      case 'js': return STANDALONE_JS;
      case 'requirements': return STANDALONE_REQUIREMENTS;
    }
  };

  const getFilename = () => {
    switch (activeTab) {
      case 'structure': return 'PROJECT_STRUCTURE.txt';
      case 'main': return 'main.py';
      case 'ebpf': return 'ebpf_engine.py';
      case 'ai': return 'sovereign_ai_agent.py';
      case 'pqc': return 'pqc_crypto.py';
      case 'zerotrust': return 'zero_trust_graph.py';
      case 'database': return 'database.py';
      case 'models': return 'models.py';
      case 'schemas': return 'schemas.py';
      case 'soar': return 'soar_engine.py';
      case 'html': return 'index.html';
      case 'css': return 'style.css';
      case 'js': return 'app.js';
      case 'requirements': return 'requirements.txt';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const code = getCode();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-950/80 border border-red-800 text-[#ff2a4d]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>CyberArch Full-Stack Integration</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-[#00ff66] border border-emerald-800">
                  FastAPI + SQLAlchemy + Static Cyber UI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                100% production-ready source code with CORS, static mounting, and 5-second REST polling.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex flex-wrap items-center justify-between px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
              <Server className="w-3 h-3 text-[#ff2a4d]" /> Backend:
            </span>
            <button
              onClick={() => setActiveTab('main')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'main'
                  ? 'bg-red-950/80 text-[#ff2a4d] border border-red-700 shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              main.py
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'database'
                  ? 'bg-red-950/80 text-[#ff2a4d] border border-red-700 shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              database.py
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'models'
                  ? 'bg-red-950/80 text-[#ff2a4d] border border-red-700 shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              models.py
            </button>
            <button
              onClick={() => setActiveTab('schemas')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'schemas'
                  ? 'bg-red-950/80 text-[#ff2a4d] border border-red-700 shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              schemas.py
            </button>
            <button
              onClick={() => setActiveTab('soar')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'soar'
                  ? 'bg-red-950/80 text-[#ff2a4d] border border-red-700 shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              soar_engine.py
            </button>
            <button
              onClick={() => setActiveTab('ebpf')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'ebpf'
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700 shadow-[0_0_8px_rgba(0,229,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              ebpf_engine.py
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'ai'
                  ? 'bg-red-950/80 text-[#ff2a4d] border border-red-700 shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              sovereign_ai.py
            </button>
            <button
              onClick={() => setActiveTab('pqc')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'pqc'
                  ? 'bg-purple-950/80 text-purple-400 border border-purple-700 shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              pqc_crypto.py
            </button>
            <button
              onClick={() => setActiveTab('zerotrust')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'zerotrust'
                  ? 'bg-emerald-950/80 text-[#00ff66] border border-emerald-700 shadow-[0_0_8px_rgba(0,255,102,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              zero_trust.py
            </button>

            <span className="text-[11px] font-mono text-slate-400 mx-1 flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#00ff66]" /> Frontend:
            </span>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'js'
                  ? 'bg-amber-950/80 text-amber-400 border border-amber-700 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              static/app.js
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'html'
                  ? 'bg-emerald-950/80 text-[#00ff66] border border-emerald-700 shadow-[0_0_8px_rgba(0,255,102,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              static/index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'css'
                  ? 'bg-emerald-950/80 text-[#00ff66] border border-emerald-700 shadow-[0_0_8px_rgba(0,255,102,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              static/style.css
            </button>

            <span className="text-[11px] font-mono text-slate-400 mx-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-cyan-400" /> Meta:
            </span>
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'structure'
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Structure
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'requirements'
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              requirements.txt
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : `Copy ${getFilename()}`}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-[#00ff66]/20 hover:bg-[#00ff66]/30 text-[#00ff66] border border-[#00ff66]/40 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300">
          <pre className="overflow-x-auto selection:bg-[#ff2a4d]/30 selection:text-white">
            <code>{getCode()}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold">Run Command:</span>
            <code className="bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
              uvicorn main:app --reload --port 8000
            </code>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
