'use client';

import React, { useState } from 'react';
import {
  Layers,
  Search,
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ScamTypeIllustrations } from './ScamTypeIllustrations';

export interface ScamTypeData {
  id: string;
  number: number;
  title: string;
  category: string;
  explanation: string;
  commonRedFlag: string;
  safeResponse: string;
  illustration: React.ReactNode;
}

const TWELVE_SCAM_TYPES: ScamTypeData[] = [
  {
    id: 'phishing',
    number: 1,
    title: 'Phishing',
    category: 'Credentials & Auth',
    explanation: 'Deceptive emails, text messages, or spoofed sites designed to capture login passwords and credit cards.',
    commonRedFlag: 'Lookalike domains, artificial countdown timers, and generic greetings paired with password demands.',
    safeResponse: 'Never click authentication links in messages. Go directly to official apps or bookmarked URLs.',
    illustration: <ScamTypeIllustrations.Phishing />,
  },
  {
    id: 'job-scam',
    number: 2,
    title: 'Job Scam',
    category: 'Employment Fraud',
    explanation: 'Fake remote positions offering inflated hourly wages requiring zero formal interview or credentials.',
    commonRedFlag: 'Interviews conducted exclusively over Telegram/WhatsApp, or sending checks to "buy office supplies".',
    safeResponse: 'Verify all openings on official corporate career portals. Never pay upfront fees for employment supplies.',
    illustration: <ScamTypeIllustrations.JobScam />,
  },
  {
    id: 'investment-scam',
    number: 3,
    title: 'Investment Scam',
    category: 'Financial Deception',
    explanation: 'Promises of 100% guaranteed returns through algorithmic trading, crypto staking, or fake brokers.',
    commonRedFlag: 'Guaranteed double-digit yields with "zero risk", and demands for withdrawal fee deposits.',
    safeResponse: 'All genuine investments carry risk. Never invest in unregulated protocols recommended by online contacts.',
    illustration: <ScamTypeIllustrations.InvestmentScam />,
  },
  {
    id: 'banking-scam',
    number: 4,
    title: 'Banking Scam',
    category: 'Financial Deception',
    explanation: 'Impersonators posing as bank fraud departments urging you to move funds to a "safe government account".',
    commonRedFlag: 'Callers demanding you read out temporary SMS passcodes or transfer balances to preserve account security.',
    safeResponse: 'Hang up immediately. Call the fraud number printed physically on the back of your bank debit card.',
    illustration: <ScamTypeIllustrations.BankingScam />,
  },
  {
    id: 'delivery-scam',
    number: 5,
    title: 'Delivery Scam',
    category: 'Smishing & Logistics',
    explanation: 'Urgent SMS notices claiming a package was halted due to missing address info or unpaid $1.50 custom fees.',
    commonRedFlag: 'Tracking links pointing to non-carrier domains with requests for credit card credentials.',
    safeResponse: 'Track shipments solely within official carrier apps using verified tracking tracking numbers.',
    illustration: <ScamTypeIllustrations.DeliveryScam />,
  },
  {
    id: 'tech-support-scam',
    number: 6,
    title: 'Tech Support Scam',
    category: 'Remote Access',
    explanation: 'Pop-ups or cold calls claiming your PC is infected, directing you to install remote support tools.',
    commonRedFlag: 'Demands to download AnyDesk/TeamViewer, or sudden screen lockouts with flashing alarm phone numbers.',
    safeResponse: 'Major OS providers never place cold calls or demand payment via gift cards to fix computer errors.',
    illustration: <ScamTypeIllustrations.TechSupportScam />,
  },
  {
    id: 'romance-scam',
    number: 7,
    title: 'Romance Scam',
    category: 'Emotional Exploitation',
    explanation: 'Building affectionate relationships over months to fabricate sudden emergency financial crises.',
    commonRedFlag: 'Refusing in-person meetings or video calls, followed by urgent requests for medical or travel loans.',
    safeResponse: 'Never send money, cryptocurrency, or gift cards to someone you have never met physically in person.',
    illustration: <ScamTypeIllustrations.RomanceScam />,
  },
  {
    id: 'fake-customer-support',
    number: 8,
    title: 'Fake Customer Support',
    category: 'Search Ad Spoofing',
    explanation: 'Sponsored search ads and fake telephone listings impersonating airlines, printers, or airlines.',
    commonRedFlag: 'Agents demanding payment via peer-to-peer cash apps to cancel flights or reset forgotten passwords.',
    safeResponse: 'Always retrieve customer service telephone numbers directly from verified account apps or invoice records.',
    illustration: <ScamTypeIllustrations.FakeCustomerSupport />,
  },
  {
    id: 'qr-code-scam',
    number: 9,
    title: 'QR Code Scam (Quishing)',
    category: 'Physical & Digital',
    explanation: 'Malicious QR stickers pasted over parking meters, restaurant menus, or phishing emails.',
    commonRedFlag: 'Physical stickers placed on top of official signs, or QR codes directing to unverified payment gateways.',
    safeResponse: 'Preview the destination URL in your camera app before tapping. Avoid paying at meters with overlaid stickers.',
    illustration: <ScamTypeIllustrations.QRCodeScam />,
  },
  {
    id: 'impersonation-scam',
    number: 10,
    title: 'Impersonation Scam',
    category: 'Authority Fraud',
    explanation: 'Posing as police officers, tax inspectors, or senior corporate executives to compel compliance.',
    commonRedFlag: 'Threatening immediate arrest or litigation if you do not settle supposed debts with cryptocurrency or wire.',
    safeResponse: 'Official authorities communicate through registered postal mail, never by threatening arrest over cold calls.',
    illustration: <ScamTypeIllustrations.ImpersonationScam />,
  },
  {
    id: 'lottery-prize-scam',
    number: 11,
    title: 'Lottery / Prize Scam',
    category: 'Advance Fee Fraud',
    explanation: 'Congratulations notices announcing you won millions in a foreign lottery or luxury consumer sweepstakes.',
    commonRedFlag: 'Demanding upfront "tax fees", "customs deposits", or handling charges to claim the supposed prize.',
    safeResponse: 'You cannot win a contest or lottery you never entered. Disregard and delete all unsolicited prize alerts.',
    illustration: <ScamTypeIllustrations.LotteryPrizeScam />,
  },
  {
    id: 'social-media-scam',
    number: 12,
    title: 'Social Media Scam',
    category: 'Account Cloning',
    explanation: 'Cloned profiles mirroring friend identities to request emergency money or share suspicious grant links.',
    commonRedFlag: 'Sudden duplicate friend requests followed by private messages urging you to apply for government grants.',
    safeResponse: 'Call your friend on their verified phone number to confirm before reacting to unexpected emergency DMs.',
    illustration: <ScamTypeIllustrations.SocialMediaScam />,
  },
];

