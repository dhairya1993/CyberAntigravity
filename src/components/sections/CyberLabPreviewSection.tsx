import React from 'react';
import Link from 'next/link';
import {
  Terminal,
  Shield,
  Laptop,
  Server,
  Network,
  Cpu,
  ArrowRight,
  Lock,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';

export const CyberLabPreviewSection: React.FC = () => {
  return (
    <section id="cyber-lab" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/80 overflow-hidden scroll-mt-20 cyber-section-defer">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-cyan-950/25 via-blue-950/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="cyber-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>SAFE SIMULATION ENVIRONMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Practice Cybersecurity in a <span className="text-cyan-400">Safe Environment.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Learn through controlled simulations designed for authorized and defensive practice.
          </p>
        </div>

        {/* Fictional Cyber Lab Graphical Workspace */}
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl shadow-cyan-950/30 overflow-hidden">
          {/* Lab Top Control Bar with 3 Required Badges */}
          <div className="p-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-300 font-bold tracking-wider">
                sandbox://defensive-lab.antigravity.local
              </span>
            </div>

            {/* 3 Explicit Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                Educational Simulation
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                Authorized Practice
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                Safe Learning Environment
              </span>
            </div>
          </div>

          {/* Graphical Lab Body: Terminal on Left, Graphical Network Topology on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
            {/* LEFT: Terminal Console with harmless educational commands */}
            <div className="lg:col-span-7 p-5 sm:p-7 font-mono text-xs space-y-4 bg-slate-950/95">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2.5 text-[11px]">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  DEFENSIVE_TERMINAL // v2.4-SAFE
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  SANDBOX ISOLATED
                </span>
              </div>

              {/* Harmless Educational Commands & Simulated Terminal Outputs */}
              <div className="space-y-3.5 text-slate-300 leading-relaxed font-mono text-xs">
                {/* 1. whoami */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">student@cyber-lab:~$</span>
                    <span className="text-white font-semibold">whoami</span>
                  </div>
                  <div className="text-emerald-400 pl-4 text-[11px]">
                    defender-student (UID: 1001, Groups: defensive-practice, safe-sandbox)
                  </div>
                </div>

                {/* 2. pwd */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">student@cyber-lab:~$</span>
                    <span className="text-white font-semibold">pwd</span>
                  </div>
                  <div className="text-slate-400 pl-4 text-[11px]">
                    /home/defender-student/educational-sandbox
                  </div>
                </div>

                {/* 3. ls */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">student@cyber-lab:~$</span>
                    <span className="text-white font-semibold">ls -la</span>
                  </div>
                  <div className="pl-4 text-[11px] space-y-0.5 text-slate-300">
                    <div>drwxr-xr-x  3 defender-student  128  defense_rules.conf</div>
                    <div>-rw-r--r--  1 defender-student  256  simulated_network_map.json</div>
                    <div>-rw-r--r--  1 defender-student  512  safe_traffic_sample.pcap</div>
                  </div>
                </div>

                {/* 4. ping example.local */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">student@cyber-lab:~$</span>
                    <span className="text-white font-semibold">ping -c 2 example.local</span>
                  </div>
                  <div className="pl-4 text-[11px] space-y-0.5 text-slate-400">
                    <div>PING example.local (10.0.0.1): 56 data bytes</div>
                    <div className="text-emerald-400">64 bytes from 10.0.0.1: icmp_seq=0 ttl=64 time=0.48 ms [Simulated Local]</div>
                    <div className="text-emerald-400">64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=0.42 ms [Simulated Local]</div>
                    <div className="text-cyan-300 text-[10px]">--- example.local ping statistics: 2 packets transmitted, 2 received, 0% packet loss ---</div>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-1.5 text-cyan-400 text-xs">
                  <span className="text-cyan-400 font-bold">student@cyber-lab:~$</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
                </div>
              </div>
            </div>

            {/* RIGHT: Graphical Lab Topology: Laptop + Terminal + Network Nodes + Server + Shield + Target System */}
            <div className="lg:col-span-5 p-5 sm:p-7 bg-slate-900/50 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Network className="w-4 h-4 text-cyan-400" />
                    Interactive Lab Topology
                  </span>
                  <span className="text-emerald-400 font-bold">Isolated VNet</span>
                </div>

                {/* SVG Animated Topology Network Graphic */}
                <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 flex items-center justify-center">
                  <svg viewBox="0 0 340 180" className="w-full h-44 overflow-visible" fill="none">
                    {/* Animated Network Connection Lines */}
                    {/* Laptop to Shield */}
                    <path d="M 50 90 L 115 90" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                    {/* Shield to Core Network Switch */}
                    <path d="M 165 90 L 210 90" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                    {/* Core to Server (up) */}
                    <path d="M 210 90 L 280 40" stroke="#00f0ff" strokeWidth="1.8" strokeDasharray="4 3" className="animate-cyber-flow" />
                    {/* Core to Target System (down) */}
                    <path d="M 210 90 L 280 140" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4 3" className="animate-cyber-flow" />

                    {/* LIVE TRAVELING DATA PACKETS */}
                    {/* 1. Laptop -> Shield (Command packet) */}
                    <circle r="3" fill="#00f0ff">
                      <animateMotion dur="1.6s" repeatCount="indefinite" path="M 50 90 L 115 90" />
                    </circle>

                    {/* 2. Shield -> Router (Verified sanitized packet) */}
                    <circle r="3" fill="#10b981">
                      <animateMotion dur="1.3s" repeatCount="indefinite" path="M 160 90 L 210 90" />
                    </circle>

                    {/* 3. Router -> Server (Simulated Ping Request) */}
                    <circle r="2.8" fill="#38bdf8">
                      <animateMotion dur="1.8s" repeatCount="indefinite" path="M 210 90 L 280 40" />
                    </circle>
                    {/* 4. Server -> Router (ICMP Echo Reply returning) */}
                    <circle r="2.2" fill="#10b981">
                      <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M 280 40 L 210 90" />
                    </circle>

                    {/* 5. Router -> Target (Educational sandbox probe) */}
                    <circle r="2.8" fill="#c084fc">
                      <animateMotion dur="2.1s" repeatCount="indefinite" path="M 210 90 L 280 140" />
                    </circle>

                    {/* NODE 1: Defender Laptop */}
                    <g transform="translate(15, 65)">
                      <rect x="0" y="0" width="48" height="42" rx="6" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx="24" cy="18" r="8" fill="#0284c7" fillOpacity="0.2" />
                      <line x1="6" y1="26" x2="42" y2="26" stroke="#00f0ff" strokeWidth="1" opacity="0.6">
                        <animate attributeName="x1" values="6;38;6" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="x2" values="14;42;14" dur="2s" repeatCount="indefinite" />
                      </line>
                      <text x="24" y="21" fill="#38bdf8" fontSize="10" textAnchor="middle">💻</text>
                      <text x="24" y="34" fill="#94a3b8" fontSize="5.5" textAnchor="middle" fontFamily="monospace">LAPTOP</text>
                    </g>

                    {/* NODE 2: Defensive Shield */}
                    <g transform="translate(115, 60)">
                      <path
                        d="M 24 5 L 42 12 V 28 C 42 40 24 50 24 50 C 24 50 6 40 6 28 V 12 Z"
                        fill="rgba(16, 185, 129, 0.25)"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <circle cx="24" cy="26" r="18" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '6s' }} />
                      <path d="M 18 26 L 22 30 L 30 20" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="24" y="60" fill="#34d399" fontSize="6" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SHIELD</text>
                    </g>

                    {/* NODE 3: Network Core Switch / Router */}
                    <g transform="translate(195, 75)">
                      <circle cx="15" cy="15" r="14" fill="#090d16" stroke="#00f0ff" strokeWidth="1.5" />
                      <circle cx="15" cy="15" r="19" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '5s' }} />
                      <circle cx="15" cy="15" r="4" fill="#00f0ff" className="animate-pulse" />
                      <text x="15" y="38" fill="#67e8f9" fontSize="5.5" textAnchor="middle" fontFamily="monospace">ROUTER</text>
                    </g>

                    {/* NODE 4: Simulated Server */}
                    <g transform="translate(265, 15)">
                      <rect x="0" y="0" width="56" height="38" rx="5" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="8" y1="12" x2="30" y2="12" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="46" cy="12" r="2.5" fill="#34d399" className="animate-ping" />
                      <line x1="8" y1="24" x2="30" y2="24" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="46" cy="24" r="2.5" fill="#38bdf8" />
                      <text x="28" y="46" fill="#93c5fd" fontSize="5.5" textAnchor="middle" fontFamily="monospace">SERVER</text>
                    </g>

                    {/* NODE 5: Target System (Safe Sandbox) */}
                    <g transform="translate(265, 115)">
                      <rect x="0" y="0" width="56" height="38" rx="5" fill="#090d16" stroke="#c084fc" strokeWidth="1.5" />
                      <circle cx="28" cy="16" r="8" fill="#581c87" fillOpacity="0.4" />
                      <circle cx="28" cy="16" r="14" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '7s' }} />
                      <text x="28" y="19" fill="#c084fc" fontSize="9" textAnchor="middle">🎯</text>
                      <text x="28" y="30" fill="#e9d5ff" fontSize="5" textAnchor="middle" fontFamily="monospace">TARGET</text>
                      <text x="28" y="46" fill="#d8b4fe" fontSize="5.5" textAnchor="middle" fontFamily="monospace">SYSTEM</text>
                    </g>
                  </svg>
                </div>

                {/* Node Status Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-300">Workstation</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-300">Gateway Shield</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-slate-300">Sim Server</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-slate-300">Target System</span>
                  </div>
                </div>
              </div>

              {/* Lab Safe Notice & CTA */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <p className="text-[11px] text-slate-400 leading-relaxed flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Client-side educational sandbox. No real scanning or exploitation.</span>
                </p>

                {/* Required CTA: "Explore Cyber Lab" */}
                <Link
                  href="/learn"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] cyber-focus-ring"
                >
                  <span>Explore Cyber Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
