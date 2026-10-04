import {
  SafetyChecklistItem,
  SafetyTopicDetail,
  RedFlagItem,
  EmergencyStepItem,
  ScorecardQuestion,
  CyberMythItem,
  RoadmapLevelItem,
} from '@/types';

// ==========================================
// 1. QUICK SAFETY CHECKLIST (8 Fundamental Items)
// ==========================================
export const QUICK_SAFETY_CHECKLIST: SafetyChecklistItem[] = [
  {
    id: 'strong-unique-passwords',
    title: 'Use strong, unique passwords',
    shortExplanation:
      'Create long, distinct passphrases for every single online account rather than reusing familiar words or patterns.',
    detailedAction:
      'Password reuse turns a single compromise on an obscure website into an open door to your email and financial accounts. Aim for 16+ character passphrases composed of random words or utilize an encrypted password manager.',
    iconName: 'KeyRound',
    category: 'Credential Hygiene',
    topicAnchor: 'password-security',
  },
  {
    id: 'enable-mfa',
    title: 'Enable multi-factor authentication (MFA)',
    shortExplanation:
      'Add a second verification step to verify your identity whenever logging in from unfamiliar devices.',
    detailedAction:
      'Even if your password is stolen, multi-factor authentication stops automated credential stuffers. Prioritize mobile authenticator apps (TOTP) or hardware passkeys over SMS-based codes when available.',
    iconName: 'ShieldCheck',
    category: 'Account Defense',
    topicAnchor: 'account-security',
  },
  {
    id: 'keep-os-apps-updated',
    title: 'Keep operating systems and apps updated',
    shortExplanation:
      'Turn on automatic updates so software vendors can patch known security flaws before attackers exploit them.',
    detailedAction:
      'Cybercriminals frequently target known vulnerabilities (CVEs) in outdated operating systems and browsers. Enabling automatic update downloads ensures critical security patches are installed immediately.',
    iconName: 'RefreshCw',
    category: 'Device Health',
    topicAnchor: 'computer-security',
  },
  {
    id: 'verify-suspicious-links',
    title: 'Verify suspicious links before opening them',
    shortExplanation:
      'Inspect destination URLs and avoid clicking unexpected links in text messages, emails, or direct messages.',
    detailedAction:
      'Look closely at the actual domain name rather than the display text. When receiving unexpected alerts about account suspensions or parcel deliveries, navigate directly to the official website instead of clicking the link.',
    iconName: 'MailWarning',
    category: 'Threat Awareness',
    topicAnchor: 'phishing',
  },
  {
    id: 'never-share-otps-codes',
    title: 'Avoid sharing OTPs, passwords, or recovery codes',
    shortExplanation:
      'Never disclose one-time verification passcodes, account passwords, or PINs to anyone over the phone or chat.',
    detailedAction:
      'Legitimate financial institutions, customer support agents, and government departments will never ask you to read out a temporary one-time password (OTP). These codes grant immediate authorization to transfer funds or reset credentials.',
    iconName: 'Lock',
    category: 'Payment & Identity',
    topicAnchor: 'digital-payments',
  },
  {
    id: 'download-trusted-sources',
    title: 'Download software only from trusted sources',
    shortExplanation:
      'Acquire applications exclusively through official app stores or verified developer websites.',
    detailedAction:
      'Avoid cracked software, pirated media, and third-party download mirrors. Unauthorized software packages often bundle background info-stealers, remote access trojans (RATs), or cryptominers.',
    iconName: 'Laptop',
    category: 'Device Integrity',
    topicAnchor: 'smartphone-security',
  },
  {
    id: 'review-privacy-settings',
    title: 'Review account privacy and security settings',
    shortExplanation:
      'Audit who can see your social profiles, limit telemetry, and restrict background app permissions.',
    detailedAction:
      'Regularly check installed apps and revoke unnecessary access to location data, cameras, microphones, and contacts. Set social media accounts to private to limit open-source intelligence (OSINT) harvesting.',
    iconName: 'Sliders',
    category: 'Data Protection',
    topicAnchor: 'privacy-protection',
  },
  {
    id: 'maintain-backups',
    title: 'Maintain reliable backups of important data',
    shortExplanation:
      'Keep independent copies of your essential documents, family photos, and records in secure locations.',
    detailedAction:
      'Adhere to the 3-2-1 backup principle: maintain 3 copies of vital data on 2 different storage media, with 1 stored securely off-site or in encrypted cloud storage. Backups protect against ransomware and hardware loss.',
    iconName: 'FileText',
    category: 'Resilience',
    topicAnchor: 'computer-security',
  },
];

