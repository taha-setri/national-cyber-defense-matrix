import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

interface DataPoint {
  time: string;
  threats: number;
  blocked: number;
}

export const ThreatDetectionChart: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { time: '00:00', threats: 18, blocked: 18 },
    { time: '02:00', threats: 24, blocked: 23 },
    { time: '04:00', threats: 15, blocked: 15 },
    { time: '06:00', threats: 32, blocked: 31 },
    { time: '08:00', threats: 48, blocked: 45 },
    { time: '10:00', threats: 85, blocked: 82 },
    { time: '12:00', threats: 38, blocked: 37 },
    { time: '14:00', threats: 55, blocked: 53 },
    { time: '16:00', threats: 28, blocked: 28 },
    { time: '18:00', threats: 42, blocked: 40 },
    { time: '20:00', threats: 76, blocked: 73 },
  ]);

  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Subtle real-time data jitter for the live aesthetic
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const lastIdx = prev.length - 1;
        const currentVal = prev[lastIdx].threats;
        const delta = Math.floor((Math.random() - 0.45) * 6);
        const newVal = Math.min(95, Math.max(50, currentVal + delta));

        const updated = [...prev];
        updated[lastIdx] = {
          ...updated[lastIdx],
          threats: newVal,
          blocked: Math.max(0, newVal - Math.floor(Math.random() * 2)),
        };
        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // SVG dimensions
  const width = 500;
  const height = 190;
  const padding = { top: 20, right: 20, bottom: 30, left: 35 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Coordinate scales
  const getX = (index: number) => padding.left + (index / (dataPoints.length - 1)) * chartW;
  const getY = (val: number) => padding.top + chartH - (val / 100) * chartH;

  // Build SVG path
  const pathD = dataPoints.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.threats);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L ${getX(dataPoints.length - 1)} ${height - padding.bottom} L ${getX(0)} ${height - padding.bottom} Z`;

  return (
    <div className="cyber-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#ff2a4d]" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            THREAT DETECTION
          </h3>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/60 border border-red-800/80 text-[10px] font-mono text-[#ff2a4d] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a4d] animate-blink-live inline-block" />
          <span>LIVE</span>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full h-[180px] sm:h-[195px] select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Linear gradient for neon red area fill */}
            <linearGradient id="threatAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff2a4d" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#c1272d" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ff2a4d" stopOpacity="0" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines & Y-Axis labels */}
          {[100, 75, 50, 25, 0].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#threatAreaGrad)" />

          {/* Line Stroke with Red Neon Glow and Dynamic Draw Animation */}
          <path
            d={pathD}
            fill="none"
            stroke="#ff2a4d"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#neonGlowRed)"
            className="animate-draw-line"
          />

          {/* Data Points on Line with Pulsating Red Glow */}
          {dataPoints.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.threats);
            const isLast = idx === dataPoints.length - 1;

            return (
              <g
                key={pt.time}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  setHoveredPoint(pt);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPos({ x, y });
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Active pulse halo on latest point */}
                {isLast && (
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill="none"
                    stroke="#ff2a4d"
                    strokeWidth="1.5"
                    className="animate-ping opacity-85"
                  />
                )}
                {/* Secondary halo for all points */}
                <circle
                  cx={x}
                  cy={y}
                  r={isLast ? '6' : '4.5'}
                  fill="none"
                  stroke="#ff2a4d"
                  strokeWidth="1"
                  className="animate-pulse opacity-50"
                />
                {/* Pulsating core dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isLast ? '4.5' : '3.2'}
                  fill={isLast ? '#ffffff' : '#ff2a4d'}
                  stroke="#ff2a4d"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 7px #ff2a4d)"
                  className="animate-pulse"
                />
              </g>
            );
          })}

          {/* X-Axis Time Labels */}
          {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map((timeLabel) => {
            const matchIndex = dataPoints.findIndex((p) => p.time === timeLabel);
            if (matchIndex === -1) return null;
            const x = getX(matchIndex);
            return (
              <text
                key={timeLabel}
                x={x}
                y={height - 8}
                textAnchor="middle"
                fill="#64748b"
                fontSize="9"
                fontFamily="monospace"
              >
                {timeLabel}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && tooltipPos && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-lg bg-slate-950/95 border border-red-500/50 shadow-xl text-xs font-mono transform -translate-x-1/2 -translate-y-12"
            style={{
              left: `${(tooltipPos.x / width) * 100}%`,
              top: `${(tooltipPos.y / height) * 100}%`,
            }}
          >
            <div className="text-[10px] text-slate-400">{hoveredPoint.time}</div>
            <div className="text-[#ff2a4d] font-bold text-xs flex items-center gap-1">
              <span>{hoveredPoint.threats} attacks/m</span>
            </div>
            <div className="text-[9px] text-emerald-400">
              {hoveredPoint.blocked} neutralized
            </div>
          </div>
        )}
      </div>

      {/* Mini telemetry footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a4d]" />
          Peak: <strong className="text-white">85 evt/s</strong>
        </span>
        <span className="text-slate-500">EWMA Smoothing: 0.15</span>
      </div>
    </div>
  );
};
