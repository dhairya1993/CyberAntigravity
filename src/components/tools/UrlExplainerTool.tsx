'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';

export const UrlExplainerTool: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://login.example.com/account?id=123#security');

  const parsedData = useMemo(() => {
    let raw = urlInput.trim();
    if (!raw) return null;

    // Auto-prefix protocol if missing for parsing
    if (!/^https?:\/\//i.test(raw)) {
      raw = 'https://' + raw;
    }

    try {
      const parsed = new URL(raw);
      const hostname = parsed.hostname;

      // Extract parts of domain
      const parts = hostname.split('.');
      let subdomain = '';
      let registrableDomain = hostname;
      let tld = '';

      if (parts.length > 2) {
        tld = parts[parts.length - 1];
        registrableDomain = parts.slice(-2).join('.');
        subdomain = parts.slice(0, -2).join('.');
      } else if (parts.length === 2) {
        tld = parts[1];
        registrableDomain = hostname;
      }

      // Query params breakdown
      const queryParams: { key: string; value: string }[] = [];
      parsed.searchParams.forEach((val, key) => {
        queryParams.push({ key, value: val });
      });

      return {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? '443 (default)' : '80 (default)'),
        pathname: parsed.pathname || '/',
        search: parsed.search || '(none)',
        hash: parsed.hash || '(none)',
        subdomain: subdomain || '(none)',
        registrableDomain,
        tld: tld || parts[parts.length - 1] || 'unknown',
        queryParams,
        isValid: true,
      };
    } catch {
      return {
        isValid: false,
      };
    }
  }, [urlInput]);

  const presetExamples = [
    'https://login.example.com/account?id=123#security',
    'https://update.bank-security.net/verify?token=xyz987',
    'http://internal-portal.corp.local:8080/dashboard',
  ];

  return (
    <div className="space-y-6">
      {/* Explicit Trust Notice */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Educational Structure Explainer:</strong> This tool explains URL structure. It does not determine whether a website is safe. It does not label websites as safe, unsafe, malicious, or trusted.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div>
          <label htmlFor="url-input" className="block text-sm font-semibold text-white mb-2">
            Enter a web address (URL) to dissect:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://login.example.com/account?id=123"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
            <span className="font-mono text-[11px]">Sample Examples:</span>
            {presetExamples.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setUrlInput(ex)}
                className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-[11px] truncate max-w-xs transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Structural Breakdown Card */}
        {parsedData && parsedData.isValid ? (
          <div className="space-y-6 pt-2 border-t border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                Deconstructed Components:
              </span>
              <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 break-all leading-loose">
                <span className="text-purple-400 font-bold bg-purple-950/40 px-1 py-0.5 rounded border border-purple-500/30">
                  {parsedData.protocol}{'//'}
                </span>
                {parsedData.subdomain !== '(none)' && (
                  <span className="text-amber-400 font-bold bg-amber-950/40 px-1 py-0.5 rounded border border-amber-500/30">
                    {parsedData.subdomain}.
                  </span>
                )}
                <span className="text-cyan-400 font-bold bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-500/30">
                  {parsedData.registrableDomain}
                </span>
                <span className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">
                  {parsedData.pathname}
                </span>
                {parsedData.search !== '(none)' && (
                  <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-500/30">
                    {parsedData.search}
                  </span>
                )}
                {parsedData.hash !== '(none)' && (
                  <span className="text-rose-400 font-bold bg-rose-950/40 px-1 py-0.5 rounded border border-rose-500/30">
                    {parsedData.hash}
                  </span>
                )}
              </div>
            </div>

            {/* Individual Component Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-purple-400">
                  Protocol / Scheme
                </span>
                <div className="font-mono font-bold text-white text-sm">
                  {parsedData.protocol}
                </div>
                <p className="text-[11px] text-slate-400">
                  How the browser communicates (HTTPS encrypts traffic, HTTP is plaintext).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400">
                  Registrable Domain
                </span>
                <div className="font-mono font-bold text-white text-sm">
                  {parsedData.registrableDomain}
                </div>
                <p className="text-[11px] text-slate-400">
                  The actual organization domain registered with a domain authority.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400">
                  Subdomain Prefix
                </span>
                <div className="font-mono font-bold text-white text-sm">
                  {parsedData.subdomain}
                </div>
                <p className="text-[11px] text-slate-400">
                  Sub-hierarchy managed by the domain owner (often manipulated in phishing).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Resource Path
                </span>
                <div className="font-mono font-bold text-white text-sm truncate">
                  {parsedData.pathname}
                </div>
                <p className="text-[11px] text-slate-400">
                  The specific file, page, or API route on the server.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400">
                  Query String
                </span>
                <div className="font-mono font-bold text-white text-sm truncate">
                  {parsedData.search}
                </div>
                <p className="text-[11px] text-slate-400">
                  Parameters passed to backend scripts (e.g. user IDs, session tokens).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Port
                </span>
                <div className="font-mono font-bold text-white text-sm">
                  {parsedData.port}
                </div>
                <p className="text-[11px] text-slate-400">
                  Network endpoint port (standard: 443 for HTTPS, 80 for HTTP).
                </p>
              </div>
            </div>

            {/* Deceptive Phishing Subdomain Warning Guidance */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-cyan-400" />
                <span>How Phishers Abuse URL Structures:</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                A common social engineering trick is crafting URLs like <code className="text-amber-300 font-mono">https://paypal.com.verify-account-now.com</code>.
                Unsuspecting victims read &ldquo;paypal.com&rdquo; and believe they are on PayPal, but the actual registrable domain is <code className="text-cyan-300 font-mono">verify-account-now.com</code>.
                Always read from the first single forward slash (<code className="font-mono">/</code>) to the left to find the real host!
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            Please enter a valid URL (e.g., <code className="text-cyan-300 font-mono">https://example.com/path</code>) to view the structural breakdown.
          </div>
        )}
      </div>
    </div>
  );
};