// ==========================================
// 2. CYBER SAFETY TOPICS (10 Comprehensive Categories A - J)
// ==========================================
export const CYBER_SAFETY_TOPICS: SafetyTopicDetail[] = [
  {
    id: 'password-security',
    letter: 'A',
    category: 'Access & Authentication',
    title: 'Password Security & Credential Hygiene',
    iconName: 'KeyRound',
    readTime: '5 min read',
    summary:
      'Passwords remain the front door to your personal digital identity. Understanding password generation, password managers, and reuse risks provides a strong defensive baseline against automated breach attacks.',
    coreConcepts: [
      {
        title: 'Strong Passwords vs. Simple Complexity',
        description:
          'Length matters significantly more than arbitrary symbol complexity. A 4-word random passphrase like "harbor-velvet-cactus-pencil" is drastically harder for high-speed cracking rigs to guess than an 8-character string like "P@ssw0rd1".',
        keyTip: 'Strive for at least 16 characters for all critical accounts (email, cloud, banking).',
      },
      {
        title: 'Unique Passwords Across Every Service',
        description:
          'Billions of credentials from past website breaches circulate on underground forums. If you reuse the same password on multiple websites, a compromise on a simple forum grants criminals immediate access to your primary email or banking portal.',
        keyTip: 'Zero password reuse is the single most effective barrier against credential stuffing.',
      },
      {
        title: 'Password Managers: Your Encrypted Digital Vault',
        description:
          'Human memory cannot securely retain dozens of unique, 20-character random passwords. Reputable password managers store encrypted credentials locally or in zero-knowledge encrypted cloud vaults, autocompleting credentials only on authentic website URLs.',
        keyTip: 'Choose well-audited managers such as Bitwarden, 1Password, or KeePass, secured with a strong master passphrase and MFA.',
      },
      {
        title: 'Understanding Password Reuse Risks',
        description:
          'Automated botnets use credential stuffing scripts to rapidly test leaked combinations across hundreds of popular web services simultaneously. Unique credentials eliminate this entire attack vector.',
      },
    ],
    practicalActions: [
      'Inventory your accounts and replace duplicate passwords with unique, randomly generated passphrases.',
      'Adopt a reputable password manager with end-to-end zero-knowledge encryption.',
      'Check whether your email has appeared in public historical breaches using reputable breach awareness databases.',
      'Never write master passwords on sticky notes attached to your workstation or unencrypted text documents.',
    ],
    commonMisconceptions: [
      'Misconception: "Changing passwords every 30 days keeps me secure." — Reality: Frequent mandatory changes encourage predictable substitutions (e.g., Summer2024! to Autumn2024!). Focus on length and uniqueness instead.',
    ],
  },
  {
    id: 'phishing',
    letter: 'B',
    category: 'Deception & Social Engineering',
    title: 'Phishing: Email, Smishing, Vishing & Fake Portals',
    iconName: 'MailWarning',
    readTime: '6 min read',
    summary:
      'Phishing is psychological deception disguised as legitimate communication. Attackers craft convincing messages that prey on urgency, curiosity, or authority to manipulate targets into surrendering credentials or funds.',
    coreConcepts: [
      {
        title: 'Email Phishing & Spoofed Headers',
        description:
          'Fraudulent emails often display familiar logos and spoofed sender names. Look closely at the actual email address domain after the "@" sign. Subtle typos (e.g., support@paypa1-security.com) expose fraudulent origins.',
        keyTip: 'Never trust sender display names alone; inspect the full sender address and security headers.',
      },
      {
        title: 'SMS Phishing (Smishing)',
        description:
          'Text messages claiming missed parcel deliveries, unpaid highway tolls, or urgent bank verification codes with short-links are designed to catch smartphone users in high-speed, distracted moments.',
        keyTip: 'Do not click shortened URLs inside unsolicited SMS messages. Open your browser and navigate directly to official websites.',
      },
      {
        title: 'Voice Phishing (Vishing) & Call Impersonation',
        description:
          'Criminals call pretending to be your bank fraud team, law enforcement, or tech support, demanding immediate action to "protect your funds". Modern voice synthesis (AI cloning) makes impersonation sound increasingly convincing.',
        keyTip: 'Hang up and contact your bank using the trusted phone number printed on the back of your official payment card.',
      },
      {
        title: 'Fake Login Pages & Credential Harvesters',
        description:
          'Attackers construct pixel-perfect replicas of login pages for Microsoft 365, Google, Apple, and banking portals. If you enter your password on a deceptive domain, it is immediately harvested.',
      },
      {
        title: 'Urgency & Fear: The Phisher’s Primary Lever',
        description:
          'Scammers deliberately create synthetic emergencies: "Your account will be terminated in 24 hours," "Unauthorized transaction of $1,400 detected." Artificial urgency is calculated to bypass your analytical thinking.',
      },
    ],
    practicalActions: [
      'Pause whenever an email or text demands immediate panic-driven action or monetary payment.',
      'Hover over hyperlinks (or long-press on touch devices) to preview the true destination domain before clicking.',
      'Bookmark critical banking and account portals rather than clicking links sent via emails or direct messages.',
      'Report phishing emails through your email provider’s built-in "Report Phishing" button to improve global filtering.',
    ],
    commonMisconceptions: [
      'Misconception: "I can spot phishing because phishing emails always have poor grammar." — Reality: Large Language Models and professional scam syndicates generate flawless, highly tailored communications.',
    ],
  },
  {
    id: 'account-security',
    letter: 'C',
    category: 'Account Defense',
    title: 'Account Security: MFA, Recovery & Session Auditing',
    iconName: 'ShieldCheck',
    readTime: '5 min read',
    summary:
      'Hardening account settings protects your identity even when a credential leak occurs. Implementing modern multi-factor authentication and auditing recovery pathways prevents unauthorized takeovers.',
    coreConcepts: [
      {
        title: 'Multi-Factor Authentication (MFA) Hierarchies',
        description:
          'Not all MFA methods offer equal resistance. SMS codes are susceptible to SIM swapping and interception. Dedicated authenticator apps (TOTP) provide stronger defense, while hardware security keys (FIDO2 / WebAuthn) and cryptographic passkeys offer phishing-resistant protection.',
        keyTip: 'Upgrade from SMS verification to an authenticator app (Google Authenticator, Aegis, 2FAS) or passkeys.',
      },
      {
        title: 'Securing Recovery Emails and Phone Numbers',
        description:
          'Your secondary recovery email and phone number are high-value targets. If an attacker gains control of your recovery inbox, they can trigger password resets across all connected primary accounts.',
        keyTip: 'Secure your primary recovery email account with the strongest possible authentication methods.',
      },
      {
        title: 'Login Alerts & Anomaly Notifications',
        description:
          'Most major platforms support real-time login alerts whenever an unfamiliar device, browser, or geographic region accesses your account. Receiving an unexpected login alert is an immediate call to inspect active sessions.',
      },
      {
        title: 'Routine Session & Connected Device Reviews',
        description:
          'Over time, old phones, borrowed laptops, and workplace workstations remain authenticated. Periodic session audits allow you to revoke stale tokens and force re-authentication across all unknown endpoints.',
      },
    ],
    practicalActions: [
      'Audit your primary email, cloud storage, and financial accounts to verify MFA is strictly turned on.',
      'Review the list of "Logged-in Devices" or "Active Sessions" in your major account settings and sign out of unfamiliar hardware.',
      'Save your emergency MFA backup recovery codes in a secure, encrypted offline location.',
      'Remove third-party app authorizations and permissions that you no longer actively use.',
    ],
    commonMisconceptions: [
      'Misconception: "MFA is only necessary for people with cryptocurrency or high net worth." — Reality: Basic accounts are routinely hijacked for automated spam relaying, extortion, and impersonating you to your relatives.',
    ],
  },
  {
    id: 'smartphone-security',
    letter: 'D',
    category: 'Mobile Devices',
    title: 'Smartphone Security: Permissions, Updates & Sideloading',
    iconName: 'Smartphone',
    readTime: '6 min read',
    summary:
      'Smartphones carry our private conversations, financial applications, and two-factor tokens. Proper device configuration, mindful app permissions, and avoiding untrusted installation sources keep mobile data safe.',
    coreConcepts: [
      {
        title: 'Auditing App Permissions with Data Minimization',
        description:
          'Mobile operating systems isolate apps, but users frequently grant broad permissions without reading prompts. Does a simple calculator or wallpaper app genuinely need access to your microphone, location, and contact list?',
        keyTip: 'Select "Only while using the app" or "Ask every time" for sensitive permissions like location and camera.',
      },
      {
        title: 'Timely Mobile OS & Security Patching',
        description:
          'Smartphones are complex systems with frequent patches addressing discovered vulnerabilities in web engines, Bluetooth, and cellular modems. Installing monthly software updates protects against zero-click exploits.',
      },
      {
        title: 'Screen Locks & Biometric Hygiene',
        description:
          'A lost or momentarily unattended phone without a robust lock screen exposes your entire digital life. Use a 6-digit PIN, complex alphanumeric password, or biometrics. Avoid simple patterns or easily guessable dates.',
      },
      {
        title: 'Malicious Apps & Sideloading Dangers',
        description:
          'Downloading unauthorized APK files from untrusted third-party websites bypasses built-in app store malware screening. Fraudulent apps often masquerade as free streaming utilities, photo editors, or banking assistants.',
        keyTip: 'Stick strictly to official app stores (Google Play, Apple App Store) and inspect developer reputations and user reviews.',
      },
      {
        title: 'Public Wi-Fi & Bluetooth Considerations on Mobile',
        description:
          'Smartphones continuously beacon for known wireless networks. Disable automatic network joining and keep Bluetooth off when traveling through crowded public venues unless actively paired.',
      },
    ],
    practicalActions: [
      'Open your smartphone settings and review permissions granted for Microphone, Camera, Location, and Contacts.',
      'Uninstall applications you have not used in the past 6 months to reduce attack surface.',
      'Configure your lock screen to hide sensitive notifications (such as OTPs) from displaying when the device is locked.',
      'Enable "Find My Device" (Android) or "Find My" (Apple) with remote wipe capability in case of physical loss.',
    ],
    commonMisconceptions: [
      'Misconception: "Smartphones cannot get infected by malware." — Reality: While sandboxed, smartphones can be compromised through rogue apps, malicious profiles, and deceptive permission grants.',
    ],
  },
  {
    id: 'computer-security',
    letter: 'E',
    category: 'Endpoint Protection',
    title: 'Computer Security: OS Patching, Antivirus & Downloads',
    iconName: 'Laptop',
    readTime: '6 min read',
    summary:
      'Laptops and desktop computers handle complex files, software installations, and heavy browsing. Modern endpoint defense relies on operating system hygiene, built-in protection tools, and safe download disciplines.',
    coreConcepts: [
      {
        title: 'Operating System Updates & Firmware',
        description:
          'Modern operating systems release routine security updates that repair zero-day bugs. Postponing reboots for months leaves your system vulnerable to weaponized exploit kits that target unpatched computers.',
        keyTip: 'Set Windows Update or macOS Software Update to automatic and reboot when updates are pending.',
      },
      {
        title: 'Built-in Antivirus vs. Deceptive Utility Tools',
        description:
          'Modern native security tools (like Windows Security / Microsoft Defender and macOS XProtect) provide robust, non-intrusive real-time protection. Be cautious of aggressive pop-ups urging you to buy third-party "PC cleaners" or "registry fixers".',
      },
      {
        title: 'Browser Hardening & Extension Audit',
        description:
          'Browsers are the primary gateway to the internet. Rogue browser extensions can silently read your keystrokes, inject advertisements, or intercept session cookies. Keep installed extensions minimal and audited.',
        keyTip: 'Remove extensions that you no longer actively utilize; install only well-known, highly rated extensions.',
      },
      {
        title: 'Safe Download Disciplines',
        description:
          'Malicious actors frequently disguise trojans as torrented software, video codecs, cheats, or PDF documents with hidden executable extensions (e.g., document.pdf.exe). Verify the file type before executing.',
      },
      {
        title: 'Removable Storage & Untrusted USB Peripherals',
        description:
          'Plugging an unfamiliar USB drive into your computer carries substantial risk. Specially crafted USB devices can emulate keyboard strokes (BadUSB) to execute hidden commands in seconds.',
        keyTip: 'Never plug in abandoned, promotional, or unfamiliar USB drives found in public places.',
      },
    ],
    practicalActions: [
      'Verify that your system’s native security suite (e.g., Windows Defender) is active and running up-to-date definitions.',
      'Audit browser extensions across Chrome, Edge, Safari, or Firefox and eliminate redundant add-ons.',
      'Enable full-disk encryption (BitLocker on Windows, FileVault on macOS) to safeguard local data if your device is stolen.',
      'Establish a separate non-administrator daily user account on your computer for everyday web browsing and tasks.',
    ],
    commonMisconceptions: [
      'Misconception: "Mac computers are completely immune to viruses and cyber attacks." — Reality: macOS malware, adware, and info-stealers have grown dramatically in sophistication as Mac market share has expanded.',
    ],
  },
  {
    id: 'social-media-safety',
    letter: 'F',
    category: 'Online Communities',
    title: 'Social Media Safety: Privacy, Impersonation & Oversharing',
    iconName: 'UserCheck',
    readTime: '5 min read',
    summary:
      'Social platforms encourage transparent sharing, but excessive disclosure provides fuel for identity theft, social engineering, and targeted scams. Setting boundaries protects your network from impersonation.',
    coreConcepts: [
      {
        title: 'Granular Privacy Settings',
        description:
          'By default, many social platforms make your profile, friends list, and historical posts publicly visible to the entire web. Setting your profile visibility to friends-only curtails automated scraping and reconnaissance.',
      },
      {
        title: 'Recognizing Fake Profiles & Impersonation',
        description:
          'Scammers duplicate profile photos and names of people you know, then send new connection requests claiming: "My old account was locked, please add this new one." Once connected, they request urgent funds or verification codes.',
        keyTip: 'If a friend sends an unexpected secondary connection request, verify with them in person or via phone before accepting.',
      },
      {
        title: 'Account Takeover Tactics',
        description:
          'Compromised social media accounts are weaponized against the victim’s own contact list. When attackers hijack an account, they message friends with urgent requests for financial assistance or deceptive voting links.',
      },
      {
        title: 'The Hidden Risks of Oversharing',
        description:
          'Posting photos of boarding passes exposes reservation codes (PNRs) and passport data. Sharing vacation status alerts burglars that your home is empty. Answering casual online quizzes reveals answers to common security questions (first car, elementary school, childhood pet).',
        keyTip: 'Never share high-resolution images of identity documents, keys, boarding passes, or work badges.',
      },
      {
        title: 'Deceptive Links & Bait Messages',
        description:
          'Messages like "Is this you in this video?" or "Vote for my photography entry to win" lead to fake social login pages designed to harvest credentials.',
      },
    ],
    practicalActions: [
      'Review your account privacy settings across all social apps and restrict profile visibility to trusted connections.',
      'Search your name on popular search engines to see what public personal information is openly accessible.',
      'Never disclose real personal history (mother’s maiden name, pet name) when configuring security recovery questions—use random phrases stored in your password manager.',
      'Turn on two-factor authentication on every social media account to prevent takeover.',
    ],
    commonMisconceptions: [
      'Misconception: "Only celebrities or influencers get impersonated on social media." — Reality: Scammers frequently clone ordinary users because mutual friends and family are far more likely to trust an urgent message from them.',
    ],
  },
  {
    id: 'online-shopping-safety',
    letter: 'G',
    category: 'E-Commerce Defense',
    title: 'Online Shopping Safety: Fake Stores & Payment Security',
    iconName: 'ShoppingCart',
    readTime: '6 min read',
    summary:
      'Online shopping is convenient, but predatory websites, typosquatting domains, and fraudulent storefronts proliferate during seasonal sales. Spotting deceptive retail operations protects your money and payment card numbers.',
    coreConcepts: [
      {
        title: 'Spotting Fake Online Stores',
        description:
          'Criminals clone legitimate brand interfaces and run targeted ads on search engines and social platforms. Warning indicators include newly registered domain names, absence of physical contact details, and nonexistent customer service channels.',
        keyTip: 'Look for clear company information, a physical address, verifiable customer policies, and independent reviews.',
      },
      {
        title: 'Unrealistic & Suspicious Discounts',
        description:
          'Offers promoting 80% to 90% price reductions on trending electronics, luxury apparel, or hard-to-find gaming consoles are almost always fraudulent. The goal is either harvesting card details or charging money without shipping goods.',
      },
      {
        title: 'Choosing Safe Payment Methods',
        description:
          'Credit cards and trusted payment processors offer statutory fraud protection and dispute/chargeback mechanisms. Direct wire transfers, debit cards, cryptocurrency, or gift cards provide zero consumer recourse once funds are transferred.',
        keyTip: 'Never pay for goods online via peer-to-peer wire transfers, cryptocurrency, or retail gift card codes.',
      },
      {
        title: 'Domain & URL Checking Disciplines',
        description:
          'Fraudsters use lookalike characters (typosquatting) like "amaz0n-sale.co" or "nikestore-discount-outlet.shop". Check the browser address bar carefully before entering payment credentials.',
      },
      {
        title: 'Refund & Overpayment Deceptions',
        description:
          'Scammers contact buyers claiming an accidental overpayment or cancelled order refund, instructing the buyer to download remote software to "reverse" the charge. This is a classic pretext to manipulate banking balances.',
      },
    ],
    practicalActions: [
      'Use virtual or single-use debit/credit cards when purchasing from new or unfamiliar retailers.',
      'Check independent consumer review aggregators (Trustpilot, Better Business Bureau) before buying from a new domain.',
      'Ensure the checkout URL contains legitimate SSL/TLS and uses the authentic domain name of the retailer.',
      'Keep documentation, confirmation receipts, and transaction IDs for all online purchases.',
    ],
    commonMisconceptions: [
      'Misconception: "If a checkout page has a padlock icon, the seller is guaranteed to be honest." — Reality: The padlock only means the data transfer is encrypted; any fraudster can obtain a free SSL certificate for a malicious website.',
    ],
  },
  {
    id: 'digital-payments',
    letter: 'H',
    category: 'Financial Protection',
    title: 'Digital Payment Safety: OTPs, QR Codes & Support Scams',
    iconName: 'CreditCard',
    readTime: '6 min read',
    summary:
      'Mobile wallets, peer-to-peer payments, and instant banking rails facilitate instant transactions. Because digital payments settle instantly, understanding how scammers manipulate payment requests is critical.',
    coreConcepts: [
      {
        title: 'The Golden Rule of One-Time Passwords (OTPs)',
        description:
          'One-Time Passcodes are dynamic authorization keys for releasing money or changing security credentials. Banks and payment apps will never call or message asking you to provide an OTP to "cancel a charge" or "verify your identity".',
        keyTip: 'Treat OTPs like physical cash: never read them aloud, type them into unfamiliar links, or forward them.',
      },
      {
        title: 'UPI & Payment Request Deceptions',
        description:
          'A pervasive scam in instant payment systems involves tricking victims who are attempting to receive money (e.g., selling an item online). Scammers send a "Collect Request" or QR code and tell the victim to enter their PIN to "receive payment".',
        keyTip: 'You NEVER need to enter your PIN or passcode to RECEIVE funds. Entering your PIN always sends money.',
      },
      {
        title: 'QR Code Risks ("Quishing")',
        description:
          'QR codes are simply visual representations of URLs or payment intents. Fraudulent stickers placed over legitimate restaurant or parking meter QR codes can direct your device to deceptive phishing payment portals.',
        keyTip: 'Inspect physical QR code stickers to ensure they have not been pasted over genuine signs before scanning.',
      },
      {
        title: 'Fake Customer Support Phone Numbers',
        description:
          'When payment transactions encounter a delay, frantic users often search online for "app customer support hotline". Scammers plant fake phone numbers on Google Maps and search ads, answering as agents and instructing users to install screen-sharing tools.',
      },
      {
        title: 'Zero Sharing of PINs, CVVs, and Passwords',
        description:
          'Your Card Verification Value (CVV), ATM PIN, wallet PIN, and online banking password must remain strictly confidential. No legitimate security investigation ever requires customer credential disclosure.',
      },
    ],
    practicalActions: [
      'Read the full text of every SMS notification accompanying an OTP: note the exact amount and merchant listed.',
      'Access customer support exclusively through the official help menu within your banking app, never through generic web search results.',
      'Set conservative daily transfer and transaction limits on your payment wallets and bank accounts.',
      'Enable instant push notifications for all debit and credit card transactions to detect anomalies immediately.',
    ],
    commonMisconceptions: [
      'Misconception: "Entering my secret PIN confirms that I am the authorized recipient of funds." — Reality: Entering your PIN ALWAYS authorizes a debit from your account. Receiving money never requires a PIN.',
    ],
  },
  {
    id: 'privacy-protection',
    letter: 'I',
    category: 'Privacy & Data Rights',
    title: 'Privacy Protection: Data Minimization & Digital Footprint',
    iconName: 'EyeOff',
    readTime: '5 min read',
    summary:
      'Online privacy is not about secrecy—it is about retaining control over your personal data. Limiting data collection curtails profiling, reduces exposure in corporate breaches, and starves spear-phishing campaigns.',
    coreConcepts: [
      {
        title: 'Personal Information Minimization',
        description:
          'Websites and loyalty forms frequently request unnecessary details such as birthdays, phone numbers, and street addresses. Practice data minimization: leave non-mandatory fields blank.',
        keyTip: 'Whenever a form asks for optional personal details, leave them empty.',
      },
      {
        title: 'App Permissions and Location Tracking',
        description:
          'Many smartphone applications continuously harvest background GPS coordinates and transmit them to data aggregators. Restrict location permissions to essential navigation services only.',
      },
      {
        title: 'Browser Privacy & Ad Trackers',
        description:
          'Third-party trackers follow your journey across the web, building persistent behavioral dossiers used for microtargeted manipulation. Use privacy-focused browsers or install reputable tracker-blocking extensions.',
        keyTip: 'Consider trusted tools like uBlock Origin and privacy-respecting search engines.',
      },
      {
        title: 'Disabling Persistent Location Sharing',
        description:
          'Digital photos contain hidden EXIF metadata including the exact GPS coordinates where the picture was taken. Stripping metadata before posting photos publicly prevents disclosing your home or child’s school location.',
      },
      {
        title: 'Using Email Aliases for New Signups',
        description:
          'Modern privacy tools (such as Apple Hide My Email, Firefox Relay, or SimpleLogin) generate unique forwarding email addresses for each service, isolating breaches and stopping cross-site tracking.',
      },
    ],
    practicalActions: [
      'Audit the permissions of installed mobile apps and disable background location tracking.',
      'Use email masking or aliases when signing up for one-time discounts, forums, or newsletter subscriptions.',
      'Turn off geotagging in your phone’s camera settings or review photos before sharing them on public forums.',
      'Review your privacy dashboard on Google, Apple, and Microsoft to purge accumulated location and search histories.',
    ],
    commonMisconceptions: [
      'Misconception: "Private / Incognito browsing makes me completely anonymous on the internet." — Reality: Incognito mode only prevents your local browser from saving cookies and history on your device; websites, network operators, and ISPs still observe your traffic.',
    ],
  },
  {
    id: 'public-wifi',
    letter: 'J',
    category: 'Network Security',
    title: 'Public Wi-Fi & Network Safety: Risks, HTTPS & Caution',
    iconName: 'Wifi',
    readTime: '5 min read',
    summary:
      'Connecting to open wireless networks in airports, hotels, and cafes exposes devices to local eavesdropping and rogue access points. Knowing how to safeguard network traffic prevents sensitive data leakage.',
    coreConcepts: [
      {
        title: 'The Real Risks of Unknown Wireless Networks',
        description:
          'Attackers can deploy cheap portable Wi-Fi routers (an "evil twin" attack) broadcasting names identical to legitimate venue Wi-Fi (e.g., "Airport_Free_Guest_WiFi"). Connecting routes your unencrypted device traffic directly through the attacker’s machine.',
        keyTip: 'Confirm the legitimate network name and credentials with staff before connecting.',
      },
      {
        title: 'What HTTPS Protects—and What It Does Not',
        description:
          'HTTPS encrypts data exchanged between your browser and the website, preventing casual eavesdroppers from reading passwords in plain text. However, HTTPS does not hide the domain names you visit (via DNS requests) or protect against phishing sites and malicious captive portals.',
      },
      {
        title: 'Conducting Sensitive Transactions Safely',
        description:
          'Avoid logging into critical banking accounts, filing taxes, or completing large financial transfers while connected to public untrusted networks. If urgent, disconnect from Wi-Fi and use your smartphone’s cellular data connection.',
        keyTip: 'Cellular data (4G/5G) is inherently more isolated and secure than public unauthenticated Wi-Fi.',
      },
      {
        title: 'Disabling Local Network File Sharing',
        description:
          'Operating systems offer file and printer sharing for trusted home networks. When connecting to public Wi-Fi, ensure your network profile is set to "Public" so Windows Network Discovery or macOS AirDrop restricts open ports.',
      },
    ],
    practicalActions: [
      'Disable "Auto-Connect to Open Wi-Fi Networks" in your smartphone and laptop Wi-Fi settings.',
      'Prefer your mobile device’s personal cellular hotspot over unverified free public networks.',
      'Configure DNS-over-HTTPS (DoH) or secure DNS (like Quad9 or Cloudflare 1.1.1.1) to encrypt DNS queries.',
      'Turn off network file sharing and set your computer network classification to "Public Network".',
    ],
    commonMisconceptions: [
      'Misconception: "If the hotel or cafe Wi-Fi asks for a room number or password, it is completely secure." — Reality: Any other guest connected to that same shared password can still attempt local network reconnaissance.',
    ],
  },
];

