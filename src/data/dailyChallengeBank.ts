export interface DailyChallengeOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DailyChallenge {
  id: string;
  topic: string;
  category: 'Phishing Defense' | 'Authentication' | 'Social Engineering' | 'Network Safety' | 'Device Hygiene';
  difficulty: 'Beginner' | 'Intermediate';
  scenario: string;
  question: string;
  options: DailyChallengeOption[];
  defenseRecommendation: string;
  relatedLink: string;
  relatedLinkText: string;
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'daily-01',
    topic: 'Fake Delivery Notification (Smishing)',
    category: 'Phishing Defense',
    difficulty: 'Beginner',
    scenario:
      'You receive an SMS stating: "Your parcel has an unpaid customs charge of $1.85. Click track-pkg-support.com to release delivery within 12 hours."',
    question: 'What is the safest immediate action to take?',
    options: [
      {
        id: 'A',
        text: 'Pay the $1.85 immediately because the fee is too small to be a scam',
        isCorrect: false,
        explanation:
          'Low dollar amounts are an intentional lure. Scammers charge $1.85 to capture your full credit card number, CVV, and billing address for unauthorized secondary charges.',
      },
      {
        id: 'B',
        text: 'Do not click the link; check your tracking number on the carrier\'s official app or site',
        isCorrect: true,
        explanation:
          'Correct! Independent verification through an official app or bookmarked website protects you from lookalike domain traps.',
      },
      {
        id: 'C',
        text: 'Reply "STOP" to the message to unsubscribe from future texts',
        isCorrect: false,
        explanation:
          'Replying confirms to automated scam systems that your phone number is active, triggering increased spam and fraudulent calls.',
      },
      {
        id: 'D',
        text: 'Click the link but only enter a prepaid gift card number',
        isCorrect: false,
        explanation:
          'Visiting malicious links exposes your mobile browser to drive-by fingerprinting and credential phishing traps.',
      },
    ],
    defenseRecommendation:
      'Legitimate delivery services never demand payment via urgent SMS links. Always verify package statuses through the merchant\'s direct portal.',
    relatedLink: '/scam-awareness/types/phishing',
    relatedLinkText: 'Learn How Phishing Traps Work',
  },
  {
    id: 'daily-02',
    topic: 'MFA Push Fatigue Attack',
    category: 'Authentication',
    difficulty: 'Beginner',
    scenario:
      'At 2:00 AM, your phone receives four consecutive authenticator push notification requests saying "Approve sign-in to your email account?" even though you are asleep.',
    question: 'How should you respond to this sudden flood of prompts?',
    options: [
      {
        id: 'A',
        text: 'Tap "Approve" so the notifications stop waking you up',
        isCorrect: false,
        explanation:
          'This is known as MFA Fatigue (Prompt Bombing). Attackers flood victims with alerts hoping frustration causes an accidental approval.',
      },
      {
        id: 'B',
        text: 'Deny the requests, then immediately change your password from a trusted device',
        isCorrect: true,
        explanation:
          'Correct! The prompt means the attacker already possesses your valid password. Denying blocks the breach, and resetting the password eliminates the leak.',
      },
      {
        id: 'C',
        text: 'Put your phone in Airplane Mode until morning without changing credentials',
        isCorrect: false,
        explanation:
          'Silencing notifications does not revoke the attacker\'s knowledge of your password; they may try alternate session hijack methods.',
      },
      {
        id: 'D',
        text: 'Reply to your email provider asking who is logging in',
        isCorrect: false,
        explanation:
          'Push notifications are automated backend events and do not support conversational inquiries.',
      },
    ],
    defenseRecommendation:
      'Whenever you receive an unexpected 2FA prompt, deny it immediately and assume your primary password has been compromised.',
    relatedLink: '/blog/multi-factor-authentication',
    relatedLinkText: 'Read the Multi-Factor Authentication Guide',
  },
  {
    id: 'daily-03',
    topic: 'Unsecured Public Wi-Fi',
    category: 'Network Safety',
    difficulty: 'Beginner',
    scenario:
      'You are at a busy airport and see two networks: "Airport_Official_WiFi" (requires hotel/flight ticket login) and "Free_Fast_Airport_WiFi" (open, no password required).',
    question: 'What is the primary risk of connecting to the open network?',
    options: [
      {
        id: 'A',
        text: 'An attacker may have created an "Evil Twin" hotspot to intercept unencrypted traffic',
        isCorrect: true,
        explanation:
          'Correct! Rogue wireless access points (Evil Twins) mimic public hotspots to snoop on DNS requests, unencrypted data, and credential submissions.',
      },
      {
        id: 'B',
        text: 'The open network will automatically drain your phone\'s battery 10x faster',
        isCorrect: false,
        explanation:
          'Battery drain is not the core security risk. The danger is eavesdropping and adversary-in-the-middle packet capture.',
      },
      {
        id: 'C',
        text: 'Open Wi-Fi networks permanently corrupt your phone\'s operating system memory',
        isCorrect: false,
        explanation:
          'Wireless connections transmit network frames; they cannot permanently reflash system firmware simply by connecting.',
      },
      {
        id: 'D',
        text: 'There is no risk as long as your phone has the latest screen protector',
        isCorrect: false,
        explanation:
          'Physical screen protectors provide no protection against wireless network eavesdropping.',
      },
    ],
    defenseRecommendation:
      'Use your mobile data hotspot or a trusted VPN on public networks. Never log into banking or private accounts on unverified public Wi-Fi.',
    relatedLink: '/cyber-safety',
    relatedLinkText: 'Explore Essential Cyber Safety Habits',
  },
  {
    id: 'daily-04',
    topic: 'Password Reuse & Credential Stuffing',
    category: 'Authentication',
    difficulty: 'Beginner',
    scenario:
      'You use the same password ("Summer2024!") for your school portal, personal gaming forum, and main banking app. A small gaming forum suffers a public data breach.',
    question: 'Why are your banking and school accounts now at high risk?',
    options: [
      {
        id: 'A',
        text: 'Automated bots execute "credential stuffing" across thousands of major sites with breached pairs',
        isCorrect: true,
        explanation:
          'Correct! Attackers take leaked username/password databases and use automated software to test those exact combinations on banks and email providers within minutes.',
      },
      {
        id: 'B',
        text: 'The gaming forum administrators have legal access to take over your bank account',
        isCorrect: false,
        explanation:
          'The threat comes from cybercriminals weaponizing leaked credentials, not legitimate forum staff.',
      },
      {
        id: 'C',
        text: 'Passwords automatically expire across the internet when one site is hacked',
        isCorrect: false,
        explanation:
          'Other platforms have no knowledge of external breaches unless they integrate breach monitoring (like HaveIBeenPwned).',
      },
      {
        id: 'D',
        text: 'The bank will automatically lock your account forever without notification',
        isCorrect: false,
        explanation:
          'Banks cannot detect that your password matches a breached forum until an attacker successfully logs in.',
      },
    ],
    defenseRecommendation:
      'Never reuse passwords across services. Use a dedicated password manager to generate unique, high-entropy secrets for every single website.',
    relatedLink: '/tools/password-reuse',
    relatedLinkText: 'Check Password Reuse Vulnerabilities',
  },
  {
    id: 'daily-05',
    topic: 'Urgent Tech Support Pop-Up',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario:
      'While browsing research articles, your browser screen freezes, flashes red, plays an alarm sound, and displays: "WARNING: Trojan Virus Detected! Call Microsoft at 1-800-XXX-XXXX immediately."',
    question: 'What is happening and what should you do?',
    options: [
      {
        id: 'A',
        text: 'Call the number immediately to allow Microsoft technicians to remove the virus',
        isCorrect: false,
        explanation:
          'Microsoft and Apple never display phone numbers in browser popups. Calling routes you to a scam call center that charges hundreds of dollars for fake software.',
      },
      {
        id: 'B',
        text: 'Close the browser tab (or force quit the browser process); do not call the number',
        isCorrect: true,
        explanation:
          'Correct! This is a classic scareware browser locker. It is just an aggressive webpage with audio and fullscreen scripts, not a verified system infection.',
      },
      {
        id: 'C',
        text: 'Buy $500 in gift cards so you are ready to pay the emergency support fee',
        isCorrect: false,
        explanation:
          'Gift cards are untraceable and non-refundable. Demands for gift cards are 100% indicative of fraud.',
      },
      {
        id: 'D',
        text: 'Unplug your computer monitor to physically delete the virus',
        isCorrect: false,
        explanation:
          'Unplugging the display only turns off video output and does not address open applications or browser tabs.',
      },
    ],
    defenseRecommendation:
      'Operating systems do not put toll-free numbers in web browsers. Use keyboard shortcuts (Ctrl+W / Cmd+W or Task Manager) to close locked web tabs.',
    relatedLink: '/scam-awareness/red-flags',
    relatedLinkText: 'Review Scam Red Flags & Psychological Triggers',
  },
  {
    id: 'daily-06',
    topic: 'Suspicious Email Attachments',
    category: 'Phishing Defense',
    difficulty: 'Beginner',
    scenario:
      'An email from an unfamiliar accounting address arrives with the subject: "Invoice #9823 overdue - Final Notice.pdf.exe".',
    question: 'Why is the file extension ".pdf.exe" particularly dangerous?',
    options: [
      {
        id: 'A',
        text: 'Windows by default hides known extensions, so users only see ".pdf" while launching an executable program',
        isCorrect: true,
        explanation:
          'Correct! Double extension spoofing tricks users into thinking they are opening an Adobe PDF document when they are actually executing malicious binary code.',
      },
      {
        id: 'B',
        text: 'PDF files with ".exe" are special encrypted files that require administrative authorization',
        isCorrect: false,
        explanation:
          'Executable files (.exe) run native machine code and are commonly used to deliver malware and spyware.',
      },
      {
        id: 'C',
        text: 'The file will convert your computer into a printer',
        isCorrect: false,
        explanation:
          'This is impossible; the file is an executable payload intended to compromise system security.',
      },
      {
        id: 'D',
        text: 'The file is safe if your antivirus was updated within the last year',
        isCorrect: false,
        explanation:
          'Zero-day malware and obfuscated packers easily evade outdated signatures. Never launch unverified .exe attachments.',
      },
    ],
    defenseRecommendation:
      'Enable "File name extensions" in your operating system file manager to expose double-extension traps. Never open unexpected executable files.',
    relatedLink: '/learn/cybersecurity-fundamentals',
    relatedLinkText: 'Learn Cybersecurity Fundamentals',
  },
  {
    id: 'daily-07',
    topic: 'QR Code Quishing Traps',
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario:
      'You notice a physical sticker with a QR code pasted over the official payment barcode on a public downtown parking meter.',
    question: 'What threat does this overlay sticker represent?',
    options: [
      {
        id: 'A',
        text: 'Quishing (QR Phishing): scanning directs your phone to a counterfeit payment portal that steals credit cards',
        isCorrect: true,
        explanation:
          'Correct! Physical QR sticker swaps are a rising fraud vector where criminals replace legitimate payment codes with lookalike domains.',
      },
      {
        id: 'B',
        text: 'The QR code gives you a 50% discount on street parking',
        isCorrect: false,
        explanation:
          'Stickers pasted over official hardware are tamper indicators, not official promotional campaigns.',
      },
      {
        id: 'C',
        text: 'QR codes can only store harmless plain text and cannot open websites',
        isCorrect: false,
        explanation:
          'QR codes frequently encode HTTPS URLs that mobile cameras automatically resolve and prompt you to visit.',
      },
      {
        id: 'D',
        text: 'The sticker is only dangerous if you scan it with an Apple device',
        isCorrect: false,
        explanation:
          'Malicious websites affect any mobile operating system with a modern browser.',
      },
    ],
    defenseRecommendation:
      'Inspect physical QR codes for tampering or peeling before scanning. Use the city or vendor\'s official mobile application directly.',
    relatedLink: '/blog/ai-scams',
    relatedLinkText: 'Read the AI Scams & Fraud Defense Guide',
  },
];

/**
 * Deterministically returns a stable daily challenge for any calendar date.
 * Uses UTC date calculations to guarantee identical results for all users throughout the day.
 */
export function getDailyChallengeForDate(date: Date = new Date()): {
  challenge: DailyChallenge;
  dateString: string;
  dayNumber: number;
} {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  // Epoch anchor: 2026-01-01
  const anchorTime = Date.UTC(2026, 0, 1);
  const currentTime = Date.UTC(year, date.getUTCMonth(), date.getUTCDate());
  const diffDays = Math.max(0, Math.floor((currentTime - anchorTime) / (1000 * 60 * 60 * 24)));

  const questionIndex = diffDays % DAILY_CHALLENGES.length;
  return {
    challenge: DAILY_CHALLENGES[questionIndex],
    dateString,
    dayNumber: diffDays + 1,
  };
}
