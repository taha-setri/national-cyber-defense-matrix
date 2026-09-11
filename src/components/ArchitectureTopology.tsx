import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/blueprintData';
import { ArchitectureNode } from '../types';
import { 
  Shield, 
  Lock, 
  Server, 
  Database, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Radio,
  Workflow
} from 'lucide-react';

interface TopologyProps {
  onNavigateToCode?: (artifactId: string) => void;
}

export const ArchitectureTopology: React.FC<TopologyProps> = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('api-gateway');
  const [activeFlow, setActiveFlow] = useState<'all' | 'ingress' | 'scan' | 'auth'>('all');

  const selectedNode = ARCHITECTURE_NODES.find(n => n.id === selectedNodeId) || ARCHITECTURE_NODES[2];

  const getTierNodes = (tier: ArchitectureNode['tier']) => {
    return ARCHITECTURE_NODES.filter(n => n.tier === tier);
  };

  const isHighlighted = (nodeId: string) => {
    if (activeFlow === 'all') return true;
    if (activeFlow === 'ingress') {
      return ['cloudflare', 'nginx', 'api-gateway'].includes(nodeId);
    }
    if (activeFlow === 'scan') {
      return ['api-gateway', 'scan-orchestrator', 'redis', 'scan-workers', 'postgres', 's3-storage'].includes(nodeId);
    }
    if (activeFlow === 'auth') {
      return ['nginx', 'api-gateway', 'auth-service', 'redis', 'postgres'].includes(nodeId);
    }
    return true;
  };

  const getNodeIcon = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'perimeter':
        return <Shield className="w-4 h-4 text-amber-400" />;
      case 'gateway':
        return <Lock className="w-4 h-4 text-cyan-400" />;
      case 'service':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'queue':
        return <Radio className="w-4 h-4 text-purple-400" />;
      case 'worker':
        return <Cpu className="w-4 h-4 text-rose-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Topology Header & Flow Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-white font-mono">
              System Topology & Zero-Trust Network Enclaves
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click on any tier or component to inspect its threat model, communication protocol, and hardening measures.
          </p>
        </div>

        {/* Flow Filtering Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveFlow('all')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFlow === 'all' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Components
          </button>
          <button
            onClick={() => setActiveFlow('ingress')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFlow === 'ingress' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ingress Flow
          </button>
          <button
            onClick={() => setActiveFlow('scan')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFlow === 'scan' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Scan Pipeline Flow
          </button>
          <button
            onClick={() => setActiveFlow('auth')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFlow === 'auth' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Auth & Token Flow
          </button>
        </div>
      </div>

      {/* Main Interactive Topology Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Network Diagram View (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* TIER 1: Public Internet & Edge Perimeter */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                Zone 0: Public Internet & Edge Perimeter
              </span>
              <span className="text-[11px] font-mono text-amber-500/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                Anycast DNS • Volumetric DDoS Shield
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getTierNodes('public').map(node => {
                const active = selectedNodeId === node.id;
                const dimmed = !isHighlighted(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      active
                        ? 'border-amber-400 bg-amber-500/20 shadow-md shadow-amber-950/40'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    } ${dimmed ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.category)}
                        <span className="text-xs font-semibold text-white font-mono">{node.label}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        Edge
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{node.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>

          {/* TIER 2: DMZ & Reverse Proxy Ingress */}
          <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/10 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                Zone 1: DMZ & Ingress Gateway (TLS 1.3 Termination)
              </span>
              <span className="text-[11px] font-mono text-cyan-500/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                mTLS Boundary • Rate Limiting
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getTierNodes('dmz').map(node => {
                const active = selectedNodeId === node.id;
                const dimmed = !isHighlighted(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      active
                        ? 'border-cyan-400 bg-cyan-500/20 shadow-md shadow-cyan-950/40'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    } ${dimmed ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.category)}
                        <span className="text-xs font-semibold text-white font-mono">{node.label}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {node.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{node.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>

          {/* TIER 3: Internal Service Mesh */}
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/10 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-1.5 font-semibold">
                <Server className="w-3.5 h-3.5" />
                Zone 2: Internal Microservices Mesh (Private VPC)
              </span>
              <span className="text-[11px] font-mono text-blue-500/80 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-800/40">
                gRPC mTLS • Zero Inbound from WAN
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getTierNodes('mesh').map(node => {
                const active = selectedNodeId === node.id;
                const dimmed = !isHighlighted(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      active
                        ? 'border-blue-400 bg-blue-500/20 shadow-md shadow-blue-950/40'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    } ${dimmed ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.category)}
                        <span className="text-xs font-semibold text-white font-mono">{node.label}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {node.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{node.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>

          {/* TIER 4: Isolated Storage & Worker Enclave */}
          <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/10 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5 font-semibold">
                <Database className="w-3.5 h-3.5" />
                Zone 3: Isolated Data Enclave & Worker Sandbox
              </span>
              <span className="text-[11px] font-mono text-purple-500/80 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                AES-256-GCM • No WAN Access
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getTierNodes('isolated').map(node => {
                const active = selectedNodeId === node.id;
                const dimmed = !isHighlighted(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      active
                        ? 'border-purple-400 bg-purple-500/20 shadow-md shadow-purple-950/40'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    } ${dimmed ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.category)}
                        <span className="text-xs font-semibold text-white font-mono">{node.label}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {node.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{node.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Component Deep-Dive Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-24 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                  {selectedNode.tier} tier // {selectedNode.category}
                </span>
                <h3 className="text-sm font-semibold text-white font-mono mt-1.5">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-slate-400">{selectedNode.sublabel}</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                {getNodeIcon(selectedNode.category)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Role & Architectural Boundary
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Technology Stack */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Technology Implementation
              </h4>
              <div className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                {selectedNode.techStack}
              </div>
            </div>

            {/* Security Hardening Controls */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                Hardening Controls & Defenses
              </h4>
              <ul className="space-y-1.5">
                {selectedNode.hardening.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Downstream Connections */}
            {selectedNode.connections.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Outbound Service Connections
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.connections.map(targetId => {
                    const target = ARCHITECTURE_NODES.find(n => n.id === targetId);
                    return (
                      <button
                        key={targetId}
                        onClick={() => setSelectedNodeId(targetId)}
                        className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
                      >
                        <span>{target?.label || targetId}</span>
                        <ArrowRight className="w-3 h-3 text-cyan-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
