import React, { useState } from 'react';
import { REPOSITORY_TREE } from '../data/blueprintData';
import { FolderNode } from '../types';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Shield, 
  Info,
  Layers,
  Sparkles,
  CheckCircle2,
  Code
} from 'lucide-react';

export const FolderStructureView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<FolderNode>(REPOSITORY_TREE);
  const [allExpanded, setAllExpanded] = useState<boolean>(true);

  // Quick preset shortcuts to highlight key security files
  const findNode = (name: string, root: FolderNode): FolderNode | null => {
    if (root.name === name) return root;
    if (root.children) {
      for (const child of root.children) {
        const res = findNode(name, child);
        if (res) return res;
      }
    }
    return null;
  };

  const handleSelectPreset = (name: string) => {
    const node = findNode(name, REPOSITORY_TREE);
    if (node) {
      setSelectedNode(node);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white font-mono flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Recommended Production Monorepo Directory Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tap any folder or file in the tree to inspect its architectural purpose, security boundaries, and zero-trust isolation rules.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 shrink-0">
          Root: <span className="text-cyan-400">/cyberops-platform-monorepo</span>
        </div>
      </div>

      {/* Quick Select Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Quick Inspect:
        </span>
        <button
          onClick={() => handleSelectPreset('main.py')}
          className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-colors"
        >
          📄 main.py (FastAPI)
        </button>
        <button
          onClick={() => handleSelectPreset('security.py')}
          className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-colors"
        >
          📄 security.py (JWT/Auth)
        </button>
        <button
          onClick={() => handleSelectPreset('ssrf_guard.py')}
          className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-colors"
        >
          🛡️ ssrf_guard.py (Firewall)
        </button>
        <button
          onClick={() => handleSelectPreset('nginx.conf')}
          className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-colors"
        >
          🌐 nginx.conf (WAF/TLS)
        </button>
      </div>

      {/* MOBILE-ONLY CURRENT SELECTION DRAWER (Visible immediately on phone screen) */}
      <div className="lg:hidden bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-700/60 rounded-xl p-4 space-y-2.5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            {selectedNode.type === 'folder' ? (
              <FolderOpen className="w-4 h-4 text-cyan-400" />
            ) : (
              <FileText className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-xs font-mono font-bold text-white">{selectedNode.name}</span>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {selectedNode.type}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Active Selection
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          {selectedNode.description || 'Core repository artifact essential for platform execution.'}
        </p>

        {selectedNode.securityNote && (
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-sans">
            <strong className="text-cyan-400 font-mono block">Security Scope:</strong>
            {selectedNode.securityNote}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tree Explorer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80">
            <span className="text-slate-400 text-[11px]">Repository Explorer</span>
            <span className="text-[10px] text-slate-500">Tap item to inspect</span>
          </div>
          <TreeNode 
            node={REPOSITORY_TREE} 
            selectedNode={selectedNode} 
            onSelectNode={setSelectedNode} 
            depth={0} 
          />
        </div>

        {/* Selected File/Folder Rationale (5 cols - Desktop sticky) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-24 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 pb-3 border-b border-slate-800">
              {selectedNode.type === 'folder' ? (
                <Folder className="w-5 h-5 text-cyan-400" />
              ) : (
                <FileText className="w-5 h-5 text-amber-400" />
              )}
              <h3 className="text-sm font-semibold text-white font-mono">
                {selectedNode.name}
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {selectedNode.type}
              </span>
            </div>

            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Architectural Role & Scope
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.description || 'Core repository artifact essential for platform execution.'}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 font-semibold">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Security & Isolation Standards</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {selectedNode.securityNote || 
                  'Maintains strict least-privilege boundaries. Microservice code in this tier cannot access database credentials directly unless explicitly mounted via secret engines.'}
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <span className="font-mono text-slate-300 block font-semibold text-[11px] uppercase">
                Directory Placement Rules:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li><strong className="text-slate-300">services/*</strong>: Independently containerized microservices.</li>
                <li><strong className="text-slate-300">shared/*</strong>: Core security, auth, and database utilities.</li>
                <li><strong className="text-slate-300">deploy/*</strong>: Nginx configurations, Dockerfiles, and K8s manifests.</li>
                <li><strong className="text-slate-300">.github/*</strong>: DevSecOps automated pipelines.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TreeNodeProps {
  node: FolderNode;
  selectedNode: FolderNode;
  onSelectNode: (node: FolderNode) => void;
  depth: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, selectedNode, onSelectNode, depth }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const isSelected = selectedNode.name === node.name;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    onSelectNode(node);
  };

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center gap-2 py-2 px-2.5 rounded-md cursor-pointer transition-colors select-none ${
          isSelected 
            ? 'bg-cyan-950/90 border border-cyan-600 text-cyan-200 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
            : 'hover:bg-slate-900 text-slate-300'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === 'folder' ? (
          <button 
            onClick={toggleExpand} 
            className="text-slate-400 hover:text-slate-200 p-0.5"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <span className="w-4 h-3.5" />
        )}

        {node.type === 'folder' ? (
          expanded ? (
            <FolderOpen className="w-4 h-4 text-cyan-400 shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-cyan-400 shrink-0" />
          )
        ) : (
          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
        )}

        <span className="text-xs font-mono">{node.name}</span>

        {isSelected && (
          <span className="ml-auto text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700 shrink-0">
            Selected
          </span>
        )}
      </div>

      {node.type === 'folder' && expanded && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <TreeNode
              key={idx}
              node={child}
              selectedNode={selectedNode}
              onSelectNode={onSelectNode}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
