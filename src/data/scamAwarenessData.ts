import {
  ScamAwarenessCategory,
  ScamFlowStage,
  RedFlagScenarioItem,
  ScamQuizQuestion,
  ScamCaseStudy,
  ReportingAuthority,
} from '@/types';

export const SCAM_CATEGORIES_DATA: ScamAwarenessCategory[] = [
  {
    id: 'phishing-scams',
    name: 'Phishing Scams',
    iconName: 'Mail',
    oneLiner: 'Deceptive emails and fake web portals disguised as trusted institutions to harvest passwords.',
    commonTarget: 'Anyone with email, cloud storage, banking, or corporate workplace accounts.',
    mainWarning: 'Unsolicited emails asking you to click a link to verify credentials or avoid account closure.',
    categoryGroup: 'Impersonation',
    riskLevel: 'Critical',
    attackerTactics: [
      'Spoofing corporate or consumer brand logos in HTML email templates',
      'Deploying reverse proxy phishing kits that capture session tokens and 2FA codes in real-time',
      'Using lookalike domain names with subtle misspellings or hyphenated suffixes',
      'Sending fake invoices or receipts that prompt a panicked call or login',
    ],
    redFlags: [
      'Sender address domain does not exactly match the official company domain',
      'Urgent threats of immediate account lockouts or penalties within hours',
      'Generic greetings like "Dear Customer" instead of your actual registered name',
      'Links pointing to unfamiliar, shortened, or unverified web addresses',
    ],
    verificationSteps: [
      'Never click links in unexpected emails claiming account emergencies.',
      'Open a new browser tab and navigate directly to the official website by typing the known URL.',
      'Check your account notification bell or dashboard directly within the official portal.',
    ],
    whatToDo: [
      'Mark the email as phishing or spam in your email provider.',
      'If you already clicked and entered credentials, immediately change your password from another tab.',
      'Terminate active sessions across all devices in your account security settings.',
    ],
  },
  {
    id: 'sms-smishing-scams',
    name: 'SMS / Smishing Scams',
    iconName: 'Smartphone',
    oneLiner: 'Deceptive text messages claiming urgent parcel deliveries, unpaid tolls, or fraudulent bank transfers.',
    commonTarget: 'Smartphone users who receive regular package deliveries, bank alerts, or toll notices.',
    mainWarning: 'Unexpected text message containing a shortened or suspicious link demanding immediate payment or info.',
    categoryGroup: 'Communication & Social',
    riskLevel: 'Critical',
    attackerTactics: [
      'Impersonating postal services (USPS, DHL, FedEx) with "address missing" alerts',
      'Faking highway toll violation notices (E-ZPass, FasTrak, SunPass) with impending fines',
      'Simulating bank security alerts: "Did you attempt a $940 transfer? If NOT, tap here"',
      'Using SMS spoofing tools to make texts appear in the same thread as legitimate company messages',
    ],
    redFlags: [
      'Sent from an ordinary 10-digit mobile number or an international phone number (+44, +63, etc.)',
      'Message includes a shortened URL (bit.ly, tinyurl, or random alphanumeric domains like usps-redeliver.top)',
      'Artificial deadline: "Failure to pay within 12 hours will incur legal penalties"',
    ],
    verificationSteps: [
      'Do not click the link or reply to the text (replying confirms your phone number is active).',
      'If it mentions a package, locate your original order confirmation and use the official carrier app.',
      'If it mentions a bank transfer, call the customer service number on the back of your physical card.',
    ],
    whatToDo: [
      'Forward the spam text to 7726 (SPAM) to alert major telecommunications carriers.',
      'Block the sender number on your device.',
      'Delete the message completely.',
    ],
  },
  {
    id: 'voice-vishing-scams',
    name: 'Voice / Vishing Scams',
    iconName: 'PhoneCall',
    oneLiner: 'Urgent phone calls impersonating fraud officers, tax authorities, or tech support to manipulate you.',
    commonTarget: 'Seniors, remote workers, and individuals anxious about taxes, banking, or legal issues.',
    mainWarning: 'Caller aggressively demands you stay on the line and pay or verify personal data immediately.',
    categoryGroup: 'Communication & Social',
    riskLevel: 'High',
    attackerTactics: [
      'Spoofing caller ID numbers to display the official phone number of your local bank or police station',
      'Using artificial background office chatter and official-sounding badge numbers to establish credibility',
      'Directing victims to transfer funds to a "safe government holding account" or purchase retail gift cards',
      'Deploying AI voice cloning of family members claiming to be in jail or injured in an accident',
    ],
    redFlags: [
      'The caller forbids you from hanging up to verify with family or customer support',
      'Requesting payment via non-reversible methods (cryptocurrency ATMs, wire transfers, Apple/Target gift cards)',
      'Demanding you read out two-factor authentication codes or PINs',
    ],
    verificationSteps: [
      'Hang up immediately. Legitimate banks and government agencies never object to you hanging up to verify.',
      'Wait 30 seconds (or restart your phone to clear line holding) and call the verified public phone number.',
      'If a caller claims a family member is in danger, contact that family member or another relative directly.',
    ],
    whatToDo: [
      'Report the spoofed call to your national telecommunications registry.',
      'Never send funds under verbal pressure, no matter how urgent the story sounds.',
      'Warn vulnerable friends or older family members who may be targeted by similar scripts.',
    ],
  },
  {
    id: 'fake-job-scams',
    name: 'Fake Job Scams',
    iconName: 'Briefcase',
    oneLiner: 'Fraudulent work-from-home offers with inflated salaries designed to steal checks, cash, or identity info.',
    commonTarget: 'Job seekers, university students, career switchers, and remote workers looking for flexible income.',
    mainWarning: 'Job offer extended without a formal interview, or requesting you deposit a check to buy equipment.',
    categoryGroup: 'Work & Services',
    riskLevel: 'High',
    attackerTactics: [
      'Interviewing candidates exclusively through messaging apps like Telegram, WhatsApp, or Google Chat',
      'Sending a counterfeit onboarding check for $3,000–$5,000 to "purchase home workstation equipment"',
      'Instructing candidates to wire funds to a "certified vendor" before the fake check inevitably bounces',
      'Collecting full Social Security / national ID numbers and direct deposit details before official contracts',
    ],
    redFlags: [
      'Pay rate is significantly higher than industry averages for low-skill or beginner tasks',
      'The recruiter uses a free webmail address (e.g., recruiter-apple@gmail.com) instead of corporate email',
      'You are hired immediately after answering a few generic text questions with zero voice or video calls',
    ],
    verificationSteps: [
      'Visit the company’s official careers page directly to verify that the job requisition ID actually exists.',
      'Search LinkedIn to confirm whether the recruiter actually works for the stated organization.',
      'Contact the company’s official HR department to verify the legitimacy of the offer.',
    ],
    whatToDo: [
      'Never deposit checks from an employer with instructions to send any money back.',
      'Cease all communication and report the job listing on the platform where you found it.',
      'If personal identity details were submitted, place a credit freeze on your credit reports.',
    ],
  },
  {
    id: 'investment-scams',
    name: 'Investment Scams',
    iconName: 'TrendingUp',
    oneLiner: 'High-yield opportunities promising guaranteed, risk-free profits in forex, gold, or private ventures.',
    commonTarget: 'Retirees, beginners looking for passive income, and social media users seeking financial independence.',
    mainWarning: 'Promises of guaranteed returns with zero risk or pressure to invest before an exclusive window closes.',
    categoryGroup: 'Financial & Crypto',
    riskLevel: 'Critical',
    attackerTactics: [
      'Fabricating sleek trading portals showing artificial balance growth to encourage larger deposits',
      'Paying small initial "withdrawals" using capital from other victims to build false confidence',
      'Inventing exorbitant "withdrawal taxes" or "liquidity verification fees" when victims attempt to cash out',
      'Using aggressive community chats on WhatsApp or Discord filled with fake accounts praising the broker',
    ],
    redFlags: [
      'Guaranteed returns: All legitimate investing carries risk; anyone promising guaranteed profit is lying',
      'Unlicensed platform: The broker or manager cannot be verified on financial regulator databases (e.g., SEC, FCA, ASIC)',
      'Demands payment via cryptocurrency, wire transfers, or offshore payment processors',
    ],
    verificationSteps: [
      'Check the financial regulatory register in your country to confirm if the firm is authorized and licensed.',
      'Be skeptical of any unsolicited direct message offering financial or investment coaching.',
      'Ask independent financial advisors or certified accountants before moving any savings.',
    ],
    whatToDo: [
      'Stop sending additional funds immediately. Demands for "fees to release funds" are always secondary extortion.',
      'Preserve transaction records, chat transcripts, and website URLs for law enforcement.',
      'File an investment fraud complaint with your national securities and financial regulatory agencies.',
    ],
  },
  {
    id: 'cryptocurrency-scams',
    name: 'Cryptocurrency Scams',
    iconName: 'Coins',
    oneLiner: 'Wallet drainers, fraudulent token pre-sales, fake mining pools, and "pig butchering" crypto operations.',
    commonTarget: 'Crypto investors, social media traders, and dating app users introduced to third-party Web3 dApps.',
    mainWarning: 'Unsolicited request to connect your Web3 wallet, approve permissions, or send crypto to double it.',
    categoryGroup: 'Financial & Crypto',
    riskLevel: 'Critical',
    attackerTactics: [
      'Malicious smart contract approvals that grant unlimited token spend permissions to drain your wallet',
      'Fake giveaway livestreams impersonating prominent figures like Elon Musk promising 2x crypto returns',
      'Romance investment fraud ("Sha Zhu Pan" / Pig Butchering) where an online friend steers you to a fake DeFi app',
      'Search engine ad poisoning placing fake decentralized exchange URLs at the top of query results',
    ],
    redFlags: [
      'Requests for your 12 or 24-word seed phrase or private key: Legitimate support NEVER needs your recovery phrase',
      'Unsolicited tokens or NFTs appearing in your wallet directing you to claim prizes on an external website',
      'Smart contract requests asking for permissions beyond normal transaction gas fees',
    ],
    verificationSteps: [
      'Inspect contract addresses on block explorers (Etherscan, Solscan) before signing any transaction.',
      'Verify decentralized app URLs through verified bookmarks or reputable repositories like DefiLlama.',
      'Use wallet security browser extensions that simulate transaction balance changes prior to signing.',
    ],
    whatToDo: [
      'Revoke malicious contract allowances immediately using tools like Revoke.cash.',
      'Transfer remaining non-compromised assets to a brand-new, clean hardware cold storage wallet.',
      'Remember that cryptocurrency transactions on public blockchains are mathematically irreversible.',
    ],
  },
  {
    id: 'online-shopping-scams',
    name: 'Online Shopping Scams',
    iconName: 'ShoppingBag',
    oneLiner: 'Clone storefronts, deeply discounted phantom inventory, and fake escrow payment processors.',
    commonTarget: 'Holiday shoppers, bargain hunters on social feeds, and buyers of hard-to-find collector goods.',
    mainWarning: 'High-demand items listed at 70–90% below retail with checkout asking for wire, Zelle, or gift cards.',
    categoryGroup: 'Shopping & Delivery',
    riskLevel: 'High',
    attackerTactics: [
      'Cloning entire brand storefronts with stolen logos, images, and identical product catalogs',
      'Flooding Instagram, TikTok, and Facebook with sponsored ads promoting clearance warehouse liquidations',
      'Providing non-existent or counterfeit courier tracking numbers that show fake progress',
      'Shipping worthless items (like a cheap plastic bead or sticker) so carriers show delivery confirmation',
    ],
    redFlags: [
      'Prices are impossibly low compared to all reputable retail merchants',
      'Domain registration is less than 60 days old (inspectable via free WHOIS lookups)',
      'The store has no physical company headquarters address, tax registration, or working customer support phone',
      'Checkout disables credit card payment and insists on direct bank transfers, Cash App, or gift cards',
    ],
    verificationSteps: [
      'Check the website creation date using a WHOIS query tool; scam shops are often created days prior.',
      'Search the domain name + "reviews" or "scam" on independent platforms like Trustpilot or Reddit.',
      'Always pay using a credit card with statutory dispute protection; never pay with direct cash transfers.',
    ],
    whatToDo: [
      'Contact your credit card issuer immediately to report unauthorized merchant charges and file a chargeback.',
      'Cancel the card if the store may have stored your full CVV and expiration details.',
      'Report the fake social media advertisement to the host platform.',
    ],
  },
  {
    id: 'romance-scams',
    name: 'Romance Scams',
    iconName: 'HeartHandshake',
    oneLiner: 'Emotional manipulation by fake online personas to extract money, gifts, or cryptocurrency investments.',
    commonTarget: 'Divorced, widowed, or lonely individuals on dating applications, language apps, and social networks.',
    mainWarning: 'Deep emotional declarations within days, followed by excuses why they cannot video chat or meet in person.',
    categoryGroup: 'Communication & Social',
    riskLevel: 'High',
    attackerTactics: [
      'Stealing photographs of attractive military personnel, overseas doctors, or oil rig engineers',
      'Spending weeks or months building affection, trust, and intimacy through thousands of daily messages',
      'Inventing sudden personal emergencies: hospital bills, stolen passports, broken machinery, or transit fees',
      'Transitioning the conversation into a "shared future" by teaching the victim how to invest in a fraudulent platform',
    ],
    redFlags: [
      'The person constantly has excuses (broken camera, remote location, military secrecy) to avoid video calls',
      'They profess deep love or lifelong commitment very quickly before meeting in person',
      'Requests for financial assistance, gift cards, travel tickets, or cryptocurrency transfers',
    ],
    verificationSteps: [
      'Run reverse image searches (Google Lens, TinEye) on profile pictures to see if they belong to models or strangers.',
      'Insist on a live video call where they hold up a specific object or gesture.',
      'Discuss the relationship openly with trusted family members or friends outside the situation.',
    ],
    whatToDo: [
      'Stop all communication and do not send money, regardless of emotional pressure or guilt trips.',
      'Do not attempt to confront the scammer; simply cut off contact and block them across all platforms.',
      'If you sent money, notify your financial institution immediately, though recovery options may be limited.',
    ],
  },
  {
    id: 'tech-support-scams',
    name: 'Tech Support Scams',
    iconName: 'Monitor',
    oneLiner: 'Deceptive browser popups and cold calls claiming your PC is infected, demanding remote access and payment.',
    commonTarget: 'Older adults, non-technical computer users, and individuals browsing unfamiliar websites.',
    mainWarning: 'Full-screen browser alarm with blaring siren claiming "Windows is locked" and displaying a toll-free number.',
    categoryGroup: 'Work & Services',
    riskLevel: 'Moderate',
    attackerTactics: [
      'Using JavaScript loops to lock the browser window in full screen, making it difficult for users to close the tab',
      'Instructing victims to download remote desktop utilities (AnyDesk, TeamViewer, UltraViewer)',
      'Opening harmless Windows diagnostic utilities (Event Viewer, tree command) and falsely claiming normal logs are "trojans"',
      'Faking a bank transfer "refund error" where they inspect-element bank HTML to pretend they accidentally gave you $5,000',
    ],
    redFlags: [
      'Unsolicited popups claiming your computer has a virus and providing a phone number to call',
      'Microsoft, Apple, or Google never include phone numbers in error popups or security warnings',
      'The caller insists on connecting to your computer to "clean system files" or "fix network IP errors"',
    ],
    verificationSteps: [
      'Press Alt + F4 (Windows) or Command + Option + Esc (Mac) to close your web browser.',
      'Remember that tech companies do not monitor consumer laptops for virus alarms or display phone call prompts.',
      'Run a scan with your operating system’s built-in security tool (Windows Security / Microsoft Defender).',
    ],
    whatToDo: [
      'If you gave remote access: disconnect from Wi-Fi immediately and turn off your computer.',
      'Have the machine checked by a reputable local technician or reinstall the operating system cleanly.',
      'Change all account passwords that were logged into on that machine using a separate, secure device.',
    ],
  },
  {
    id: 'bank-payment-scams',
    name: 'Bank / Payment Scams',
    iconName: 'Landmark',
    oneLiner: 'Impersonation of bank fraud departments urging you to reverse transactions or transfer to "safe accounts".',
    commonTarget: 'Anyone with a retail checking account, debit card, or peer-to-peer app like Zelle, Venmo, or PayPal.',
    mainWarning: 'Caller claiming to be your bank asks you to transfer funds to yourself or an "internal escrow account".',
    categoryGroup: 'Financial & Crypto',
    riskLevel: 'Critical',
    attackerTactics: [
      'Sending an initial fake fraud warning text, followed immediately by a call from a spoofed bank phone number',
      'Instructing the victim that their account is compromised and they must Zelle money to a "holding account"',
      'Asking the customer to provide the one-time authorization code sent to their phone to "stop the fraudulent transfer"',
      'Exploiting peer-to-peer payment apps because transactions are treated like cash and lack automatic chargebacks',
    ],
    redFlags: [
      'Your bank will NEVER ask you to transfer money to another account to "protect" or "reverse" a transaction',
      'A caller asking you for the one-time passcode (OTP) texted to your phone: that code is for logging in, not canceling',
      'Urgent pressure to act without logging into your official bank mobile app',
    ],
    verificationSteps: [
      'Hang up the call immediately.',
      'Flip your physical bank card over and dial the official fraud phone number printed on the back.',
      'Check your bank mobile app directly for genuine transaction alerts.',
    ],
    whatToDo: [
      'If you provided an OTP code, call your bank immediately to freeze your accounts and reset online access.',
      'If you initiated a wire or P2P transfer, notify the sending and receiving institutions within minutes.',
      'File a police report and submit an incident report with financial regulatory authorities.',
    ],
  },
  {
    id: 'social-media-scams',
    name: 'Social Media Scams',
    iconName: 'Share2',
    oneLiner: 'Compromised friend accounts, brand giveaways, fake influencers, and lottery lures on social platforms.',
    commonTarget: 'Active social media users on Instagram, Facebook, X (Twitter), TikTok, and LinkedIn.',
    mainWarning: 'A close friend’s account messages you with an unusual financial opportunity or asking for an emergency loan.',
    categoryGroup: 'Communication & Social',
    riskLevel: 'Moderate',
    attackerTactics: [
      'Compromising an account through password reuse, then messaging all friends with urgent emergency stories',
      '"Help me recover my Instagram account: vote for my brand ambassador profile by sending me the code you receive"',
      'Creating duplicate accounts copying a friend’s photos and bio, then sending fresh friend requests',
      'Running bot rings promoting fake giveaways requiring users to pay a small "handling fee" to claim a prize',
    ],
    redFlags: [
      'Unusual tone of voice or wording from a friend you know well',
      'Requests to send money via Cash App, gift cards, or crypto because of a sudden emergency abroad',
      'Requests asking you to forward a verification code sent to your phone or email',
    ],
    verificationSteps: [
      'Contact your friend through an alternative channel: call them on the phone or send a regular SMS.',
      'Never forward two-factor authentication or account recovery codes to anyone under any circumstances.',
      'Inspect the profile to see if it was recently created or has unusual changes in followers and history.',
    ],
    whatToDo: [
      'Report the compromised account directly to the social media platform’s trust and safety team.',
      'Warn mutual friends via group chats or your own story so others are not defrauded.',
      'Enable two-factor authentication with an authenticator app on all your own social profiles.',
    ],
  },
  {
    id: 'account-takeover-scams',
    name: 'Account Takeover Scams',
    iconName: 'ShieldAlert',
    oneLiner: 'Credential stuffing, SIM swapping, and phishing techniques to seize control of valuable digital accounts.',
    commonTarget: 'Users with high-value usernames, crypto exchange accounts, email inboxes, or social profiles.',
    mainWarning: 'Unexpected two-factor authentication prompts or a sudden loss of cellular service on your phone.',
    categoryGroup: 'Impersonation',
    riskLevel: 'Critical',
    attackerTactics: [
      'SIM Swapping: Social engineering mobile carrier staff to transfer your phone number to the attacker’s SIM',
      'Credential Stuffing: Automated testing of millions of leaked username/password combos against hundreds of services',
      'Session Hijacking: Stealing browser cookie sessions via infostealer malware distributed in cracked games or PDFs',
      'Setting up automated email forwarding rules in compromised inboxes to conceal banking receipts and password resets',
    ],
    redFlags: [
      'Your phone displays "No Service" or "SOS Only" unexpectedly in an area with normally strong mobile reception',
      'Receiving unexpected password reset emails for accounts you did not attempt to access',
      'Notifications about unfamiliar devices logging in from unexpected geographic locations',
    ],
    verificationSteps: [
      'Check your active login sessions across your primary email and Google/Apple accounts.',
      'Verify with your cellular carrier whether an unauthorized SIM change or port-out request occurred.',
      'Review email forwarding rules in your email settings to confirm emails are not secretly routed elsewhere.',
    ],
    whatToDo: [
      'If your phone lost service suddenly, call your mobile carrier immediately from another device.',
      'Regain access to your primary email account first, as it serves as the master key for all other accounts.',
      'Switch all 2FA methods away from SMS to authenticator apps (TOTP) or hardware security keys (FIDO2).',
    ],
  },
  {
    id: 'impersonation-scams',
    name: 'Impersonation Scams',
    iconName: 'UserX',
    oneLiner: 'Deceptive actors posing as company executives, colleagues, trusted vendors, or legal advisors.',
    commonTarget: 'Corporate employees, accounting personnel, executive assistants, and small business owners.',
    mainWarning: 'Urgent email purportedly from your CEO or manager asking you to buy gift cards or bypass standard payment procedures.',
    categoryGroup: 'Impersonation',
    riskLevel: 'High',
    attackerTactics: [
      'Business Email Compromise (BEC): Registering domain names that look identical to company domains (e.g. acnne.com for acme.com)',
      'Sending last-minute requests to alter vendor bank wire routing numbers prior to major invoice settlements',
      'Sending urgent WhatsApp messages: "I am in a confidential board meeting, purchase 10 Apple gift cards for clients right away"',
      'Using deepfake audio in urgent voice messages to mimic executive authority',
    ],
    redFlags: [
      'Requests to bypass standard procurement, accounting, or dual-authorization procedures',
      'Urgent emphasis on secrecy: "Keep this strictly between us until the announcement"',
      'The sender address has a slightly altered display name or uses an external free webmail address',
    ],
    verificationSteps: [
      'Always enforce out-of-band verification: call the executive or vendor at their known corporate office number.',
      'Check the full email headers to verify that SPF, DKIM, and DMARC checks passed and the domain is authentic.',
      'Never execute payment routing changes without verbal dual-authorization protocols.',
    ],
    whatToDo: [
      'Alert your internal IT and security operations team immediately.',
      'Freeze any pending wires or financial transfers with your commercial bank.',
      'Document all email threads and logs for forensic investigation.',
    ],
  },
  {
    id: 'government-impersonation-scams',
    name: 'Government Impersonation Scams',
    iconName: 'Award',
    oneLiner: 'Actors posing as tax authorities, police, customs, or social security agents threatening arrest or legal action.',
    commonTarget: 'Immigrants, small business owners, seniors, and citizens fearful of tax or legal troubles.',
    mainWarning: 'Caller or text claiming your Social Security or National ID is suspended or warrants exist for your arrest.',
    categoryGroup: 'Impersonation',
    riskLevel: 'High',
    attackerTactics: [
      'Impersonating the IRS, HMRC, CRA, ATO, or national police agencies with fabricated badge numbers',
      'Threatening that local police are en route to your residence unless an immediate fine or penalty is paid',
      'Instructing victims to withdraw cash and deposit it into a "federal safety deposit terminal" (crypto ATM)',
      'Falsely claiming identity documents were discovered inside an abandoned vehicle containing contraband',
    ],
    redFlags: [
      'Government agencies do not demand immediate payment over the phone, especially via crypto or gift cards',
      'Legitimate tax bodies always initiate contact regarding audit discrepancies via physical postal mail first',
      'Threatening immediate arrest by local police if you disconnect the phone call',
    ],
    verificationSteps: [
      'Hang up the phone immediately. Government officials will not retaliate because you hung up to verify.',
      'Look up the official phone number of the government department independently and call them.',
      'Know your rights: Social Security and National ID numbers are never "suspended" or "canceled".',
    ],
    whatToDo: [
      'Report the impersonation call to the relevant government inspector general or trade commission.',
      'Never disclose identity numbers, bank account numbers, or address details over unexpected calls.',
      'Reassure family members that such aggressive calls are standard boiler-room extortion scripts.',
    ],
  },
  {
    id: 'lottery-prize-scams',
    name: 'Lottery / Prize Scams',
    iconName: 'Sparkles',
    oneLiner: 'Advance-fee fraud informing you that you won a massive lottery or sweepstakes you never entered.',
    commonTarget: 'Seniors, sweepstakes participants, and individuals facing financial hardship.',
    mainWarning: 'Notification stating you won millions, but must pay "processing fees", "customs duties", or "taxes" first.',
    categoryGroup: 'Financial & Crypto',
    riskLevel: 'Moderate',
    attackerTactics: [
      'Impersonating well-known sweepstakes brands like Publishers Clearing House or foreign international lotteries',
      'Mailing official-looking certificates with counterfeit gold seals and forged judicial signatures',
      'Sending a genuine-looking counterfeit check and instructing the winner to deposit it and return a fee portion',
      'Escalating demands for higher fees as the victim complies, never actually releasing any prize money',
    ],
    redFlags: [
      'You cannot win a lottery or raffle that you did not purchase a ticket for or formally enter',
      'Legitimate lotteries deduct taxes directly from prize payouts; they never ask winners to send cash in advance',
      'Instructions to keep your "win" completely confidential from friends and bank tellers',
    ],
    verificationSteps: [
      'Remember the golden rule of fraud: If you did not enter a lottery, you did not win a lottery.',
      'Contact the official sweepstakes organization using public directory numbers, not numbers on the letter.',
      'Never pay money to receive prize money.',
    ],
    whatToDo: [
      'Tear up physical letters or delete emails claiming foreign lottery winnings.',
      'If you deposited a fake check, do not spend any of the funds; inform your bank manager immediately.',
      'Report advance-fee fraud to your national postal inspection service or trade commission.',
    ],
  },
  {
    id: 'delivery-parcel-scams',
    name: 'Delivery / Parcel Scams',
    iconName: 'Package',
    oneLiner: 'Fake notifications claiming a parcel cannot be delivered until you update an address or pay a nominal fee.',
    commonTarget: 'E-commerce consumers who regularly order goods online or during holiday shipping rushes.',
    mainWarning: 'Text or email saying your parcel is held at the depot and demanding $1.50–$3.00 for redelivery.',
    categoryGroup: 'Shopping & Delivery',
    riskLevel: 'High',
    attackerTactics: [
      'Sending millions of automated texts pretending to be USPS, Royal Mail, Australia Post, or DHL',
      'Requesting a very small, seemingly trivial fee ($1.50 or £1.99) so victims do not hesitate to enter card details',
      'Using the captured credit card credentials to enroll the victim in recurring expensive monthly subscriptions',
      'Harvesting full names, physical home addresses, and credit card security codes for identity fraud',
    ],
    redFlags: [
      'The message arrives from an unknown mobile number or free email service rather than an official carrier shortcode',
      'The link directs to an unfamiliar domain with random words (e.g., usps-redelivery-express.biz)',
      'Postal services do not suspend packages and demand credit card payments via unsolicited text links',
    ],
    verificationSteps: [
      'Check the official tracking page of the merchant where you actually bought goods.',
      'Copy the tracking number directly and paste it into the official carrier website (e.g. usps.com, dhl.com).',
      'If the tracking number produces an "Invalid Number" error on the official site, the message is 100% fake.',
    ],
    whatToDo: [
      'Delete the text and block the sender.',
      'If you entered your payment card details, contact your bank immediately to cancel and replace the card.',
      'Monitor your card statement closely for small test authorizations or unauthorized recurring charges.',
    ],
  },
];

