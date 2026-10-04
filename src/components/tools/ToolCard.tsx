'use client';

import React from 'react';
import Link from 'next/link';
import { ToolItem } from '@/types';
import {
  Key,
  RefreshCw,
  Globe,
  Copy,
  FileCode2,
  CheckSquare,
  ShieldAlert,
  MessageSquareCheck,
  FileSearch,
  Server,
  Globe2,
  AlertOctagon,
  Terminal,
  Database,
  Activity,
  Sparkles,
  Cpu,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Key: <Key className="w-5 h-5 text-cyan-400" />,
    RefreshCw: <RefreshCw className="w-5 h-5 text-cyan-400" />,
    Globe: <Globe className="w-5 h-5 text-cyan-400" />,
    Copy: <Copy className="w-5 h-5 text-cyan-400" />,
    FileCode2: <FileCode2 className="w-5 h-5 text-cyan-400" />,
    CheckSquare: <CheckSquare className="w-5 h-5 text-cyan-400" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-400" />,
    MessageSquareCheck: <MessageSquareCheck className="w-5 h-5 text-purple-400" />,
    FileSearch: <FileSearch className="w-5 h-5 text-blue-400" />,
    Server: <Server className="w-5 h-5 text-emerald-400" />,
    Globe2: <Globe2 className="w-5 h-5 text-cyan-400" />,
    AlertOctagon: <AlertOctagon className="w-5 h-5 text-rose-400" />,
    Terminal: <Terminal className="w-5 h-5 text-purple-400" />,
    Database: <Database className="w-5 h-5 text-amber-400" />,
    Activity: <Activity className="w-5 h-5 text-blue-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
    Cpu: <Cpu className="w-5 h-5 text-slate-400" />,
  };

  const isAvailable = tool.status === 'AVAILABLE';

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md relative overflow-hidden group ${
        isAvailable
          ? 'bg-slate-900/90 border-cyan-500/30 hover:border-cyan-500/80 shadow-md shadow-cyan-500/5 hover:shadow-cyan-500/15'
          : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div>
        {/* Visual Tool Instrument Banner */}
        <div className="w-full h-16 mb-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between px-3.5 relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
          <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
              {iconMap[tool.iconName] || <Key className="w-4 h-4 text-cyan-400" />}
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                {tool.category}
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                {tool.difficulty}
              </span>
            </div>
          </div>
          {tool.isClientSideOnly && (
            <span className="text-[9px] font-mono text-emerald-400 uppercase px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 font-bold">
              CLIENT-SIDE
            </span>
          )}
        </div>

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium uppercase bg-slate-800 text-slate-300 border border-slate-700">
            {tool.category}
          </span>

          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase border ${
                tool.status === 'AVAILABLE'
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : tool.status === 'BETA'
                  ? 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                  : 'border-slate-700 bg-slate-800/80 text-slate-400'
              }`}
            >
              {tool.status}
            </span>
          </div>
        </div>

        {/* Icon & Name */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0 group-hover:border-cyan-500/30 transition-colors">
            {iconMap[tool.iconName] || <Key className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {tool.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
              <span>{tool.difficulty}</span>
              <span>•</span>
              <span>{tool.isClientSideOnly ? '100% Client-Side' : 'Cloud Intelligence'}</span>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {tool.shortDescription}
        </p>
      </div>

      {/* CTA Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">
          {tool.isClientSideOnly ? 'Private Browser Utility' : 'Future Microservice'}
        </span>

        {isAvailable ? (
          <Link
            href={tool.href}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm shadow-cyan-500/20 group-hover:shadow-cyan-500/40"
          >
            <span>Launch Tool</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-400 text-xs font-mono">
            <Lock className="w-3 h-3 text-slate-500" />
            <span>Coming Soon</span>
          </span>
        )}
      </div>
    </div>
  );
};
