import { NavItem } from '@/types';

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Cyber Safety', href: '/cyber-safety' },
  { title: 'Scam Awareness', href: '/scam-awareness' },
  { title: 'Cyber IQ', href: '/cyber-iq', badge: 'Arena' },
  { title: 'Learn', href: '/learn' },
  { title: 'Tools', href: '/tools' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
];

export const FOOTER_SECTIONS = {
  safety: [
    { title: 'Cyber Safety Hub', href: '/cyber-safety' },
    { title: 'Password Safety', href: '/cyber-safety#password-security' },
    { title: 'Phishing Awareness', href: '/cyber-safety#phishing' },
    { title: 'Account Security & MFA', href: '/cyber-safety#account-security' },
    { title: 'Smartphone Protection', href: '/cyber-safety#smartphone-security' },
    { title: 'Computer Hardening', href: '/cyber-safety#computer-security' },
    { title: 'Scam Red Flags', href: '/cyber-safety#red-flags' },
    { title: 'Emergency Response', href: '/cyber-safety#emergency-response' },
  ],
  scams: [
    { title: 'Scam Awareness Hub', href: '/scam-awareness' },
    { title: 'Scam Types Directory', href: '/scam-awareness/types' },
    { title: 'Phishing Interactive Lab', href: '/scam-awareness/types/phishing' },
    { title: 'Spot Scam Red Flags', href: '/scam-awareness/red-flags' },
    { title: 'Scam IQ Quiz Challenge', href: '/scam-awareness/challenge' },
    { title: 'Threat Detection Sandbox', href: '/scam-awareness/simulator' },
    { title: 'How Scams Work (Psychology)', href: '/scam-awareness/how-scams-work' },
    { title: 'What To Do If Scammed', href: '/scam-awareness/response' },
  ],
  education: [
    { title: 'Cyber IQ Quiz Arena', href: '/cyber-iq' },
    { title: 'Cybersecurity Learning Hub', href: '/learn' },
    { title: 'Cybersecurity Fundamentals', href: '/learn/cybersecurity-fundamentals' },
    { title: 'Learning Roadmap (9 Levels)', href: '/learn#roadmap' },
    { title: 'Defensive Security Methodology', href: '/learn#principles' },
    { title: 'Hands-On Cyber Labs', href: '/learn#future-labs' },
  ],
  blog: [
    { title: 'Blog & Knowledge Hub', href: '/blog' },
    { title: 'What Is Phishing?', href: '/blog/what-is-phishing' },
    { title: 'Strong Passwords Guide', href: '/blog/strong-passwords' },
    { title: 'Multi-Factor Authentication', href: '/blog/multi-factor-authentication' },
    { title: 'HTTPS & Padlock Explained', href: '/blog/https-explained' },
    { title: 'Social Engineering Explained', href: '/blog/social-engineering' },
    { title: 'AI Scams & Fraud Defense', href: '/blog/ai-scams' },
  ],
  tools: [
    { title: 'Cybersecurity Tools Hub', href: '/tools' },
    { title: 'Password Strength Educator', href: '/tools/password-strength' },
    { title: 'Password Generator', href: '/tools/password-generator' },
    { title: 'URL Structure Explainer', href: '/tools/url-explainer' },
    { title: 'Password Reuse Risk Checker', href: '/tools/password-reuse' },
    { title: 'Security Headers Educator', href: '/tools/security-headers' },
    { title: 'Cyber Hygiene Checklist', href: '/tools/cyber-hygiene' },
  ],
  legal: [
    { title: 'About CyberAntigravity', href: '/about' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Security Disclaimer', href: '/disclaimer' },
    { title: 'Responsible Disclosure', href: '/disclosure' },
    { title: 'Brand Assets & Logo', href: '/brand' },
  ],
};
