import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { MatrixBackground } from './components/MatrixBackground';
import { CyberSidebar } from './components/CyberSidebar';
import { CyberHeader } from './components/CyberHeader';
import { CyberDashboard } from './components/CyberDashboard';
import { Header } from './components/Header';
import { ArchitectureTopology } from './components/ArchitectureTopology';
import { PillarsView } from './components/PillarsView';
import { SecurityHardeningLab } from './components/SecurityHardeningLab';
import { FounderWarRoomConsole } from './components/FounderWarRoomConsole';
import { TenantSearchPortal } from './components/TenantSearchPortal';
import { SecurityVisioWall } from './components/SecurityVisioWall';
import { LiveIngestionHub } from './components/LiveIngestionHub';
import { SovereignComplianceDossier } from './components/SovereignComplianceDossier';
import { ClientSecurityWorkbench } from './components/ClientSecurityWorkbench';
import { ExportModal } from './components/ExportModal';
import { 
  ShieldCheck, 
  Layers, 
  Lock, 
  GitBranch, 
  Cpu, 
  LayoutDashboard,
  Crown,
  Search,
  Wrench,
  Eye,
  Radio,
  Award,
  Briefcase
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('dashboard');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isGlitchActive, setIsGlitchActive] = useState<boolean>(true);
  const [isGlitchTriggered, setIsGlitchTriggered] = useState<boolean>(false);

  // Intermittent glitch trigger every 7.5 seconds when active
  useEffect(() => {
    if (!isGlitchActive) {
      setIsGlitchTriggered(false);
      return;
    }
    const interval = setInterval(() => {
      setIsGlitchTriggered(true);
      setTimeout(() => setIsGlitchTriggered(false), 280);
    }, 7500);

    return () => clearInterval(interval);
  }, [isGlitchActive]);

  const handleSidebarSelect = (itemId: string) => {
    setActiveSidebarItem(itemId);
    if (itemId === 'dashboard') {
      setCurrentView('dashboard');
    } else if (itemId === 'client-workspace') {
      setCurrentView('client-workspace');
    } else if (itemId === 'ingestion-hub') {
      setCurrentView('ingestion-hub');
    } else if (itemId === 'dgssi-dossier') {
      setCurrentView('dgssi-dossier');
    } else if (itemId === 'search-portal') {
      setCurrentView('search-portal');
    } else if (itemId === 'visio') {
      setCurrentView('visio');
    } else if (itemId === 'war-room') {
      setCurrentView('war-room');
    } else if (itemId === 'reports' || itemId === 'settings') {
      setIsExportOpen(true);
    } else {
      // In dashboard context, switch to dashboard and highlight section
      setCurrentView('dashboard');
    }
  };

  const isSocWorkspace = currentView === 'dashboard' || currentView === 'client-workspace' || currentView === 'war-room' || currentView === 'search-portal' || currentView === 'visio' || currentView === 'ingestion-hub' || currentView === 'dgssi-dossier';

  return (
    <div className={`min-h-screen bg-[#04070b] text-slate-100 font-sans selection:bg-[#ff2a4d]/30 selection:text-[#ff2a4d] relative ${isGlitchTriggered ? 'cyber-glitch-active' : ''}`}>
      {/* 1. Global Matrix Binary Rain Background */}
      <MatrixBackground opacity={isSocWorkspace ? 0.45 : 0.2} />

      {/* 2. CRT Scanline Fine Overlay */}
      <div className="fixed inset-0 scanline-overlay pointer-events-none z-30 opacity-40" />

      {/* Workspace: Dashboard, War Room, or Tenant Search Portal */}
      {isSocWorkspace ? (
        <div className="relative z-10 flex min-h-screen">
          {/* Left Navigation Sidebar */}
          <CyberSidebar
            activeItem={activeSidebarItem}
            onSelectItem={handleSidebarSelect}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main Content Space */}
          <div className="flex-1 flex flex-col min-w-0 px-3.5 sm:px-6 lg:px-8 py-4 sm:py-5 max-w-[1580px] mx-auto w-full space-y-4">
            {/* Top Command Header */}
            <CyberHeader
              onToggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              onOpenBlueprintModal={() => setIsExportOpen(true)}
              isGlitchActive={isGlitchActive}
              onToggleGlitch={() => setIsGlitchActive(!isGlitchActive)}
              isWarRoom={currentView === 'war-room'}
            />

            {/* Quick Switcher Banner to Architectural Blueprint & Engineering Views */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                <span className="text-slate-200 font-semibold">
                  {currentView === 'war-room' 
                    ? 'FOUNDER SUPREME COCKPIT (TIER 0)' 
                    : currentView === 'search-portal'
                    ? 'ENTERPRISE TENANT INVESTIGATION PORTAL'
                    : currentView === 'client-workspace'
                    ? 'SOVEREIGN CLIENT WORKBENCH // مقر عمل فحص وحماية البيانات'
                    : currentView === 'visio'
                    ? 'LINUX SOVEREIGN AUTONOMOUS VISIO // شاشة العرض الآلية لنظام لينكس'
                    : currentView === 'ingestion-hub'
                    ? 'LIVE DATA INGESTION & NETWORK TAPS (1000%)'
                    : currentView === 'dgssi-dossier'
                    ? 'DGSSI SOVEREIGN AUDIT & COMPLIANCE DOSSIER'
                    : 'SOC COMMAND CENTER (LIVE DEFENSE)'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {/* Client Security Workbench Toggle */}
                <button
                  onClick={() => {
                    setCurrentView('client-workspace');
                    setActiveSidebarItem('client-workspace');
                  }}
                  className={`px-3 py-1 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'client-workspace'
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                      : 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/70'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>مقر عمل العملاء (Client Portal)</span>
                </button>

                {/* Live Ingestion Hub Toggle */}
                <button
                  onClick={() => {
                    setCurrentView('ingestion-hub');
                    setActiveSidebarItem('ingestion-hub');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'ingestion-hub'
                      ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Live Ingest</span>
                </button>

                {/* DGSSI Dossier Toggle */}
                <button
                  onClick={() => {
                    setCurrentView('dgssi-dossier');
                    setActiveSidebarItem('dgssi-dossier');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'dgssi-dossier'
                      ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                      : 'bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/60'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>DGSSI Dossier</span>
                </button>

                {/* Search Portal Toggle */}
                <button
                  onClick={() => {
                    setCurrentView('search-portal');
                    setActiveSidebarItem('search-portal');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'search-portal'
                      ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Tenant Search</span>
                </button>

                {/* War Room Toggle */}
                <button
                  onClick={() => {
                    if (currentView === 'war-room') {
                      setCurrentView('dashboard');
                      setActiveSidebarItem('dashboard');
                    } else {
                      setCurrentView('war-room');
                      setActiveSidebarItem('war-room');
                    }
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'war-room'
                      ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border border-amber-500/60'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>{currentView === 'war-room' ? 'Exit War Room' : 'War Room'}</span>
                </button>

                {/* Security Visio */}
                <button
                  onClick={() => {
                    setCurrentView('visio');
                    setActiveSidebarItem('visio');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'visio'
                      ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                      : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/60'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Security Visio</span>
                </button>

                {/* Hardening Lab */}
                <button
                  onClick={() => setCurrentView('hardening-lab')}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-800/50 hover:border-cyan-500 text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Wrench className="w-3 h-3" />
                  <span>Hardening Lab</span>
                </button>

                {/* 5-Pillars Spec */}
                <button
                  onClick={() => setCurrentView('pillars')}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500 text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3 h-3" />
                  <span className="hidden sm:inline">5 Pillars</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <main>
              {currentView === 'client-workspace' ? (
                <ClientSecurityWorkbench />
              ) : currentView === 'war-room' ? (
                <FounderWarRoomConsole />
              ) : currentView === 'search-portal' ? (
                <TenantSearchPortal />
              ) : currentView === 'visio' ? (
                <SecurityVisioWall />
              ) : currentView === 'ingestion-hub' ? (
                <LiveIngestionHub />
              ) : currentView === 'dgssi-dossier' ? (
                <SovereignComplianceDossier />
              ) : (
                <CyberDashboard
                  activeFilter={activeSidebarItem}
                  onClearFilter={() => setActiveSidebarItem('dashboard')}
                  onCardClick={(id) => {
                    if (id === 'critical-alerts' || id === 'total-threats') {
                      setActiveSidebarItem('threats');
                    }
                  }}
                />
              )}
            </main>

            {/* Tactical Footer */}
            <footer className="pt-6 pb-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
                <span className="text-slate-400 font-semibold">Morocco Secure Defense Cloud</span>
                <span>• Sovereign Data Sovereignty Tier 4</span>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> AES-256-GCM
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#ff2a4d]" /> eBPF Shield
                </span>
                <span className="text-[#00ff66] font-bold">WAF: ONLINE</span>
              </div>
            </footer>
          </div>
        </div>
      ) : (
        /* Architecture Blueprint & Engineering Views (Pillars, Topology, Code, Tree, Lab) */
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header for Architecture Views with Mobile Selector */}
          <Header
            currentView={currentView}
            onSelectView={setCurrentView}
            onOpenExport={() => setIsExportOpen(true)}
          />

          {/* Quick Return to Dashboard Banner (Always at top of blueprint) */}
          <div className="bg-gradient-to-r from-red-950/70 via-slate-950/90 to-emerald-950/70 border-b border-slate-800 px-4 py-2 text-xs font-mono sticky top-[68px] z-30 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#ff2a4d] animate-ping" />
                <span>Active Specification: <strong className="text-cyan-300 uppercase">{currentView}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('search-portal')}
                  className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>Tenant Search</span>
                </button>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-3 py-1 rounded bg-red-950/90 hover:bg-red-900 text-[#ff2a4d] border border-red-700/80 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_10px_rgba(255,42,77,0.25)]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Return to Live SOC</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Blueprint Content */}
          <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 flex-1 w-full">
            {currentView === 'pillars' && (
              <PillarsView />
            )}

            {currentView === 'topology' && (
              <ArchitectureTopology />
            )}

            {currentView === 'visio' && (
              <SecurityVisioWall />
            )}

            {currentView === 'hardening-lab' && (
              <SecurityHardeningLab />
            )}
          </main>

          {/* Blueprint Footer */}
          <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/80 py-6 text-xs font-mono text-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-semibold">
                  National Cyber Defense Platform Specification
                </span>
                <span className="text-slate-700">|</span>
                <span>Production Blueprint</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> Zero-Trust mTLS
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400" /> PostgreSQL RLS
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-amber-400" /> Sandboxed Celery
                </span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 3. MOBILE FLOATING ACTION DOCK (Always accessible at bottom of screen on phones) */}
      <nav 
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 bg-slate-950/95 border border-slate-700/80 backdrop-blur-xl px-3 py-2 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-1.5 text-xs font-mono"
      >
        <button
          onClick={() => {
            setCurrentView('dashboard');
            setActiveSidebarItem('dashboard');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'dashboard'
              ? 'bg-[#ff2a4d] text-white shadow-[0_0_10px_#ff2a4d]'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <LayoutDashboard className="w-3 h-3" />
          <span>SOC</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('client-workspace');
            setActiveSidebarItem('client-workspace');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'client-workspace'
              ? 'bg-emerald-500 text-black shadow-[0_0_10px_#10b981]'
              : 'text-emerald-300 hover:text-white bg-emerald-950/80 border border-emerald-800/80'
          }`}
        >
          <Briefcase className="w-3 h-3" />
          <span>Client</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('ingestion-hub');
            setActiveSidebarItem('ingestion-hub');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'ingestion-hub'
              ? 'bg-emerald-500 text-black shadow-[0_0_10px_#10b981]'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Radio className="w-3 h-3" />
          <span>Ingest</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('dgssi-dossier');
            setActiveSidebarItem('dgssi-dossier');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'dgssi-dossier'
              ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Award className="w-3 h-3" />
          <span>DGSSI</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('search-portal');
            setActiveSidebarItem('search-portal');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'search-portal'
              ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Search className="w-3 h-3" />
          <span>Search</span>
        </button>

        <button
          onClick={() => setCurrentView('hardening-lab')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'hardening-lab'
              ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Wrench className="w-3 h-3" />
          <span>Lab</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('visio');
            setActiveSidebarItem('visio');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'visio'
              ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Visio</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('war-room');
            setActiveSidebarItem('war-room');
          }}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
            currentView === 'war-room'
              ? 'bg-amber-500 text-black shadow-[0_0_10px_#f59e0b]'
              : 'text-amber-400 hover:text-amber-200 bg-amber-950/80 border border-amber-800/80'
          }`}
        >
          <Crown className="w-3 h-3" />
          <span>God-Mode</span>
        </button>
      </nav>

      {/* Blueprint Markdown/JSON Export Modal */}
      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
      />
    </div>
  );
}