export const HOW_A_SCAM_WORKS_STAGES: ScamFlowStage[] = [
  {
    step: 1,
    name: 'Attention',
    tagline: 'The Initial Hook',
    attackerTactic: 'Attacker catches your eye with an unexpected notification, provocative subject line, or familiar logo.',
    psychologicalHook: 'Curiosity or sudden concern: "What is this about? Did something go wrong with my account?"',
    defenderCountermeasure: 'Pause and acknowledge that unexpected notifications deserve deliberate scrutiny.',
    iconName: 'Bell',
  },
  {
    step: 2,
    name: 'Urgency',
    tagline: 'The Artificial Deadline',
    attackerTactic: 'Imposing strict time limits: "Within 24 hours," "Immediate action required," or "Account locked in 30 mins."',
    psychologicalHook: 'Panic and cognitive tunneling: urgency bypasses your natural analytical and questioning instincts.',
    defenderCountermeasure: 'Recognize artificial urgency as the #1 indicator of a social engineering attempt. Slow down.',
    iconName: 'Clock',
  },
  {
    step: 3,
    name: 'Trust',
    tagline: 'Borrowed Authority',
    attackerTactic: 'Spoofing trusted entities: your bank, the postal service, local police, Microsoft, or a close friend.',
    psychologicalHook: 'Compliance with established authority or comfort in dealing with a reputable, familiar institution.',
    defenderCountermeasure: 'Understand that logos, caller IDs, and sender names can be forged. Verify through independent channels.',
    iconName: 'ShieldCheck',
  },
  {
    step: 4,
    name: 'Request',
    tagline: 'The Call to Action',
    attackerTactic: 'Prompting you to click a link, open an attachment, call a phone number, or install remote assistance software.',
    psychologicalHook: 'The belief that following their instructions is the easiest way to resolve the simulated emergency.',
    defenderCountermeasure: 'Never interact with inbound links or software downloads. Close the message and open the official app directly.',
    iconName: 'MousePointerClick',
  },
  {
    step: 5,
    name: 'Pressure',
    tagline: 'The Escalation',
    attackerTactic: 'Threatening severe consequences if you hesitate: arrest, permanent account termination, or asset forfeiture.',
    psychologicalHook: 'Fear of conflict, legal trouble, or embarrassment prevents you from seeking a second opinion.',
    defenderCountermeasure: 'If someone forbids you from hanging up or speaking to family, it is definitely a scam. Hang up immediately.',
    iconName: 'AlertTriangle',
  },
  {
    step: 6,
    name: 'Loss / Data Theft',
    tagline: 'The Extraction',
    attackerTactic: 'Stealing credentials, harvesting OTPs, initiating unauthorized wire transfers, or obtaining crypto assets.',
    psychologicalHook: 'Victim believes they are "protecting their money" right up until the funds are irreversibly gone.',
    defenderCountermeasure: 'Maintain non-reversible defense: never read out OTPs, never wire money to "safe accounts," and use passkeys.',
    iconName: 'Lock',
  },
];

