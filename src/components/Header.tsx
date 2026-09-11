import React from 'react';
import { ViewMode } from '../types';
import { 
  ShieldCheck, 
  Network, 
  Layers, 
  Code2, 
  FolderTree, 
  Wrench, 
  Download, 
  Activity, 
  LayoutDashboard, 
  Search, 
  Crown,
  Eye 
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenExport
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner Status Bar */}
      <div className="px-4 py-1.5 bg-slate-900/90 border-b border-slate-800/60 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px] text-emerald-400 font-medium">
            Zero-Trust Architecture Spec v1.4
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
            <Crown className="w-3 h-3 text-amber-400" />
            <span>Founder: Taha Setri</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">NIST SP 800-207 Aligned</span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-slate-400 hidden md:inline">OWASP ASVS Level 3</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <button
            onClick={() => onSelectView('dashboard')}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-950/80 hover:bg-red-900 text-[#ff2a4d] border border-red-700/80 transition-colors font-bold"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Go to Live SOC Dashboard</span>
          </button>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-emerald-400 font-semibold hidden sm:inline">100% Defense-in-Depth</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <div 
              onClick={() => onSelectView('dashboard')}
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-950/80 to-slate-950 border border-red-700/60 flex items-center justify-center text-[#ff2a4d] shadow-[0_0_12px_rgba(255,42,77,0.3)] cursor-pointer hover:scale-105 transition-transform"
              title="Return to SOC Dashboard"
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 
                  onClick={() => onSelectView('dashboard')}
                  className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2 font-mono cursor-pointer"
                >
                  CYBERARCH <span className="text-cyan-400 text-xs font-mono font-normal px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">PLATFORM SPEC</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                National Cyber Defense Blueprint & Live SOC Engine
              </p>
            </div>
          </div>

          {/* Quick Export on mobile right */}
          <button
            id="export-blueprint-btn-mobile"
            onClick={onOpenExport}
            className="md:hidden flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export</span>
          </button>
        </div>

        {/* View Switcher Tabs for Desktop */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
          {/* Main SOC Dashboard Switcher */}
          <button
            id="nav-dashboard-btn"
            onClick={() => onSelectView('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
              currentView === 'dashboard'
                ? 'bg-red-950 text-[#ff2a4d] border border-red-600 shadow-[0_0_10px_rgba(255,42,77,0.3)]'
                : 'bg-red-950/40 text-rose-300 hover:text-white hover:bg-red-900/60 border border-red-900/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Live SOC</span>
          </button>

          {/* Tenant Search Portal */}
          <button
            id="nav-search-btn"
            onClick={() => onSelectView('search-portal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
              currentView === 'search-portal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tenant Search</span>
          </button>

          {/* Security Visio Wall */}
          <button
            id="nav-visio-btn"
            onClick={() => onSelectView('visio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
              currentView === 'visio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Security Visio</span>
          </button>

          {/* Hardening Lab */}
          <button
            id="nav-lab-btn"
            onClick={() => onSelectView('hardening-lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
              currentView === 'hardening-lab'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Hardening Lab</span>
          </button>

          {/* Interactive Topology */}
          <button
            id="nav-topology-btn"
            onClick={() => onSelectView('topology')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
              currentView === 'topology'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Topology</span>
          </button>

          {/* 5 Core Pillars */}
          <button
            id="nav-pillars-btn"
            onClick={() => onSelectView('pillars')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
              currentView === 'pillars'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5 Pillars</span>
          </button>

          {/* Export */}
          <button
            id="export-blueprint-btn"
            onClick={onOpenExport}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 ml-1 transition-colors"
            title="Download Architectural Blueprint and Configs"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export</span>
          </button>
        </div>

        {/* Mobile View Selector (Crucial for Mobile Phones) */}
        <div className="w-full md:hidden flex flex-col gap-2 pt-1 border-t border-slate-800/60">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-slate-400 font-semibold flex items-center gap-1">
              <span>View:</span>
              <strong className="text-cyan-300 uppercase">{currentView}</strong>
            </span>
            <button
              onClick={() => onSelectView('dashboard')}
              className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-950 text-[#ff2a4d] border border-red-700 flex items-center gap-1"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>SOC Dashboard</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
            <button
              onClick={() => onSelectView('dashboard')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-red-950 border-red-600 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#ff2a4d]" />
              <span>Live SOC</span>
            </button>

            <button
              onClick={() => onSelectView('search-portal')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'search-portal'
                  ? 'bg-cyan-950 border-cyan-600 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search Portal</span>
            </button>

            <button
              onClick={() => onSelectView('visio')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'visio'
                  ? 'bg-cyan-950 border-cyan-600 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Security Visio</span>
            </button>

            <button
              onClick={() => onSelectView('hardening-lab')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'hardening-lab'
                  ? 'bg-cyan-950 border-cyan-600 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hardening Lab</span>
            </button>

            <button
              onClick={() => onSelectView('pillars')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'pillars'
                  ? 'bg-cyan-950 border-cyan-600 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>5 Pillars</span>
            </button>

            <button
              onClick={() => onSelectView('topology')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'topology'
                  ? 'bg-cyan-950 border-cyan-600 text-white font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>Topology</span>
            </button>

            <button
              onClick={() => onSelectView('war-room')}
              className={`p-1.5 rounded border text-left flex items-center gap-1.5 ${
                currentView === 'war-room'
                  ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>God-Mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
