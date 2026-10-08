export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM';

export type ScamFilterCategory =
  | 'ALL'
  | 'MESSAGING'
  | 'FINANCIAL'
  | 'IDENTITY'
  | 'EMPLOYMENT'
  | 'SHOPPING'
  | 'SOCIAL MEDIA'
  | 'TECH SUPPORT'
  | 'PAYMENTS';

export interface CardTheme {
  border: string;
  hoverBorder: string;
  glow: string;
  iconBg: string;
  iconColor: string;
  tagBg: string;
  accentGradient: string;
}

export interface FictionalExample {
  channel: string;
  sender: string;
  simulatedMessage: string;
  deceptionMethod: string;
}

export interface ScamCategoryDetail {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  risk: RiskLevel;
  route: string;
  categories: ScamFilterCategory[];
  iconName: string;
  theme: CardTheme;
  whatItIs: string;
  warningSigns: string[];
  safeResponse: string[];
  fictionalExample: FictionalExample;
}

export interface WarningPatternNode {
  id: string;
  title: string;
  iconName: string;
  explanation: string;
  color: string;
}

export const FILTER_CHIPS: ScamFilterCategory[] = [
  'ALL',
  'MESSAGING',
  'FINANCIAL',
  'IDENTITY',
  'EMPLOYMENT',
  'SHOPPING',
  'SOCIAL MEDIA',
  'TECH SUPPORT',
  'PAYMENTS',
];

