'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface LevelConceptVisualizerProps {
  level: number;
}

export const LevelConceptVisualizer: React.FC<LevelConceptVisualizerProps> = ({ level }) => {
  // Level 1: CIA Triad Active Pillar
  const [activePillar, setActivePillar] = useState<'confidentiality' | 'integrity' | 'availability'>('confidentiality');

  // Level 2: Packet Firewall Simulator
  const [packetType, setPacketType] = useState<'safe' | 'malicious'>('safe');

  // Level 3: HTTP vs HTTPS
  const [protocolMode, setProtocolMode] = useState<'http' | 'https'>('https');

  // Level 4: TOTP timer simulation
  const [totpCode, setTotpCode] = useState('849 201');
  const [totpSeconds, setTotpSeconds] = useState(24);

  // Level 5: Privacy Shield
  const [privacyShieldActive, setPrivacyShieldActive] = useState(true);

  // Level 6: Phishing URL Inspector
  const [inspectedUrlType, setInspectedUrlType] = useState<'legit' | 'phish'>('phish');

  // Simulated TOTP clock countdown
  useEffect(() => {
    if (level !== 4) return;
    const interval = setInterval(() => {
      setTotpSeconds((prev) => {
        if (prev <= 1) {
          // generate random 6 digit code
          const newCode = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
          setTotpCode(newCode);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [level]);

  return (
    <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 sm:p-5 relative overflow-hidden text-left space-y-4">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Header with Visualizer Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-400">
            Interactive Concept Simulator • Level 0{level}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
          Touch &amp; Learn Demonstration
        </span>
      </div>

      {/* =========================================================================
          LEVEL 1: CYBERSECURITY FUNDAMENTALS (CIA TRIAD)
          ========================================================================= */}
      {level === 1 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setActivePillar('confidentiality')}
              className={`px-3 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                activePillar === 'confidentiality'
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-950'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              1. Confidentiality (Privacy)
            </button>
            <button
              type="button"
              onClick={() => setActivePillar('integrity')}
              className={`px-3 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                activePillar === 'integrity'
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-950'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              2. Integrity (Accuracy)
            </button>
            <button
              type="button"
              onClick={() => setActivePillar('availability')}
              className={`px-3 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                activePillar === 'availability'
                  ? 'bg-purple-950 border-purple-400 text-purple-300 font-bold shadow-md shadow-purple-950'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              3. Availability (Uptime)
            </button>
          </div>

          {/* SVG Animated CIA Triad Diagram */}
          <div className="h-52 w-full rounded-xl bg-slate-900/60 border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 180" className="w-full h-full select-none" aria-hidden="true">
              {/* Connecting circuit lines */}
              <polygon
                points="200,28 320,145 80,145"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                className="animate-cyber-flow"
                opacity="0.6"
              />

              {/* Orbiting data packets */}
              <circle r="4" fill="#00f0ff">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 200 28 L 320 145 L 80 145 Z"
                />
              </circle>
              <circle r="3" fill="#10b981">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 80 145 L 320 145 L 200 28 Z"
                />
              </circle>

              {/* Center Defense Core */}
              <circle cx="200" cy="110" r="26" fill="#020617" stroke="#00f0ff" strokeWidth="1.2" opacity="0.9" />
              <circle cx="200" cy="110" r="30" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" className="animate-spin origin-center" style={{ animationDuration: '14s' }} />
              <text x="200" y="108" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SECURITY</text>
              <text x="200" y="118" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">BALANCE</text>

              {/* Top Node: Confidentiality */}
              <g transform="translate(200, 28)">
                <circle
                  r="22"
                  fill={activePillar === 'confidentiality' ? '#082f49' : '#020617'}
                  stroke={activePillar === 'confidentiality' ? '#00f0ff' : '#1e293b'}
                  strokeWidth={activePillar === 'confidentiality' ? '2' : '1'}
                  className={activePillar === 'confidentiality' ? 'animate-pulse' : ''}
                />
                <text x="0" y="-3" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">C</text>
                <text x="0" y="7" fill="#cbd5e1" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Confidential</text>
              </g>

              {/* Bottom Right: Integrity */}
              <g transform="translate(320, 145)">
                <circle
                  r="22"
                  fill={activePillar === 'integrity' ? '#064e3b' : '#020617'}
                  stroke={activePillar === 'integrity' ? '#10b981' : '#1e293b'}
                  strokeWidth={activePillar === 'integrity' ? '2' : '1'}
                  className={activePillar === 'integrity' ? 'animate-pulse' : ''}
                />
                <text x="0" y="-3" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">I</text>
                <text x="0" y="7" fill="#cbd5e1" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Integrity</text>
              </g>

              {/* Bottom Left: Availability */}
              <g transform="translate(80, 145)">
                <circle
                  r="22"
                  fill={activePillar === 'availability' ? '#3b0764' : '#020617'}
                  stroke={activePillar === 'availability' ? '#c084fc' : '#1e293b'}
                  strokeWidth={activePillar === 'availability' ? '2' : '1'}
                  className={activePillar === 'availability' ? 'animate-pulse' : ''}
                />
                <text x="0" y="-3" fill="#c084fc" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">A</text>
                <text x="0" y="7" fill="#cbd5e1" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Availability</text>
              </g>
            </svg>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            {activePillar === 'confidentiality' && (
              <p>
                <strong className="text-cyan-400">Confidentiality:</strong> Only authorized eyes can view private data. Protected using end-to-end encryption, strict passwords, and access tokens.
              </p>
            )}
            {activePillar === 'integrity' && (
              <p>
                <strong className="text-emerald-400">Integrity:</strong> Ensuring data cannot be secretly altered or corrupted in transit. Protected via cryptographic hash checksums and digital signatures.
              </p>
            )}
            {activePillar === 'availability' && (
              <p>
                <strong className="text-purple-400">Availability:</strong> Systems remain online and accessible when people need them. Protected against DDoS attacks using redundancy and load balancing.
              </p>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 2: NETWORKING BASICS (PACKET & FIREWALL SIMULATOR)
          ========================================================================= */}
      {level === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400">Simulate Network Packet:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPacketType('safe')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  packetType === 'safe'
                    ? 'bg-emerald-950 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ✓ Safe HTTPS (Port 443)
              </button>
              <button
                type="button"
                onClick={() => setPacketType('malicious')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  packetType === 'malicious'
                    ? 'bg-rose-950 border border-rose-400 text-rose-300 shadow-md shadow-rose-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ⚠ Malware Ingress (Port 1337)
              </button>
            </div>
          </div>

          <div className="h-44 w-full rounded-xl bg-slate-900/60 border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 500 130" className="w-full h-full select-none" aria-hidden="true">
              {/* Origin Client Node */}
              <g transform="translate(40, 45)">
                <rect width="60" height="40" rx="6" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
                <text x="30" y="20" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">CLIENT</text>
                <text x="30" y="32" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">192.168.1.5</text>
              </g>

              {/* Wire 1: Client to Firewall */}
              <line x1="100" y1="65" x2="220" y2="65" stroke={packetType === 'safe' ? '#10b981' : '#f43f5e'} strokeWidth="2" strokeDasharray="5 3" className="animate-cyber-flow" />

              {/* Traveling Packet on Wire 1 */}
              <circle r="4.5" fill={packetType === 'safe' ? '#10b981' : '#f43f5e'}>
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 100 65 L 220 65" />
              </circle>

              {/* Center Firewall Node */}
              <g transform="translate(220, 25)">
                <rect
                  width="70"
                  height="80"
                  rx="8"
                  fill="#020617"
                  stroke={packetType === 'safe' ? '#10b981' : '#f43f5e'}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <circle cx="35" cy="20" r="12" fill={packetType === 'safe' ? '#064e3b' : '#881337'} />
                <text x="35" y="24" fill={packetType === 'safe' ? '#34d399' : '#fda4af'} fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {packetType === 'safe' ? 'ALLOW' : 'DROP'}
                </text>
                <text x="35" y="46" fill="#e2e8f0" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">FIREWALL</text>
                <text x="35" y="58" fill="#94a3b8" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Packet Filter</text>
                <text x="35" y="70" fill={packetType === 'safe' ? '#10b981' : '#f43f5e'} fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {packetType === 'safe' ? 'Port 443' : 'Port 1337'}
                </text>
              </g>

              {/* Wire 2: Firewall to Destination Server */}
              {packetType === 'safe' ? (
                <>
                  <line x1="290" y1="65" x2="410" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" className="animate-cyber-flow" />
                  <circle r="4" fill="#34d399">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 290 65 L 410 65" />
                  </circle>
                </>
              ) : (
                <>
                  {/* Deflected Path */}
                  <path d="M 290 65 Q 320 65 330 110" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  <text x="350" y="115" fill="#f43f5e" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                    BLOCKED ✖
                  </text>
                </>
              )}

              {/* Destination Server Node */}
              <g transform="translate(410, 45)">
                <rect width="60" height="40" rx="6" fill="#020617" stroke={packetType === 'safe' ? '#10b981' : '#475569'} strokeWidth="1" />
                <text x="30" y="20" fill={packetType === 'safe' ? '#10b981' : '#64748b'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SERVER</text>
                <text x="30" y="32" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Web Host</text>
              </g>
            </svg>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            {packetType === 'safe' ? (
              <p>
                <strong className="text-emerald-400">Packet Inspected &amp; Allowed:</strong> Destination port 443 matches verified encrypted HTTPS traffic. The firewall routes it safely to the destination web server.
              </p>
            ) : (
              <p>
                <strong className="text-rose-400">Malicious Port 1337 Blocked:</strong> An unauthorized connection attempt was intercepted by firewall rulesets and dropped before touching any internal assets.
              </p>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 3: WEB & BROWSER SECURITY (HTTP VS HTTPS)
          ========================================================================= */}
      {level === 3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400">Interactive Encryption Mode:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setProtocolMode('http')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  protocolMode === 'http'
                    ? 'bg-rose-950 border border-rose-400 text-rose-300 shadow-md shadow-rose-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🔓 Plain HTTP (Unsafe)
              </button>
              <button
                type="button"
                onClick={() => setProtocolMode('https')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  protocolMode === 'https'
                    ? 'bg-emerald-950 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🔒 HTTPS + TLS (Encrypted)
              </button>
            </div>
          </div>

          <div className="h-44 w-full rounded-xl bg-slate-900/60 border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 500 130" className="w-full h-full select-none" aria-hidden="true">
              {/* Browser Node */}
              <g transform="translate(40, 45)">
                <rect width="70" height="42" rx="6" fill="#020617" stroke="#00f0ff" strokeWidth="1" />
                <text x="35" y="20" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BROWSER</text>
                <text x="35" y="32" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Client App</text>
              </g>

              {/* Tunnel Path */}
              {protocolMode === 'https' ? (
                <>
                  {/* Encrypted Tunnel Cylinder */}
                  <rect x="110" y="48" width="280" height="34" rx="17" fill="#064e3b" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                  <line x1="110" y1="65" x2="390" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="6 3" className="animate-cyber-flow" />
                  <circle r="4" fill="#34d399">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 110 65 L 390 65" />
                  </circle>
                  <text x="250" y="61" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    🔒 TLS TUNNEL: 0x8F4B...9A2
                  </text>
                </>
              ) : (
                <>
                  {/* Unencrypted Clear Line */}
                  <line x1="110" y1="65" x2="390" y2="65" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" className="animate-cyber-flow" />
                  <circle r="4" fill="#f43f5e">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 110 65 L 390 65" />
                  </circle>
                  <text x="250" y="58" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    🔓 PLAIN TEXT: user=admin&amp;pass=secret
                  </text>
                </>
              )}

              {/* Eavesdropper Attacker in Middle */}
              <g transform="translate(250, 105)">
                <circle cx="0" cy="0" r="14" fill={protocolMode === 'http' ? '#881337' : '#020617'} stroke={protocolMode === 'http' ? '#f43f5e' : '#475569'} strokeWidth="1" />
                <text x="0" y="3" fill={protocolMode === 'http' ? '#f43f5e' : '#64748b'} fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {protocolMode === 'http' ? 'SNIFF!' : 'BLIND'}
                </text>
                <text x="0" y="20" fill={protocolMode === 'http' ? '#fca5a5' : '#64748b'} fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">
                  {protocolMode === 'http' ? 'Password Stolen!' : 'Cannot Read Payload'}
                </text>
              </g>

              {/* Web Server */}
              <g transform="translate(390, 45)">
                <rect width="70" height="42" rx="6" fill="#020617" stroke="#00f0ff" strokeWidth="1" />
                <text x="35" y="20" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BANK SERVER</text>
                <text x="35" y="32" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">example.com</text>
              </g>
            </svg>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            {protocolMode === 'https' ? (
              <p>
                <strong className="text-emerald-400">HTTPS Encryption Active:</strong> All login forms, session cookies, and credit cards travel inside an encrypted cryptographic tunnel. Any Wi-Fi eavesdropper only sees scrambled noise.
              </p>
            ) : (
              <p>
                <strong className="text-rose-400">Insecure HTTP:</strong> Any attacker connected to the same Wi-Fi router or ISP network can view your password and personal messages in clear text!
              </p>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 4: AUTHENTICATION & ACCESS (MFA + ROLLING TOTP)
          ========================================================================= */}
      {level === 4 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Password Hashing Stage */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                1. Password One-Way Hash (SHA-256)
              </span>
              <div className="font-mono text-xs text-slate-300 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Plain Input:</span>
                  <span className="text-emerald-400 font-bold">&quot;Sunflower987!&quot;</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate bg-slate-950 p-1.5 rounded border border-slate-800">
                  <span className="text-cyan-400">Hash: </span>
                  a7b4f9c2...09e2
                </div>
              </div>
            </div>

            {/* Rolling TOTP App Stage */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  2. Live Authenticator Code
                </span>
                <span className="text-2xl font-mono font-extrabold text-white tracking-widest block pt-1">
                  {totpCode}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Refreshes in {totpSeconds}s
                </span>
              </div>

              {/* Animated Countdown Gauge Ring */}
              <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="#00f0ff"
                    strokeWidth="3"
                    strokeDasharray={2 * Math.PI * 16}
                    strokeDashoffset={2 * Math.PI * 16 * (1 - totpSeconds / 30)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <span className="absolute text-[10px] font-mono font-bold text-cyan-400">
                  {totpSeconds}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Why MFA Works:</strong> Even if a criminal discovers your password in a database breach, they cannot bypass your login without the physical 30-second rotating code from your mobile device.
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 5: PRIVACY & DATA PROTECTION (ANTI-TRACKING SHIELD)
          ========================================================================= */}
      {level === 5 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400">Privacy Defense Mode:</span>
            <button
              type="button"
              onClick={() => setPrivacyShieldActive((prev) => !prev)}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                privacyShieldActive
                  ? 'bg-emerald-950 border border-emerald-400 text-emerald-300'
                  : 'bg-rose-950 border border-rose-400 text-rose-300'
              }`}
            >
              {privacyShieldActive ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shield ON (Trackers Deflected)</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Shield OFF (Exposed to Profiling)</span>
                </>
              )}
            </button>
          </div>

          <div className="h-44 w-full rounded-xl bg-slate-900/60 border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 500 130" className="w-full h-full select-none" aria-hidden="true">
              {/* Tracker Beacons on Left */}
              <g transform="translate(50, 25)">
                <circle cx="0" cy="0" r="12" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
                <text x="0" y="3" fill="#fda4af" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">COOKIE</text>
              </g>
              <g transform="translate(50, 65)">
                <circle cx="0" cy="0" r="12" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
                <text x="0" y="3" fill="#fda4af" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">CANVAS</text>
              </g>
              <g transform="translate(50, 105)">
                <circle cx="0" cy="0" r="12" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
                <text x="0" y="3" fill="#fda4af" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">BEACON</text>
              </g>

              {/* Streams to Center */}
              <line x1="65" y1="25" x2="240" y2="55" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="4 3" className="animate-cyber-flow" opacity="0.7" />
              <line x1="65" y1="65" x2="240" y2="65" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="4 3" className="animate-cyber-flow" opacity="0.7" />
              <line x1="65" y1="105" x2="240" y2="75" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="4 3" className="animate-cyber-flow" opacity="0.7" />

              {/* Center Privacy Forcefield */}
              {privacyShieldActive ? (
                <>
                  <ellipse cx="250" cy="65" rx="14" ry="48" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" className="animate-pulse" />
                  <text x="250" y="69" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    DEFLECT
                  </text>
                </>
              ) : (
                <text x="250" y="69" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  EXPOSED ⚠
                </text>
              )}

              {/* User Device on Right */}
              <g transform="translate(390, 45)">
                <rect width="70" height="42" rx="6" fill="#020617" stroke={privacyShieldActive ? '#10b981' : '#f43f5e'} strokeWidth="1.2" />
                <text x="35" y="20" fill={privacyShieldActive ? '#10b981' : '#f43f5e'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">YOUR DEVICE</text>
                <text x="35" y="32" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">
                  {privacyShieldActive ? 'Zero Telemetry' : 'Footprint Leaked'}
                </text>
              </g>
            </svg>
          </div>

          <p className="text-xs text-slate-300">
            {privacyShieldActive
              ? 'Privacy Shield Active: Third-party profiling cookies and fingerprinting scripts are blocked before reaching your device.'
              : 'Warning: Without privacy hygiene, cross-site trackers record your location, device specs, and browsing habits.'}
          </p>
        </div>
      )}

      {/* =========================================================================
          LEVEL 6: THREAT AWARENESS & PHISHING (URL INSPECTOR)
          ========================================================================= */}
      {level === 6 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400">Examine Link Example:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInspectedUrlType('legit')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  inspectedUrlType === 'legit'
                    ? 'bg-emerald-950 border border-emerald-400 text-emerald-300'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ✓ Genuine Portal
              </button>
              <button
                type="button"
                onClick={() => setInspectedUrlType('phish')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  inspectedUrlType === 'phish'
                    ? 'bg-rose-950 border border-rose-400 text-rose-300'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ⚠ Phishing Typosquat
              </button>
            </div>
          </div>

          {/* Interactive URL Breakdown */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
            {inspectedUrlType === 'legit' ? (
              <div className="text-emerald-400 flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400">https://</span>
                <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 font-bold text-white">
                  mybank.com
                </span>
                <span className="text-slate-400">/login</span>
              </div>
            ) : (
              <div className="text-rose-400 flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400">http://</span>
                <span className="bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/50 font-bold text-white animate-pulse">
                  my-baank-secure-login.xyz
                </span>
                <span className="text-slate-400">/verify?id=992</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 text-xs">
              {inspectedUrlType === 'legit' ? (
                <div className="text-emerald-300 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Apex Domain: &quot;mybank.com&quot;
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Registered organizational domain with official TLS certificate. Safe to proceed.
                  </p>
                </div>
              ) : (
                <div className="text-rose-300 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Red Flags Detected: Typosquatting + Novel TLD (.xyz)
                  </span>
                  <p className="text-[11px] text-slate-300">
                    The attacker inserted fake hyphens and extra letters (&quot;baank&quot;). Entering your password here sends it straight to the attacker!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 7: SECURITY OPERATIONS & INCIDENT RESPONSE (SIEM LOG STREAM)
          ========================================================================= */}
      {level === 7 && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1.5 overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800">
              <span>LIVE SIEM TELEMETRY STREAM</span>
              <span className="text-cyan-400 animate-pulse">● LOGGING ACTIVE</span>
            </div>
            <div className="text-slate-400">
              <span className="text-slate-400">[19:42:01]</span> <span className="text-cyan-400">INFO</span> auth.service: 200 OK user=dhairya
            </div>
            <div className="text-slate-400">
              <span className="text-slate-400">[19:42:05]</span> <span className="text-cyan-400">INFO</span> api.gateway: TLS handshake completed
            </div>
            <div className="text-rose-400 bg-rose-950/40 p-1.5 rounded border border-rose-900/60 font-bold">
              <span className="text-rose-500">[19:42:08]</span> <span className="text-rose-400">ALERT</span> Brute-force burst detected from IP 198.51.100.4 (45 failed attempts / 3s)
            </div>
            <div className="text-emerald-400 bg-emerald-950/40 p-1.5 rounded border border-emerald-900/60 font-bold">
              <span className="text-emerald-500">[19:42:09]</span> <span className="text-emerald-400">ACTION</span> Automated containment triggered: IP 198.51.100.4 quarantined for 24h
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong>Security Operations Center (SOC) Principle:</strong> Incident response systems ingest thousands of logs per second, immediately flagging behavioral anomalies and isolating attacker IPs automatically.
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 8: ETHICAL SECURITY & BUG BOUNTY
          ========================================================================= */}
      {level === 8 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-5 h-5 mx-auto rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">1</span>
              <span className="font-bold text-white block">Discover</span>
              <span className="text-[10px] text-slate-400 block">Find flaw with permission</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-5 h-5 mx-auto rounded-full bg-purple-950 text-purple-400 flex items-center justify-center font-bold">2</span>
              <span className="font-bold text-white block">Report</span>
              <span className="text-[10px] text-slate-400 block">Responsible disclosure</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-5 h-5 mx-auto rounded-full bg-amber-950 text-amber-400 flex items-center justify-center font-bold">3</span>
              <span className="font-bold text-white block">Patch</span>
              <span className="text-[10px] text-slate-400 block">Engineers deploy fix</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/50 space-y-1">
              <span className="w-5 h-5 mx-auto rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">✓</span>
              <span className="font-bold text-emerald-300 block">Fortified</span>
              <span className="text-[10px] text-slate-300 block">All users safe</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong>The Ethical Code:</strong> Ethical hackers only test systems with explicit authorization, adhering to strict rules of engagement, and report bugs to protect the public.
          </div>
        </div>
      )}

      {/* =========================================================================
          LEVEL 9: ADVANCED DEFENSE & ZERO TRUST AI
          ========================================================================= */}
      {level === 9 && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold uppercase">
                Zero Trust Verification: &quot;Never Trust, Always Verify&quot;
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                CONTINUOUS CHECK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">1. Identity Check</span>
                <span className="text-emerald-400 font-bold">FIDO2 Passkey Verified ✓</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">2. Device Health</span>
                <span className="text-emerald-400 font-bold">OS Patched &amp; Clean ✓</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">3. Context &amp; Location</span>
                <span className="text-emerald-400 font-bold">Expected Timezone ✓</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Policy Evaluation Result:</span>
              <span className="font-bold text-emerald-400 font-mono">
                [ ACCESS GRANTED: LEAST PRIVILEGE ]
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong>Zero Trust Mindset:</strong> Never assume trust based on network location. Every single request must continuously prove identity, device integrity, and least privilege before gaining access.
          </div>
        </div>
      )}
    </div>
  );
};
