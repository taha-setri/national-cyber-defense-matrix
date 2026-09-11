import React, { useState, useEffect } from 'react';
import { Globe, Crosshair, ShieldAlert } from 'lucide-react';

interface GeoNode {
  id: string;
  name: string;
  x: number; // 0 - 600
  y: number; // 0 - 300
  type: 'target' | 'attacker';
  ip: string;
}

interface AttackArc {
  id: string;
  from: GeoNode;
  to: GeoNode;
  protocol: string;
  color: string;
  progress: number;
}

export const LiveAttackMap: React.FC = () => {
  // Key World Hubs mapped to SVG 600x300 canvas
  const moroccoHub: GeoNode = {
    id: 'morocco-soc',
    name: 'CASABLANCA_HQ',
    x: 275,
    y: 125,
    type: 'target',
    ip: '196.200.160.1',
  };

  const nodes: GeoNode[] = [
    moroccoHub,
    { id: 'us-east', name: 'US_EAST (Ashburn)', x: 155, y: 110, type: 'attacker', ip: '198.51.100.42' },
    { id: 'us-west', name: 'US_WEST (Silicon Valley)', x: 100, y: 115, type: 'attacker', ip: '203.0.113.88' },
    { id: 'eu-west', name: 'EU_CENTRAL (Frankfurt)', x: 310, y: 88, type: 'attacker', ip: '185.190.140.12' },
    { id: 'ru-west', name: 'RU_NORTH (Moscow)', x: 360, y: 75, type: 'attacker', ip: '95.173.136.2' },
    { id: 'asia-east', name: 'AP_EAST (Tokyo)', x: 505, y: 120, type: 'attacker', ip: '114.119.130.5' },
    { id: 'cn-beijing', name: 'CN_NORTH (Beijing)', x: 450, y: 108, type: 'attacker', ip: '220.181.38.148' },
    { id: 'sa-east', name: 'SA_EAST (São Paulo)', x: 205, y: 220, type: 'attacker', ip: '177.18.200.31' },
    { id: 'au-east', name: 'AU_EAST (Sydney)', x: 530, y: 240, type: 'attacker', ip: '139.130.4.5' },
  ];

  const [activeArcs, setActiveArcs] = useState<AttackArc[]>([]);
  const [interceptCount, setInterceptCount] = useState<number>(1429);
  const [lastIncident, setLastIncident] = useState<{ src: string; proto: string; ip: string }>({
    src: 'US_EAST',
    proto: 'SYN Flood [Port 443]',
    ip: '198.51.100.42',
  });

  // Cycle attack trajectories in real-time
  useEffect(() => {
    const protocols = ['SYN Flood', 'SQLi Probe', 'SSH Brute', 'DNS Amplification', 'Zero-Day TLS', 'API Fuzzing'];

    const spawnAttack = () => {
      const attackers = nodes.filter((n) => n.id !== 'morocco-soc');
      const randomAttacker = attackers[Math.floor(Math.random() * attackers.length)];
      const proto = protocols[Math.floor(Math.random() * protocols.length)];

      const newArc: AttackArc = {
        id: `arc-${Date.now()}-${Math.random()}`,
        from: randomAttacker,
        to: moroccoHub,
        protocol: proto,
        color: '#ff2a4d',
        progress: 0,
      };

      setLastIncident({
        src: randomAttacker.name,
        proto: `${proto} (${randomAttacker.ip})`,
        ip: randomAttacker.ip,
      });

      setInterceptCount((prev) => prev + 1);

      setActiveArcs((prev) => [...prev.slice(-4), newArc]);
    };

    const interval = setInterval(spawnAttack, 2200);
    spawnAttack();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2 z-10">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#ff2a4d]" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            LIVE ATTACK MAP
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <Crosshair className="w-3 h-3 text-[#00ff66]" />
            <span>HQ Target: <strong className="text-white">CASABLANCA</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/60 border border-red-800/80 text-[10px] font-mono text-[#ff2a4d] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a4d] animate-blink-live inline-block" />
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full h-[210px] sm:h-[235px] bg-[#03060a]/90 rounded-lg border border-slate-800/70 overflow-hidden flex items-center justify-center">
        {/* Fine coordinate grid lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 102, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 42, 77, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />

        {/* World Map SVG Projection */}
        <svg
          viewBox="0 0 600 300"
          className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] select-none"
        >
          <defs>
            <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FF66" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#00FF66" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00FF66" stopOpacity="0" />
            </radialGradient>

            <filter id="laserGlowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stylized Continent Silhouettes */}
          <g fill="#0c1724" stroke="#1a2b3d" strokeWidth="0.8" opacity="0.9">
            {/* North America */}
            <path d="M 80,60 L 130,50 L 190,65 L 170,120 L 135,145 L 105,100 L 70,80 Z" />
            <path d="M 120,40 L 160,30 L 180,45 L 140,55 Z" />
            {/* South America */}
            <path d="M 170,155 L 210,170 L 230,220 L 195,270 L 165,210 Z" />
            {/* Europe */}
            <path d="M 280,65 L 340,60 L 350,95 L 310,110 L 275,90 Z" />
            {/* Africa with Morocco prominence */}
            <path d="M 265,115 L 340,115 L 360,175 L 320,250 L 275,190 L 260,140 Z" />
            {/* Asia */}
            <path d="M 350,55 L 480,50 L 530,95 L 490,165 L 410,150 L 365,105 Z" />
            {/* Australia */}
            <path d="M 480,210 L 545,215 L 535,265 L 475,250 Z" />
          </g>

          {/* Latitude / Longitude lines */}
          <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1="300" y1="0" x2="300" y2="300" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

          {/* Animated Laser Attack Trajectories */}
          {activeArcs.map((arc) => {
            const startX = arc.from.x;
            const startY = arc.from.y;
            const endX = arc.to.x;
            const endY = arc.to.y;

            // Calculate curved arch control point
            const midX = (startX + endX) / 2;
            const midY = Math.min(startY, endY) - 35;
            const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

            return (
              <g key={arc.id}>
                {/* Arc Shadow Background */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#ff2a4d"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  opacity="0.5"
                />

                {/* Dynamically drawing and pulsing Laser Attack Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#ff2a4d"
                  strokeWidth="2.5"
                  filter="url(#laserGlowRed)"
                  className="animate-draw-line"
                />

                {/* Traveling Projectile Head */}
                <circle r="3.5" fill="#ffffff" filter="drop-shadow(0 0 8px #ff2a4d)">
                  <animateMotion
                    path={pathD}
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}

          {/* Attacker Nodes (Red Pulsing Dots with Radiating Glow) */}
          {nodes.filter((n) => n.type === 'attacker').map((node) => (
            <g key={node.id} className="cursor-pointer">
              {/* Radiating outer shockwave ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r="9"
                fill="none"
                stroke="#ff2a4d"
                strokeWidth="1.5"
                className="animate-ping opacity-75"
              />
              {/* Secondary pulsing halo */}
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill="none"
                stroke="#ff2a4d"
                strokeWidth="1"
                className="animate-pulse opacity-60"
              />
              {/* Inner glowing dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="#ff2a4d"
                filter="drop-shadow(0 0 8px #ff2a4d)"
                className="animate-pulse"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="1.8"
                fill="#ffffff"
              />
            </g>
          ))}

          {/* Destination: Morocco SOC Target Hub (Green Emerald Master Node) */}
          <g transform={`translate(${moroccoHub.x}, ${moroccoHub.y})`}>
            {/* Large radial shockwave */}
            <circle cx="0" cy="0" r="18" fill="url(#targetGlow)" className="animate-pulse" />
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="none"
              stroke="#00FF66"
              strokeWidth="1.5"
              className="animate-ping opacity-80"
            />
            <circle cx="0" cy="0" r="5" fill="#00FF66" filter="drop-shadow(0 0 8px #00FF66)" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

            {/* Label */}
            <text
              x="8"
              y="-8"
              fill="#00FF66"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              filter="drop-shadow(0 0 3px #000)"
            >
              CASABLANCA_HQ [SECURE]
            </text>
          </g>
        </svg>

        {/* Live Attack Telemetry HUD Overlay */}
        <div className="absolute bottom-2 left-2 z-10 px-2.5 py-1.5 rounded bg-black/80 border border-slate-800 text-[10px] font-mono backdrop-blur-sm">
          <div className="text-slate-400">
            Active Vector: <span className="text-[#ff2a4d] font-bold">{lastIncident.src}</span>
          </div>
          <div className="text-[9px] text-slate-500">
            {lastIncident.proto}
          </div>
        </div>

        <div className="absolute bottom-2 right-2 z-10 px-2.5 py-1.5 rounded bg-black/80 border border-slate-800 text-[10px] font-mono text-right backdrop-blur-sm">
          <div className="text-slate-400">
            Attacks Blocked: <span className="text-[#00ff66] font-bold">{interceptCount}</span>
          </div>
          <div className="text-[9px] text-emerald-400">
            WAF Latency: 0.8ms
          </div>
        </div>
      </div>
    </div>
  );
};