// ==========================================
// 3. 10 RED FLAGS OF A POTENTIAL ONLINE SCAM
// ==========================================
export const SCAM_RED_FLAGS: RedFlagItem[] = [
  {
    number: 1,
    title: 'Unexpected Artificial Urgency',
    summary: 'Demanding immediate action within minutes to resolve an alleged crisis.',
    tacticExplanation:
      'Scammers fabricate artificial deadlines ("Your account will be suspended in 15 minutes", "Arrest warrant issued") to trigger panic and bypass critical analysis.',
    realWorldScenario:
      'An email warning that an unauthorized $1,200 charge will process permanently unless you click a link within 10 minutes.',
    defensiveAction:
      'Deliberately slow down. Step away from the screen. Genuine organizations provide reasonable windows to verify legitimate issues.',
  },
  {
    number: 2,
    title: 'Requests for OTPs, Passwords, or PINs',
    summary: 'Soliciting temporary security codes, account credentials, or master passwords.',
    tacticExplanation:
      'Attackers who already have your username trigger a password reset or financial debit, then contact you to extract the authorization code sent to your phone.',
    realWorldScenario:
      'A caller claiming to be from your bank asks: "I just sent a 6-digit confirmation code to your phone to stop the fraud. Please read it to me."',
    defensiveAction:
      'Never read or share one-time passcodes with anyone. Banks and service desks never ask for your temporary verification codes.',
  },
  {
    number: 3,
    title: 'Pressure to Transfer Money Immediately',
    summary: 'Urging you to move funds to "safe accounts" or pay via irreversible channels.',
    tacticExplanation:
      'Criminals insist on payment methods that offer zero consumer recourse: wire transfers, cryptocurrency, gift cards, or instant payment apps.',
    realWorldScenario:
      'A caller posing as a government tax officer orders you to settle an overdue fee immediately using retail gift cards.',
    defensiveAction:
      'Refuse payment immediately. Government agencies, utility providers, and financial institutions never demand payment in gift cards or crypto.',
  },
  {
    number: 4,
    title: 'Suspicious, Mismatched, or Lookalike URLs',
    summary: 'Web addresses featuring subtle typos, hyphens, or wrong top-level domains.',
    tacticExplanation:
      'Typosquatting mimics familiar brand domains using lookalike letters (homographs) or extra subdomains (e.g., login.apple.com.scam-verify.net).',
    realWorldScenario:
      'A message linking to "netflix-billing-update-center.org" instead of the legitimate "netflix.com".',
    defensiveAction:
      'Read URLs from right to left before the first single slash to identify the actual registered root domain.',
  },
  {
    number: 5,
    title: 'Unexpected Attachments or Archive Files',
    summary: 'Unsolicited emails carrying .zip, .iso, .exe, or macro-enabled documents.',
    tacticExplanation:
      'Attachments are disguised as invoices, receipts, or legal notices to trick victims into executing background malware or info-stealers.',
    realWorldScenario:
      'An email with subject "Overdue Invoice #8921" containing a password-protected zip file containing a malicious executable.',
    defensiveAction:
      'Do not download or open unexpected attachments. Confirm the request out-of-band with the purported sender via a trusted channel.',
  },
  {
    number: 6,
    title: 'Requests to Install Remote-Access Software',
    summary: 'Instructions to download AnyDesk, TeamViewer, UltraViewer, or QuickSupport.',
    tacticExplanation:
      'Remote-access software grants the scammer full visual and keyboard control over your computer, allowing them to initiate wire transfers while blinding you.',
    realWorldScenario:
      'A fake tech support technician claims your computer is transmitting viruses and instructs you to download a remote utility so they can "fix it".',
    defensiveAction:
      'Never allow unverified incoming callers to install remote support tools on your personal or work devices.',
  },
  {
    number: 7,
    title: 'Guaranteed Returns or Risk-Free Investments',
    summary: 'Promises of 100% guaranteed profits, rapid doubling of funds, or insider trading tips.',
    tacticExplanation:
      'All legitimate financial investments carry risk. High returns with zero risk are the hallmark of Ponzi schemes, pig butchering scams, and crypto fraud.',
    realWorldScenario:
      'A social media contact recommends an exclusive automated algorithmic trading platform promising 5% guaranteed daily yield.',
    defensiveAction:
      'Be skeptical of unsolicited investment recommendations. Verify financial entities through your national financial regulatory registry.',
  },
  {
    number: 8,
    title: 'Fake Claims of Authority or Law Enforcement',
    summary: 'Impersonating police, tax authorities, customs officials, or senior company executives.',
    tacticExplanation:
      'Scammers exploit innate respect for authority and fear of legal consequences to coerce targets into compliance without questioning.',
    realWorldScenario:
      'An automated robocall claiming your social security number or national ID has been implicated in a federal crime and you face imminent arrest.',
    defensiveAction:
      'Official law enforcement and tax authorities communicate through certified mail, never by threatening arrest over cold phone calls.',
  },
  {
    number: 9,
    title: 'Requests to Move Conversations to Off-Platform Channels',
    summary: 'Attempting to shift communication from protected marketplaces to WhatsApp or Telegram.',
    tacticExplanation:
      'Online marketplaces (eBay, Airbnb, Upwork) provide automated fraud detection and buyer protection. Moving off-platform eliminates safeguards.',
    realWorldScenario:
      'A buyer on an e-commerce platform insists on completing the deal via Telegram to "save fees" and sends an unverified payment link.',
    defensiveAction:
      'Keep all communications and financial transactions strictly within the official marketplace platform.',
  },
  {
    number: 10,
    title: 'Offers That Seem Unbelievably Good to Be True',
    summary: 'Free high-end smartphones, luxury vacation prizes, or unexpected lottery jackpots.',
    tacticExplanation:
      'Dangling an enticing prize creates cognitive euphoria, causing victims to overlook processing fees, shipping deposits, or credential forms.',
    realWorldScenario:
      'A pop-up announces: "Congratulations! You have been selected as today’s lucky winner of a brand new flagship smartphone. Pay only $2 shipping."',
    defensiveAction:
      'If you did not enter a verified contest, you did not win. Close the window and delete unsolicited notifications.',
  },
];

