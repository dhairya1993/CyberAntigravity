import { Article } from '@/types';

export const BLOG_ARTICLES: Article[] = [
  {
    id: 'passkeys-vs-passwords-2026',
    title: 'The Shift to Passkeys: How Cryptographic WebAuthn Solves Phishing at Scale',
    slug: 'passkeys-vs-passwords-guide',
    excerpt: 'Explore why asymmetric public-key cryptography built into modern hardware devices eliminates credential reuse and neutralizes adversary-in-the-middle reverse proxies.',
    category: 'Security Architecture',
    readTime: '6 min read',
    publishedAt: 'October 2026',
    author: {
      name: 'CyberAntigravity Research Team',
      role: 'Identity & Cryptography Lead',
    },
  },
  {
    id: 'anatomy-of-deepfake-ceo-scam',
    title: 'Deconstructing a $25M Deepfake Audio & Video Pretexting Campaign',
    slug: 'anatomy-of-deepfake-ceo-scam',
    excerpt: 'An investigative breakdown of how modern threat actors combine synthetic voice cloning with compromised calendar invites to trick corporate finance into authorizing fraudulent wires.',
    category: 'Investigation',
    readTime: '8 min read',
    publishedAt: 'September 2026',
    author: {
      name: 'CyberAntigravity Threat Intel',
      role: 'OSINT & Fraud Analyst',
    },
  },
  {
    id: 'browser-isolation-hardening',
    title: 'Practical Browser Hardening: DNS-over-HTTPS, Fingerprint Defense, and Extension Audits',
    slug: 'practical-browser-hardening',
    excerpt: 'A comprehensive, actionable guide to locking down Chrome, Firefox, and Chromium derivatives against covert canvas fingerprinting and malicious extension takeovers.',
    category: 'Safety Guide',
    readTime: '7 min read',
    publishedAt: 'September 2026',
    author: {
      name: 'CyberAntigravity Education',
      role: 'Digital Defense Instructor',
    },
  },
  {
    id: 'modern-phishing-evasion-tactics',
    title: 'How Modern Phishing Kits Evade Automated Scanners Using Captchas & Cloaking',
    slug: 'modern-phishing-evasion-tactics',
    excerpt: 'A technical analysis of modern evasion techniques: IP geolocation fencing, Cloudflare Turnstile gating, and client-side DOM obfuscation deployed by active threat kits.',
    category: 'Threat Analysis',
    readTime: '9 min read',
    publishedAt: 'August 2026',
    author: {
      name: 'CyberAntigravity Security Lab',
      role: 'Malware & Threat Researcher',
    },
  },
];
