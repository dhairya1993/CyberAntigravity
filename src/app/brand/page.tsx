import React from 'react';
import { Metadata } from 'next';
import { Download, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Brand Assets & Logo Guidelines | CyberAntigravity',
  description:
    'Official brand assets, logo packages, and visual identity guidelines for CyberAntigravity. Download primary logos, shield emblems, icons, and monochrome marks.',
};

export default function BrandPage() {
  const brandAssets = [
    {
      title: 'Horizontal (Primary)',
      description: 'The standard brand logo combining the Cyber Shield symbol, wordmark, and tagline.',
      src: '/brand/cyberantigravity-logo.png',
      svgSrc: '/brand/cyberantigravity-logo.svg',
      tag: 'Primary Identity',
      bg: 'bg-slate-950/90 border-slate-800',
      aspect: 'h-16',
    },
    {
      title: 'Compact Logo',
      description: 'Vertical stacked orientation designed for mobile menus, app cards, and square bounds.',
      src: '/brand/cyberantigravity-logo-compact.png',
      tag: 'Stacked Layout',
      bg: 'bg-slate-950/90 border-slate-800',
      aspect: 'h-24',
    },
    {
      title: 'Symbol Only (App Icon)',
      description: 'The glowing cyber shield emblem with orbital ring and zero-trust telemetry circuitry.',
      src: '/brand/cyberantigravity-symbol.png',
      svgSrc: '/brand/cyberantigravity-symbol.svg',
      tag: 'Brand Mark',
      bg: 'bg-slate-950/90 border-slate-800',
      aspect: 'h-20',
    },
    {
      title: 'White Version',
      description: 'Monochrome white version for dark background contrast and single-color applications.',
      src: '/brand/cyberantigravity-logo-white.png',
      tag: 'Monochrome Dark',
      bg: 'bg-slate-950/90 border-slate-800',
      aspect: 'h-20',
    },
    {
      title: 'Black Version',
      description: 'Monochrome dark version designed specifically for light surfaces, print, and paper media.',
      src: '/brand/cyberantigravity-logo-dark.png',
      tag: 'Monochrome Light',
      bg: 'bg-slate-100 border-slate-300 text-slate-900',
      aspect: 'h-20',
      lightCard: true,
    },
    {
      title: 'Favicon & App Icon (16–512px)',
      description: 'Squircle app icon tile optimized for browser tabs, mobile homescreens, and bookmarks.',
      src: '/icon.png',
      tag: 'Tile Icon',
      bg: 'bg-slate-950/90 border-slate-800',
      aspect: 'h-20',
    },
  ];

  const brandColors = [
    { name: 'Electric Cyan', hex: '#00F0FF', desc: 'Primary energy & shield highlight', bg: 'bg-[#00F0FF] text-black' },
    { name: 'Sky Tech Blue', hex: '#38BDF8', desc: 'Gradient accent & typography', bg: 'bg-[#38BDF8] text-black' },
    { name: 'Deep Space Navy', hex: '#07090E', desc: 'Core interface & platform background', bg: 'bg-[#07090e] border border-slate-700 text-white' },
    { name: 'Slate Night', hex: '#020617', desc: 'Navigation, cards, and modal sheets', bg: 'bg-[#020617] border border-slate-700 text-white' },
    { name: 'Zero-Trust Emerald', hex: '#10B981', desc: 'Verified status & security telemetry', bg: 'bg-[#10B981] text-black' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Official Brand Identity
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CyberAntigravity Brand Assets
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Download official logos, shield emblems, and visual assets for digital media, presentations, and partnership integration.
          </p>
        </div>

        {/* Master Panoramic Banner Showcase */}
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-4 sm:p-6 shadow-2xl shadow-cyan-950/40 relative overflow-hidden group">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center justify-between">
            <span>Official Master Banner</span>
            <a
              href="/brand/cyberantigravity-banner.png"
              download="cyberantigravity-banner.png"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Full Banner (PNG)
            </a>
          </div>
          <div className="rounded-xl overflow-hidden bg-black flex items-center justify-center p-2 sm:p-6 border border-slate-800">
            <img
              src="/brand/cyberantigravity-banner.png"
              alt="CyberAntigravity Master Brand Banner"
              className="w-full max-w-4xl h-auto object-contain drop-shadow-[0_0_24px_rgba(0,240,255,0.25)]"
            />
          </div>
        </div>

        {/* 6 Logo Variations Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Logo Variations & Marks
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              High-DPI Retina Ready • Transparent PNG & Vector SVG
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <div
                key={asset.title}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 hover:border-cyan-500/40 hover:shadow-lg ${
                  asset.bg
                } ${asset.lightCard ? 'shadow-md shadow-white/5' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                        asset.lightCard
                          ? 'bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                      }`}
                    >
                      {asset.tag}
                    </span>
                    <a
                      href={asset.src}
                      download
                      className={`text-xs font-semibold inline-flex items-center gap-1 hover:underline ${
                        asset.lightCard ? 'text-slate-800' : 'text-cyan-400'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>

                  {/* Asset Display */}
                  <div className="my-6 flex items-center justify-center min-h-[120px]">
                    <img
                      src={asset.src}
                      alt={asset.title}
                      className={`object-contain max-w-full ${asset.aspect} ${
                        asset.lightCard
                          ? ''
                          : 'drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <h3
                    className={`text-base font-bold mb-1 ${
                      asset.lightCard ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {asset.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      asset.lightCard ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Color Palette */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Brand Color Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandColors.map((col) => (
              <div
                key={col.hex}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3"
              >
                <div
                  className={`h-20 rounded-xl flex items-end p-2.5 font-mono text-xs font-bold ${col.bg}`}
                >
                  {col.hex}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{col.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{col.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Guidelines & Proper Use */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Logo Usage Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-3">
              <h4 className="font-semibold text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Do
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Use the primary horizontal logo on dark backgrounds (#07090E, #020617).</li>
                <li>• Ensure sufficient padding around the shield and orbital ring.</li>
                <li>• Maintain original aspect ratios without stretching or compressing.</li>
                <li>• Use the black monochrome version on light surfaces or document printing.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-rose-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-400" /> Don&apos;t
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Do not alter the cyan, sky blue, or zero-trust gradient hues.</li>
                <li>• Do not detach or reposition the orbital ring around the cyber shield.</li>
                <li>• Do not place the colored logo over busy, low-contrast photographic textures.</li>
                <li>• Do not retype or substitute the customized &quot;CyberÂntigravity&quot; wordmark.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
