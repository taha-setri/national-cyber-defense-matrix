import React, { useState } from 'react';
import { ARCHITECTURE_PILLARS, CODE_ARTIFACTS } from '../data/blueprintData';
import { X, Download, Copy, Check, FileText, FileCode, CheckSquare } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const generateFullMarkdownBlueprint = (): string => {
    let md = `# Production Cybersecurity Platform - Enterprise Engineering Blueprint\n`;
    md += `**Classification**: Confidential Engineering Blueprint\n`;
    md += `**Architect**: Principal Systems Architect & Lead Cybersecurity Engineer\n`;
    md += `**Standards**: NIST SP 800-207, OWASP ASVS 4.0 Level 3, CIS Benchmarks\n\n`;
    md += `================================================================================\n\n`;

    ARCHITECTURE_PILLARS.forEach((pillar) => {
      md += `## PILLAR ${pillar.number}: ${pillar.title.toUpperCase()}\n`;
      md += `*${pillar.tagline}*\n\n`;
      md += `### Executive Architectural Summary\n${pillar.executiveSummary}\n\n`;

      md += `### Core Principles\n`;
      pillar.corePrinciples.forEach((p) => {
        md += `- ${p}\n`;
      });
      md += `\n`;

      md += `### Key Architectural Components\n`;
      pillar.keyComponents.forEach((c) => {
        md += `#### ${c.name}\n`;
        md += `- **Role**: ${c.role}\n`;
        md += `- **Protocols**: ${c.protocols}\n`;
        md += `- **Security Controls**: ${c.securityControls.join(', ')}\n\n`;
      });

      md += `### Trade-Off Analysis\n`;
      pillar.tradeoffAnalysis.forEach((t) => {
        md += `- **Decision**: ${t.decision}\n`;
        md += `  - *Pros*: ${t.pros.join(', ')}\n`;
        md += `  - *Cons*: ${t.cons.join(', ')}\n`;
        md += `  - *Mitigation*: ${t.mitigation}\n\n`;
      });

      md += `### Compliance & Alignment\n${pillar.standardsCompliance.join(', ')}\n\n`;
      md += `---\n\n`;
    });

    md += `## PRODUCTION CODE ARTIFACTS & CONFIGURATIONS\n\n`;
    CODE_ARTIFACTS.forEach((art) => {
      md += `### File: \`${art.filename}\` (${art.title})\n`;
      md += `*Security Rationale*: ${art.securityRationale}\n\n`;
      md += `\`\`\`${art.language}\n${art.code}\n\`\`\`\n\n`;
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    const md = generateFullMarkdownBlueprint();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateFullMarkdownBlueprint();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cybersecurity-platform-blueprint.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                Export Enterprise Blueprint
              </h3>
              <p className="text-xs text-slate-400">
                Download comprehensive architecture specifications and production configuration files.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Options */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-mono font-bold text-white">
                  Full Architectural Blueprint (Markdown)
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                Contains all 5 architectural pillars, executive summaries, component diagrams, threat models, trade-offs, and embedded code configs.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-mono text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-mono font-bold text-white">
                Included Security Specifications in Export:
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero-Trust Architecture Spec (NIST SP 800-207)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Row-Level Security (RLS) Tenant Policies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>eBPF XDP Defense Matrix Specifications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sub-18ms SOAR Automation Playbooks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>National Gateway mTLS Ingress Directives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Immutable WORM Audit Ledger Schema</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