// ==========================================
// 4. EMERGENCY RESPONSE GUIDANCE (6 Clear Steps)
// ==========================================
export const EMERGENCY_STEPS: EmergencyStepItem[] = [
  {
    stepNumber: 1,
    title: 'Stop Interacting Immediately',
    action: 'Sever all communication with the suspected scammer on all channels.',
    details: [
      'Hang up the phone call immediately; do not engage in further debate or let them persuade you.',
      'Cease replying to emails, text messages, or direct messaging channels.',
      'Block the phone numbers, social media profiles, and email addresses involved.',
      'If remote-access software was installed, immediately disconnect your computer from Wi-Fi or pull the Ethernet cable.',
    ],
    criticalWarning:
      'Scammers will often call back aggressively from spoofed local numbers to regain psychological control. Do not answer.',
  },
  {
    stepNumber: 2,
    title: 'Do Not Send Additional Funds or Data',
    action: 'Halt all pending transfers, fees, or secondary verification requests.',
    details: [
      'Scammers often claim an extra "clearance fee", "unfreeze deposit", or "tax payment" will recover previously sent funds.',
      'Never send additional money under any circumstance—this is an extortion escalation tactic.',
      'Refrain from sharing further documents, photo IDs, or banking details.',
    ],
  },
  {
    stepNumber: 3,
    title: 'Change Affected Passwords from a Trusted Device',
    action: 'Update credentials for compromised accounts using a separate, uninfected device.',
    details: [
      'If you entered credentials on a suspicious link, change the master password for that account immediately.',
      'Use a trusted phone or clean computer to reset the password—not a machine that had remote-access software installed.',
      'If your email account was exposed, reset it first, as password resets for other services route through your email.',
      'Ensure the newly created password is long, random, and has never been used on any other website.',
    ],
  },
  {
    stepNumber: 4,
    title: 'Enable Strong Multi-Factor Authentication',
    action: 'Activate MFA on all core accounts to block unauthorized re-entry.',
    details: [
      'Turn on MFA across your email, financial institutions, cloud storage, and social accounts.',
      'Select authenticator apps (TOTP) or hardware passkeys rather than SMS codes where available.',
      'Generate and store emergency recovery codes in a secure offline location.',
    ],
  },
  {
    stepNumber: 5,
    title: 'Contact Relevant Bank or Payment Providers',
    action: 'Notify your financial institution to freeze compromised cards or reverse transfers.',
    details: [
      'Call the official fraud hotline printed directly on the back of your payment card or official banking statement.',
      'Inform the representative that your card, account number, or login credentials may have been compromised.',
      'Request an immediate block on affected debit/credit cards and ask for a replacement card with new numbers.',
      'Ask the bank fraud department whether recent unauthorized transactions can be disputed or recalled.',
    ],
  },
  {
    stepNumber: 6,
    title: 'Report Incident to Official Authorities',
    action: 'File an official report through your country’s designated cybercrime reporting agency.',
    details: [
      'Document everything: save screenshots, message transcripts, sender email addresses, transaction IDs, and timestamps.',
      'Submit a formal report to your country’s official national cybercrime or consumer fraud reporting authority.',
      'Report fake accounts or abusive behavior directly to the hosting platform (e.g., social media or email provider).',
      'Filing a formal police or cybercrime report establishes an official record often required by banks to process insurance or dispute claims.',
    ],
    criticalWarning:
      'Beware of secondary "recovery scammers" on social media or search engines claiming they can hack scammers to get your money back. Only official authorities and legitimate banks can assist.',
  },
];

