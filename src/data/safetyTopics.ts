import { SafetyPillar } from '@/types';

export const SAFETY_PILLARS: SafetyPillar[] = [
  {
    id: 'password-safety',
    title: 'Password & Credential Hygiene',
    iconName: 'KeyRound',
    shortDesc: 'Eliminate reuse vulnerabilities, adopt multi-word passphrases, and master password management architectures.',
    fullDesc: 'Modern automated threat actors use brute force and credential stuffing across leaked databases. Protecting accounts starts with random generation, hardware salting, and zero-reuse policies.',
    threats: [
      'Credential stuffing from third-party breaches',
      'Dictionary and rainbow table attacks',
      'Keylogger interception on untrusted devices',
    ],
    bestPractices: [
      'Use randomly generated passphrases of 16+ characters',
      'Store credentials in audited, end-to-end encrypted password managers',
      'Never reuse the same master password across critical services',
    ],
    readTime: '4 min guide',
  },
  {
    id: 'phishing-defense',
    title: 'Phishing & Email Deception',
    iconName: 'MailWarning',
    shortDesc: 'Deconstruct spear-phishing, spoofed senders, urgent pretexting, and malicious payload links.',
    fullDesc: 'Phishing accounts for over 80% of reported security incidents. Attackers manipulate cognitive biases—urgency, curiosity, and fear—to trick users into surrendering access tokens.',
    threats: [
      'Spoofed display names and homograph domains',
      'Urgent pretexts claiming account suspension or payment delays',
      'Malicious OAuth application consent prompts',
    ],
    bestPractices: [
      'Hover and inspect sender domains, not just display names',
      'Verify unexpected transactional requests via an out-of-band channel',
      'Do not click embedded login links inside unsolicited emails',
    ],
    readTime: '6 min guide',
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering & Pretexting',
    iconName: 'UserX',
    shortDesc: 'Recognize psychological manipulation, phone impersonation (vishing), and fake authority scenarios.',
    fullDesc: 'Human vulnerability remains the primary breach vector. Social engineers exploit trust, helpfulness, or bureaucratic friction to bypass technical perimeters without writing a single line of malicious code.',
    threats: [
      'IT support impersonation requesting remote desk access',
      'Vendor banking detail change requests (Business Email Compromise)',
      'AI voice clones simulating relatives or executives',
    ],
    bestPractices: [
      'Institute strict multi-person verification for financial or credential actions',
      'Challenge unverified callers requesting internal or personal data',
      'Establish family or organizational duress and safe words',
    ],
    readTime: '5 min guide',
  },
  {
    id: 'account-security-mfa',
    title: 'Account Security & Modern MFA',
    iconName: 'ShieldCheck',
    shortDesc: 'Graduate beyond SMS authentication to cryptographic passkeys, FIDO2 hardware tokens, and TOTP.',
    fullDesc: 'SMS codes are vulnerable to SIM swapping, SS7 interception, and real-time reverse proxies (like Evilginx). Modern defense relies on phishing-resistant WebAuthn passkeys.',
    threats: [
      'SIM-swap attacks redirecting SMS authentication codes',
      'MFA fatigue attacks (push notification bombing)',
      'Adversary-in-the-Middle (AiTM) session token theft',
    ],
    bestPractices: [
      'Enforce FIDO2 / WebAuthn passkeys or hardware security keys (e.g. YubiKey)',
      'Switch from SMS to authenticator apps with number matching',
      'Regularly audit active sessions and revoke stale OAuth integrations',
    ],
    readTime: '5 min guide',
  },
  {
    id: 'privacy-footprint',
    title: 'Privacy & Digital Footprint',
    iconName: 'EyeOff',
    shortDesc: 'Minimize telemetry, purge data broker listings, and curtail tracking across web and mobile platforms.',
    fullDesc: 'Every digital interaction leaves behavioral footprints harvested by commercial data brokers and cyber intelligence scrapers. Restricting telemetry dramatically lowers attack surface.',
    threats: [
      'Public OSINT aggregation enabling spear-phishing',
      'Unchecked app permissions tracking location and background audio',
      'Cross-site browser fingerprinting and ad trackers',
    ],
    bestPractices: [
      'Opt out from primary people-search data aggregators',
      'Utilize tracker-blocking DNS resolvers (NextDNS, Quad9)',
      'Audit smartphone permissions: strip background location and microphone access',
    ],
    readTime: '7 min guide',
  },
  {
    id: 'device-hardening',
    title: 'Device & Endpoint Hardening',
    iconName: 'Laptop',
    shortDesc: 'Deploy full-disk encryption, automated patching cadences, and secure baseline configurations.',
    fullDesc: 'Your physical endpoints (laptops, smartphones, tablets) store encrypted tokens and cache active sessions. Hardening endpoints limits lateral movement if compromised.',
    threats: [
      'Unpatched zero-day and n-day operating system exploits',
      'Lost or stolen physical hardware without disk encryption',
      'Malicious USB drops and untrusted peripheral connections',
    ],
    bestPractices: [
      'Activate BitLocker or FileVault full-disk encryption immediately',
      'Enable automated security and OS patch updates within 48 hours',
      'Restrict auto-run and disable unneeded wireless protocols (Bluetooth, AirDrop)',
    ],
    readTime: '6 min guide',
  },
];