export const ScamTypeExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['all', 'Credentials & Auth', 'Financial Deception', 'Employment Fraud', 'Remote Access', 'Physical & Digital'];

  const filteredScams = TWELVE_SCAM_TYPES.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commonRedFlag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="scam-types" className="py-16 sm:py-24 relative bg-slate-950 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Comprehensive Threat Taxonomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              12 Common Scam Types & Vectors
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Explore the 12 most frequent scam archetypes targeting individuals and organizations worldwide. Learn the primary indicator and the exact defensive response.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scam types..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Types (12)' : cat}
            </button>
          ))}
        </div>

        {/* 12 Visual Scam Type Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => {
            const isExpanded = expandedId === scam.id;
            return (
              <div
                key={scam.id}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                  isExpanded
                    ? 'bg-slate-900 border-cyan-500/80 shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="p-6">
                  {/* Top Bar with Number, Category & Custom Vector Graphic */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                        {scam.number < 10 ? `0${scam.number}` : scam.number}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {scam.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          {scam.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0 group-hover:border-cyan-500/40 transition-colors">
                      {scam.illustration}
                    </div>
                  </div>

                  {/* Short Explanation */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {scam.explanation}
                  </p>

                  {/* Common Red Flag Snippet */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Common Red Flag:
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                      {scam.commonRedFlag}
                    </p>
                  </div>

                  {/* Expandable Safe Response Drawer */}
                  {isExpanded && (
                    <div className="mt-3.5 p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/60 text-xs space-y-1 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Safe Defensive Action:
                      </span>
                      <p className="text-emerald-100/90 leading-relaxed text-[11px] sm:text-xs font-medium">
                        {scam.safeResponse}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Toggle Button */}
                <div className="px-6 pb-5 pt-0">
                  <button
                    type="button"
                    onClick={() => toggleExpand(scam.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-slate-950/60 hover:bg-slate-800 hover:text-white border border-slate-800/80 transition-colors cyber-focus-ring"
                  >
                    <span>{isExpanded ? 'Hide safe defense' : 'View safe response'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