export const SCAM_EXPLORER_CATEGORIES: ScamCategoryDetail[] = [
  {
    slug: 'phishing',
    number: '01',
    title: 'Phishing',
    shortDescription:
      'Fake emails, messages, or websites designed to trick people into revealing information or taking unsafe actions.',
    description:
      'Fake emails, messages, or websites designed to trick people into revealing information or taking unsafe actions.',
    tags: ['Fake Links', 'Urgency', 'Credential Requests'],
    risk: 'HIGH',
    route: '/scam-awareness/types/phishing',
    categories: ['MESSAGING', 'IDENTITY'],
    iconName: 'MailWarning',
    // Theme pairing: cyan + magenta
    theme: {
      border: 'border-cyan-900/50',
      hoverBorder: 'hover:border-cyan-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]',
      iconBg: 'bg-gradient-to-br from-cyan-950/80 to-fuchsia-950/40 border-cyan-700/60',
      iconColor: 'text-cyan-300',
      tagBg: 'bg-cyan-950/40 text-cyan-200 border-cyan-800/60',
      accentGradient: 'from-cyan-400 to-fuchsia-400',
    },
    whatItIs:
      'Phishing is a deceptive social-engineering tactic where cybercriminals impersonate trusted entities through emails, text messages, or spoofed portals to steal credentials, account tokens, or confidential information.',
    warningSigns: [
      'Deceptive sender addresses with lookalike spelling (e.g., support@paypa1-security.com).',
      'Artificial deadlines demanding immediate verification to prevent account termination.',
      'Hyperlinks hiding foreign or unofficial domains under familiar brand logos.',
    ],
    safeResponse: [
      'Do not click embedded links or download unverified attachments.',
      'Navigate to the service manually through a known bookmark or browser search.',
      'Forward the suspicious email to the organization’s official abuse reporting address.',
    ],
    fictionalExample: {
      channel: 'Email Message',
      sender: 'service-security@auth-cloud-verify.com',
      simulatedMessage:
        '"Urgent: Your password will expire in 2 hours. Click here to confirm your credentials and retain access."',
      deceptionMethod:
        'Manufactures an artificial expiration deadline to rush the recipient into entering login details on a credential-harvesting server.',
    },
  },
  {
    slug: 'banking-payment',
    number: '02',
    title: 'Banking & Payment Scams',
    shortDescription:
      'Fraud attempts involving fake banking alerts, payment requests, card problems, or account warnings.',
    description:
      'Fraud attempts involving fake banking alerts, payment requests, card problems, or account warnings.',
    tags: ['Payment Request', 'Fake Alert', 'Urgency'],
    risk: 'CRITICAL',
    route: '/scam-awareness/types/banking-payment',
    categories: ['FINANCIAL', 'PAYMENTS', 'MESSAGING'],
    iconName: 'Landmark',
    // Theme pairing: blue + red warning
    theme: {
      border: 'border-blue-900/50',
      hoverBorder: 'hover:border-rose-500/80',
      glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.18)]',
      iconBg: 'bg-gradient-to-br from-blue-950/80 to-rose-950/40 border-blue-700/60',
      iconColor: 'text-blue-300',
      tagBg: 'bg-rose-950/40 text-rose-200 border-rose-800/60',
      accentGradient: 'from-blue-400 to-rose-400',
    },
    whatItIs:
      'Banking and payment scams manipulate victims into transferring money, approving deceptive payment collect requests, or sharing one-time passcodes (OTPs) under the false pretext of stopping fraud.',
    warningSigns: [
      'Unsolicited alerts warning of unauthorized debit transactions or frozen accounts.',
      'Inbound callers asking you to read a multi-factor verification code or OTP over the phone.',
      'Deceptive payment requests sent disguised as cashback rewards or incoming refunds.',
    ],
    safeResponse: [
      'Hang up immediately if a caller asks for security codes or passwords.',
      'Check your balance directly via your bank’s official smartphone application.',
      'Call the trusted number on the physical back of your debit or credit card.',
    ],
    fictionalExample: {
      channel: 'SMS Text',
      sender: '+1 (800) 555-0184',
      simulatedMessage:
        '"Bank Fraud Alert: A charge of $842.10 is pending at OnlineRetailer. If this was NOT you, call immediately or verify at bank-cancel-hold.xyz."',
      deceptionMethod:
        'Induces immediate panic over an unauthorized charge, prompting the victim to dial a scam call center or submit banking credentials.',
    },
  },
  {
    slug: 'investment',
    number: '03',
    title: 'Investment Scams',
    shortDescription:
      'Fake investment opportunities promising unrealistic returns or guaranteed profits.',
    description:
      'Fake investment opportunities promising unrealistic returns or guaranteed profits.',
    tags: ['Guaranteed Returns', 'Pressure', 'Fake Platform'],
    risk: 'CRITICAL',
    route: '/scam-awareness/types/investment',
    categories: ['FINANCIAL'],
    iconName: 'TrendingUp',
    // Theme pairing: green + amber
    theme: {
      border: 'border-emerald-900/50',
      hoverBorder: 'hover:border-amber-500/80',
      glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]',
      iconBg: 'bg-gradient-to-br from-emerald-950/80 to-amber-950/40 border-emerald-700/60',
      iconColor: 'text-emerald-300',
      tagBg: 'bg-amber-950/40 text-amber-200 border-amber-800/60',
      accentGradient: 'from-emerald-400 to-amber-400',
    },
    whatItIs:
      'Investment scams promote fabricated trading portals, cryptocurrency schemes, or algorithmic bots promising guaranteed triple-digit returns with zero risk, often demanding upfront taxes or penalties when attempting to withdraw.',
    warningSigns: [
      'Promises of guaranteed daily or weekly returns with claimed "zero risk".',
      'Persistent pressure from online acquaintances or strangers to transfer crypto assets.',
      'Demands for additional "release fees" or "liquidity taxes" to unlock withdrawals.',
    ],
    safeResponse: [
      'Remember that genuine financial markets never offer guaranteed zero-risk profits.',
      'Verify registered investment brokers against national regulatory databases.',
      'Never send funds or cryptocurrency to unverified private wallet addresses.',
    ],
    fictionalExample: {
      channel: 'Telegram Direct Message',
      sender: 'Crypto Wealth Advisor',
      simulatedMessage:
        '"Exclusive VIP AI Trader: Deposit 0.1 BTC today and receive 0.8 BTC guaranteed in 48 hours. Only 3 slots remaining!"',
      deceptionMethod:
        'Uses artificial exclusivity and mathematical impossibility to lure deposits into an irreversible private crypto wallet.',
    },
  },
  {
    slug: 'job',
    number: '04',
    title: 'Job & Recruitment Scams',
    shortDescription:
      'Fake job offers that may demand fees, deposits, personal information, or account access.',
    description:
      'Fake job offers that may demand fees, deposits, personal information, or account access.',
    tags: ['Registration Fee', 'Fake Recruiter', 'Urgency'],
    risk: 'HIGH',
    route: '/scam-awareness/types/job',
    categories: ['EMPLOYMENT'],
    iconName: 'Briefcase',
    // Theme pairing: purple + cyan
    theme: {
      border: 'border-purple-900/50',
      hoverBorder: 'hover:border-cyan-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]',
      iconBg: 'bg-gradient-to-br from-purple-950/80 to-cyan-950/40 border-purple-700/60',
      iconColor: 'text-purple-300',
      tagBg: 'bg-cyan-950/40 text-cyan-200 border-cyan-800/60',
      accentGradient: 'from-purple-400 to-cyan-400',
    },
    whatItIs:
      'Recruitment fraud involves fake hiring agents offering lucrative remote positions without interviews, subsequently demanding upfront fees for training, equipment purchases, or identity verification.',
    warningSigns: [
      'Job offers issued without voice or video interviews after a simple text questionnaire.',
      'Interviews conducted exclusively through end-to-end encrypted messaging apps.',
      'Requests to deposit a company check and wire back a portion to an "approved supplier".',
    ],
    safeResponse: [
      'Verify vacancies on the target employer’s official public careers portal.',
      'Never wire money or forward funds from an employer-provided check deposit.',
      'Communicate exclusively through corporate domain email addresses.',
    ],
    fictionalExample: {
      channel: 'WhatsApp Message',
      sender: 'HR Staffing Global',
      simulatedMessage:
        '"Congratulations! You have been selected for Data Entry Specialist ($65/hr remote). Deposit our equipment check and send $450 to our certified vendor."',
      deceptionMethod:
        'Counterfeit check fraud: the initial check deposit appears cleared temporarily before bouncing, leaving the victim responsible for wired funds.',
    },
  },
  {
    slug: 'delivery',
    number: '05',
    title: 'Delivery & Parcel Scams',
    shortDescription:
      'Fake courier or parcel messages designed to trigger urgent payments or unsafe link clicks.',
    description:
      'Fake courier or parcel messages designed to trigger urgent payments or unsafe link clicks.',
    tags: ['Parcel Alert', 'Small Fee', 'Suspicious Link'],
    risk: 'HIGH',
    route: '/scam-awareness/types/delivery',
    categories: ['SHOPPING', 'MESSAGING'],
    iconName: 'Package',
    // Theme pairing: orange + cyan
    theme: {
      border: 'border-orange-900/50',
      hoverBorder: 'hover:border-cyan-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.18)]',
      iconBg: 'bg-gradient-to-br from-orange-950/80 to-cyan-950/40 border-orange-700/60',
      iconColor: 'text-orange-300',
      tagBg: 'bg-orange-950/40 text-orange-200 border-orange-800/60',
      accentGradient: 'from-orange-400 to-cyan-400',
    },
    whatItIs:
      'Delivery and parcel scams send deceptive SMS messages claiming an incoming parcel cannot be delivered without an immediate customs fee or address correction, routing users to credential-harvesting forms.',
    warningSigns: [
      'Notifications regarding unexpected packages when you have not recently placed an order.',
      'Shortened URL links masking unfamiliar domain extensions (.top, .xyz, .cc).',
      'Demands for nominal fees ($1.50 - $3.00) using credit card details on unverified pages.',
    ],
    safeResponse: [
      'Track package shipments solely through your merchant account or official carrier application.',
      'Never click tracking links received in unsolicited SMS texts from random numbers.',
      'Contact shipping providers directly via verified customer support channels.',
    ],
    fictionalExample: {
      channel: 'SMS Text',
      sender: '+44 7700 900123',
      simulatedMessage:
        '"Postal Express: Your parcel has been halted at customs due to missing street number. Update details and pay $1.95 redelivery fee: track-parcel-express.top"',
      deceptionMethod:
        'Uses an inexpensive redelivery fee as low-friction bait to harvest full credit card numbers and CVV codes.',
    },
  },
  {
    slug: 'tech-support',
    number: '06',
    title: 'Tech Support Scams',
    shortDescription:
      'Fake technical support messages or calls designed to create panic and gain money, access, or sensitive information.',
    description:
      'Fake technical support messages or calls designed to create panic and gain money, access, or sensitive information.',
    tags: ['Fake Support', 'Remote Access', 'Fear'],
    risk: 'CRITICAL',
    route: '/scam-awareness/types/tech-support',
    categories: ['TECH SUPPORT'],
    iconName: 'Headphones',
    // Theme pairing: blue + purple
    theme: {
      border: 'border-blue-900/50',
      hoverBorder: 'hover:border-purple-500/80',
      glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
      iconBg: 'bg-gradient-to-br from-blue-950/80 to-purple-950/40 border-blue-700/60',
      iconColor: 'text-blue-300',
      tagBg: 'bg-purple-950/40 text-purple-200 border-purple-800/60',
      accentGradient: 'from-blue-400 to-purple-400',
    },
    whatItIs:
      'Tech support scams display fake browser lock screens or initiate unsolicited calls claiming severe virus infections, coercing victims into granting remote desktop access or purchasing worthless diagnostics.',
    warningSigns: [
      'Full-screen browser pop-ups displaying flashing warning alerts and phone numbers.',
      'Callers claiming to represent Microsoft, Apple, or Google requesting remote screen share.',
      'Demands to pay support fees via gift cards, wire transfers, or crypto ATMs.',
    ],
    safeResponse: [
      'Force close locked browser tabs using Task Manager (Ctrl + Shift + Esc).',
      'Never install remote desktop control software (AnyDesk, TeamViewer) at the request of callers.',
      'Remember that authentic operating system developers never include phone numbers on alert banners.',
    ],
    fictionalExample: {
      channel: 'Browser Pop-up',
      sender: 'Security Warning Service',
      simulatedMessage:
        '"CRITICAL THREAT DETECTED: Trojan Spyware active on your device. Call Microsoft Certified Help immediately at 1-800-555-0199. Do not restart."',
      deceptionMethod:
        'Weaponizes fear and technical confusion to compel an immediate panic phone call where remote desktop access is requested.',
    },
  },
  {
    slug: 'romance',
    number: '07',
    title: 'Romance & Relationship Scams',
    shortDescription:
      'Scammers build emotional trust and later request money, information, or financial assistance.',
    description:
      'Scammers build emotional trust and later request money, information, or financial assistance.',
    tags: ['Emotional Trust', 'Money Request', 'Long-Distance'],
    risk: 'HIGH',
    route: '/scam-awareness/types/romance',
    categories: ['SOCIAL MEDIA', 'IDENTITY'],
    iconName: 'HeartHandshake',
    // Theme pairing: pink/purple + amber
    theme: {
      border: 'border-pink-900/50',
      hoverBorder: 'hover:border-amber-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.18)]',
      iconBg: 'bg-gradient-to-br from-pink-950/80 to-amber-950/40 border-pink-700/60',
      iconColor: 'text-pink-300',
      tagBg: 'bg-pink-950/40 text-pink-200 border-pink-800/60',
      accentGradient: 'from-pink-400 to-amber-400',
    },
    whatItIs:
      'Romance scams involve threat actors building fabricated romantic or emotional bonds over dating applications and social media, eventually fabricating urgent financial crises that require wire transfers or crypto assistance.',
    warningSigns: [
      'Professions of deep affection expressed unusually early in the online correspondence.',
      'Consistent excuses preventing in-person meetings or live video conversations.',
      'Sudden financial crises involving medical treatments, travel visas, or customs impounds.',
    ],
    safeResponse: [
      'Perform reverse image searches on profile photographs to check for stolen model photos.',
      'Never send funds, cryptocurrency, or gift card codes to someone you have not met in person.',
      'Discuss unusual relationship dynamics and requests for funds with trusted family members.',
    ],
    fictionalExample: {
      channel: 'Dating App Chat',
      sender: 'Overseas Contract Engineer',
      simulatedMessage:
        '"I love you and want to visit next month, but my international equipment is held at customs. Can you wire $1,200 so I can board my flight?"',
      deceptionMethod:
        'Exploits emotional vulnerability and romantic longing to create moral pressure to send non-refundable funds.',
    },
  },
  {
    slug: 'social-media',
    number: '08',
    title: 'Social Media Impersonation',
    shortDescription:
      'Fake profiles or compromised accounts pretending to be friends, companies, influencers, or trusted people.',
    description:
      'Fake profiles or compromised accounts pretending to be friends, companies, influencers, or trusted people.',
    tags: ['Fake Profile', 'DM Request', 'Impersonation'],
    risk: 'HIGH',
    route: '/scam-awareness/types/social-media',
    categories: ['SOCIAL MEDIA', 'IDENTITY'],
    iconName: 'Users',
    // Theme pairing: cyan + purple
    theme: {
      border: 'border-cyan-900/50',
      hoverBorder: 'hover:border-purple-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]',
      iconBg: 'bg-gradient-to-br from-cyan-950/80 to-purple-950/40 border-cyan-700/60',
      iconColor: 'text-cyan-300',
      tagBg: 'bg-purple-950/40 text-purple-200 border-purple-800/60',
      accentGradient: 'from-cyan-400 to-purple-400',
    },
    whatItIs:
      'Social media impersonation involves threat actors cloning public profiles or hijacking accounts to message followers with urgent requests for cash, fake investment tips, or requests to screenshot security codes.',
    warningSigns: [
      'Direct messages from friends asking for emergency financial assistance via peer-to-peer apps.',
      'Requests from online acquaintances asking you to screenshot verification codes sent to your phone.',
      'New connection requests from accounts duplicating a current friend’s photos and bio.',
    ],
    safeResponse: [
      'Confirm suspicious requests by calling your friend directly on a trusted phone number.',
      'Report duplicate and cloned accounts using the social media platform’s report tools.',
      'Never screenshot or share two-factor authentication codes with anyone.',
    ],
    fictionalExample: {
      channel: 'Instagram Direct Message',
      sender: '@friend_cloned_profile',
      simulatedMessage:
        '"Hey! I lost access to my backup account and selected you as my trusted contact. A 4-digit code just arrived on your SMS, can you paste it here?"',
      deceptionMethod:
        'Social engineering takeover: uses a friend’s identity to fool you into handing over your own password reset OTP.',
    },
  },
  {
    slug: 'lottery',
    number: '09',
    title: 'Lottery & Prize Scams',
    shortDescription:
      'Fake winnings, rewards, giveaways, or lottery messages designed to make victims pay fees or share information.',
    description:
      'Fake winnings, rewards, giveaways, or lottery messages designed to make victims pay fees or share information.',
    tags: ['Fake Prize', 'Processing Fee', 'Urgency'],
    risk: 'HIGH',
    route: '/scam-awareness/types/lottery',
    categories: ['FINANCIAL', 'MESSAGING'],
    iconName: 'Trophy',
    // Theme pairing: amber + green
    theme: {
      border: 'border-amber-900/50',
      hoverBorder: 'hover:border-emerald-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]',
      iconBg: 'bg-gradient-to-br from-amber-950/80 to-emerald-950/40 border-amber-700/60',
      iconColor: 'text-amber-300',
      tagBg: 'bg-emerald-950/40 text-emerald-200 border-emerald-800/60',
      accentGradient: 'from-amber-400 to-emerald-400',
    },
    whatItIs:
      'Lottery and prize scams inform targets that they have won substantial cash rewards or electronics in contests they never entered, demanding upfront processing fees, clearance taxes, or personal identities to claim the prize.',
    warningSigns: [
      'Winning notifications for lotteries or sweepstakes you never entered.',
      'Demands to pay clearance fees, shipping insurance, or customs charges in advance.',
      'Instructions to keep your winnings strictly confidential to prevent disqualification.',
    ],
    safeResponse: [
      'Recognize that legitimate lotteries and contests never require advance fees to claim prizes.',
      'Delete and report unsolicited prize notifications immediately.',
      'Never disclose banking credentials or personal tax IDs to claim winnings.',
    ],
    fictionalExample: {
      channel: 'SMS Text',
      sender: 'Global Rewards Program',
      simulatedMessage:
        '"Notice: Your phone number won 2nd prize in the International Mobile Sweepstakes ($250,000). Remit $150 processing fee to release bank draft."',
      deceptionMethod:
        'Advance-fee fraud: entices with life-changing payouts to extract non-refundable processing fees.',
    },
  },
  {
    slug: 'qr',
    number: '10',
    title: 'QR Code Scams',
    shortDescription:
      'Deceptive QR codes that redirect users to unsafe destinations or fraudulent payment flows.',
    description:
      'Deceptive QR codes that redirect users to unsafe destinations or fraudulent payment flows.',
    tags: ['Unknown QR', 'Redirect', 'Payment'],
    risk: 'HIGH',
    route: '/scam-awareness/types/qr',
    categories: ['PAYMENTS', 'FINANCIAL', 'TECH SUPPORT'],
    iconName: 'QrCode',
    // Theme pairing: cyan + orange
    theme: {
      border: 'border-cyan-900/50',
      hoverBorder: 'hover:border-orange-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]',
      iconBg: 'bg-gradient-to-br from-cyan-950/80 to-orange-950/40 border-cyan-700/60',
      iconColor: 'text-cyan-300',
      tagBg: 'bg-orange-950/40 text-orange-200 border-orange-800/60',
      accentGradient: 'from-cyan-400 to-orange-400',
    },
    whatItIs:
      'Quishing (QR code phishing) involves cybercriminals pasting counterfeit QR code stickers over genuine parking meters, restaurant menus, or utility payment points to divert transactions to malicious payment gateways.',
    warningSigns: [
      'Physical QR stickers visibly overlaid onto legitimate payment kiosks or parking signage.',
      'QR codes in emails that conceal destination domains from security link checkers.',
      'Scanned codes redirecting to unfamiliar domain shorteners or misspelled brand portals.',
    ],
    safeResponse: [
      'Check physical QR codes on parking meters to ensure they are not peeling stickers placed over originals.',
      'Preview destination URLs before tapping to open them in your mobile browser.',
      'Pay directly via official mobile applications or trusted payment terminals.',
    ],
    fictionalExample: {
      channel: 'Physical Sticker on Parking Meter',
      sender: 'Counterfeit Parking Sign',
      simulatedMessage:
        '"Scan to Pay Parking: Fast checkout via QuickPayQR. Enter credit card to validate spot #42."',
      deceptionMethod:
        'Replaces a legitimate civic parking payment gateway with a phishing page that captures payment cards while issuing fake digital receipts.',
    },
  },
  {
    slug: 'account-takeover',
    number: '11',
    title: 'Account Takeover Scams',
    shortDescription:
      'Attempts to steal login credentials, verification codes, recovery information, or account access.',
    description:
      'Attempts to steal login credentials, verification codes, recovery information, or account access.',
    tags: ['OTP Request', 'Login Alert', 'Recovery Code'],
    risk: 'CRITICAL',
    route: '/scam-awareness/types/account-takeover',
    categories: ['IDENTITY'],
    iconName: 'KeyRound',
    // Theme pairing: red + cyan
    theme: {
      border: 'border-rose-900/50',
      hoverBorder: 'hover:border-cyan-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.18)]',
      iconBg: 'bg-gradient-to-br from-rose-950/80 to-cyan-950/40 border-rose-700/60',
      iconColor: 'text-rose-300',
      tagBg: 'bg-rose-950/40 text-rose-200 border-rose-800/60',
      accentGradient: 'from-rose-400 to-cyan-400',
    },
    whatItIs:
      'Account takeover (ATO) attacks deceive victims into sharing two-factor verification codes, authenticator prompts, or password reset tokens to allow attackers to hijack primary email, banking, or social profiles.',
    warningSigns: [
      'Unexpected password reset emails or authenticator push notifications when you are idle.',
      'Inbound callers claiming to represent account security asking for the 6-digit code on your screen.',
      'Notifications from online services confirming a login from an unknown location or foreign device.',
    ],
    safeResponse: [
      'Never disclose one-time passwords (OTPs) or multi-factor prompt codes over phone or chat.',
      'If you receive an unexpected MFA prompt, deny it and immediately update your master password.',
      'Access security settings directly and terminate all other active device sessions.',
    ],
    fictionalExample: {
      channel: 'Phone Call + SMS',
      sender: 'Caller claiming to be "Account Security"',
      simulatedMessage:
        '"We detected unauthorized login attempts from overseas. To block this IP, read the 6-digit security token we just sent to your phone."',
      deceptionMethod:
        'The attacker is actively attempting to trigger a password reset on your account and needs the OTP sent to your phone to complete the takeover.',
    },
  },
  {
    slug: 'fake-support',
    number: '12',
    title: 'Fake Customer Support',
    shortDescription:
      'Fake support accounts, phone numbers, or social profiles pretending to represent legitimate companies.',
    description:
      'Fake support accounts, phone numbers, or social profiles pretending to represent legitimate companies.',
    tags: ['Fake Contact', 'Impersonation', 'Payment Request'],
    risk: 'HIGH',
    route: '/scam-awareness/types/fake-support',
    categories: ['TECH SUPPORT', 'SHOPPING'],
    iconName: 'PhoneCall',
    // Theme pairing: blue + amber
    theme: {
      border: 'border-blue-900/50',
      hoverBorder: 'hover:border-amber-400/80',
      glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
      iconBg: 'bg-gradient-to-br from-blue-950/80 to-amber-950/40 border-blue-700/60',
      iconColor: 'text-blue-300',
      tagBg: 'bg-amber-950/40 text-amber-200 border-amber-800/60',
      accentGradient: 'from-blue-400 to-amber-400',
    },
    whatItIs:
      'Fake customer support schemes set up sponsored search ads, poisoned directory listings, and bot accounts on social media that respond to public customer complaints with fake phone numbers or credential-harvesting links.',
    warningSigns: [
      'Customer support numbers found through sponsored search engine ads rather than official websites.',
      'Social media accounts with slight handle variations responding to your public company complaints.',
      'Support representatives requesting your account password or asking you to install remote access tools.',
    ],
    safeResponse: [
      'Obtain customer care contact numbers only from the company’s official verified website.',
      'Verify social media badges and handle spelling before replying to support accounts.',
      'Remember that genuine support agents will never ask for your password or PIN.',
    ],
    fictionalExample: {
      channel: 'Sponsored Search Result',
      sender: 'Fake Airline Customer Helpline',
      simulatedMessage:
        '"Need quick flight cancellation or refund? Call our toll-free 24/7 priority line at 1-800-555-0177."',
      deceptionMethod:
        'Positions a fake support call center at the top of search results, charging exorbitant bogus cancellation fees while harvesting credit cards.',
    },
  },
];

export const WARNING_PATTERN_NODES: WarningPatternNode[] = [
  {
    id: 'urgency',
    title: 'URGENCY',
    iconName: 'Zap',
    explanation: 'Act now before you have time to verify.',
    color: 'amber',
  },
  {
    id: 'fear',
    title: 'FEAR',
    iconName: 'ShieldAlert',
    explanation: 'Create panic so you stop thinking critically.',
    color: 'rose',
  },
  {
    id: 'authority',
    title: 'AUTHORITY',
    iconName: 'Landmark',
    explanation: 'Pretend to be a bank, government agency, company, or expert.',
    color: 'blue',
  },
  {
    id: 'greed',
    title: 'GREED',
    iconName: 'Coins',
    explanation: 'Promise rewards, profits, or prizes.',
    color: 'emerald',
  },
  {
    id: 'curiosity',
    title: 'CURIOSITY',
    iconName: 'Eye',
    explanation: 'Use unexpected messages or links to trigger a click.',
    color: 'purple',
  },
  {
    id: 'trust',
    title: 'TRUST',
    iconName: 'HeartHandshake',
    explanation: 'Impersonate someone you already know.',
    color: 'cyan',
  },
];