export const RED_FLAG_SCENARIO = {
  label: 'SIMULATED EDUCATIONAL EXAMPLE — NOT A REAL MESSAGE',
  channel: 'SMS Security Alert',
  senderDisplay: '+1 (833) 592-8104',
  timestamp: 'Today, 2:14 PM',
  fullMessageText:
    'URGENT NOTICE: Your National Security Bank checking account has been scheduled for suspension in 30 minutes due to unverified activity. Verify your identity immediately using https://secure-bank-login-verify492.com or your access will be permanently locked.',
  redFlags: [
    {
      id: 'rf-urgency',
      title: 'Artificial Urgency',
      highlightText: 'in 30 minutes',
      whyItMatters:
        'Scammers impose artificial time limits (like 15 or 30 minutes) specifically to cause panic and prevent you from thinking critically or calling your bank.',
      attackerObjective: 'Force an impulsive reaction before logical reasoning kicks in.',
      defensiveAction: 'Take a deep breath and slow down. Real banks do not permanently close accounts on 30-minute text ultimatums.',
    },
    {
      id: 'rf-threat',
      title: 'Threat of Account Suspension',
      highlightText: 'scheduled for suspension ... permanently locked',
      whyItMatters:
        'Threatening severe penalties or loss of financial access triggers fight-or-flight emotions, which suppresses skepticism.',
      attackerObjective: 'Manipulate fear of financial disruption into immediate compliance.',
      defensiveAction: 'Recognize that severe threats over SMS are a trademark characteristic of imposter fraud.',
    },
    {
      id: 'rf-unexpected',
      title: 'Unexpected Inbound Request',
      highlightText: 'due to unverified activity',
      whyItMatters:
        'Unsolicited alerts referencing vague "unverified activity" without citing your name or account digits are bulk phishing templates sent to thousands of random numbers.',
      attackerObjective: 'Cast a wide net hoping recipients coincidentally bank with or worry about that institution.',
      defensiveAction: 'Check your real bank app or balance directly. Real bank fraud alerts cite the last 4 digits of your card.',
    },
    {
      id: 'rf-url',
      title: 'Suspicious & Mismatched URL',
      highlightText: 'https://secure-bank-login-verify492.com',
      whyItMatters:
        'The web address contains hyphenated buzzwords ("secure-bank-login-verify492") and random numbers instead of the genuine bank domain (e.g. bankname.com).',
      attackerObjective: 'Trick you into entering credentials on an attacker-controlled credential harvesting portal.',
      defensiveAction: 'Never click links in SMS. Always type your bank’s known URL directly into your web browser or use their official app.',
    },
    {
      id: 'rf-credential-demand',
      title: 'Urgent Request to Verify Sensitive Data',
      highlightText: 'Verify your identity immediately',
      whyItMatters:
        'Banks never ask you to verify passwords, full Social Security numbers, or one-time passcodes through an inbound text link.',
      attackerObjective: 'Harvest your online banking login, password, and two-factor code to execute unauthorized withdrawals.',
      defensiveAction: 'Remember: Your bank already knows who you are. They will never send a text link demanding your password.',
    },
  ] as RedFlagScenarioItem[],
};

