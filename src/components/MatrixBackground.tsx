import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  opacity?: number;
  matrixDensity?: number;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
  opacity = 0.45,
  matrixDensity = 28,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };

    window.addEventListener('resize', handleResize);

    // Matrix Rain setup
    const fontSize = 14;
    let columns = Math.floor(width / matrixDensity);
    let drops: number[] = [];
    let colors: string[] = [];
    let speeds: number[] = [];

    const initColumns = () => {
      columns = Math.floor(width / matrixDensity);
      drops = [];
      colors = [];
      speeds = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        // Alternating neon green and neon red streams
        colors[i] = Math.random() > 0.45 ? '#00FF66' : '#FF2A4D';
        speeds[i] = 0.5 + Math.random() * 0.8;
      }
    };

    initColumns();

    const chars = '01101001010011001010111001010100110101';

    let lastDrawTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS for smooth cyber aesthetic without high CPU

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const elapsed = currentTime - lastDrawTime;
      if (elapsed < fpsInterval) return;
      lastDrawTime = currentTime - (elapsed % fpsInterval);

      // Translucent black fade to create trails
      ctx.fillStyle = 'rgba(4, 7, 11, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * matrixDensity;
        const y = drops[i] * fontSize;

        const isHead = Math.random() > 0.85;
        if (isHead) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = colors[i];
        } else {
          ctx.fillStyle = colors[i];
          ctx.shadowBlur = 4;
          ctx.shadowColor = colors[i];
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
          colors[i] = Math.random() > 0.45 ? '#00FF66' : '#FF2A4D';
        }

        drops[i] += speeds[i];
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [matrixDensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Crimson Ambient Radial Glow matching the Moroccan Flag background */}
      <div 
        className="absolute inset-0 bg-radial from-red-950/40 via-red-950/20 to-[#04070b] opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(193, 39, 45, 0.25) 0%, rgba(139, 0, 0, 0.15) 45%, rgba(4, 7, 11, 0.95) 85%)'
        }}
      />

      {/* 2. Moroccan Flag Hologram with glowing green 5-pointed interwoven star (pentagram) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 animate-flag-float">
        <svg
          viewBox="0 0 900 600"
          className="w-full max-w-4xl h-auto filter drop-shadow-[0_0_35px_rgba(0,255,102,0.4)] animate-star-glow"
        >
          <defs>
            <radialGradient id="flagBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C1272D" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#8B0000" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#04070b" stopOpacity="0" />
            </radialGradient>
            
            <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flag Red Field Glow */}
          <ellipse cx="450" cy="300" rx="420" ry="260" fill="url(#flagBg)" />

          {/* Moroccan Flag Green Pentagram (5-pointed interwoven star) */}
          <g transform="translate(450, 290) scale(1.3)" filter="url(#greenGlow)">
            {/* The 5 points of a regular pentagram */}
            {/* Outer lines of the traditional Moroccan star */}
            <polygon
              points="
                0,-100 
                58.78,80.90 
                -95.11,-30.90 
                95.11,-30.90 
                -58.78,80.90
              "
              fill="none"
              stroke="#00FF66"
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.9"
            />
            
            {/* Inner fill glow */}
            <polygon
              points="
                0,-95 
                55.8,76.8 
                -90.3,-29.3 
                90.3,-29.3 
                -55.8,76.8
              "
              fill="none"
              stroke="#00E65B"
              strokeWidth="2.5"
              strokeOpacity="0.7"
            />

            {/* Center ambient green pulse orb */}
            <circle cx="0" cy="0" r="18" fill="#00FF66" opacity="0.35" filter="blur(8px)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* 3. Falling Binary Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      />

      {/* 4. Fine Cyber Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 102, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 42, 77, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 5. Vignette mask to keep edges dark and focus in the center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(4, 7, 11, 0.85) 90%, #04070b 100%)'
        }}
      />
    </div>
  );
};
