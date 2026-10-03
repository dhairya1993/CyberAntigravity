import { NavItem } from '@/types';

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: 'Home', href: '#' },
  { title: 'Cyber Safety', href: '#cyber-safety' },
  { title: 'Scam Awareness', href: '#scam-awareness' },
  { title: 'Learn', href: '#learn' },
  { title: 'Tools', href: '#tools' },
  { title: 'Blog', href: '#blog' },
  { title: 'About', href: '#about' },
];

export const FOOTER_SECTIONS = {
  safety: [
    { title: 'Password Safety', href: '#cyber-safety' },
    { title: 'Phishing Awareness', href: '#cyber-safety' },
    { title: 'Social Engineering', href: '#cyber-safety' },
    { title: 'Account Security & MFA', href: '#cyber-safety' },
    { title: 'Privacy & Data Protection', href: '#cyber-safety' },
    { title: 'Device Hardening', href: '#cyber-safety' },
  ],
  scams: [
    { title: 'Online Shopping Fraud', href: '#scam-awareness' },
    { title: 'Fake Websites & Typosquatting', href: '#scam-awareness' },
    { title: 'Fake Job & Recruiter Scams', href: '#scam-awareness' },
    { title: 'Investment & Crypto Scams', href: '#scam-awareness' },
    { title: 'Payment & Wire Fraud', href: '#scam-awareness' },
  ],
  education: [
    { title: 'Cybersecurity Fundamentals', href: '#learn' },
    { title: 'Networking & Perimeter Security', href: '#learn' },
    { title: 'Ethical Hacking Foundations', href: '#learn' },
    { title: 'Web Application Security', href: '#learn' },
    { title: 'Digital Forensics', href: '#learn' },
    { title: 'AI Security & LLM Risks', href: '#learn' },
  ],
  tools: [
    { title: 'URL Safety Check', href: '#tools' },
    { title: 'Password Strength & Entropy', href: '#tools' },
    { title: 'Email Header Inspector', href: '#tools' },
    { title: 'Scam Message Analyzer', href: '#tools' },
    { title: 'Domain & IP Information', href: '#tools' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Security Disclaimer', href: '/disclaimer' },
    { title: 'Responsible Disclosure', href: '/disclosure' },
  ],
};