export const SCAM_QUIZ_SCENARIOS: ScamQuizQuestion[] = [
  {
    id: 'quiz-1',
    scenarioTitle: 'The Missing Parcel Address',
    channel: 'SMS Text',
    senderDisplay: '+44 7911 123456',
    messageContent:
      'USPS Notification: Your package [US-92819] could not be delivered due to an incomplete street number. Please update your address within 24 hours at usps-redeliver-track.top/update or your parcel will be returned to sender.',
    contextNote: 'You did recently order some clothing online that is currently in transit.',
    correctAnswer: 'C',
    options: [
      { key: 'A', label: 'Likely Legitimate — Since I am waiting for an online order, this is my carrier.', verdict: 'Likely Legitimate' },
      { key: 'B', label: 'Suspicious — But safe to click if I only update my address without entering money.', verdict: 'Suspicious' },
      { key: 'C', label: 'Definitely a Scam — Untrusted sender, suspicious .top domain, and artificial deadline.', verdict: 'Definitely a Scam' },
    ],
    explanation:
      'This is a textbook "smishing" scam. Postal carriers do not send SMS alerts from foreign mobile numbers (+44 is the UK) with odd domain names (.top). Scammers send these to millions of people knowing many are waiting for orders.',
    redFlagsIdentified: [
      'Sender number is an international mobile phone number',
      'The domain is "usps-redeliver-track.top", not the official "usps.com"',
      'Artificial 24-hour urgency designed to induce panic',
    ],
    takeaway: 'Never click parcel links in SMS. Always paste tracking numbers directly into the carrier’s official website.',
  },
  {
    id: 'quiz-2',
    scenarioTitle: 'Company HR Open Enrollment Survey',
    channel: 'Email',
    senderDisplay: 'benefits@acme-corp.com (via internal exchange)',
    messageContent:
      'Hi team, annual health insurance open enrollment begins next Monday. You can review plan changes, download benefit summaries, and submit your election form on our internal employee portal: https://intranet.acme-corp.com/benefits. Please submit by Nov 15th.',
    contextNote: 'You work at Acme Corp and receive regular company emails from this exact address.',
    correctAnswer: 'A',
    options: [
      { key: 'A', label: 'Likely Legitimate — Internal domain matches company intranet, reasonable timeframe, no panic.', verdict: 'Likely Legitimate' },
      { key: 'B', label: 'Suspicious — All workplace emails with links should be treated as attacks.', verdict: 'Suspicious' },
      { key: 'C', label: 'Definitely a Scam — HR departments never send links via email.', verdict: 'Definitely a Scam' },
    ],
    explanation:
      'This message exhibits standard legitimate communication markers: it originates from the verified internal company domain, links to the internal corporate intranet, provides a reasonable multi-week timeline (Nov 15), and makes no frantic demands.',
    redFlagsIdentified: [
      'No red flags detected in this scenario',
      'Matches expected annual company schedule',
      'Uses verified corporate subdomain and official channel',
    ],
    takeaway: 'While caution is always good, messages sent through established corporate portals with matching canonical domains and reasonable deadlines are normal operations.',
  },
  {
    id: 'quiz-3',
    scenarioTitle: 'High-Paying Remote Job on LinkedIn',
    channel: 'Professional Network',
    senderDisplay: 'Sarah Jenkins (Recruiter at Global Health Partners)',
    messageContent:
      'Hello! We reviewed your profile and want to offer you a flexible remote Data Specialist position at $68/hour. No prior experience required. Please download Telegram and message our hiring manager @DrMarkGlobal to complete your onboarding check.',
    contextNote: 'You are actively seeking remote employment opportunities.',
    correctAnswer: 'C',
    options: [
      { key: 'A', label: 'Likely Legitimate — Tech and healthcare companies recruit remotely all the time.', verdict: 'Likely Legitimate' },
      { key: 'B', label: 'Suspicious — But worth messaging on Telegram to see if the contract is real.', verdict: 'Suspicious' },
      { key: 'C', label: 'Definitely a Scam — Exorbitant pay for zero experience, moving off-platform to Telegram.', verdict: 'Definitely a Scam' },
    ],
    explanation:
      'Offering $68/hour for an entry-level position with "no experience required" is a classic hallmark of recruitment fraud. Moving candidate communication off professional platforms onto encrypted messaging apps like Telegram is done to evade platform fraud filters.',
    redFlagsIdentified: [
      'Unrealistically high hourly wage with no relevant background required',
      'Immediate offer without a formal application or technical interview',
      'Directing candidates off-platform to Telegram or WhatsApp',
    ],
    takeaway: 'Legitimate employers conduct formal multi-stage interviews and do not manage official corporate hiring through private Telegram handles.',
  },
  {
    id: 'quiz-4',
    scenarioTitle: 'Microsoft Security Department Phone Call',
    channel: 'Voice Call',
    senderDisplay: '+1 (800) 642-7676 (Spoofed Microsoft Support)',
    messageContent:
      'Caller: "Hello, this is Kevin from Microsoft Windows Global Security. We detected that your home computer has been compromised by foreign hackers and is transmitting corrupted files. To fix this and prevent network disconnection, download AnyDesk right now."',
    contextNote: 'You use a Windows laptop that has recently felt slightly sluggish.',
    correctAnswer: 'C',
    options: [
      { key: 'A', label: 'Likely Legitimate — Since caller ID says Microsoft Support, they are diagnosing a real fault.', verdict: 'Likely Legitimate' },
      { key: 'B', label: 'Suspicious — I should ask for their Microsoft employee ID before installing software.', verdict: 'Suspicious' },
      { key: 'C', label: 'Definitely a Scam — Microsoft never cold-calls consumers about virus infections.', verdict: 'Definitely a Scam' },
    ],
    explanation:
      'Microsoft, Apple, and Google never place unsolicited phone calls to consumers regarding malware infections or slow performance. Furthermore, caller ID is trivially spoofed to match official corporate 1-800 numbers.',
    redFlagsIdentified: [
      'Unsolicited cold call claiming to monitor your private computer',
      'Demanding you install remote administration software (AnyDesk, TeamViewer)',
      'Fabricated urgency threatening internet disconnection',
    ],
    takeaway: 'Never grant remote desktop control to an unsolicited inbound caller. Hang up immediately.',
  },
  {
    id: 'quiz-5',
    scenarioTitle: 'The "Emergency" Message from a Family Member',
    channel: 'Chat Message',
    senderDisplay: '+1 (555) 019-2831 (Unknown Number)',
    messageContent:
      '"Hi Mom, I dropped my phone in the water at work and it completely died. This is my friend’s temporary number. Can you please pay this urgent rent bill for me right now? It is $480 and due in 1 hour: zelle@payment-fast-transfer.net. I will pay you back tonight!"',
    contextNote: 'You have an adult child who lives in another apartment.',
    correctAnswer: 'C',
    options: [
      { key: 'A', label: 'Likely Legitimate — Accidents happen, and I should help my child avoid a late fee.', verdict: 'Likely Legitimate' },
      { key: 'B', label: 'Suspicious — Send half the money first to test whether it works.', verdict: 'Suspicious' },
      { key: 'C', label: 'Definitely a Scam — Classic "Hi Mum/Dad" imposter script asking for non-reversible funds.', verdict: 'Definitely a Scam' },
    ],
    explanation:
      'This is the globally infamous "Hi Mum / Hello Dad" family impersonation scam. Scammers blast thousands of phone numbers with stories of dropped phones and urgent bills, hoping parents panic and transfer money via Zelle or wire before verifying.',
    redFlagsIdentified: [
      'Message arrives from an unrecognized number claiming an old phone was broken',
      'Immediate request for emergency peer-to-peer funds with strict time pressure',
      'Requests payment to an unfamiliar, third-party email address',
    ],
    takeaway: 'Always verify family emergencies by calling your relative on their known phone number or speaking directly with other family members first.',
  },
  {
    id: 'quiz-6',
    scenarioTitle: 'Bank Mobile App Low Balance Push Alert',
    channel: 'Bank App',
    senderDisplay: 'Official Chase / Wells Fargo / Monzo Mobile App (Verified System Push)',
    messageContent:
      'Account Alert: Your checking account balance has fallen below $100.00 following a scheduled automatic payment of $42.50 to City Electric Utility. Tap to view your recent statement in the app.',
    contextNote: 'You set up utility auto-pay on your account and receive these push notifications monthly.',
    correctAnswer: 'A',
    options: [
      { key: 'A', label: 'Likely Legitimate — Originates from verified installed app, matches your pre-set alerts, no external link.', verdict: 'Likely Legitimate' },
      { key: 'B', label: 'Suspicious — I should immediately cancel my bank account and card.', verdict: 'Suspicious' },
      { key: 'C', label: 'Definitely a Scam — Banks never notify users when their balance changes.', verdict: 'Definitely a Scam' },
    ],
    explanation:
      'This is an authentic operating system push notification generated by your installed, verified mobile banking application based on your custom alert thresholds. It does not ask for passwords or redirect to unknown websites.',
    redFlagsIdentified: [
      'No red flags present',
      'Generated natively by installed app without external URLs',
      'Matches user-configured account settings',
    ],
    takeaway: 'Native app notifications with specific transaction details that direct you inside the authenticated mobile app are standard and secure.',
  },
];