// ==========================================
// 5. SECURITY HABITS SCORECARD (8 Assessment Questions)
// ==========================================
export const SCORECARD_QUESTIONS: ScorecardQuestion[] = [
  {
    id: 'score-passwords',
    question: 'Do you use unique, distinct passwords for each of your important accounts?',
    category: 'Password Security',
    whyItMatters:
      'Password reuse is the number one cause of cascading account compromises following third-party data breaches.',
    adviceIfNo:
      'Begin by adopting a reputable password manager and replacing reused passwords on your primary email and banking accounts with distinct passphrases.',
  },
  {
    id: 'score-mfa',
    question: 'Is multi-factor authentication (MFA) enabled on your primary email and banking portals?',
    category: 'Account Protection',
    whyItMatters:
      'MFA blocks over 90% of automated credential attacks even if an attacker manages to obtain your correct password.',
    adviceIfNo:
      'Open your account security settings today and set up an authenticator app (such as Google Authenticator, Aegis, or 2FAS) or passkeys.',
  },
  {
    id: 'score-updates',
    question: 'Are automatic security updates enabled on your computer and smartphone?',
    category: 'Device Hygiene',
    whyItMatters:
      'Updates repair known security bugs that cybercriminals automate attacks against across the internet.',
    adviceIfNo:
      'Visit your device settings and verify that automatic system updates and app updates are switched ON.',
  },
  {
    id: 'score-links',
    question: 'Do you routinely inspect destination URLs before clicking links in unexpected messages?',
    category: 'Phishing Awareness',
    whyItMatters:
      'Phishing links frequently mimic genuine brands using deceptive domains to harvest credentials and payment cards.',
    adviceIfNo:
      'Practice pausing before clicking. Check the actual web address or navigate to the official portal directly via your browser bookmarks.',
  },
  {
    id: 'score-otps',
    question: 'Do you strictly avoid sharing one-time passcodes (OTPs) and PINs over the phone or chat?',
    category: 'Payment Defense',
    whyItMatters:
      'OTPs are digital authorization keys that release money or transfer ownership of accounts; banks never ask you to disclose them.',
    adviceIfNo:
      'Adopt an unbreakable zero-sharing rule: under no circumstances read or forward a temporary security passcode to anyone.',
  },
  {
    id: 'score-permissions',
    question: 'Do you review and minimize the permissions requested by installed smartphone apps?',
    category: 'Privacy Control',
    whyItMatters:
      'Unrestricted background permissions expose your real-time location, microphone, and contacts to commercial brokers and potential malware.',
    adviceIfNo:
      'Open your smartphone’s App Settings and audit permissions, turning off location and microphone for apps that do not strictly need them.',
  },
  {
    id: 'score-backups',
    question: 'Do you maintain regular offline or encrypted cloud backups of your essential files and photos?',
    category: 'Data Resilience',
    whyItMatters:
      'Hardware failures, accidental deletion, and ransomware can destroy your memories and critical documents without recovery options.',
    adviceIfNo:
      'Implement an automated backup routine using an encrypted cloud provider or an external drive stored safely disconnected from your computer.',
  },
  {
    id: 'score-reporting',
    question: 'Do you know how to safely report a suspected cyber incident or scam in your jurisdiction?',
    category: 'Incident Readiness',
    whyItMatters:
      'Swift reporting enables financial institutions to freeze transactions and helps authorities track down criminal syndicates.',
    adviceIfNo:
      'Familiarize yourself with your national cybercrime portal and bookmark your bank’s official 24/7 fraud reporting telephone line.',
  },
];

