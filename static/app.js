/**
 * CyberArch Platform - Frontend Real-Time Synchronization Engine
 * 1. Matrix Binary Rain Canvas (Neon Red & Green)
 * 2. Live Attack Map Bezier Trajectories
 * 3. GMT+1 Clock
 * 4. Periodic 5-Second REST Polling to FastAPI (/api/v1/dashboard/stats & /api/v1/logs)
 */

// 1. Live GMT+1 Clock
function initClock() {
  const clockEl = document.getElementById('live-clock');
  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(update, 1000);
  update();
}

// 2. Matrix Binary Falling Rain Canvas
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const chars = '01101001010011001010111001010100110101';
  const fontSize = 14;
  const columns = Math.floor(width / 26);
  const drops = Array.from({ length: columns }, () => Math.random() * -100);
  const colors = Array.from({ length: columns }, () => Math.random() > 0.45 ? '#00FF66' : '#FF2A4D');

  function draw() {
    ctx.fillStyle = 'rgba(4, 7, 11, 0.15)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 26;
      const y = drops[i] * fontSize;

      ctx.fillStyle = colors[i];
      ctx.shadowBlur = 6;
      ctx.shadowColor = colors[i];
      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
        colors[i] = Math.random() > 0.45 ? '#00FF66' : '#FF2A4D';
      }
      drops[i] += 0.85;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// 3. Live Attack Trajectory Drawer (SVG)
function initAttackMap() {
  const container = document.getElementById('attack-arcs-container');
  if (!container) return;

  const target = { x: 275, y: 125 }; // Casablanca Defense Bastion
  const sources = [
    { x: 150, y: 110, name: 'US_EAST' },
    { x: 310, y: 90, name: 'EU_CENTRAL' },
    { x: 360, y: 80, name: 'RU_NORTH' },
    { x: 450, y: 110, name: 'CN_NORTH' },
    { x: 200, y: 210, name: 'SA_EAST' }
  ];

  function launchAttack() {
    const src = sources[Math.floor(Math.random() * sources.length)];
    const midX = (src.x + target.x) / 2;
    const midY = Math.min(src.y, target.y) - 35;
    const pathD = `M ${src.x} ${src.y} Q ${midX} ${midY} ${target.x} ${target.y}`;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Arc Path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#ff2a4d');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-dasharray', '4 3');

    // Projectile Head
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '3');
    circle.setAttribute('fill', '#ffffff');

    const animMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animMotion.setAttribute('path', pathD);
    animMotion.setAttribute('dur', '1.6s');
    animMotion.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animMotion);
    g.appendChild(path);
    g.appendChild(circle);

    container.appendChild(g);

    setTimeout(() => {
      if (container.contains(g)) container.removeChild(g);
    }, 4500);
  }

  setInterval(launchAttack, 2500);
  launchAttack();
}

// 4. FastAPI Backend REST & SSE Synchronization (Enterprise Zero-Trust & SOAR)
const ZERO_TRUST_HEADERS = {
  'Accept': 'application/json',
  'Authorization': 'Bearer sovereign-zt-casablanca-01',
  'X-Zero-Trust-Token': 'sovereign-zt-casablanca-01',
  'X-Device-Trust-Score': '0.98'
};