export const SCAM_ANATOMY_PHASES = [
  {
    number: 1,
    title: 'Initial Contact',
    description:
      'The scammer reaches out via email, SMS, phone, social media DM, or search ad. The outreach is designed to blend into daily routines.',
    tactic: 'Automated mass broadcasting or targeted spear phishing using leaked directory data.',
  },
  {
    number: 2,
    title: 'Trust Building',
    description:
      'The scammer mimics recognizable corporate branding, provides fake employee IDs, or references publicly available personal information.',
    tactic: 'Exploiting institutional trust so the victim drops their normal skepticism.',
  },
  {
    number: 3,
    title: 'Emotional Trigger',
    description:
      'A psychological catalyst is activated: sudden panic (account suspended), excitement (lottery prize), greed (guaranteed 500% ROI), or empathy.',
    tactic: 'Overwhelming rational processing by elevating cortisol (stress) or dopamine (anticipation).',
  },
  {
    number: 4,
    title: 'Request for Action',
    description:
      'The scammer directs the victim to execute a specific move: tap a link, install software, provide an SMS code, or approve a transaction.',
    tactic: 'Framing the action as the only viable solution to resolve the fabricated emergency.',
  },
  {
    number: 5,
    title: 'Information / Payment Extraction',
    description:
      'Sensitive data is harvested: online passwords, two-factor codes, credit card numbers, or direct non-reversible funds transfers.',
    tactic: 'Directing victims toward non-refundable channels: crypto ATMs, Zelle, wires, or retail gift cards.',
  },
  {
    number: 6,
    title: 'Follow-Up Manipulation',
    description:
      'If the victim complies once, the attacker invents secondary fees, taxes, or "unblocking charges" to extract even more capital.',
    tactic: 'Sunk-cost fallacy: victims pay extra hoping to recover their original lost investment.',
  },
];

