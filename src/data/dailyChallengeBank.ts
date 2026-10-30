export type ChallengeCategory =
  | 'Phishing Defense'
  | 'Authentication'
  | 'Social Engineering'
  | 'Network Safety'
  | 'Device Hygiene'
  | 'Cloud & Application Security'
  | 'Payment & Fraud Defense';

export interface DailyChallengeOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DailyChallenge {
  id: string;
  topic: string;
  category: ChallengeCategory;
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
      'If you receive unexpected MFA pushes, reject them immediately and reset your password. Upgrade to number-matching MFA or hardware FIDO2 keys when available.',
    relatedLink: '/blog/multi-factor-authentication',
    relatedLinkText: 'Read the Complete MFA Defense Guide',
  },
  {
    id: 'daily-03',
    topic: 'Public Wi-Fi & Hotspot Security',
    category: 'Network Safety',
    difficulty: 'Beginner',
    scenario:
      'While sitting in an airport terminal, your laptop detects an open, unencrypted Wi-Fi network named "Airport_Free_HighSpeed_WiFi" with no password required.',
    question: 'Which action ensures your online activity remains private and protected?',
    options: [
      {
        id: 'A',
        text: 'Connect normally and open your online bank account to check your balance',
        isCorrect: false,
        explanation:
          'Rogue hotspots (Evil Twins) allow attackers on the same network to intercept unencrypted traffic or stage DNS redirection.',
      },
      {
        id: 'B',
        text: 'Use your phone\'s cellular personal hotspot or an encrypted VPN tunnel',
        isCorrect: true,
        explanation:
          'Correct! Cellular connections and trusted VPNs encrypt your data packets from end to end, insulating you from untrusted local Wi-Fi eavesdroppers.',
      },
      {
        id: 'C',
        text: 'Turn on Private/Incognito browsing mode to encrypt network packets',
        isCorrect: false,
        explanation:
          'Incognito mode only prevents your local browser from storing cookies and history; it does NOT encrypt packets over Wi-Fi airwaves.',
      },
      {
        id: 'D',
        text: 'Disable your computer\'s screen brightness to block packet snooping',
        isCorrect: false,
        explanation:
          'Screen brightness is a hardware display property and has zero impact on wireless network packet security.',
      },
    ],
    defenseRecommendation:
      'Treat all public unencrypted Wi-Fi as hostile. Route confidential browsing through cellular data or a verified VPN, and turn off auto-join Wi-Fi.',
    relatedLink: '/blog/practical-browser-hardening',
    relatedLinkText: 'Read Browser & Network Hardening Tactics',
  },
  {
    id: 'daily-04',
    topic: 'Password Reuse & Credential Stuffing',
    category: 'Authentication',
    difficulty: 'Beginner',
    scenario:
      'A gaming fan forum you joined five years ago suffers a database breach. You used the password "DragonShield99!" there, and also use it for your personal email and banking.',
    question: 'What is the immediate danger, and what should you do first?',
    options: [
      {
        id: 'A',
        text: 'No danger exists because the gaming forum has no money in it',
        isCorrect: false,
        explanation:
          'Attackers use automated "credential stuffing" bots to test breached username/password pairs across thousands of high-value banking and retail portals.',
      },
      {
        id: 'B',
        text: 'Immediately change that password on your email, bank, and other critical accounts to unique passphrases',
        isCorrect: true,
        explanation:
          'Correct! When one password leaks, every account sharing that password is at active risk. Each service must have a completely unique credential.',
      },
      {
        id: 'C',
        text: 'Delete the confirmation email the gaming forum sent you years ago',
        isCorrect: false,
        explanation:
          'Deleting an old email from your local inbox does not remove your breached credentials from the attacker\'s database.',
      },
      {
        id: 'D',
        text: 'Add an exclamation mark to the end of the same password everywhere',
        isCorrect: false,
        explanation:
          'Automated cracking tools easily guess simple variations (like appending a symbol or digit) to known breached passwords.',
      },
    ],
    defenseRecommendation:
      'Never reuse passwords across accounts. Use a password manager to generate distinct, complex passwords for every single platform you use.',
    relatedLink: '/tools/password-strength',
    relatedLinkText: 'Analyze Password Strength & Reuse Risks',
  },
  {
    id: 'daily-05',
    topic: 'Urgent Executive Impersonation (CEO Fraud)',
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario:
      'You receive an urgent email from "Sarah Jenkins, CEO" sent from sarah.jenkins@corp-executives-mail.com: "I am in a confidential board meeting. Please purchase $1,500 in Apple gift cards for client incentives and email me the redemption codes within 45 minutes."',
    question: 'How should you evaluate and respond to this request?',
    options: [
      {
        id: 'A',
        text: 'Comply quickly so you do not upset the CEO during an executive meeting',
        isCorrect: false,
        explanation:
          'Business Email Compromise (BEC) attacks rely on fabricated authority and urgent deadlines to coerce employees into bypassing standard financial controls.',
      },
      {
        id: 'B',
        text: 'Verify through a known internal communication channel (Slack, direct call, or in-person)',
        isCorrect: true,
        explanation:
          'Correct! Notice the external lookalike domain (@corp-executives-mail.com). Always verify financial requests via established out-of-band channels.',
      },
      {
        id: 'C',
        text: 'Reply to the email asking the CEO to provide her employee badge number',
        isCorrect: false,
        explanation:
          'Replying keeps you talking to the attacker, who can easily look up public corporate data or forge fake badge numbers.',
      },
      {
        id: 'D',
        text: 'Forward the email to all company staff to ask who wants a gift card',
        isCorrect: false,
        explanation:
          'Broadcasting scam emails creates company-wide confusion and increases the chance another colleague falls for the trap.',
      },
    ],
    defenseRecommendation:
      'Gift card payment requests are virtually always fraudulent. Formalize dual-custody verification protocols for any transfer of funds or purchasing.',
    relatedLink: '/blog/anatomy-of-deepfake-ceo-scam',
    relatedLinkText: 'Read the CEO Impersonation Breakdown',
  },
  {
    id: 'daily-06',
    topic: 'Suspicious Email Attachment with Macros',
    category: 'Device Hygiene',
    difficulty: 'Intermediate',
    scenario:
      'You receive an unsolicited email from a vendor: "Invoice_Overdue_October.docm". When you open the document, a yellow banner reads: "SECURITY WARNING: Macros have been disabled. Click [Enable Content] to view invoice amount."',
    question: 'What is the correct security posture?',
    options: [
      {
        id: 'A',
        text: 'Click [Enable Content] because invoices need macros to calculate sales tax',
        isCorrect: false,
        explanation:
          'Invoices are static receipts that never require executable code. Enabling macros executes hidden Visual Basic (VBA) scripts that download malware.',
      },
      {
        id: 'B',
        text: 'Do NOT enable content; close the file, delete it, and notify your IT/security team',
        isCorrect: true,
        explanation:
          'Correct! Macro prompts in documents from external sources are a primary distribution method for trojans, info-stealers, and ransomware loaders.',
      },
      {
        id: 'C',
        text: 'Forward the document to your personal Gmail account to see if Google opens it',
        isCorrect: false,
        explanation:
          'Forwarding malicious files to personal accounts risks infecting your personal computer and violates corporate data protection policies.',
      },
      {
        id: 'D',
        text: 'Rename the file extension to .txt and double-click it',
        isCorrect: false,
        explanation:
          'Renaming does not sanitize underlying malicious binaries or prevent script execution if re-associated.',
      },
    ],
    defenseRecommendation:
      'Never enable macros or embedded active content in documents received from outside your organization. Genuine invoices should be viewed as static PDFs.',
    relatedLink: '/scam-awareness/red-flags',
    relatedLinkText: 'Inspect Malicious Attachment Red Flags',
  },
  {
    id: 'daily-07',
    topic: 'QR Code Parking / Restaurant Tampering (Quishing)',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario:
      'You pull into a municipal parking meter. A glossy sticker with a QR code is pasted directly over the official payment instructions saying: "Scan to pay parking online and save $2.00."',
    question: 'What is the danger of scanning this physical QR code?',
    options: [
      {
        id: 'A',
        text: 'The QR code may redirect your browser to a fraudulent clone portal designed to steal payment cards',
        isCorrect: true,
        explanation:
          'Correct! Attackers paste physical stickers over legitimate public QR codes (Quishing) to hijack users into entering payment card details on clone websites.',
      },
      {
        id: 'B',
        text: 'Scanning a physical code is always safe because cities review all street stickers daily',
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
    relatedLink: '/scam-awareness/types/qr',
    relatedLinkText: 'Read the QR Code Safety Guide',
  },
  {
    id: 'daily-08',
    topic: 'UPI & Instant Payment "Receive Money" PIN Scam',
    category: 'Payment & Fraud Defense',
    difficulty: 'Beginner',
    scenario:
      'You post a used bicycle for sale online for $120. A prospective buyer messages: "I sent you the payment through UPI/Zelle! Open your payment app and enter your 6-digit secret PIN to receive the money into your bank."',
    question: 'What happens if you enter your secret PIN in this situation?',
    options: [
      {
        id: 'A',
        text: 'Your PIN is required by the banking network to verify your identity before funds can be deposited',
        isCorrect: false,
        explanation:
          'Payment networks never require a receiver to enter an authorization PIN to deposit money into their account.',
      },
      {
        id: 'B',
        text: 'Entering your PIN approves an outgoing debit request, instantly transferring $120 from your account to the scammer',
        isCorrect: true,
        explanation:
          'Correct! In modern instant payment systems (UPI, mobile banking), entering your PIN is strictly for AUTHORIZING money to LEAVE your account. You NEVER enter a PIN to receive money.',
      },
      {
        id: 'C',
        text: 'Entering your PIN creates an encrypted escrow hold that expires in 24 hours',
        isCorrect: false,
        explanation:
          'There is no escrow hold. Scammers exploit the linguistic confusion between "pay" and "request" to trigger instant financial transfers.',
      },
      {
        id: 'D',
        text: 'The app will simply convert the currency and deposit the buyer\'s cash',
        isCorrect: false,
        explanation:
          'The prompt is a debit request disguised as an incoming receipt.',
      },
    ],
    defenseRecommendation:
      'Remember the golden rule of mobile payments: You ONLY enter your secret PIN when YOU are sending money. Receiving money NEVER requires entering your PIN.',
    relatedLink: '/scam-awareness/types/banking-payment',
    relatedLinkText: 'Learn Payment & Banking Fraud Red Flags',
  },
  {
    id: 'daily-09',
    topic: 'Fake Tech Support Pop-Up with Remote Access (RAT)',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario:
      'While browsing a news site, your screen suddenly locks with loud audio sirens and a flashing red banner: "CRITICAL ALERT: Windows Defender detected Trojan Spyware. Call 1-800-555-0199 immediately. Do NOT turn off your PC."',
    question: 'What is actually happening, and what should you do?',
    options: [
      {
        id: 'A',
        text: 'Call the 1-800 number and allow the technician to install AnyDesk or TeamViewer to clean your registry',
        isCorrect: false,
        explanation:
          'Allowing remote access grants scammers full control over your PC to install real ransomware, harvest saved passwords, or plant persistent backdoors.',
      },
      {
        id: 'B',
        text: 'It is a deceptive browser locker; force-close the browser tab or task via Task Manager/Activity Monitor',
        isCorrect: true,
        explanation:
          'Correct! Web pages cannot scan your internal operating system files. These are full-screen browser script traps designed to intimidate you into calling a boiler-room call center.',
      },
      {
        id: 'C',
        text: 'Pay the $299 lifetime protection fee using Target or Apple gift cards',
        isCorrect: false,
        explanation:
          'Legitimate technology companies never demand payment via commercial gift cards or wire transfers.',
      },
      {
        id: 'D',
        text: 'Reinstall your computer\'s motherboard immediately',
        isCorrect: false,
        explanation:
          'Hardware replacement is unnecessary. Closing the browser process terminates the deceptive JavaScript loop.',
      },
    ],
    defenseRecommendation:
      'Operating system antivirus suites never instruct you to call telephone support numbers via browser pop-ups. Use Task Manager to close locked browser windows.',
    relatedLink: '/scam-awareness/types/tech-support',
    relatedLinkText: 'Explore Tech Support Scam Tactics',
  },
  {
    id: 'daily-10',
    topic: 'AI Voice Cloning & Family Emergency Scam',
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario:
      'You receive an urgent phone call. The caller sounds exactly like your sibling, sobbing frantically: "I got into a terrible car accident in another city! The police are holding me—send $2,000 for bail right now!"',
    question: 'How should you verify this extreme emotional situation before taking action?',
    options: [
      {
        id: 'A',
        text: 'Wire the $2,000 immediately via Western Union or crypto because family safety is on the line',
        isCorrect: false,
        explanation:
          'AI audio synthesis can clone a human voice with convincing fidelity using only a 3-second audio sample scraped from public social media videos.',
      },
      {
        id: 'B',
        text: 'Hang up, take a breath, and call your sibling\'s known phone number directly, or ask for a pre-agreed family safety passphrase',
        isCorrect: true,
        explanation:
          'Correct! Independent verification by calling the loved one\'s real number or requesting a private family passphrase breaks the illusion and reveals the AI impersonation.',
      },
      {
        id: 'C',
        text: 'Ask the caller what color shirt they wore three days ago',
        isCorrect: false,
        explanation:
          'Attackers frequently pivot or claim shock/concussion to explain memory gaps. Direct out-of-band contact is the only foolproof verification.',
      },
      {
        id: 'D',
        text: 'Record the call and upload it to social media for public advice',
        isCorrect: false,
        explanation:
          'Broadcasting personal phone recordings does not verify your family member\'s immediate safety and leaks your phone number.',
      },
    ],
    defenseRecommendation:
      'Agree on a private verbal "family duress passphrase" with your loved ones. If an emergency caller cannot provide the secret word, hang up and verify directly.',
    relatedLink: '/blog/ai-scams',
    relatedLinkText: 'Read the AI Scams & Voice Cloning Guide',
  },
  {
    id: 'daily-11',
    topic: 'API Key Hardcoding in Public Git Repository',
    category: 'Cloud & Application Security',
    difficulty: 'Intermediate',
    scenario:
      'While building a weekend side project, you hardcode an AWS/Stripe secret access key into a config file and run: `git commit -m "add key" && git push origin main` to a public GitHub repository.',
    question: 'What is the immediate risk, and what is the proper remediation sequence?',
    options: [
      {
        id: 'A',
        text: 'Delete the file in a new commit and push again; the key is now secure',
        isCorrect: false,
        explanation:
          'Git stores complete historical snapshots. The secret remains visible in previous commits and Git tree objects, easily downloaded by anyone.',
      },
      {
        id: 'B',
        text: 'Immediately invalidate/revoke the key in your provider console, audit access logs, and move secrets to environment variables',
        isCorrect: true,
        explanation:
          'Correct! Automated botnets continuously monitor the public GitHub event firehose, scraping and abusing exposed cloud credentials within seconds of pushing.',
      },
      {
        id: 'C',
        text: 'Wait until the end of the billing cycle to see if anyone used the key',
        isCorrect: false,
        explanation:
          'Attackers can spin up hundreds of high-capacity GPU crypto-mining instances in minutes, causing tens of thousands of dollars in unauthorized cloud bills.',
      },
      {
        id: 'D',
        text: 'Change your GitHub repository description to "Private, Do Not Look"',
        isCorrect: false,
        explanation:
          'Automated scrapers do not read descriptions; they systematically parse raw code syntax.',
      },
    ],
    defenseRecommendation:
      'Never commit credentials to version control. Use `.env` files added to `.gitignore`, utilize pre-commit secret scanners (such as GitGuardian or Gitleaks), and revoke exposed keys immediately.',
    relatedLink: '/learn',
    relatedLinkText: 'Explore Secure Coding Fundamentals',
  },
  {
    id: 'daily-12',
    topic: 'SIM Swapping & Mobile Account Hijacking',
    category: 'Authentication',
    difficulty: 'Intermediate',
    scenario:
      'Your smartphone suddenly shows "No Service" or "SOS Only" while you are at home. Five minutes later, you receive email notifications that your primary email password and banking passwords have been reset.',
    question: 'What attack has most likely occurred?',
    options: [
      {
        id: 'A',
        text: 'Your mobile phone antenna has suffered a temporary hardware malfunction',
        isCorrect: false,
        explanation:
          'Hardware failure does not trigger password reset notifications across your financial and email accounts simultaneously.',
      },
      {
        id: 'B',
        text: 'A SIM Swap attack: a fraudster tricked your mobile carrier into porting your phone number to their SIM card to intercept SMS 2FA codes',
        isCorrect: true,
        explanation:
          'Correct! SIM Swapping allows cybercriminals to hijack your cellular phone number. With control of SMS, they trigger account resets and bypass SMS-based two-factor authentication.',
      },
      {
        id: 'C',
        text: 'A nearby Wi-Fi network has jammed your 5G radio chip',
        isCorrect: false,
        explanation:
          'Wi-Fi frequency hopping cannot reprogram SIM card credentials registered at the carrier exchange.',
      },
      {
        id: 'D',
        text: 'Your phone automatically migrated to an international roaming network',
        isCorrect: false,
        explanation:
          'Roaming maintains normal connection markers and does not trigger simultaneous unauthorized password resets.',
      },
    ],
    defenseRecommendation:
      'Transition away from SMS 2FA to authenticator apps (TOTP) or hardware security keys (FIDO2). Contact your cellular carrier to add a verbal account PIN/passcode to prevent unauthorized SIM transfers.',
    relatedLink: '/scam-awareness/types/account-takeover',
    relatedLinkText: 'Learn Account Takeover Defenses',
  },
  {
    id: 'daily-13',
    topic: 'Passkeys vs Traditional Passwords',
    category: 'Authentication',
    difficulty: 'Intermediate',
    scenario:
      'An online service prompts you to upgrade from a traditional password to a cryptographic Passkey (FIDO2 / WebAuthn). You wonder why security experts consider passkeys far superior to passwords.',
    question: 'Why are passkeys immune to traditional credential phishing websites?',
    options: [
      {
        id: 'A',
        text: 'Passkeys are 128 characters long, making them impossible for humans to memorize',
        isCorrect: false,
        explanation:
          'Length alone does not stop phishing. If a credential can be entered into a form, a lookalike phishing site can still capture it.',
      },
      {
        id: 'B',
        text: 'Passkeys use public-key cryptography bound strictly to the website\'s registered domain origin, meaning a fake lookalike site cannot authenticate with your key',
        isCorrect: true,
        explanation:
          'Correct! During passkey authentication, your browser automatically signs a cryptographic challenge using the exact origin URL. Even if a phishing site looks identical, your authenticator refuses to sign for the wrong domain.',
      },
      {
        id: 'C',
        text: 'Passkeys require a government-issued photo ID scan every time you log in',
        isCorrect: false,
        explanation:
          'Passkeys do not require government ID; they unlock using device biometrics (Touch ID, Face ID, or Windows Hello) locally.',
      },
      {
        id: 'D',
        text: 'Passkeys store all your plaintext passwords in a central public blockchain',
        isCorrect: false,
        explanation:
          'Passkeys eliminate passwords entirely; private keys never leave your secure device hardware.',
      },
    ],
    defenseRecommendation:
      'Adopt passkeys wherever supported. Because they are mathematically bound to domain origins, passkeys fundamentally eliminate phishing and credential theft.',
    relatedLink: '/blog/strong-passwords',
    relatedLinkText: 'Read the Passkey & Password Security Guide',
  },
  {
    id: 'daily-14',
    topic: 'OAuth Consent Screen & Rogue Third-Party App Permissions',
    category: 'Cloud & Application Security',
    difficulty: 'Intermediate',
    scenario:
      'You install a fun online personality quiz. The "Sign in with Google" prompt appears, requesting permission to: "Read, compose, send, and permanently delete all your emails from Gmail."',
    question: 'What security principle should you apply before clicking "Allow"?',
    options: [
      {
        id: 'A',
        text: 'Click Allow because any app that uses Google OAuth has been fully audited for safety by Google engineers',
        isCorrect: false,
        explanation:
          'OAuth consent screens verify your identity, but any developer can configure an app to request dangerous permission scopes. Users must vet what permissions are requested.',
      },
      {
        id: 'B',
        text: 'Deny the request immediately; a personality quiz has zero legitimate need for full read/write access to your email inbox',
        isCorrect: true,
        explanation:
          'Correct! This is a classic illicit consent grant attack (OAuth phishing). Granting excessive permissions allows rogue applications to read your emails, steal confidential data, and pivot into other accounts.',
      },
      {
        id: 'C',
        text: 'Allow access, then quickly change your Google password to kick the app out',
        isCorrect: false,
        explanation:
          'Changing your password does NOT revoke granted OAuth refresh tokens. The application retains API access until explicitly removed in your account permissions manager.',
      },
      {
        id: 'D',
        text: 'Allow access only if your browser URL bar displays a green padlock',
        isCorrect: false,
        explanation:
          'The OAuth screen itself is hosted by Google, but granting malicious scopes gives the third-party developer direct API access regardless of HTTPS.',
      },
    ],
    defenseRecommendation:
      'Audit OAuth permissions meticulously. Only grant access to reputable services requiring minimal scopes (profile/email). Periodically review and revoke connected apps in your account security dashboard.',
    relatedLink: '/tools/cyber-hygiene',
    relatedLinkText: 'Check Your Digital Hygiene Routine',
  },
  {
    id: 'daily-15',
    topic: 'Lookalike Domain in Search Engine Sponsored Ads',
    category: 'Phishing Defense',
    difficulty: 'Beginner',
    scenario:
      'You search for your preferred cryptocurrency hardware wallet brand on a major search engine. The top result is a "Sponsored / Ad" link with the URL display reading `wal1et-firmware-update.com` instead of the genuine brand.',
    question: 'Why are sponsored search ads a prominent vector for cyber scams?',
    options: [
      {
        id: 'A',
        text: 'Search engines only display sponsored ads from accredited Fortune 500 enterprises',
        isCorrect: false,
        explanation:
          'Ad platforms are largely automated. Cybercriminals regularly purchase sponsored slots using stolen credit cards to place phishing sites at the very top of search results.',
      },
      {
        id: 'B',
        text: 'Attackers bid on high-traffic keywords and typosquat brand names to trick users into downloading trojanized wallet apps or entering recovery seeds',
        isCorrect: true,
        explanation:
          'Correct! Malvertising (malicious advertising) tricks searchers who assume the top result is always official. Victims enter seed phrases or download modified binaries that empty their wallets.',
      },
      {
        id: 'C',
        text: 'Sponsored links cannot host malicious software because ad networks sandbox all landing pages',
        isCorrect: false,
        explanation:
          'Ad networks perform automated compliance scans, but phishers use cloaking techniques to show innocent pages to review bots and malicious pages to real victims.',
      },
      {
        id: 'D',
        text: 'Clicking sponsored ads is required to register legitimate software warranties',
        isCorrect: false,
        explanation:
          'Warranties have zero connection to search engine advertising campaigns.',
      },
    ],
    defenseRecommendation:
      'Avoid clicking sponsored search results for financial, banking, and software download portals. Type verified domain names directly or access them via saved bookmarks.',
    relatedLink: '/blog/fake-website-warning-signs',
    relatedLinkText: 'Spot Fake Website Warning Signs',
  },
  {
    id: 'daily-16',
    topic: 'Ransomware Incident Response: Initial Containment',
    category: 'Device Hygiene',
    difficulty: 'Intermediate',
    scenario:
      'An accountant on your company network shouts that all their spreadsheet icons have turned into blank sheets with a `.locked_ransom` extension, and a text file "READ_ME_TO_DECRYPT.txt" appeared on the desktop.',
    question: 'What is the very first technical action you should take on that computer?',
    options: [
      {
        id: 'A',
        text: 'Email the hacker at the provided ProtonMail address to negotiate a lower ransom fee',
        isCorrect: false,
        explanation:
          'Immediate communication wastes critical containment minutes and confirms active victim engagement without stopping encryption.',
      },
      {
        id: 'B',
        text: 'Physically unplug the Ethernet cable and immediately disable Wi-Fi/Bluetooth to isolate the host from the network',
        isCorrect: true,
        explanation:
          'Correct! Network isolation prevents the ransomware process from propagating laterally to shared file servers, domain controllers, and neighboring workstations.',
      },
      {
        id: 'C',
        text: 'Run a disk defragmentation utility to reorganize the encrypted files',
        isCorrect: false,
        explanation:
          'Defragmentation writes over unallocated disk sectors, destroying any potential forensic evidence or shadow copy recovery sectors.',
      },
      {
        id: 'D',
        text: 'Forward the ransom note to every client in your contact book',
        isCorrect: false,
        explanation:
          'Spamming clients induces panic without mitigating the ongoing network breach.',
      },
    ],
    defenseRecommendation:
      'At the first sign of ransomware, immediately disconnect the infected machine from all physical and wireless networks. Contact incident response professionals and restore from offline, immutable backups.',
    relatedLink: '/scam-awareness/response',
    relatedLinkText: 'Review Emergency Incident Response Protocols',
  },
  {
    id: 'daily-17',
    topic: 'Browser Extension Malicious Update (Supply Chain Attack)',
    category: 'Device Hygiene',
    difficulty: 'Intermediate',
    scenario:
      'A popular browser extension you installed two years ago for color picking suddenly requests new permissions: "Read and change all your data on all websites you visit" following an update from a new unknown owner.',
    question: 'What supply chain risk does this sudden permission escalation represent?',
    options: [
      {
        id: 'A',
        text: 'The original developer may have sold the extension to an untrusted third party who plans to inject ad fraud or scrape session cookies and passwords',
        isCorrect: true,
        explanation:
          'Correct! Extension takeover is a widespread supply chain attack. Threat actors buy abandoned popular extensions to push stealthy malware updates that capture keystrokes and session tokens across all open tabs.',
      },
      {
        id: 'B',
        text: 'The browser needs access to all websites to calibrate screen pixel gamma ratios',
        isCorrect: false,
        explanation:
          'Color pickers only require access to active tabs or CSS inspect APIs, not unrestricted continuous read/write access to every visited domain.',
      },
      {
        id: 'C',
        text: 'All browser extensions automatically receive this permission every leap year',
        isCorrect: false,
        explanation:
          'Permissions are declared by developers in `manifest.json`, not awarded by calendar intervals.',
      },
      {
        id: 'D',
        text: 'Accepting the prompt enhances your computer\'s Wi-Fi reception',
        isCorrect: false,
        explanation:
          'Browser extensions run within user-space rendering contexts and have no control over wireless radio hardware.',
      },
    ],
    defenseRecommendation:
      'Audit your installed extensions quarterly. Uninstall extensions you no longer use, and never grant blanket "read and change data on all websites" unless from an established, audited vendor.',
    relatedLink: '/tools/cyber-hygiene',
    relatedLinkText: 'Check Your Browser Security Checklist',
  },
  {
    id: 'daily-18',
    topic: 'Fake Remote Job & Advance-Fee Task Scam',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario:
      'You receive an unsolicited WhatsApp invitation offering a work-from-home position: "Earn $400/day by rating 30 travel apps! To activate your VIP Merchant account and unlock your commissions, transfer a refundable $60 deposit."',
    question: 'Why should you immediately cease communication?',
    options: [
      {
        id: 'A',
        text: 'Legitimate employers never demand that candidates pay upfront fees or deposits to work or unlock earned commissions',
        isCorrect: true,
        explanation:
          'Correct! This is a classic "Task Scam". Victims are shown fake escalating dashboards of earnings, but every withdrawal attempt demands higher "taxes", "deposits", or "VIP fees", and the victim never receives any money.',
      },
      {
        id: 'B',
        text: 'The job is real, but you should negotiate the activation deposit down to $20',
        isCorrect: false,
        explanation:
          'Negotiating does not alter the fraudulent structure; any sent money is permanently stolen.',
      },
      {
        id: 'C',
        text: 'You should complete 100 app ratings first before deciding whether to pay',
        isCorrect: false,
        explanation:
          'The rating tasks are busywork designed to psychologically invest victims into paying the requested deposit.',
      },
      {
        id: 'D',
        text: 'You should ask the recruiter to mail you a paper contract via standard post',
        isCorrect: false,
        explanation:
          'Transnational fraud rings easily fabricate forged letters of employment with stolen corporate logos.',
      },
    ],
    defenseRecommendation:
      'Any recruitment process that requires you to pay money to receive money is fraudulent. Verify career openings through the employer\'s official corporate careers portal.',
    relatedLink: '/scam-awareness/types/job',
    relatedLinkText: 'Learn Job Recruitment Scam Indicators',
  },
  {
    id: 'daily-19',
    topic: 'Public Cloud Storage Bucket Permissions Leak',
    category: 'Cloud & Application Security',
    difficulty: 'Intermediate',
    scenario:
      'A junior developer uploads customer database backups into a cloud storage bucket (AWS S3 / Google Cloud Storage) and sets the access control list (ACL) to `AllUsers: READ` so automated scripts can download it easily.',
    question: 'What is the severe security consequence of this configuration?',
    options: [
      {
        id: 'A',
        text: 'The bucket will consume too much storage space on the developer\'s laptop hard drive',
        isCorrect: false,
        explanation:
          'Cloud buckets store data in remote data centers, not local developer workstations.',
      },
      {
        id: 'B',
        text: 'Anyone with an internet connection can locate and download the entire customer database without authentication',
        isCorrect: true,
        explanation:
          'Correct! `AllUsers: READ` exposes data publicly to the entire internet. Automated search engines and scanners (like GrayhatWarfare) index public buckets within hours, resulting in massive data breaches and regulatory fines.',
      },
      {
        id: 'C',
        text: 'The database files will automatically convert into executable viruses',
        isCorrect: false,
        explanation:
          'Exposure leaks confidential data; it does not spontaneously rewrite database records into executable files.',
      },
      {
        id: 'D',
        text: 'Cloud providers immediately delete accounts that store more than 10 gigabytes',
        isCorrect: false,
        explanation:
          'Cloud storage accommodates exabytes of data; the issue is access permission hygiene, not volume.',
      },
    ],
    defenseRecommendation:
      'Enforce "Block Public Access" at the organization cloud root level. Utilize identity and access management (IAM) roles and pre-signed URLs with short TTLs for automated script access.',
    relatedLink: '/learn',
    relatedLinkText: 'Learn Cloud Security & Least Privilege',
  },
  {
    id: 'daily-20',
    topic: 'E-Commerce Account Takeover via Credential Stuffing',
    category: 'Authentication',
    difficulty: 'Intermediate',
    scenario:
      'Your engineering team notices an e-commerce website receiving 50,000 login requests per minute originating from thousands of distributed residential IP addresses, with a 98% login failure rate.',
    question: 'What defensive control best mitigates this automated credential stuffing attack?',
    options: [
      {
        id: 'A',
        text: 'Decrease database query timeout limits to 1 millisecond',
        isCorrect: false,
        explanation:
          'Arbitrary timeouts break legitimate user sessions and cause database connection pool exhaustion.',
      },
      {
        id: 'B',
        text: 'Deploy adaptive rate limiting, bot protection (e.g. Turnstile/CAPTCHA), and mandate multi-factor authentication or passkeys',
        isCorrect: true,
        explanation:
          'Correct! Credential stuffing relies on high-speed automated replay of breached password combo-lists. Rate limiting, behavioral bot detection, and MFA defeat bulk automated credential testing.',
      },
      {
        id: 'C',
        text: 'Send an email to every hacker on the dark web asking them to cease operations',
        isCorrect: false,
        explanation:
          'Attackers do not respond to polite requests; technical defensive controls are required.',
      },
      {
        id: 'D',
        text: 'Make all customer passwords public so attackers lose interest in guessing them',
        isCorrect: false,
        explanation:
          'Publishing passwords is a catastrophic total breach of confidentiality.',
      },
    ],
    defenseRecommendation:
      'Protect authentication endpoints with distributed rate limiting, anomalous behavioral scoring, IP reputation filters, and strong multi-factor authentication.',
    relatedLink: '/tools/password-strength',
    relatedLinkText: 'Analyze Password Entropy & Attack Resilience',
  },
  {
    id: 'daily-21',
    topic: 'Deepfake Video Call / Virtual Meeting Impersonation',
    category: 'Social Engineering',
    difficulty: 'Intermediate',
    scenario:
      'During a scheduled video conference, someone looking and sounding like your company Chief Financial Officer instructs your finance team to initiate an off-ledger $4,000,000 wire transfer for a secretive overseas acquisition.',
    question: 'What visual or operational indicators help identify real-time synthetic deepfakes?',
    options: [
      {
        id: 'A',
        text: 'Deepfakes always display neon blue borders around the speaker\'s face',
        isCorrect: false,
        explanation:
          'Real-time deepfake generative software does not place obvious watermarks or neon borders on output streams.',
      },
      {
        id: 'B',
        text: 'Visual edge distortions around the jawline/neck, erratic eye blinking, and refusing out-of-band challenge verification',
        isCorrect: true,
        explanation:
          'Correct! Real-time generative video models frequently glitch when the subject turns their head sideways, rubs their face, or shifts lighting. Most critically, mandatory dual-signoff policies prevent single-person wire authorization.',
      },
      {
        id: 'C',
        text: 'Deepfakes can only be broadcast if the computer is connected to dial-up internet',
        isCorrect: false,
        explanation:
          'Modern generative AI models run on high-performance GPUs and stream over high-speed broadband.',
      },
      {
        id: 'D',
        text: 'A video call is legally binding proof of identity under all corporate charters',
        isCorrect: false,
        explanation:
          'Video feeds can be synthesized; formal multi-custody financial controls supersede visual impressions.',
      },
    ],
    defenseRecommendation:
      'Establish strict dual-control authorization protocols for high-value transactions. Require verification through independent, out-of-band channels regardless of who appears on screen.',
    relatedLink: '/blog/ai-scams',
    relatedLinkText: 'Explore Deepfakes & Synthetic Media Defense',
  },
  {
    id: 'daily-22',
    topic: 'Fake Browser Antivirus Alert & Notification Spam',
    category: 'Device Hygiene',
    difficulty: 'Beginner',
    scenario:
      'In the bottom-right corner of your desktop, five consecutive system notifications pop up every minute stating: "Windows Defender: System infected with 7 viruses! Click to renew McAfee/Norton license immediately."',
    question: 'Where are these intrusive notifications actually originating from?',
    options: [
      {
        id: 'A',
        text: 'Your computer hardware BIOS chip is physically overheating',
        isCorrect: false,
        explanation:
          'Motherboard hardware does not dispatch browser-based antivirus marketing pop-ups.',
      },
      {
        id: 'B',
        text: 'A malicious or deceptive website was previously granted "Web Push Notifications" permission in your web browser',
        isCorrect: true,
        explanation:
          'Correct! Scammers trick users into clicking "Allow Notifications" on sketchy websites (often masquerading as robot CAPTCHA verifications). The site then spams fake antivirus alerts to peddle affiliate scams.',
      },
      {
        id: 'C',
        text: 'Your keyboard cable has been compromised by a foreign intelligence agency',
        isCorrect: false,
        explanation:
          'Hardware cable attacks do not generate browser push notification banners.',
      },
      {
        id: 'D',
        text: 'Your Windows operating system has been permanently deleted',
        isCorrect: false,
        explanation:
          'If the OS were deleted, the machine could not boot or display browser notifications.',
      },
    ],
    defenseRecommendation:
      'Open your browser settings (Privacy & Security -> Site Settings -> Notifications) and remove all unfamiliar or untrusted websites permitted to send notifications.',
    relatedLink: '/scam-awareness/red-flags',
    relatedLinkText: 'Discover Common Social Engineering Red Flags',
  },
  {
    id: 'daily-23',
    topic: 'Shoulder Surfing & Physical Device Locking',
    category: 'Device Hygiene',
    difficulty: 'Beginner',
    scenario:
      'You are reviewing a confidential client acquisition contract on your laptop while seated at a busy coffee shop. You stand up to grab a napkin from the counter 15 feet away for 20 seconds.',
    question: 'What is the essential physical security habit to practice every time you step away?',
    options: [
      {
        id: 'A',
        text: 'Leave the screen open so nearby patrons know the seat is occupied',
        isCorrect: false,
        explanation:
          'Leaving an unlocked workstation exposed allows anyone nearby to read confidential data, snap a photo, or insert a malicious USB payload.',
      },
      {
        id: 'B',
        text: 'Lock your screen immediately (Win+L on Windows, Cmd+Ctrl+Q on Mac) before leaving your seat',
        isCorrect: true,
        explanation:
          'Correct! Locking your workstation takes less than one second and protects your active session, email, and files from unauthorized physical inspection or tampering.',
      },
      {
        id: 'C',
        text: 'Turn off your laptop sound volume so nobody hears your notifications',
        isCorrect: false,
        explanation:
          'Muting volume does not protect visual screen contents or prevent unauthorized keystrokes.',
      },
      {
        id: 'D',
        text: 'Ask the person sitting next to you to guard your open emails',
        isCorrect: false,
        explanation:
          'Entrusting confidential corporate information to unvetted strangers violates fundamental privacy safeguards.',
      },
    ],
    defenseRecommendation:
      'Always lock your device when stepping away, even for a few seconds. Consider using a polarized privacy screen filter when working in public transportation or cafes.',
    relatedLink: '/blog/cyber-hygiene',
    relatedLinkText: 'Read the Digital Hygiene Habits Checklist',
  },
  {
    id: 'daily-24',
    topic: 'Viral Social Media Quizzes & Security Question Harvesting',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario:
      'A viral graphic on Facebook asks: "What is your secret spy code name? Take the first street you grew up on, your mother\'s maiden name, and your favorite childhood pet\'s name!"',
    question: 'What is the hidden objective behind these viral interactive graphics?',
    options: [
      {
        id: 'A',
        text: 'To harvest the most common security questions used for bank and email account password recovery',
        isCorrect: true,
        explanation:
          'Correct! Childhood street names, mother\'s maiden names, and first pets are standard security recovery questions. Answering them publicly equips cybercriminals to reset your passwords.',
      },
      {
        id: 'B',
        text: 'To compute accurate zodiac compatibility charts for astrologers',
        isCorrect: false,
        explanation:
          'Zodiac data does not require mothers\' maiden names or childhood street addresses.',
      },
      {
        id: 'C',
        text: 'To improve your internet browsing bandwidth',
        isCorrect: false,
        explanation:
          'Social media comment threads have zero interaction with networking infrastructure.',
      },
      {
        id: 'D',
        text: 'To test whether your monitor screen has accurate color rendering',
        isCorrect: false,
        explanation:
          'Display calibration is performed with hardware colorimeters, not personal trivia questions.',
      },
    ],
    defenseRecommendation:
      'Never reveal answers to personal security questions online. Better yet, treat security questions as secondary passwords and store random passphrases in your password manager.',
    relatedLink: '/scam-awareness/types/social-media',
    relatedLinkText: 'Learn Social Media Privacy & Scam Defenses',
  },
  {
    id: 'daily-25',
    topic: 'Critical Zero-Day Patch Application',
    category: 'Device Hygiene',
    difficulty: 'Beginner',
    scenario:
      'A software vendor alerts users that an actively exploited Zero-Day Remote Code Execution vulnerability exists in their web browser, and issues a critical patch update.',
    question: 'Why should you apply security updates without delay?',
    options: [
      {
        id: 'A',
        text: 'Postpone the update for six months to ensure the vendor fixes all visual button colors first',
        isCorrect: false,
        explanation:
          'Delaying updates leaves your browser open to known exploits that cybercriminals reverse-engineer and weaponize immediately.',
      },
      {
        id: 'B',
        text: 'Apply the update promptly because unpatched flaws allow malicious websites to execute arbitrary code on your system simply by visiting a page',
        isCorrect: true,
        explanation:
          'Correct! When a vulnerability is publicly disclosed or actively exploited, automated exploit kits target unpatched versions. Updating closes the open door.',
      },
      {
        id: 'C',
        text: 'Security updates are only necessary if your computer is physically older than 10 years',
        isCorrect: false,
        explanation:
          'Vulnerabilities exist in software logic, affecting brand-new and older devices equally.',
      },
      {
        id: 'D',
        text: 'Deleting the browser icon from your desktop automatically patches the vulnerability',
        isCorrect: false,
        explanation:
          'Deleting desktop shortcuts does not remove the underlying executable or update its binaries.',
      },
    ],
    defenseRecommendation:
      'Enable automatic operating system and browser updates. Restart software when prompted to ensure security patches are fully loaded into memory.',
    relatedLink: '/tools/cyber-hygiene',
    relatedLinkText: 'Review System Hardening & Patching Best Practices',
  },
  {
    id: 'daily-26',
    topic: 'USB Drop Attack (Baiting with Hardware Media)',
    category: 'Device Hygiene',
    difficulty: 'Beginner',
    scenario:
      'You find an unmarked metallic USB flash drive lying on the sidewalk outside your corporate office building labeled: "Executive Payroll & Bonus Q4 2026".',
    question: 'What is the appropriate response?',
    options: [
      {
        id: 'A',
        text: 'Plug it into your work laptop to see whose name is inside and return it to them',
        isCorrect: false,
        explanation:
          'Plugging unknown USBs into your device is hazardous. Malicious hardware (like Rubber Ducky or BadUSB) emulates a high-speed keyboard to inject keystroke payloads and download backdoors in seconds.',
      },
      {
        id: 'B',
        text: 'Do not plug it in; hand it over to your organization\'s security/IT department for safe quarantined inspection',
        isCorrect: true,
        explanation:
          'Correct! The "USB Drop" is a classic social engineering baiting technique relying on human curiosity to bypass physical perimeters.',
      },
      {
        id: 'C',
        text: 'Plug it into your personal home computer instead since it is not connected to the corporate domain',
        isCorrect: false,
        explanation:
          'Infecting your personal computer risks compromising your personal bank accounts, passwords, and private files.',
      },
      {
        id: 'D',
        text: 'Wash the USB drive in warm soapy water to clean any viruses off the connector',
        isCorrect: false,
        explanation:
          'Computer malware is software code stored on flash memory NAND chips, unaffected by soap and water.',
      },
    ],
    defenseRecommendation:
      'Never insert untrusted USB drives or accessories into any computer. Report dropped storage media directly to security personnel.',
    relatedLink: '/learn',
    relatedLinkText: 'Learn Physical Security & Baiting Tactics',
  },
  {
    id: 'daily-27',
    topic: 'Plaintext Database Backup over Unencrypted FTP',
    category: 'Network Safety',
    difficulty: 'Intermediate',
    scenario:
      'A server administrator needs to transfer a 5GB database backup containing customer addresses and hashed passwords to a secondary server, and considers using standard plaintext FTP.',
    question: 'Why must encrypted transport (SFTP, SCP, or TLS) be used instead?',
    options: [
      {
        id: 'A',
        text: 'Plaintext FTP transmits both authentication credentials and file contents unencrypted over the wire, allowing intermediate eavesdroppers to sniff the data',
        isCorrect: true,
        explanation:
          'Correct! Standard FTP (port 21) sends commands and payload packets in cleartext. Any adversary positioned on the network path can capture the credentials and data stream.',
      },
      {
        id: 'B',
        text: 'Encrypted protocols make files 90% smaller through automatic quantum compression',
        isCorrect: false,
        explanation:
          'Encryption provides confidentiality and integrity; it does not perform quantum compression.',
      },
      {
        id: 'C',
        text: 'Plaintext FTP is prohibited because it only functions on Sundays',
        isCorrect: false,
        explanation:
          'Network protocols operate continuously regardless of calendar days.',
      },
      {
        id: 'D',
        text: 'FTP cannot transfer files larger than 12 kilobytes',
        isCorrect: false,
        explanation:
          'FTP supports large files; the vulnerability is total absence of transport layer cryptographic security.',
      },
    ],
    defenseRecommendation:
      'Decommission unencrypted legacy protocols (FTP, Telnet, HTTP). Mandate cryptographic transport (SFTP, SSH, HTTPS with TLS 1.3) for all data in transit.',
    relatedLink: '/blog/https-explained',
    relatedLinkText: 'Understand HTTPS & Network Transport Encryption',
  },
  {
    id: 'daily-28',
    topic: 'Fake Tax Authority Arrest Threat Call (Vishing)',
    category: 'Social Engineering',
    difficulty: 'Beginner',
    scenario:
      'A stern caller with automated background noise claims to be an agent from the Federal Tax Authority: "You owe $1,420 in back taxes. A federal warrant has been issued for your immediate arrest unless you settle this balance within 30 minutes via Apple Gift Cards."',
    question: 'What is the conclusive indicator of fraud?',
    options: [
      {
        id: 'A',
        text: 'Government agencies never demand settlement of official taxes through retail gift cards, wire transfers, or cryptocurrency',
        isCorrect: true,
        explanation:
          'Correct! Government tax authorities communicate official billing issues through postal mail and provide formal dispute mechanisms. Demands for gift cards or crypto are 100% fraudulent.',
      },
      {
        id: 'B',
        text: 'The caller spoke English with a formal tone of voice',
        isCorrect: false,
        explanation:
          'Tone of voice is not a reliable security metric; scammers rehearse formal authority scripts.',
      },
      {
        id: 'C',
        text: 'The phone call arrived during normal business hours',
        isCorrect: false,
        explanation:
          'Scammers call during business hours to mimic legitimate office workflows.',
      },
      {
        id: 'D',
        text: 'The amount owed was less than $10,000',
        isCorrect: false,
        explanation:
          'Scammers request moderate amounts to maximize compliance and minimize bank fraud investigations.',
      },
    ],
    defenseRecommendation:
      'If you receive an aggressive call alleging government fines or arrest warrants, hang up immediately. Look up the verified agency number independently and call to verify.',
    relatedLink: '/scam-awareness/types/fake-support',
    relatedLinkText: 'Learn How to Spot Impersonation Scams',
  },
  {
    id: 'daily-29',
    topic: 'Zero Trust Architecture: Microsegmentation & Continuous Auth',
    category: 'Network Safety',
    difficulty: 'Intermediate',
    scenario:
      'In a traditional corporate network, once an employee connects via VPN, they can ping and access every server on the subnet. A security architect recommends adopting Zero Trust Architecture.',
    question: 'What is the core philosophical pillar of Zero Trust?',
    options: [
      {
        id: 'A',
        text: 'Never trust, always verify: assume breach, enforce least privilege, and verify explicitly for every transaction regardless of network location',
        isCorrect: true,
        explanation:
          'Correct! Zero Trust discards the outdated "castle-and-moat" perimeter model. Even inside the corporate network, every access request must be authenticated, authorized, and encrypted.',
      },
      {
        id: 'B',
        text: 'Trust all traffic from inside the office building because employees have photo badges',
        isCorrect: false,
        explanation:
          'Perimeter trust allows an attacker who compromises a single workstation to pivot unimpeded across the entire company network.',
      },
      {
        id: 'C',
        text: 'Disable all passwords and rely exclusively on employee honesty pledges',
        isCorrect: false,
        explanation:
          'Zero Trust strengthens cryptographic access controls rather than eliminating them.',
      },
      {
        id: 'D',
        text: 'Block all incoming and outgoing internet traffic permanently',
        isCorrect: false,
        explanation:
          'Zero Trust enables secure business operations across cloud and mobile environments, not digital isolation.',
      },
    ],
    defenseRecommendation:
      'Shift security architectures from implicit perimeter trust to explicit continuous verification. Enforce microsegmentation and least-privilege role-based access.',
    relatedLink: '/learn',
    relatedLinkText: 'Explore Zero Trust & Defense Architecture in Learn Hub',
  },
  {
    id: 'daily-30',
    topic: 'Lost or Stolen Mobile Device Remote Wipe Protocol',
    category: 'Device Hygiene',
    difficulty: 'Beginner',
    scenario:
      'You accidentally leave your smartphone containing corporate email, 2FA authenticator apps, and personal banking sessions in the back of a taxi in a foreign city.',
    question: 'What is the most effective immediate action to protect your identity and data?',
    options: [
      {
        id: 'A',
        text: 'Wait three weeks to see if the taxi company mails the phone back to your home address',
        isCorrect: false,
        explanation:
          'Waiting gives an opportunistic thief ample time to extract SIM cards, probe unlock passcodes, or inspect notifications.',
      },
      {
        id: 'B',
        text: 'Log into your cloud account (Apple iCloud / Google Find My Device) from another device, enable Lost Mode, and initiate a Remote Wipe',
        isCorrect: true,
        explanation:
          'Correct! Remote Wipe cryptographically erases on-device encryption keys, turning stored personal data into unreadable noise. You should also revoke active sessions and alert IT.',
      },
      {
        id: 'C',
        text: 'Call your phone repeatedly every 30 seconds until the battery runs out',
        isCorrect: false,
        explanation:
          'Calling repeatedly provides no security protection and drains battery needed for GPS location tracking.',
      },
      {
        id: 'D',
        text: 'Delete your social media profile so nobody knows you owned a phone',
        isCorrect: false,
        explanation:
          'Deleting social profiles does not protect stored email, authenticator tokens, or financial credentials on the physical device.',
      },
    ],
    defenseRecommendation:
      'Ensure "Find My Device" and remote erase capabilities are pre-configured on all mobile hardware. Use strong 6+ digit device passcodes (avoiding simple PINs like 1234 or birthdays).',
    relatedLink: '/tools/cyber-hygiene',
    relatedLinkText: 'Review Lost Device Defense Protocols',
  },
  {
    id: 'daily-31',
    topic: 'Pig Butchering (Sha Zhu Pan) & Fake Crypto Investment Platform',
    category: 'Payment & Fraud Defense',
    difficulty: 'Intermediate',
    scenario:
      'A friendly contact met through a "wrong number" message builds rapport over several weeks, then introduces you to a "private algorithmic trading platform". You deposit $500, and the dashboard shows your balance grew to $3,200. When you attempt to withdraw, support demands a $1,000 "liquidity release tax".',
    question: 'What type of transnational cyber fraud are you encountering?',
    options: [
      {
        id: 'A',
        text: 'A legitimate hedge fund experiencing high trading volume',
        isCorrect: false,
        explanation:
          'Legitimate exchanges deduct fees directly from account balances; they never demand external fee deposits to release customer capital.',
      },
      {
        id: 'B',
        text: 'A Pig Butchering (Sha Zhu Pan) romance-investment scam where numbers on screen are completely simulated to extort escalating deposits',
        isCorrect: true,
        explanation:
          'Correct! The entire website and reported profits are completely fabricated. If you pay the $1,000 "tax", the scammers invent another fee (e.g. anti-money laundering verification) until the victim is completely drained.',
      },
      {
        id: 'C',
        text: 'A temporary banking software bug that will resolve after midnight',
        isCorrect: false,
        explanation:
          'Demanding external cash deposits to release funds is the hallmark of financial extortion, not a software bug.',
      },
      {
        id: 'D',
        text: 'A government-mandated dividend redistribution lottery',
        isCorrect: false,
        explanation:
          'Government agencies do not partner with anonymous chat strangers on proprietary trading platforms.',
      },
    ],
    defenseRecommendation:
      'Never send funds to unverified investment websites recommended by online acquaintances. Once capital is sent to scam investment platforms, it cannot be recovered.',
    relatedLink: '/scam-awareness/types/investment',
    relatedLinkText: 'Learn How Investment Scams Operate',
  },
  {
    id: 'daily-32',
    topic: 'Rogue Wi-Fi Router DNS Poisoning & DNS-over-HTTPS',
    category: 'Network Safety',
    difficulty: 'Intermediate',
    scenario:
      'A compromised home router has its DNS server settings altered by an attacker to point to `198.51.100.4`. When you type `mybank.com`, your browser is directed to the attacker\'s IP address instead of the legitimate bank server.',
    question: 'Which modern security standard prevents your local network from tampering with DNS resolution?',
    options: [
      {
        id: 'A',
        text: 'DNS-over-HTTPS (DoH) / DNS-over-TLS (DoT)',
        isCorrect: true,
        explanation:
          'Correct! Traditional DNS queries are sent in plaintext UDP. DoH encrypts DNS requests over standard HTTPS (TLS), preventing rogue routers or local eavesdroppers from spoofing or altering DNS responses.',
      },
      {
        id: 'B',
        text: 'Standard unencrypted FTP file transfer',
        isCorrect: false,
        explanation:
          'FTP is an unencrypted file transfer protocol and does not resolve or secure domain names.',
      },
      {
        id: 'C',
        text: 'Increasing your screen resolution to 4K Ultra HD',
        isCorrect: false,
        explanation:
          'Monitor resolution has no influence over network routing or DNS resolution.',
      },
      {
        id: 'D',
        text: 'Turning your computer off and on three times',
        isCorrect: false,
        explanation:
          'Power cycling does not revert poisoned DNS configurations on a compromised upstream router.',
      },
    ],
    defenseRecommendation:
      'Enable DNS-over-HTTPS (DoH) in your browser or operating system settings. Change factory default passwords on all home routers and keep their firmware updated.',
    relatedLink: '/tools/security-headers',
    relatedLinkText: 'Learn DNS Security & Security Headers',
  },
  {
    id: 'daily-33',
    topic: 'Git Commit History Secrets Leaks & Key Invalidation',
    category: 'Cloud & Application Security',
    difficulty: 'Intermediate',
    scenario:
      'A developer realizes they pushed a database password in a Git commit two weeks ago. To fix it, they commit a change removing the password string from the code and push to GitHub.',
    question: 'Why is the database password still completely compromised?',
    options: [
      {
        id: 'A',
        text: 'The password is safe because git status reports working tree clean',
        isCorrect: false,
        explanation:
          'A clean working tree only reflects the current HEAD commit; it ignores previous historical commits.',
      },
      {
        id: 'B',
        text: 'Git maintains an immutable commit graph; anyone can inspect historical commits or run `git log -p` to view the original exposed secret',
        isCorrect: true,
        explanation:
          'Correct! Simply removing a secret in a subsequent commit leaves it in the Git history. Attackers clone the repo and review all historical commits to extract leaked secrets.',
      },
      {
        id: 'C',
        text: 'The database will automatically reject the password because it detects the Git commit',
        isCorrect: false,
        explanation:
          'Databases do not monitor GitHub commit logs; the password remains valid on the database server until an administrator manually changes it.',
      },
      {
        id: 'D',
        text: 'GitHub automatically converts all pushed passwords into encrypted poetry',
        isCorrect: false,
        explanation:
          'Git repositories store plaintext commits exactly as written.',
      },
    ],
    defenseRecommendation:
      'Whenever a secret is pushed to version control, consider it burned. Invalidate and rotate the credential immediately at the database/provider level, and rewrite Git history using `git-filter-repo` or BFG.',
    relatedLink: '/learn',
    relatedLinkText: 'Study Secret Management & Safe Development',
  },
  {
    id: 'daily-34',
    topic: 'Smart Home Camera Default Password & IoT Botnets',
    category: 'Device Hygiene',
    difficulty: 'Beginner',
    scenario:
      'You purchase an inexpensive smart home security camera, connect it to your home Wi-Fi network, and leave the factory default login credentials (`admin` / `123456`) in place.',
    question: 'What is the most likely danger of retaining default factory credentials on IoT hardware?',
    options: [
      {
        id: 'A',
        text: 'Automated malware botnets (like Mirai) scan public IP ranges to hijack default-credential devices for DDoS attacks and spy on private video feeds',
        isCorrect: true,
        explanation:
          'Correct! Automated scanners continuously probe internet-connected devices for well-known default credentials. Compromised IoT gadgets are enslaved into global botnets or streamed onto voyeuristic forums.',
      },
      {
        id: 'B',
        text: 'The camera will only record black-and-white video footage',
        isCorrect: false,
        explanation:
          'Video color depth is a camera sensor setting, not a security authentication constraint.',
      },
      {
        id: 'C',
        text: 'The camera manufacturer will charge you a $50 late fee',
        isCorrect: false,
        explanation:
          'Hardware manufacturers do not penalize users for weak passwords.',
      },
      {
        id: 'D',
        text: 'The camera will run out of electricity even when plugged into an electrical outlet',
        isCorrect: false,
        explanation:
          'Electrical current flow is unaffected by authentication configurations.',
      },
    ],
    defenseRecommendation:
      'Always change default factory credentials immediately upon unboxing. Isolate IoT gadgets on a dedicated guest Wi-Fi network (VLAN) separated from personal laptops and file storage.',
    relatedLink: '/blog/cyber-hygiene',
    relatedLinkText: 'Explore IoT Hardening & Network Segmentation',
  },
  {
    id: 'daily-35',
    topic: 'Silent Email Forwarding Rules in Compromised Inboxes',
    category: 'Authentication',
    difficulty: 'Intermediate',
    scenario:
      'An employee notices they are not receiving any client emails regarding billing or invoices, while colleagues report that customers have been asking about strange bank account wire instructions.',
    question: 'What stealthy persistence mechanism do attackers establish after compromising an email account?',
    options: [
      {
        id: 'A',
        text: 'They physically move the email server to another country',
        isCorrect: false,
        explanation:
          'Attackers do not physically move cloud mail servers (like Exchange Online or Google Workspace).',
      },
      {
        id: 'B',
        text: 'They configure automated inbox forwarding rules that copy or divert billing emails to an external inbox while auto-archiving or deleting incoming alerts',
        isCorrect: true,
        explanation:
          'Correct! After gaining initial access, cybercriminals establish silent forwarding and delete rules. This allows them to monitor business negotiations and send forged payment details without the account owner noticing.',
      },
      {
        id: 'C',
        text: 'They change the computer screen background wallpaper to a skull and crossbones',
        isCorrect: false,
        explanation:
          'Modern cybercriminals operating business email compromises prioritize stealth and invisibility to maximize financial theft.',
      },
      {
        id: 'D',
        text: 'They reconfigure the office microwave to interfere with the keyboard',
        isCorrect: false,
        explanation:
          'Microwave interference has zero connection to cloud email routing rules.',
      },
    ],
    defenseRecommendation:
      'Check your email settings regularly for unauthorized forwarding rules, inbox sweep filters, or linked devices. System administrators should disable auto-forwarding to external domains at the tenant level.',
    relatedLink: '/scam-awareness/types/account-takeover',
    relatedLinkText: 'Learn Inbox Compromise Defense Techniques',
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
  const validDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  const year = validDate.getUTCFullYear();
  const month = String(validDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(validDate.getUTCDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  // Epoch anchor: 2026-01-01
  const anchorTime = Date.UTC(2026, 0, 1);
  const currentTime = Date.UTC(year, validDate.getUTCMonth(), validDate.getUTCDate());
  const diffDays = Math.max(0, Math.floor((currentTime - anchorTime) / (1000 * 60 * 60 * 24)));

  const questionIndex = diffDays % DAILY_CHALLENGES.length;
  return {
    challenge: DAILY_CHALLENGES[questionIndex],
    dateString,
    dayNumber: diffDays + 1,
  };
}
