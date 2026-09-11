import React from 'react';
import { 
  LayoutDashboard, 
  Server, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  UserCheck, 
  Globe, 
  History, 
  FileText, 
  Settings,
  ShieldCheck,
  Radio,
  Award,
  Crown,
  Search,
  Eye,
  Briefcase
} from 'lucide-react';

interface CyberSidebarProps {
  activeItem: string;
  onSelectItem: (item: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const CyberSidebar: React.FC<CyberSidebarProps> = ({
  activeItem,
  onSelectItem,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'client-workspace', label: 'Client Workspace', icon: <Briefcase className="w-4 h-4 text-[#00ff66]" />, badge: 'PORTAL' },
    { id: 'ingestion-hub', label: 'Live Data Ingestion', icon: <Radio className="w-4 h-4 text-emerald-400" />, badge: 'LIVE 1000%' },
    { id: 'dgssi-dossier', label: 'DGSSI National Dossier', icon: <Award className="w-4 h-4 text-cyan-400" />, badge: 'AUDIT' },
    { id: 'search-portal', label: 'Tenant Search', icon: <Search className="w-4 h-4 text-cyan-400" />, badge: 'RLS' },
    { id: 'visio', label: 'Linux Sovereign Visio', icon: <Eye className="w-4 h-4 text-cyan-400" />, badge: 'AUTO' },
    { id: 'war-room', label: 'Founder War Room', icon: <Crown className="w-4 h-4 text-amber-400" />, badge: 'GOD-MODE' },
    { id: 'assets', label: 'Assets', icon: <Server className="w-4 h-4" /> },
    { id: 'threats', label: 'Threats', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'compliance', label: 'Compliance', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'identity', label: 'Identity', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'network', label: 'Network', icon: <Globe className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <History className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40 w-56
          bg-[#060a10]/90 backdrop-blur-xl border-r border-slate-800/80
          flex flex-col justify-between p-4 transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Logo matching image_2.png */}
        <div>
          <div className="flex items-center gap-2.5 pb-5 border-b border-slate-800/80">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-red-950/80 to-black border border-red-700/80 shadow-[0_0_12px_rgba(255,42,77,0.3)] shrink-0">
              {/* Red Shield with Green Moroccan Star accent */}
              <ShieldCheck className="w-5 h-5 text-[#ff2a4d]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66] animate-pulse" />
            </div>

            <div>
              <div className="text-xs font-mono font-black tracking-widest text-[#ff2a4d] leading-tight">
                MOROCCO
              </div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-slate-200 leading-tight">
                SECURE
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item.id);
                    onCloseMobile?.();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono
                    transition-all duration-200 text-left group relative overflow-hidden
                    ${isActive
                      ? 'bg-red-950/50 text-white font-bold border-l-2 border-[#ff2a4d] shadow-[inset_0_0_10px_rgba(255,42,77,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }
                  `}
                >
                  <span
                    className={`
                      transition-colors
                      ${isActive ? 'text-[#ff2a4d]' : 'text-slate-500 group-hover:text-slate-300'}
                    `}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow-[0_0_6px_rgba(245,158,11,0.3)]">
                      {item.badge}
                    </span>
                  )}

                  {/* Active subtle pill */}
                  {isActive && !item.badge && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff2a4d] shadow-[0_0_5px_#ff2a4d]" />
                  )}

                  {/* Glowing Underline Animation on Hover */}
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#00ff66] to-transparent shadow-[0_0_8px_#00ff66] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center pointer-events-none" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile at bottom */}
        <div 
          onClick={() => onSelectItem('war-room')}
          className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5 cursor-pointer hover:bg-slate-900/40 p-1.5 rounded-lg transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-950 via-black to-slate-900 border border-amber-500/60 flex items-center justify-center text-[10px] font-mono font-black text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)] shrink-0 group-hover:scale-105 transition-transform">
            TS
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate flex items-center gap-1">
              <span>Taha Setri</span>
              <Crown className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b] animate-pulse" />
              <span className="truncate">Founder & Architect</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