export const PSYCHOLOGICAL_TRIGGERS = [
  {
    name: 'Fear & Consequences',
    iconName: 'AlertOctagon',
    explanation:
      'Threatening legal prosecution, arrest, immediate account forfeiture, or IRS audits to induce acute panic.',
    example: '"Pay this overdue tax fine within 2 hours or police will be dispatched to your address."',
    counterAction: 'Government agencies and reputable banks never arrest citizens over sudden unsolicited phone calls.',
  },
  {
    name: 'Urgency & Scarcity',
    iconName: 'Hourglass',
    explanation:
      'Imposing extremely tight artificial countdowns to force split-second decisions before critical thinking intervenes.',
    example: '"Only 3 spots remaining in this private trading syndicate. Offer expires at midnight."',
    counterAction: 'Any deal that vanishes if you take 24 hours to investigate is designed to exploit you.',
  },
  {
    name: 'Authority & Compliance',
    iconName: 'Shield',
    explanation:
      'Posing as police detectives, bank fraud directors, federal agents, or corporate executives with badge numbers.',
    example: '"I am Special Agent Miller from Federal Customs. Your identity has been linked to an illegal shipment."',
    counterAction: 'Real law enforcement officers encourage you to verify their credentials through official police switchboards.',
  },
  {
    name: 'Greed & Easy Wealth',
    iconName: 'Coins',
    explanation:
      'Appealing to the universal desire for effortless wealth, guaranteed double-digit daily profits, and secret methods.',
    example: '"Our automated AI crypto arbitrage bot generates a guaranteed 12% daily return with zero risk."',
    counterAction: 'In financial markets, guaranteed high return with zero risk is mathematically impossible and always fraud.',
  },
  {
    name: 'Curiosity & Secrets',
    iconName: 'HelpCircle',
    explanation:
      'Enticing victims with provocative questions, leaked photos, tracking notifications, or mysterious gifts.',
    example: '"Is this really you in this shocking video link? Everyone on Facebook is talking about it."',
    counterAction: 'Never click links that rely on vague, shocking teasers. Delete them immediately.',
  },
  {
    name: 'Trust & Familiarity',
    iconName: 'UserCheck',
    explanation:
      'Exploiting hacked social accounts of genuine friends or spoofing familiar neighborhood area codes.',
    example: '"Hey! I am locked out of my account, can you text me the code you just received on your phone?"',
    counterAction: 'Always speak to your friend verbally on a known phone number before assisting with account recovery or funds.',
  },
  {
    name: 'Opportunity & Validation',
    iconName: 'Briefcase',
    explanation:
      'Flattering victims by telling them their resume or profile was handpicked for a prestigious high-paying remote job.',
    example: '"Your profile was selected for our Executive Data Consultant role paying $85/hour with flexible hours."',
    counterAction: 'Legitimate corporate recruiters evaluate portfolios through formal channels, never instant chat hires.',
  },
];