// ==========================================
// 6. CYBER SAFETY MYTHS (4 Key Myths vs Facts)
// ==========================================
export const CYBER_MYTHS: CyberMythItem[] = [
  {
    id: 'myth-only-large-companies',
    myth: 'Only large corporations and wealthy individuals get targeted by hackers.',
    reality: 'Everyday internet users and small organizations are prime targets for automated attacks.',
    explanation:
      'Most cybercrime is not targeted by a human sitting at a console aiming at you specifically. Automated bots scan millions of IP addresses, test leaked passwords against consumer websites, and blast millions of phishing emails simultaneously. Ordinary users are attractive because they typically have fewer security defenses.',
    takeaway: 'Baseline cyber hygiene is essential for everyone who uses a smartphone or computer.',
  },
  {
    id: 'myth-familiar-logo',
    myth: 'If an email or website displays a familiar brand logo, it must be genuine.',
    reality: 'Brand logos, fonts, and email formats are trivial for any scammer to copy and paste.',
    explanation:
      'Anyone can save high-resolution logos from Google, Microsoft, Amazon, or banks and insert them into deceptive templates. Modern AI and automated website scrapers replicate legitimate landing pages with pixel-perfect precision within minutes.',
    takeaway: 'Verify the sender’s actual domain address and security headers, not graphical logos.',
  },
  {
    id: 'myth-https-is-trustworthy',
    myth: 'HTTPS and the browser padlock icon mean the website is legitimate and safe.',
    reality: 'HTTPS proves your connection is encrypted; it does not prove the website owner is honest.',
    explanation:
      'HTTPS (Hypertext Transfer Protocol Secure) ensures that traffic between your browser and the website cannot be intercepted by eavesdroppers on your Wi-Fi network. However, scammers can obtain free, automated SSL certificates for malicious phishing domains just as easily as legitimate businesses.',
    takeaway: 'A padlock ensures a secure connection to the server—even if that server belongs to a fraudster.',
  },
  {
    id: 'myth-nothing-to-hide',
    myth: 'I have nothing important on my devices, so online privacy does not matter to me.',
    reality: 'Your personal data, contacts, and accounts have high financial and social value to criminals.',
    explanation:
      'Even if you do not consider yourself wealthy, your email account is the master key to your digital identity. Compromised accounts are used to impersonate you to your family, commit tax fraud, open fraudulent credit lines, or act as an anonymous botnet relay for attacking others.',
    takeaway: 'Privacy is about protecting your identity, family, and autonomy from exploitation.',
  },
];