async function syncFastApiBackend() {
  // A. Fetch Dashboard Stats from /api/v1/dashboard/stats
  try {
    const res = await fetch('/api/v1/dashboard/stats', {
      headers: ZERO_TRUST_HEADERS
    });
    if (res.ok) {
      const stats = await res.json();
      
      // Update Total Threats
      const elThreats = document.getElementById('val-threats');
      if (elThreats && stats.total_threats !== undefined) {
        elThreats.textContent = stats.total_threats;
      }
      const elTrendThreats = document.getElementById('trend-threats');
      if (elTrendThreats && stats.threats_change) {
        elTrendThreats.textContent = stats.threats_change;
      }

      // Update Assets Monitored
      const elAssets = document.getElementById('val-assets');
      if (elAssets && stats.assets_monitored !== undefined) {
        elAssets.textContent = Number(stats.assets_monitored).toLocaleString();
      }
      const elTrendAssets = document.getElementById('trend-assets');
      if (elTrendAssets && stats.assets_change) {
        elTrendAssets.textContent = stats.assets_change;
      }

      // Update Compliance Score
      const elCompliance = document.getElementById('val-compliance');
      if (elCompliance && stats.compliance_score !== undefined) {
        elCompliance.textContent = `${stats.compliance_score}%`;
      }
      const elTrendCompliance = document.getElementById('trend-compliance');
      if (elTrendCompliance && stats.compliance_change) {
        elTrendCompliance.textContent = stats.compliance_change;
      }

      // Update Compliance Ring Gauge Arc & Text
      const ringFill = document.getElementById('compliance-ring-fill');
      const ringPercent = document.getElementById('compliance-ring-percent');
      if (stats.compliance_score !== undefined) {
        if (ringPercent) ringPercent.textContent = `${stats.compliance_score}%`;
        if (ringFill) {
          const circumference = 339.29;
          const offset = circumference - (stats.compliance_score / 100) * circumference;
          ringFill.style.strokeDashoffset = `${offset}`;
        }
      }

      // Update Critical Alerts
      const elAlerts = document.getElementById('val-alerts');
      if (elAlerts && stats.critical_alerts !== undefined) {
        elAlerts.textContent = stats.critical_alerts;
      }
      const elTrendAlerts = document.getElementById('trend-alerts');
      if (elTrendAlerts && stats.alerts_change) {
        elTrendAlerts.textContent = stats.alerts_change;
      }

      // Update System Status Badge
      const elStatus = document.getElementById('system-status-val');
      if (elStatus && stats.system_status) {
        elStatus.textContent = stats.system_status.toUpperCase();
        if (stats.system_status.toUpperCase() === 'SECURE') {
          elStatus.className = 'status-val glow-green';
        } else {
          elStatus.className = 'status-val glow-red';
        }
      }
    }
  } catch (err) {
    // Graceful fallback for offline static demo previews
    console.debug('[CyberArch] FastAPI /api/v1/dashboard/stats offline, using simulated telemetry.');
  }

  // B. Fetch Real-Time Security Logs from /api/v1/logs
  try {
    const res = await fetch('/api/v1/logs?limit=10', {
      headers: ZERO_TRUST_HEADERS
    });
    if (res.ok) {
      const logs = await res.json();
      const terminal = document.getElementById('system-logs-terminal');

      if (terminal && Array.isArray(logs) && logs.length > 0) {
        logs.forEach((log) => {
          const rowKey = `log-${log.id || log.timestamp}-${log.severity}`;
          if (!document.getElementById(rowKey)) {
            const row = document.createElement('div');
            row.id = rowKey;
            row.className = 'log-line';

            const lvl = (log.severity || 'INFO').toUpperCase();
            let lvlClass = 't-info';
            if (lvl === 'WARN' || lvl === 'WARNING') lvlClass = 't-warn';
            if (lvl === 'ALERT' || lvl === 'CRITICAL' || lvl === 'ERROR') lvlClass = 't-alert';

            let mitigationTag = '';
            if (log.mitigation_status && log.mitigation_status !== 'NONE') {
              mitigationTag = ` <span style="color:#00ff66;font-weight:bold;font-size:10px;background:rgba(0,255,102,0.1);padding:1px 4px;border-radius:2px;border:1px solid rgba(0,255,102,0.3)">[SOAR:${log.mitigation_status}]</span>`;
            }

            row.innerHTML = `<span class="t-stamp">${log.timestamp}</span> <span class="${lvlClass}">[${lvl}]</span> ${log.event}${mitigationTag}`;
            terminal.appendChild(row);
          }
        });

        terminal.scrollTop = terminal.scrollHeight;

        // Keep terminal clean
        while (terminal.childElementCount > 35) {
          terminal.removeChild(terminal.firstElementChild);
        }
      }
    }
  } catch (err) {
    // If backend is unavailable, run local live demo log stream
    fallbackLogStream();
  }
}

// Fallback simulator for offline preview
function fallbackLogStream() {
  const terminal = document.getElementById('system-logs-terminal');
  if (!terminal) return;

  const demoEvents = [
    { lvl: 'INFO', msg: 'mTLS certificate handshake verified with sovereign cluster.' },
    { lvl: 'WARN', msg: 'Anomalous egress volume detected to unlisted CDN.' },
    { lvl: 'ALERT', msg: 'Cross-Site Scripting (XSS) payload quarantined by WAF.' },
    { lvl: 'INFO', msg: 'Automated compliance continuous audit pass verified (92%).' },
    { lvl: 'ALERT', msg: 'Brute-force credential stuffing locked down on account.' }
  ];

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const item = demoEvents[Math.floor(Math.random() * demoEvents.length)];

  const row = document.createElement('div');
  row.className = 'log-line';
  let lvlClass = 't-info';
  if (item.lvl === 'WARN') lvlClass = 't-warn';
  if (item.lvl === 'ALERT') lvlClass = 't-alert';

  row.innerHTML = `<span class="t-stamp">${timeStr}</span> <span class="${lvlClass}">[${item.lvl}]</span> ${item.msg}`;
  terminal.appendChild(row);
  terminal.scrollTop = terminal.scrollHeight;

  if (terminal.childElementCount > 30) {
    terminal.removeChild(terminal.firstElementChild);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initMatrixRain();
  initAttackMap();
  
  // Initial sync and recurring 5-second polling
  syncFastApiBackend();
  setInterval(syncFastApiBackend, 5000);
});