export const WHAT_TO_DO_STEPS = [
  {
    step: 1,
    title: 'Stop and Don’t Rush',
    action: 'Disengage immediately from the message or call. Artificial urgency is manufactured to prevent clear thinking.',
    details: 'Take 5 deep breaths. Walk away from the screen or disconnect the call. Time is almost always on your side.',
  },
  {
    step: 2,
    title: 'Don’t Click Further Links',
    action: 'Do not tap links, open email attachments, or approve push notifications related to the suspicious event.',
    details: 'Links can direct you to credential harvesting clones or deliver malicious browser exploits.',
  },
  {
    step: 3,
    title: 'Never Provide OTPs, Passwords, or PINs',
    action: 'One-time verification codes sent to your phone are keys to your account, not cancellation tokens.',
    details: 'Legitimate customer support representatives will never ask you to read back an authentication code sent via SMS.',
  },
  {
    step: 4,
    title: 'Never Send Money Under Pressure',
    action: 'Do not wire funds, send cryptocurrency, or buy gift cards to resolve an unexpected emergency.',
    details: 'Once funds leave via peer-to-peer or blockchain networks, they are virtually impossible to reverse.',
  },
  {
    step: 5,
    title: 'Contact the Organization Directly',
    action: 'Use a trusted, independently verified phone number or website to check the status of your account.',
    details: 'Look up the number on your physical credit card, bank statement, or official public directory—never the message itself.',
  },
  {
    step: 6,
    title: 'Alert Your Financial Provider Immediately',
    action: 'If banking details, cards, or funds were exposed, notify your bank’s fraud department within minutes.',
    details: 'Immediate notification allows banks to freeze compromised cards, reverse pending wires, and initiate fraud disputes.',
  },
  {
    step: 7,
    title: 'Change Compromised Credentials',
    action: 'If you entered a password on a suspicious site, change it immediately and sign out of all active sessions.',
    details: 'Ensure you also change that password on any other websites where you may have reused the same credentials.',
  },
  {
    step: 8,
    title: 'Report the Incident to Official Authorities',
    action: 'Submit an incident report to your national law enforcement and consumer protection agencies.',
    details: 'Reporting helps authorities map criminal infrastructure, seize fraudulent domains, and warn the wider public.',
  },
];

export const REGIONAL_REPORTING_AUTHORITIES: ReportingAuthority[] = [
  {
    country: 'United States',
    code: 'US',
    agencyName: 'Federal Trade Commission (FTC) & FBI IC3',
    website: 'https://reportfraud.ftc.gov',
    phone: '1-877-FTC-HELP (382-4357)',
    notes: 'Report consumer fraud, imposter scams, and online identity theft. For cybercrime and wire fraud, also file with the FBI Internet Crime Complaint Center at ic3.gov.',
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    agencyName: 'Action Fraud & National Cyber Security Centre (NCSC)',
    website: 'https://www.actionfraud.police.uk',
    phone: '0300 123 2040',
    notes: 'National reporting centre for fraud and cybercrime in the UK. Forward suspicious phishing emails to report@phishing.gov.uk and scam texts to 7726.',
  },
  {
    country: 'Canada',
    code: 'CA',
    agencyName: 'Canadian Anti-Fraud Centre (CAFC)',
    website: 'https://www.antifraudcentre-centreantifraude.ca',
    phone: '1-888-495-8501',
    notes: 'Jointly managed by the Royal Canadian Mounted Police (RCMP), Competition Bureau, and Ontario Provincial Police for fraud reports.',
  },
  {
    country: 'Australia',
    code: 'AU',
    agencyName: 'National Anti-Scam Centre (Scamwatch) & ReportCyber',
    website: 'https://www.scamwatch.gov.au',
    phone: '1300 795 995',
    notes: 'Operated by the Australian Competition and Consumer Commission (ACCC). For serious cybercrimes, report via cyber.gov.au/report.',
  },
  {
    country: 'India',
    code: 'IN',
    agencyName: 'National Cyber Crime Reporting Portal',
    website: 'https://cybercrime.gov.in',
    phone: '1930 (Cyber Financial Fraud Helpline)',
    notes: 'Government of India initiative for reporting cybercrimes and financial online fraud. Call 1930 immediately to freeze fraudulent bank transactions.',
  },
  {
    country: 'International / Other',
    code: 'INTL',
    agencyName: 'econsumer.gov (International Consumer Protection)',
    website: 'https://www.econsumer.gov',
    notes: 'A partnership of 40+ national consumer protection agencies dedicated to investigating cross-border e-commerce fraud and digital scams.',
  },
];

export const SCAM_WARNING_CHECKLIST_ITEMS = [
  { id: 'chk-1', text: 'Was I expecting this message, call, or notification?' },
  { id: 'chk-2', text: 'Is there unusual urgency or a strict countdown deadline?' },
  { id: 'chk-3', text: 'Is someone asking for money, gift cards, or crypto transfers?' },
  { id: 'chk-4', text: 'Is someone requesting a one-time passcode (OTP), password, or PIN?' },
  { id: 'chk-5', text: 'Does the web address (URL) or sender address look unfamiliar or misspelled?' },
  { id: 'chk-6', text: 'Is the sender identity independently verified outside this channel?' },
  { id: 'chk-7', text: 'Can I resolve this matter by opening the official app or website directly?' },
  { id: 'chk-8', text: 'Does the offer, salary, or investment return seem too good to be true?' },
];