// ==========================================
// 7. BEGINNER ROADMAP (6 Progressive Levels)
// ==========================================
export const SAFETY_ROADMAP_LEVELS: RoadmapLevelItem[] = [
  {
    level: 1,
    title: 'Secure Your Accounts',
    subtitle: 'Foundation: Passwords & MFA',
    description:
      'Lock down your digital front doors. Eliminate password reuse, set up an encrypted password vault, and activate multi-factor authentication on every critical service.',
    milestones: [
      'Deploy an audited password manager',
      'Generate 16+ character passphrases',
      'Turn on authenticator app MFA for primary email & banking',
      'Store emergency account recovery codes offline',
    ],
    status: 'Current Guide',
    href: '#safety-checklist',
    iconName: 'KeyRound',
  },
  {
    level: 2,
    title: 'Recognize Scams',
    subtitle: 'Awareness: Social Engineering & Deception',
    description:
      'Develop cognitive reflexes to spot manipulation. Identify phishing emails, smishing texts, fake calls, urgent payment requests, and fraudulent shopping domains.',
    milestones: [
      'Master the 10 scam red flags',
      'Learn domain and URL inspection',
      'Understand payment OTP mechanics',
      'Practice calm pauses during urgent incoming demands',
    ],
    status: 'Scam Hub',
    href: '#red-flags',
    iconName: 'MailWarning',
  },
  {
    level: 3,
    title: 'Protect Your Devices',
    subtitle: 'Hardening: Operating Systems & Endpoints',
    description:
      'Turn smartphones, laptops, and home computers into resilient bastions. Keep software updated, manage app permissions, and prevent rogue installations.',
    milestones: [
      'Enable automated OS & browser patching',
      'Turn on full-disk encryption (BitLocker / FileVault)',
      'Audit smartphone permissions (camera, location, mic)',
      'Establish a 3-2-1 backup strategy for crucial data',
    ],
    status: 'Current Guide',
    href: '#safety-topics',
    iconName: 'Laptop',
  },
  {
    level: 4,
    title: 'Improve Your Privacy',
    subtitle: 'Footprint: Telemetry & Data Minimization',
    description:
      'Take control of your personal digital footprint. Restrict ad trackers, minimize shared details, use email aliases, and audit public social media profiles.',
    milestones: [
      'Lock down social media profiles to friends-only',
      'Use tracker-blocking DNS and browser extensions',
      'Deploy email masking aliases for commercial accounts',
      'Audit personal records on search engines',
    ],
    status: 'Current Guide',
    href: '#safety-topics',
    iconName: 'EyeOff',
  },
  {
    level: 5,
    title: 'Learn Cybersecurity',
    subtitle: 'Knowledge: How Networks & Systems Work',
    description:
      'Advance from basic user safety to understanding cybersecurity principles: network architecture, encryption protocols, web security basics, and defense-in-depth.',
    milestones: [
      'Understand TCP/IP, DNS, and TLS handshakes',
      'Learn how firewalls and zero-trust architectures operate',
      'Explore OWASP Top 10 web vulnerabilities',
      'Study incident response and threat modeling',
    ],
    status: 'Available',
    href: '/#learn',
    iconName: 'Compass',
  },
  {
    level: 6,
    title: 'Explore Ethical Hacking',
    subtitle: 'Mastery: Offensive Analysis for Defensive Hardening',
    description:
      'Discover how ethical security professionals identify vulnerabilities before malicious attackers do. Learn ethical disclosure and hands-on lab techniques.',
    milestones: [
      'Study legal and ethical disclosure frameworks',
      'Understand vulnerability scanning & penetration testing basics',
      'Analyze binary and network protocol anomalies',
      'Participate in authorized Capture The Flag (CTF) challenges',
    ],
    status: 'Coming Soon',
    href: '#',
    iconName: 'Terminal',
  },
];