export const SCAM_STORIES_DATA: ScamCaseStudy[] = [
  {
    id: 'case-job-offer',
    title: 'The "Home Office Equipment Check" Scam',
    category: 'Fake Job Offer',
    iconName: 'Briefcase',
    summary: 'A candidate receives an immediate remote job offer and a check to buy computer equipment from a specified supplier.',
    hook: 'A job seeker receives an unsolicited invitation on a freelance board offering $45/hour for data coordination. After a short text-based chat interview, they are offered the job on the spot.',
    tactic: 'The employer mails a legitimate-looking corporate check for $3,500 and tells the candidate to deposit it and immediately wire $2,800 to an "approved hardware vendor" for a pre-configured laptop.',
    turningPoint: 'The candidate notices the check’s issuing bank is located in a different state than the company. Instead of wiring money, they wait for their bank to fully clear the funds—discovering 4 days later that the check was counterfeit.',
    lessonLearned: 'Legitimate employers provide company-owned equipment directly or reimburse purchases through payroll; they never ask employees to forward check funds to outside vendors.',
  },
  {
    id: 'case-investment-group',
    title: 'The "VIP Trading Signals" Syndicate',
    category: 'Investment Group Scam',
    iconName: 'TrendingUp',
    summary: 'An investor is invited into an exclusive Telegram group showing members claiming massive daily profits on a proprietary trading dashboard.',
    hook: 'A social media acquaintance recommends a "private automated crypto signals group" on Telegram where dozens of members post screenshots of $5,000–$10,000 daily returns.',
    tactic: 'The investor deposits an initial $500. The platform’s web dashboard shows the balance rising to $1,800 within 48 hours. When the investor attempts to withdraw, support demands a $600 "liquidity verification fee."',
    turningPoint: 'The investor questions why fees cannot simply be deducted from the $1,800 balance. Recognizing this as secondary extortion, they refuse to send further money and report the platform domain.',
    lessonLearned: 'Any investment platform that requires upfront payment to release or withdraw your existing funds is 100% fraudulent. Web dashboards displaying inflated balances are entirely fabricated.',
  },
  {
    id: 'case-customer-support',
    title: 'The Sponsored Search Ad Tech Trap',
    category: 'Fake Customer Support',
    iconName: 'PhoneCall',
    summary: 'A user searching for airline customer support clicks a sponsored search result that connects to a boiler-room call center.',
    hook: 'A traveler needing to change a flight searches "Airline Customer Service Phone Number" on a search engine and calls the first sponsored toll-free ad at the top of the search results.',
    tactic: 'The agent claims the flight ticket cannot be changed unless a $150 "rebooking fee" is paid via Target or Apple gift cards because the credit card gateway is currently offline.',
    turningPoint: 'The traveler pauses upon hearing the word "gift card." Knowing that no major airline accepts supermarket gift cards for reservations, they hang up and verify the phone number on their original boarding pass.',
    lessonLearned: 'Search engine ad results frequently contain malicious imposter ads. Always retrieve contact phone numbers directly from your booking confirmation email or the airline’s official mobile app.',
  },
  {
    id: 'case-account-verification',
    title: 'The Cloud Storage Account Lockout',
    category: 'Account Verification Scam',
    iconName: 'ShieldAlert',
    summary: 'An email alert mimics a cloud storage provider claiming files will be deleted unless storage space is upgraded immediately.',
    hook: 'A user receives an email featuring the official logo and colors of their primary cloud storage service claiming their account has exceeded quota and 4,000 family photos will be deleted in 24 hours.',
    tactic: 'Clicking the link opens a login page that looks identical to the real cloud portal, capturing the username, password, and prompt for a two-factor SMS security code.',
    turningPoint: 'The user checks their browser address bar before entering credentials and notices the domain is "cloud-storage-renew-session4.net" rather than the official domain. They close the window safely.',
    lessonLearned: 'Always verify the canonical domain in your browser’s URL bar before typing credentials. Better yet, navigate to the service independently via your saved bookmarks.',
  },
  {
    id: 'case-delivery-fee',
    title: 'The $1.95 Redelivery Fee Trap',
    category: 'Delivery Fee Scam',
    iconName: 'Package',
    summary: 'A small redelivery fee text harvests credit card credentials to enroll victims in unauthorized recurring charges.',
    hook: 'A resident receives an SMS stating: "Your package is held at the sorting facility due to incorrect house number. Pay $1.95 redelivery fee to reschedule delivery."',
    tactic: 'The webpage prompts the victim to enter their name, full address, credit card number, expiration date, and CVV code for what appears to be a minor $1.95 payment.',
    turningPoint: 'The recipient looks closely at the sender phone number and sees it originated from a foreign country code (+63 Philippines) despite claiming to be their local national postal service. They delete the text.',
    lessonLearned: 'Scammers use tiny fees ($1.50–$2.00) because victims let their guard down. The actual objective is capturing complete credit card details for ongoing unauthorized subscriptions.',
  },
  {
    id: 'case-romance-investment',
    title: 'The "Shared Future" Romance Trap',
    category: 'Romance Scam',
    iconName: 'HeartHandshake',
    summary: 'An online romance builds over several months before turning into a coordinated push toward a fraudulent trading portal.',
    hook: 'A user meets a polite, attractive professional on a language exchange app. Over 3 months of daily texting, they build deep emotional closeness and talk about meeting in person.',
    tactic: 'The friend casually mentions they fund their luxury lifestyle through a specialized gold options exchange and offers to guide the victim step-by-step so they can afford to travel together.',
    turningPoint: 'When the friend insists they cannot do a video call because their camera is broken, the user conducts a reverse image search on the profile photos, discovering they belong to an overseas travel influencer.',
    lessonLearned: 'Anyone who turns an online relationship into investment advice or requests financial assistance before meeting in person is orchestrating a social engineering scam.',
  },
];

export const SCAM_AWARENESS_FAQS = [
  {
    question: 'How do I know if an unexpected text or email is a scam?',
    answer:
      'Look for the primary hallmarks of social engineering: artificial urgency (demands action within hours), high emotional pressure (threats of arrest or account closures), unexpected requests for personal data, and mismatched links that do not point to the official verified domain of the company.',
  },
  {
    question: 'Why do scammers ask for retail gift cards or cryptocurrency?',
    answer:
      'Unlike credit card transactions or standard bank transfers, gift card codes and cryptocurrency transfers are virtually irreversible and lack consumer fraud protections. Once a gift card code is relayed or crypto is sent, the attacker can liquidate it immediately without being easily traced.',
  },
  {
    question: 'Can scammers spoof caller ID numbers to look like my real bank?',
    answer:
      'Yes. The global telephone network still allows callers to display arbitrary numbers on recipient caller IDs. Attackers frequently spoof local police stations, bank fraud departments, and government hotlines. Never rely on caller ID alone; always hang up and dial the official number directly.',
  },
  {
    question: 'What should I do if I accidentally entered my password on a suspicious site?',
    answer:
      'Immediately open a fresh browser tab and navigate directly to the legitimate website. Change your password to a strong, unique passphrase and click "Sign out of all sessions." If you reused that password on other accounts, change them as well, and ensure two-factor authentication is active.',
  },
  {
    question: 'Does CyberAntigravity scan or store my personal messages?',
    answer:
      'No. CyberAntigravity is an educational platform. All quizzes, checklists, and red-flag analyzers run entirely within your local browser memory. We never collect messages, phone numbers, email addresses, financial details, or personal information.',
  },
  {
    question: 'Where can I report a scam or fraud attempt?',
    answer:
      'In the United States, report to ReportFraud.ftc.gov and IC3.gov. In the UK, report to Action Fraud (actionfraud.police.uk). In Canada, report to the Canadian Anti-Fraud Centre. In Australia, report to Scamwatch.gov.au. In India, report to cybercrime.gov.in or call 1930.',
  },
];