// ==========================================
// 8. TRUST TENETS (Brand Credibility)
// ==========================================
export const TRUST_TENETS = [
  {
    title: 'Threats Continually Evolve',
    description:
      'Attack tactics change rapidly as new technologies and AI tools emerge. Defensive education must focus on foundational principles and critical thinking rather than rigid, outdated rules.',
    iconName: 'Flame',
  },
  {
    title: 'No Guaranteed 100% Protection',
    description:
      'No single tool, practice, or vendor can guarantee absolute security. Resilient defense is built in layers—if one safeguard is bypassed, other layers minimize the potential damage.',
    iconName: 'ShieldAlert',
  },
  {
    title: 'Verify via Trusted Official Sources',
    description:
      'Whenever in doubt about unexpected security notices or banking demands, independently verify through official published telephone numbers or authentic primary websites.',
    iconName: 'CheckCircle2',
  },
  {
    title: 'Educational Guidance, Not Legal or IR Advice',
    description:
      'CyberAntigravity provides independent educational guidance. Our content is not a substitute for formal professional incident response, law enforcement action, or specialized legal counsel.',
    iconName: 'Info',
  },
];

// ==========================================
// 9. CYBER SAFETY FAQS (Structured Data & UI)
// ==========================================
export const CYBER_SAFETY_FAQS = [
  {
    question: 'What is the single most important cybersecurity habit for beginners?',
    answer:
      'The single most impactful habit is enabling multi-factor authentication (MFA) on your primary email and financial accounts, combined with using unique passwords stored in a password manager. MFA blocks over 90% of automated account takeover attempts even if your password is leaked in a third-party breach.',
  },
  {
    question: 'Why are passkeys considered safer than traditional passwords?',
    answer:
      'Passkeys use asymmetric public-key cryptography (WebAuthn/FIDO2) linked directly to the authentic domain name of the website. Unlike passwords, passkeys cannot be stolen in server breaches, cannot be guessed, and cannot be intercepted by phishing websites because your browser refuses to provide credentials to an illegitimate domain.',
  },
  {
    question: 'Does the padlock icon in the browser address bar mean a website is safe?',
    answer:
      'No. The padlock icon only indicates HTTPS encryption—meaning data in transit between your browser and the web server is encrypted. It does not certify that the website owner is legitimate. Scammers routinely obtain free, valid SSL certificates for malicious phishing and fake store websites.',
  },
  {
    question: 'What should I do immediately if I accidentally entered my password on a suspicious site?',
    answer:
      'Immediately open a trusted, separate browser window and log in to the authentic website to change your password. If you reuse that password on any other service (especially your primary email), change those passwords immediately as well. Finally, ensure multi-factor authentication (MFA) is turned on to block unauthorized access.',
  },
  {
    question: 'Can smartphones get infected with malware or spyware?',
    answer:
      'Yes. While modern smartphone operating systems (iOS and Android) utilize sandboxing to isolate applications, devices can still be compromised through malicious app sideloading (unverified APKs), fraudulent profiles, deceptive permission grants, and unpatched operating system vulnerabilities.',
  },
  {
    question: 'How does CyberAntigravity protect user privacy while browsing this guide?',
    answer:
      'CyberAntigravity operates with zero tracking cookies, zero behavioral advertising pixels, and zero third-party monetization scripts. All interactive checklists, entropy calculators, and self-assessments run exclusively in your local browser memory without transmitting your responses to our servers.',
  },
];

